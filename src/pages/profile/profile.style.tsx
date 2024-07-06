import { createStyles } from 'antd-style';

export default createStyles(({ token, css, responsive }) => {
  const topHeight = 48;

  return {
    // 主体布局
    main: css`
      max-width: ${token.screenMD}px;
      margin: 0 auto;
    `,
    // 卡片样式
    card: css`
      background: ${token.colorWhite};
      border-radius: 4px;
      padding: 16px 24px;
      margin-bottom: 12px;
      &.nav {
        margin-right: 12px;
        padding: 12px 4px;
      }
    `,
    // 侧边栏
    aside: css`
      &.ant-layout-sider {
        position: sticky;
        top: 8px;
        align-self: flex-start;
      }
      ${responsive.sm} {
        display: none;
      }
    `,
    // 导航条目
    navItem: css`
      display: block;
      color: ${token.colorText};
      text-indent: 8px;
      line-height: 36px;
      font-size: 14px;
      &:hover {
        background: ${token.colorBgTextHover};
      }
    `,
    // 顶部栏(移动端)
    topbar: css`
      display: none;
      box-sizing: border-box;
      height: ${topHeight}px;
      line-height: ${topHeight}px;
      width: 100%;
      padding: 0 10px;
      position: fixed;
      left: 0;
      top: 0;
      background: #ffffff;
      z-index: 1;
      ${responsive.sm} {
        display: flex;
        justify-content: space-between;
        align-items: center;
      }
    `,
    // 内容区
    content: css`
      ${responsive.sm} {
        margin-top: ${topHeight + 10}px;
      }
    `,
    // 信息块
    b: css`
      position: relative;
      & .ant-form {
        background-color: ${token.colorBgLayout};
        outline: 10px ${token.colorBgLayout} solid;
      }
    `,
    // 信息块-头部
    bH: css`
      margin-top: 0;
      margin-bottom: 0.83em;
      ${responsive.sm} {
        padding-top: ${topHeight + 20}px;
        margin-top: -${topHeight + 20}px;
      }
    `,
    // 信息块-头部操作栏
    bHAction: css`
      position: absolute;
      right: 0;
      top: -50px;
      & .ant-btn {
        margin-left: 12px;
        padding: 0;
      }
    `,
    bFormItem: css`
      margin-bottom: 14px;
    `,
    bLabel: css`
      color: ${token.colorTextDescription};
      font-size: 14px;
      line-height: 14px;
      margin-bottom: 12px;
    `,
    bValue: css`
      font-size: 16px;
      color: ${token.colorText};
      line-height: 16px;
      margin-bottom: 24px;
      &:last-child {
        margin-bottom: 0;
      }
    `,
    // 子信息块
    bb: css`
      position: relative;
      margin-bottom: 44px;
      &:last-child {
        margin-bottom: 16px;
      }
      &:hover {
        background-color: ${token.colorBgLayout};
        outline: 10px ${token.colorBgLayout} solid;
      }
    `,
    bbAction: css`
      position: absolute;
      right: 0;
      top: -8px;
      & .ant-btn {
        margin-left: 12px;
        padding: 0;
      }
    `,
  };
});
