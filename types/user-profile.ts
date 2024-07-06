export type UID = string;
/**
 * 候选人
 */
export interface Candidates {
  ids: UID[];
  map: {
    [id: UID]: UserProfile;
  };
}
/**
 * 个人档案
 */
export interface UserProfile {
  id: UID;
  baseInfo?: BaseInfo;
  edus?: Education[];
  jobs?: Job[];
  projects?: Project[];
}
/**
 * 基础信息
 */
export interface BaseInfo {
  name: string; // 姓名
  gender?: Gender; // 性别
  phone?: string; // 手机号
  email?: string; // 邮箱
  intro?: string; // 简介
}
/**
 * 学历信息
 */
export interface Education {
  id?: UID;
  school: string; // 学校名称
  major: string; // 专业
  edu: Edu; // 学历
  startDate: string; // 开始时间
  endDate: string; // 结束时间
}
/**
 * 工作经验
 */
export interface Job {
  id?: UID;
  company: string; // 公司名称
  post: string; // 职位
  startDate: string; // 入职时间
  endDate?: string; // 离职时间
  desc: string; // 工作描述
}
/**
 * 项目经验
 */
export interface Project {
  id?: UID;
  name: string; // 项目名称
  role: string; // 项目角色
  endDate?: string; // 开始时间
  desc: string; // 项目描述
}
/**
 * 性别
 */
export enum Gender {
  Male,
  Female,
}
/**
 * 学历
 */
export enum Edu {
  HighSchool, // 高中及以下
  Associate, // 专科
  Bachelor, // 本科
  Master, // 硕士
  Doctor, // 博士
}
