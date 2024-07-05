import { UserProfile } from '~/types/user-profile';
import api from '../libs/api';

/**
 * 保存档案
 * @param {UserProfile} body 档案数据
 */
export function profileSave(body: UserProfile) {
  return api.post<string>('/api/profile/save', body);
}
/**
 * 查询档案
 */
export function profileOne() {
  return api.post<UserProfile | null>('/api/profile/one');
}
