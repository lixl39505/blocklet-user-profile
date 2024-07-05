import type { Low } from 'cjs-lowdb';
import { JSONFilePreset } from 'cjs-lowdb/node';
import { Candidates } from '~/types/user-profile';

import env from './env';

let db: Low<Candidates>;
const defaultData: Candidates = { ids: [], map: {} };

export default async function initDB() {
  if (db) {
    await db.read(); // Sync Data
    return db;
  }

  db = await JSONFilePreset(`${env.dataDir}/user-profiles.json`, defaultData);
  return db;
}
