// import { Menu } from 'antd';
// import { useMatches } from 'react-router-dom';
import BaseInfo from './base-info';
import useProfile, { ProfileContext, ProfileDispatchContext } from './hooks/use-profile';

function Profile() {
  const [profile, dispath] = useProfile();

  return (
    <ProfileContext.Provider value={profile}>
      <ProfileDispatchContext.Provider value={dispath}>
        <BaseInfo />
      </ProfileDispatchContext.Provider>
    </ProfileContext.Provider>
  );
}

export default Profile;
