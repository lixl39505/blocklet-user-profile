import { createContext, Dispatch, useEffect, useReducer } from 'react';
import { profileOne } from '@api/user-profile';
import { UserProfile } from '~/types/user-profile';

export const ProfileContext = createContext<UserProfile | null>(null);
export const ProfileDispatchContext = createContext<Dispatch<{ type: ActionType; payload: UserProfile }> | null>(null);
export type ActionType = 'replace' | 'update:baseInfo' | 'update:edus' | 'update:jobs' | 'update:projects';

const initialProfile: UserProfile = {};

function profileReducer(profile: UserProfile, action: { type: ActionType; payload: UserProfile }) {
  const { type, payload } = action;

  switch (type) {
    case 'replace': {
      return payload;
    }
    case 'update:baseInfo': {
      return {
        ...profile,
        baseInfo: payload.baseInfo,
      };
    }
    case 'update:edus': {
      return {
        ...profile,
        edus: payload.edus,
      };
    }
    case 'update:jobs': {
      return {
        ...profile,
        jobs: payload.jobs,
      };
    }
    case 'update:projects': {
      return {
        ...profile,
        projects: payload.projects,
      };
    }
    default: {
      throw Error(`Unknown action: ${action.type}`);
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
