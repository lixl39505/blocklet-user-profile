import { useEffect, useState } from 'react';
import { Button, Form, Input } from 'antd';

import { type Job } from '~/types/user-profile';

// 工作信息
function ItemJob(props: { name: string; job: Job; onCancel?: (item: Job) => void; onDelete?: (item: Job) => void }) {
  const { name, job, onCancel, onDelete } = props;
  const [editable, setEditable] = useState(job.id === 'Added');

  // init form
  const initialData = job;
  const [form] = Form.useForm<Job>();

  // job sync
  useEffect(() => {
    if (job) form.setFieldsValue(job);
  }, [job, form]);

  return (
    <div>
      {!editable && (
        <>
          <Button onClick={() => setEditable(true)}>编辑</Button>
          <Button onClick={() => onDelete && onDelete(job)}>删除</Button>
        </>
      )}
      {editable ? (
        <Form
          name={name}
          form={form}
          layout="vertical"
          autoComplete="off"
          initialValues={initialData}
          onFinish={() => setEditable(false)}>
          <Form.Item<Job> name="id" hidden>
            <Input />
          </Form.Item>
          <Form.Item<Job> label="公司名称" name="company" rules={[{ required: true, message: '请填写公司名称' }]}>
            <Input placeholder="例如: " maxLength={50} allowClear />
          </Form.Item>
          <Form.Item<Job> label="职位名称" name="post" rules={[{ required: true, message: '请填写职位名称' }]}>
            <Input placeholder="例如: 产品经理" maxLength={50} allowClear />
          </Form.Item>
          <Form.Item<Job> label="开始时间" name="startDate" rules={[{ required: true, message: '请填写开始时间' }]}>
            <Input allowClear />
          </Form.Item>
          <Form.Item<Job> label="结束时间" name="endDate" rules={[{ required: true, message: '请填写结束时间' }]}>
            <Input allowClear />
          </Form.Item>
          <Form.Item<Job> label="工作描述" name="desc">
            <Input.TextArea rows={4} placeholder="不超过 300 字" maxLength={300} allowClear />
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button
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
          <div>公司名称</div>
          <div>{initialData.company}</div>
          <div>职位名称</div>
          <div>{initialData.post}</div>
          <div>开始时间</div>
          <div>{initialData.startDate}</div>
          <div>结束时间</div>
          <div>{initialData.endDate}</div>
          <div>工作描述</div>
          <div>{initialData.desc}</div>
        </div>
      )}
    </div>
  );
}

const dump = () => {};

ItemJob.defaultProps = {
  onCancel: dump,
  onDelete: dump,
};

export default ItemJob;
