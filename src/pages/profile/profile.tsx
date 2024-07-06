import { Card, Layout } from 'antd';
import useProfile, { ProfileContext, ProfileDispatchContext } from './hooks/use-profile';
import BaseInfo from './base-info';
import Jobs from './jobs';
import useStyles from './profile.style';

function Profile() {
  const [profile, dispath] = useProfile();
  const { styles } = useStyles();

  return (
    <ProfileContext.Provider value={profile}>
      <ProfileDispatchContext.Provider value={dispath}>
        <Layout className={styles.main}>
          <Layout.Sider
            style={{
              position: 'sticky',
              top: '8px',
              alignSelf: 'flex-start',
            }}
            breakpoint="sm"
            collapsedWidth={0}
            trigger={null}
            theme="light"
            width={180}>
            <Card style={{ marginRight: '12px' }} styles={{ body: { padding: '12px 4px' } }}>
              <a className={styles.nav} href="#baseInfo">
                基本信息
              </a>
              <a className={styles.nav} href="#jobs">
                工作经历
              </a>
            </Card>
          </Layout.Sider>
          <Layout.Content>
            <Card styles={{ body: { padding: '0 16px 16px' } }}>
              <BaseInfo />
              <Jobs />
            </Card>
          </Layout.Content>
        </Layout>
      </ProfileDispatchContext.Provider>
    </ProfileContext.Provider>
  );
}

export default Profile;
