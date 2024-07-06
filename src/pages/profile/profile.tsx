import { Layout } from 'antd';
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
            <div className={`${styles.card} aside`}>
              <a className={styles.navItem} href="#baseInfo">
                基本信息
              </a>
              <a className={styles.navItem} href="#jobs">
                工作经历
              </a>
            </div>
          </Layout.Sider>
          <Layout.Content>
            <div className={styles.card}>
              <h2 className={styles.bH} id="baseInfo">
                基本信息
              </h2>
              <BaseInfo />
            </div>
            <div className={styles.card}>
              <h2 className={styles.bH} id="jobs">
                工作经历
              </h2>
              <Jobs />
            </div>
          </Layout.Content>
        </Layout>
      </ProfileDispatchContext.Provider>
    </ProfileContext.Provider>
  );
}

export default Profile;
