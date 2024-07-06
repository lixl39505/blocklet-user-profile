import { createContext, Dispatch, useEffect, useReducer } from 'react';
import { profileOne } from '@api/user-profile';
import { BaseInfo, Job, UserProfile } from '~/types/user-profile';

export const ProfileContext = createContext<UserProfile | null>(null);
export const ProfileDispatchContext = createContext<Dispatch<Action> | null>(null);
export type Action =
  | { type: 'replace'; payload: UserProfile }
  | { type: 'update:baseInfo'; payload: BaseInfo }
  | { type: 'update:job'; payload: Job }
  | { type: 'delete:job'; payload: string };

const initialProfile: UserProfile = { id: '1' };

// 维护客户端 UserProfile 状态
function profileReducer(profile: UserProfile, action: Action): UserProfile {
  switch (action.type) {
    case 'replace': {
      return action.payload;
    }
    case 'update:baseInfo': {
      return {
        ...profile,
        baseInfo: action.payload,
      };
    }
    case 'update:job': {
      const job = action.payload;
      const jobs = profile.jobs || [];
      const i = jobs.findIndex((v) => v.id === job.id);

      if (i >= 0) Object.assign(jobs[i]!, job);
      else jobs.push(job);

      return {
        ...profile,
        jobs,
      };
    }
    case 'delete:job': {
      const { jobs } = profile;
      const tid = action.payload;

      if (jobs && jobs.length) {
        const i = jobs.findIndex((v) => v.id === tid);
        if (i >= 0) {
          // 成功删除
          return {
            ...profile,
            jobs: jobs.filter((v) => v.id !== tid),
          };
        }
      }
      // 保持原样
      return profile;
    }
    default: {
      throw Error(`Unknown action: ${action}`);
    }
  }
}

export default function useProfile() {
  const [profile, dispatch] = useReducer(profileReducer, initialProfile);

  useEffect(() => {
    let canceled = false;

    // 初始化加载 profile 数据
    profileOne().then((newProfile) => {
      if (!canceled && newProfile) {
        dispatch({
          type: 'replace',
          payload: newProfile,
        });
      }
    });

    return () => {
      canceled = true;
    };
  }, []);

  return [profile, dispatch] as const;
}
