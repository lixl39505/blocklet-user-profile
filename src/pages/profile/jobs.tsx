import { useContext } from 'react';
import { Form, Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

import { jobDelete, jobSave } from '~/src/api/user-profile';
import { Job } from '~/types/user-profile';
import { ProfileContext, ProfileDispatchContext } from './hooks/use-profile';
import ItemJob from './item-job';
import useStyles from './profile.style';

// 工作经历列表
function Jobs() {
  const profile = useContext(ProfileContext)!;
  const dispatch = useContext(ProfileDispatchContext)!;
  const jobs = profile.jobs || [];
  const { styles } = useStyles();

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
  };
  // 删除工作经验
  const onDelete = async (item: Job) => {
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
  // 保存工作经验
  const onJobSave = async (job: Job) => {
    const data = { ...job };
    if (data.id === 'Added') {
      data.id = '';
      onDelete(job);
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
      onDelete(item);
    }
  };

  return (
    <Form.Provider
      onFormFinish={(_, { values }) => {
        onJobSave(values as Job);
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
