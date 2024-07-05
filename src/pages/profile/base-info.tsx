// import { useState } from 'react';
import type { FormProps } from 'antd';
import { Button, Form, Input, Radio } from 'antd';
import { Gender, type BaseInfo as TBaseInfo } from '~/types/user-profile';
import { profileSave } from '@api/user-profile';

function BaseInfo(props: { id?: string }) {
  const { id } = props;
  // const [editable, setEditable] = useState(false);

  const onFinish: FormProps<TBaseInfo>['onFinish'] = async (values) => {
    await profileSave({
      id,
      baseInfo: values,
    });
  };

  return (
    <Form name="baseInfo" labelCol={{ span: 8 }} wrapperCol={{ span: 16 }} autoComplete="off" onFinish={onFinish}>
      <Form.Item<TBaseInfo> label="姓名" name="name" rules={[{ required: true, message: '请输入用户名' }]}>
        <Input />
      </Form.Item>
      <Form.Item<TBaseInfo> label="性别" name="gender">
        <Radio.Group>
          <Radio value={Gender.Male}>男</Radio>
          <Radio value={Gender.Female}>女</Radio>
        </Radio.Group>
      </Form.Item>
      <Form.Item<TBaseInfo> label="手机号" name="phone">
        <Input />
      </Form.Item>
      <Form.Item<TBaseInfo> label="邮箱" name="email" rules={[{ type: 'email', message: '邮箱格式不正确' }]}>
        <Input.Password />
      </Form.Item>
      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button>取消</Button>
        <Button type="primary" htmlType="submit">
          完成
        </Button>
      </Form.Item>
    </Form>
  );
}

BaseInfo.defaultProps = {
  id: 'some default',
};

export default BaseInfo;
