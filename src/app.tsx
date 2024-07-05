import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
// Antdesign
import { ConfigProvider, App } from 'antd';
import dayjs from 'dayjs';
import zhCN from 'antd/locale/zh_CN';
import 'dayjs/locale/zh-cn';

import light from './themes/light';
import Profile from './pages/profile/profile';

// 默认中文
dayjs.locale('zh-cn');

export default function WrappedApp() {
  // While the blocklet is deploy to a sub path, this will be work properly.
  const basename = window?.blocklet?.prefix || '/';

  return (
    <ConfigProvider locale={zhCN} theme={light}>
      <Router basename={basename}>
        <App className="app">
          <Routes>
            <Route path="/" element={<Profile />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </App>
      </Router>
    </ConfigProvider>
  );
}
