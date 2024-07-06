import { useEffect, useState } from 'react';
import { Button, Form, Input, DatePicker } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import dayjs, { Dayjs } from 'dayjs';

import { type Job } from '~/types/user-profile';
import useStyles from './profile.style';

export interface FJob extends Omit<Job, 'startDate' | 'endDate'> {
  startDate: Dayjs;
  endDate: Dayjs;
}

const toFJob = (job: Job) => ({
  ...job,
  startDate: job.startDate ? dayjs(job.startDate) : '',
  endDate: job.endDate ? dayjs(job.endDate) : '',
});

// 工作信息
// eslint-disable-next-line react/require-default-props
function ItemJob(props: { name: string; job: Job; onCancel?: (item: Job) => void; onDelete?: (item: Job) => void }) {
  const { name, job, onCancel, onDelete } = props;
  const [editable, setEditable] = useState(job.id === 'Added');
  const { styles } = useStyles();

  // init form
  const initialData = toFJob(job);
  const [form] = Form.useForm<FJob>();

  // job sync
  useEffect(() => {
    if (job && editable) form.setFieldsValue(toFJob(job));
  }, [job, form, editable]);

  return (
    <div className={styles.bb}>
      {editable ? (
        <Form
          name={name}
          form={form}
          layout="vertical"
          autoComplete="off"
          initialValues={initialData}
          onFinish={() => setEditable(false)}>
          <Form.Item<FJob> name="id" hidden>
            <Input />
          </Form.Item>
          <Form.Item<FJob> label="公司名称" name="company" rules={[{ required: true, message: '请填写公司名称' }]}>
            <Input placeholder="例如: " maxLength={50} allowClear />
          </Form.Item>
          <Form.Item<FJob> label="职位名称" name="post" rules={[{ required: true, message: '请填写职位名称' }]}>
            <Input placeholder="例如: 产品经理" maxLength={50} allowClear />
          </Form.Item>
          <Form.Item<FJob> label="开始时间" name="startDate" rules={[{ required: true, message: '请填写开始时间' }]}>
            <DatePicker picker="month" allowClear />
          </Form.Item>
          <Form.Item<FJob>
            label="结束时间"
            name="endDate"
            rules={[
              {
                validator(rule, value: Dayjs, callback) {
                  if (value && value.isBefore(form.getFieldValue('startDate'))) {
                    return callback('结束时间不得早于开始时间');
                  }
                  return callback();
                },
              },
            ]}>
            <DatePicker picker="month" placeholder="至今" allowClear />
          </Form.Item>
          <Form.Item<FJob> label="工作描述" name="desc">
            <Input.TextArea rows={4} placeholder="不超过 300 字" maxLength={300} allowClear />
          </Form.Item>
          <Form.Item className={styles.bFormItem} style={{ textAlign: 'center' }}>
            <Button
              style={{ marginRight: '12px' }}
              onClick={() => {
                if (onCancel) onCancel(job);
                setEditable(false);
              }}>
              取消
            </Button>
            <Button type="primary" htmlType="submit">
              完成
            </Button>
          </Form.Item>
        </Form>
      ) : (
        <div>
          <div className={styles.bbAction}>
            <Button icon={<EditOutlined />} type="link" iconPosition="start" onClick={() => setEditable(true)}>
              编辑
            </Button>
            <Button
              icon={<DeleteOutlined />}
              type="link"
              iconPosition="start"
              onClick={() => onDelete && onDelete(job)}>
              删除
            </Button>
          </div>
          <div className={styles.bLabel}>公司名称</div>
          <div className={styles.bValue}>{job.company}</div>
          <div className={styles.bLabel}>职位名称</div>
          <div className={styles.bValue}>{job.post}</div>
          <div className={styles.bLabel}>时间</div>
          <div className={styles.bValue}>
            {job.startDate} - {job.endDate || '至今'}
          </div>
          <div className={styles.bLabel}>工作描述</div>
          <div className={styles.bValue}>{job.desc}</div>
        </div>
      )}
    </div>
  );
}

export default ItemJob;
