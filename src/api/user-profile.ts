import { BaseInfo, Job, UserProfile } from '~/api/src/types/user-profile';
import api from '../libs/api';

/**
 * 查询档案
 */
export function profileOne() {
  return api.post<UserProfile | null>('/api/profile/one');
}
/**
 * 保存基础信息
 * @param {string} pid 档案id
 * @param {BaseInfo} data 基础信息
 */
export function baseInfoSave(pid: string, data: BaseInfo) {
  return api.post<string>('/api/baseInfo/save', {
    pid,
    data,
  });
}
/**
 * 保存工作信息
 * @param {string} pid 档案id
 * @param {Job} data 工作信息
 */
export function jobSave(pid: string, data: Job) {
  return api.post<string>('/api/job/save', {
    pid,
    data,
  });
}
/**
 * 删除工作信息
 * @param {string} pid 档案id
 * @param {string} data 工作信息id
 */
export function jobDelete(pid: string, data: string) {
  return api.post<string>('/api/job/delete', {
    pid,
    data,
  });
}
