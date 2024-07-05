import { Card } from 'antd';
import BaseInfo from './base-info';
import useProfile, { ProfileContext, ProfileDispatchContext } from './hooks/use-profile';

function Profile() {
  const [profile, dispath] = useProfile();

  return (
    <ProfileContext.Provider value={profile}>
      <ProfileDispatchContext.Provider value={dispath}>
        <Card>
          <BaseInfo />
        </Card>
      </ProfileDispatchContext.Provider>
    </ProfileContext.Provider>
  );
}

export default Profile;
