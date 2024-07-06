import { useContext, useEffect, useState } from 'react';
import type { FormProps } from 'antd';
import { Button, Form, Input, Radio } from 'antd';
import { Gender, type BaseInfo as TBaseInfo } from '~/types/user-profile';
import { baseInfoSave } from '@api/user-profile';
import { ProfileContext, ProfileDispatchContext } from './hooks/use-profile';

// 基本信息
function BaseInfo() {
  const profile = useContext(ProfileContext)!;
  const dispatch = useContext(ProfileDispatchContext)!;
  const [editable, setEditable] = useState(false);

  // init form
  const initialData = profile?.baseInfo ?? { name: '', phone: '', email: '', gender: Gender.Male, intro: '' };
  const [form] = Form.useForm<TBaseInfo>();

  // baseInfo 同步
  useEffect(() => {
    if (profile.id && profile.baseInfo) {
      form.setFieldsValue(profile.baseInfo);
    }
  }, [profile, form]);

  // 保存
  const onFinish: FormProps<TBaseInfo>['onFinish'] = async (values) => {
    await baseInfoSave(profile!.id, values);
    // todo 乐观更新
    dispatch({
      type: 'update:baseInfo',
      payload: values,
    });

    setEditable(false);
  };

  // 取消
  const onCancel = () => {
    setEditable(false);
  };

  return (
    <div>
      {!editable && <Button onClick={() => setEditable(true)}>编辑</Button>}
      {editable ? (
        <Form
          name="baseInfo"
          form={form}
          layout="vertical"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          autoComplete="off"
          initialValues={initialData}
          onFinish={onFinish}>
          <Form.Item<TBaseInfo> label="姓名" name="name" rules={[{ required: true, message: '请输入姓名' }]}>
            <Input placeholder="不超过 10 个字" maxLength={10} allowClear />
          </Form.Item>
          <Form.Item<TBaseInfo> label="性别" name="gender">
            <Radio.Group>
              <Radio value={Gender.Male}>男</Radio>
              <Radio value={Gender.Female}>女</Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item<TBaseInfo> label="手机号" name="phone">
            <Input placeholder="11 位手机号" maxLength={11} allowClear />
          </Form.Item>
          <Form.Item<TBaseInfo> label="邮箱" name="email" rules={[{ type: 'email', message: '邮箱格式不正确' }]}>
            <Input allowClear />
          </Form.Item>
          <Form.Item<TBaseInfo> label="简介" name="intro">
            <Input.TextArea rows={4} placeholder="不超过 300 字" maxLength={300} allowClear />
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button onClick={onCancel}>取消</Button>
            <Button type="primary" htmlType="submit">
              完成
            </Button>
          </Form.Item>
        </Form>
      ) : (
        <div>
          <div>姓名</div>
          <div>{initialData.name}</div>
          <div>性别</div>
          <div>{initialData.gender}</div>
          <div>手机号</div>
          <div>{initialData.phone}</div>
          <div>邮箱</div>
          <div>{initialData.email}</div>
          <div>简介</div>
          <div>{initialData.intro}</div>
        </div>
      )}
    </div>
  );
}

export default BaseInfo;
