import { createStyles } from 'antd-style';

export default createStyles(({ token, css }) => {
  return {
    main: css`
      max-width: ${token.screenXL}px;
      margin: 0 auto;
    `,
    card: css`
      background: ${token.colorWhite};
      border-radius: 4px;
      padding: 16px;
      margin-bottom: 12px;
    `,
    aside: css`
      margin-right: 12px;
      padding: 12px 4px;
    `,
    title: css`
      margin-top: 0;
      margin-bottom: 0.83em;
    `,
    nav: css`
      display: block;
      color: ${token.colorText};
      text-indent: 8px;
      line-height: 36px;
      font-size: 14px;
      &:hover {
        background: ${token.colorBgTextHover};
      }
    `,
  };
});
