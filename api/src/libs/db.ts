import { Low } from 'lowdb';
import { JSONFilePreset } from 'lowdb/node';

import env from './env';
import { Candidates } from '../types/user-profile';

let db: Low<Candidates>;
const defaultData: Candidates = { ids: [], map: {} };

export default async function createDB() {
  if (db) return db;

  db = await JSONFilePreset(`${env.dataDir}/user-profiles.json`, defaultData);
  return db;
}
