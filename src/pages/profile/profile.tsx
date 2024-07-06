import { useState } from 'react';
import { Layout, Popover, Button } from 'antd';
import { MenuOutlined } from '@ant-design/icons';

import useProfile, { ProfileContext, ProfileDispatchContext } from './hooks/use-profile';
import BaseInfo from './base-info';
import Jobs from './jobs';
import useStyles from './profile.style';

const navList = [
  { anchor: 'baseInfo', title: '基本信息' },
  { anchor: 'jobs', title: '工作经历' },
];

function Profile() {
  const [profile, dispath] = useProfile();
  const { styles } = useStyles();
  const [openTopNav, setOpenTopNav] = useState(false);

  const handleOpenTopNavChange = (newOpen: boolean) => {
    setOpenTopNav(newOpen);
  };

  const navItems = navList.map((v) => (
    <a
      className={styles.navItem}
      key={v.anchor}
      href={`#${v.anchor}`}
      onClick={() => {
        if (openTopNav) setOpenTopNav(false);
      }}>
      {v.title}
    </a>
  ));

  return (
    <ProfileContext.Provider value={profile}>
      <ProfileDispatchContext.Provider value={dispath}>
        <Layout className={styles.main}>
          <Layout.Sider
            className={styles.aside}
            breakpoint="sm"
            collapsedWidth={0}
            trigger={null}
            theme="light"
            width={180}>
            {/* 侧边导航 */}
            <div className={`${styles.card} nav`}>{navItems}</div>
          </Layout.Sider>
          {/* 顶部导航(移动端) */}
          <div className={styles.topbar}>
            <span>个人档案</span>
            <Popover
              placement="bottomLeft"
              content={navItems}
              arrow={false}
              open={openTopNav}
              onOpenChange={handleOpenTopNavChange}>
              <Button size="small" icon={<MenuOutlined />} onClick={() => setOpenTopNav(true)} />
            </Popover>
          </div>
          <Layout.Content className={styles.content}>
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
