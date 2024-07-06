import { createStyles } from 'antd-style';

export default createStyles(({ token, css }) => {
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
      &.aside {
        margin-right: 12px;
        padding: 12px 4px;
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
    `,
    // 信息块-头部操作栏
    bHAction: css`
      position: absolute;
      right: 16px;
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
      right: 16px;
      top: -8px;
      & .ant-btn {
        margin-left: 12px;
        padding: 0;
      }
    `,
  };
});
