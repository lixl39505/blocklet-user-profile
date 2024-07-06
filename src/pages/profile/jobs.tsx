import { useContext, useState } from 'react';
import { App, Form, Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

import { jobDelete, jobSave } from '~/src/api/user-profile';
import { Job } from '~/types/user-profile';
import { ProfileContext, ProfileDispatchContext } from './hooks/use-profile';
import ItemJob, { FJob } from './item-job';
import useStyles from './profile.style';

// 工作经历列表
function Jobs() {
  const profile = useContext(ProfileContext)!;
  const dispatch = useContext(ProfileDispatchContext)!;
  const { styles } = useStyles();

  const [isAddMode, setIsAddMode] = useState(false);

  let jobs = profile.jobs || [];
  if (isAddMode) {
    jobs = jobs.filter((v) => v.id === 'Added');
  }

  // 新增工作经验
  const onAdd = () => {
    dispatch({
      type: 'update:job',
      payload: {
        id: 'Added',
        company: '',
        post: '',
        startDate: '',
        desc: '',
      },
    });
    setIsAddMode(true);
  };
  // 删除工作经验
  const { modal } = App.useApp();
  const doDelete = async (item: Job) => {
    if (item.id) {
      if (item.id !== 'Added') {
        await jobDelete(profile.id, item.id);
      }
      dispatch({
        type: 'delete:job',
        payload: item.id,
      });
    }
  };
  const onDelete = (item: Job) => {
    const instance = modal.confirm({
      title: '温馨提示',
      content: '删除后不可恢复，确认删除吗？',
      centered: true,
      onOk() {
        doDelete(item);
        instance.destroy();
      },
      onCancel() {
        instance.destroy();
      },
    });
  };
  // 保存工作经验
  const onJobSave = async (job: FJob) => {
    const data: Job = {
      ...job,
      startDate: job.startDate.format('YYYY-MM'),
      endDate: job.endDate ? job.endDate.format('YYYY-MM') : '',
    };

    if (data.id === 'Added') {
      doDelete(data);
      data.id = '';
      setIsAddMode(false);
    }
    const id = await jobSave(profile.id, data);

    dispatch({
      type: 'update:job',
      payload: { ...data, id },
    });
  };
  // 取消编辑
  const onCancel = (item: Job) => {
    if (item.id === 'Added') {
      doDelete(item);
      setIsAddMode(false);
    }
  };

  return (
    <Form.Provider
      onFormFinish={(_, { values }) => {
        onJobSave(values as FJob);
      }}>
      <div className={styles.b}>
        <div className={styles.bHAction}>
          <Button icon={<PlusOutlined />} type="link" iconPosition="start" onClick={onAdd}>
            新增
          </Button>
        </div>
        {jobs.map((item) => (
          <ItemJob key={item.id} name={`job${item.id}`} job={item} onCancel={onCancel} onDelete={onDelete} />
        ))}
      </div>
    </Form.Provider>
  );
}

export default Jobs;
