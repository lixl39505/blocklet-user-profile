import { useContext, useEffect, useState } from 'react';
import type { FormProps } from 'antd';
import { Button, Form, Input, Radio } from 'antd';
import { EditOutlined } from '@ant-design/icons';

import { Gender, type BaseInfo as TBaseInfo } from '~/types/user-profile';
import { baseInfoSave } from '@api/user-profile';
import { ProfileContext, ProfileDispatchContext } from './hooks/use-profile';
import useStyles from './profile.style';

// 基本信息
function BaseInfo() {
  const profile = useContext(ProfileContext)!;
  const dispatch = useContext(ProfileDispatchContext)!;
  const [editable, setEditable] = useState(false);
  const { styles } = useStyles();

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
    <div className={styles.b}>
      {!editable && (
        <div className={styles.bHAction}>
          <Button icon={<EditOutlined />} type="link" iconPosition="start" onClick={() => setEditable(true)}>
            编辑
          </Button>
        </div>
      )}
      {editable ? (
        <Form
          name="baseInfo"
          form={form}
          layout="vertical"
          autoComplete="off"
          initialValues={initialData}
          onFinish={onFinish}>
          <Form.Item<TBaseInfo>
            className={styles.bFormItem}
            label="姓名"
            name="name"
            rules={[{ required: true, message: '请输入姓名' }]}>
            <Input placeholder="不超过 10 个字" maxLength={10} allowClear />
          </Form.Item>
          <Form.Item<TBaseInfo> className={styles.bFormItem} label="性别" name="gender">
            <Radio.Group>
              <Radio value={Gender.Male}>男</Radio>
              <Radio value={Gender.Female}>女</Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item<TBaseInfo>
            className={styles.bFormItem}
            label="手机号"
            name="phone"
            rules={[{ pattern: /^1\d{10}$/, message: '手机号码格式不正确' }]}>
            <Input placeholder="输入 11 位手机号" allowClear />
          </Form.Item>
          <Form.Item<TBaseInfo>
            className={styles.bFormItem}
            label="邮箱"
            name="email"
            rules={[{ type: 'email', message: '邮箱格式不正确' }]}>
            <Input allowClear />
          </Form.Item>
          <Form.Item<TBaseInfo> className={styles.bFormItem} label="简介" name="intro">
            <Input.TextArea rows={4} placeholder="不超过 300 字" maxLength={300} allowClear />
          </Form.Item>
          <Form.Item className={styles.bFormItem} style={{ textAlign: 'center' }}>
            <Button style={{ marginRight: '12px' }} onClick={onCancel}>
              取消
            </Button>
            <Button type="primary" htmlType="submit">
              完成
            </Button>
          </Form.Item>
        </Form>
      ) : (
        <div>
          <div className={styles.bLabel}>姓名</div>
          <div className={styles.bValue}>{initialData.name}</div>
          <div className={styles.bLabel}>性别</div>
          <div className={styles.bValue}>{initialData.gender === Gender.Male ? '男' : '女'}</div>
          <div className={styles.bLabel}>手机号</div>
          <div className={styles.bValue}>{initialData.phone}</div>
          <div className={styles.bLabel}>邮箱</div>
          <div className={styles.bValue}>{initialData.email}</div>
          <div className={styles.bLabel}>简介</div>
          <div className={styles.bValue}>{initialData.intro}</div>
        </div>
      )}
    </div>
  );
}

export default BaseInfo;
