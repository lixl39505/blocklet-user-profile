import middleware from '@blocklet/sdk/lib/middlewares';
import { Request, Router } from 'express';
import { UserProfile } from '~/types/user-profile';
import initDB from '../libs/db';
import { uid } from '../libs/util';

const router = Router();

router.use('/user', middleware.user(), (req, res) => res.json(req.user || {}));

router.use('/data', (_, res) =>
  res.json({
    message: 'Hello Blocklet!',
  }),
);

// 查询第一份档案
router.post('/profile/one', async (_, res) => {
  const db = await initDB();

  const { ids, map } = db.data;
  if (ids.length) {
    res.json({ code: 200, payload: map[ids[0]!] });
  } else {
    res.json({ code: 200, payload: null });
  }
});

// 保存档案
router.post('/profile/save', async (req: Request<{}, any, UserProfile>, res) => {
  const profile = { ...req.body };

  // Check if username and pwd are present
  // if (!username || !pwd) {
  //   return res.status(400).json({ error: 'Username and password are required' });
  // }

  const db = await initDB();
  await db.update(({ ids, map }) => {
    // update
    if (profile.id) {
      map[profile.id] = profile;
    } else {
      // add
      const id = uid();
      profile.id = id;
      ids.push(id);
      map[id] = profile;
    }
  });

  res.json({ code: 200, payload: profile.id });
});

export default router;
