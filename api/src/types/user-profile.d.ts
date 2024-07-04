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
 * 个人简历
 */
export interface UserProfile {
  baseInfo: BaseInfo;
  edus: Education[];
  intro: Introduction;
  jobs: Job[];
  projects: Project[];
}
/**
 * 基础信息
 */
export interface BaseInfo {
  name: string; // 姓名
  gender?: Gender; // 性别
  phone?: string; // 手机号
  mail?: string; // 邮箱
}
/**
 * 自我介绍
 */
export type Introduction = string;
/**
 * 教育经历
 */
export interface Education {
  school: string; // 学校名称
  major: string; // 专业
  edu: Edu; // 学历
  startDate: string; // 开始时间
  endDate: string; // 结束时间
}
/**
 * 工作经历
 */
export interface Job {
  company: string; // 公司名称
  post: string; // 职位
  startDate: string; // 入职时间
  endDate: string; // 离职时间
  desc: string; // 工作描述
}
/**
 * 项目经历
 */
export interface Project {
  name: string; // 项目名称
  role: string; // 项目角色
  endDate: string; // 开始时间
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
