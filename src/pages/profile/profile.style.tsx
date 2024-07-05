import { createStyles } from 'antd-style';

export default createStyles(({ css }) => ({
  main: {
    height: '100%',
  },
  logo: css`
    overflow: hidden;
    white-space: nowrap;
    line-height: 48px;
    padding: 0 16px;
    color: #ededed;
    font-size: 16px;
    text-align: center;
  `,
  iconLarge: {
    fontSize: '40px',
  },
  content: css`
    overflow: auto;
    padding: 16px;
  `,
}));
