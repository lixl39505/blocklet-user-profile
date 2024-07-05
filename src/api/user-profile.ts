import { UserProfile } from '~/types/user-profile';
import api from '../libs/api';

/**
 * 保存简历
 * @param {UserProfile} body 简历数据
 */
export function profileSave(body: UserProfile) {
  return api.post<string>('/api/profile/save', body);
}
/**
 * 查询简历
 * @param {UserProfile} id 简历id
 */
export function profileOne(id: string) {
  return api.post<UserProfile>('/api/profile/one', { id });
}
/**
 * 查询所有简历
 */
export function profileAll() {
  return api.post<UserProfile[]>('/api/profile/all');
}
