import type { Low } from 'cjs-lowdb';
import { JSONFilePreset } from 'cjs-lowdb/node';

import env from './env';
import { Candidates } from '../types/user-profile';

let db: Low<Candidates>;
const defaultData: Candidates = { ids: [], map: {} };

export default async function initDB() {
  if (db) return db;

  db = await JSONFilePreset(`${env.dataDir}/user-profiles.json`, defaultData);
  return db;
}
