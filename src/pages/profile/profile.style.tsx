import { createStyles } from 'antd-style';

export default createStyles(({ token, css }) => ({
  main: css`
    max-width: ${token.screenXL}px;
    margin: 0 auto;
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
}));
