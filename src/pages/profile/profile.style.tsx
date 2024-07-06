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
    `,
    // 信息块-头部
    bH: css`
      margin-top: 0;
      margin-bottom: 0.83em;
    `,
    // 信息块-头部按钮
    bHBtn: css`
      position: absolute;
      right: 0;
      top: -56px;
    `,
    bLabel: css`
      color: ${token.colorTextDescription};
      font-size: 14px;
      line-height: 14px;
      margin-top: 24px;
    `,
    bValue: css`
      font-size: 16px;
      color: ${token.colorText};
      line-height: 16px;
      margin-top: 12px;
    `,
    bFormItem: css`
      margin-bottom: 14px;
    `,
  };
});
