import { createContext, Dispatch, useEffect, useReducer } from 'react';
import { profileOne } from '~/src/api/user-profile';
import { UserProfile } from '~/types/user-profile';

export const ProfileContext = createContext<UserProfile | null>(null);
export const ProfileDispatchContext = createContext<Dispatch<{ type: ActionType; payload: UserProfile }> | null>(null);
export type ActionType =
  | 'replace'
  | 'update:baseInfo'
  | 'update:edus'
  | 'update:intro'
  | 'update:jobs'
  | 'update:projects';

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
    case 'update:intro': {
      return {
        ...profile,
        intro: payload.intro,
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

export default function useProfile(id?: string) {
  const [profile, dispatch] = useReducer(profileReducer, initialProfile);

  useEffect(() => {
    let canceled = false;
    // 初始化加载 profile 数据
    if (id) {
      profileOne(id).then((newProfile) => {
        if (!canceled) {
          dispatch({
            type: 'replace',
            payload: newProfile,
          });
        }
      });
    }

    return () => {
      canceled = true;
    };
  }, [id]);

  return [profile, dispatch] as const;
}
