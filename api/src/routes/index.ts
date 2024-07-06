import middleware from '@blocklet/sdk/lib/middlewares';
import { Request, Router } from 'express';
import type { Low } from 'cjs-lowdb';

import { BaseInfo, Candidates, Job } from '~/types/user-profile';
import initDB from '../libs/db';
import { uid } from '../libs/util';

const router = Router();

router.use('/user', middleware.user(), (req, res) => res.json(req.user || {}));

// 获取或创建档案
function getOrCreateProfile(db: Low<Candidates>, pid: string) {
  const { ids, map } = db.data;

  if (map[pid] === undefined) {
    ids.push(pid);
    map[pid] = {
      id: pid,
    };
  }

  return map[pid]!;
}

// 查询头份档案
router.post('/profile/one', async (_, res) => {
  const db = await initDB();

  const { ids, map } = db.data;
  if (ids.length) {
    res.json({ code: 200, payload: map[ids[0]!] });
  } else {
    res.json({ code: 200, payload: { id: uid() } });
  }
});

// 保存基础信息
router.post('/baseInfo/save', async (req: Request<{}, any, { pid: string; data: BaseInfo }>, res) => {
  const { pid, data } = req.body;
  let errorMsg = '';

  // Check phone number
  if (!data.phone) errorMsg = '手机号不得为空';
  else if (/^1\d{10}$/.test(data.phone) === false) errorMsg = '手机号格式不正确';

  if (errorMsg) {
    return res.json({ code: 400, payload: errorMsg });
  }

  const db = await initDB();
  const profile = getOrCreateProfile(db, pid);

  profile.baseInfo = data;
  await db.write();

  return res.json({ code: 200, payload: profile.id });
});

// 保存工作经验
router.post('/job/save', async (req: Request<{}, any, { pid: string; data: Job }>, res) => {
  const { pid, data } = req.body;

  const db = await initDB();
  const profile = getOrCreateProfile(db, pid);

  if (!profile.jobs) {
    profile.jobs = [];
  }

  let job: Job;
  // update job
  if (data.id) {
    const idx = profile.jobs.findIndex((v) => v.id === data.id);
    if (idx >= 0) {
      job = { ...data };
      profile.jobs[idx] = job;
    } else {
      return res.json({ code: 400, payload: 'Invalid Job' });
    }
  } else {
    // create job
    job = {
      ...data,
      id: uid(),
    };
    profile.jobs.push(job);
  }

  await db.write();
  return res.json({ code: 200, payload: job.id });
});

// 删除工作经验
router.post('/job/delete', async (req: Request<{}, any, { pid: string; data: string }>, res) => {
  const { pid, data } = req.body;

  const db = await initDB();
  const profile = getOrCreateProfile(db, pid);

  if (profile.jobs) {
    const i = profile.jobs.findIndex((v) => v.id === data);
    if (i >= 0) {
      profile.jobs.splice(i, 1);

      await db.write();
      return res.json({ code: 200 });
    }
  }

  return res.json({ code: 400, payload: 'Job doesn`t existed' });
});

export default router;
