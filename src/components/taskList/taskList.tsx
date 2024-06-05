import { Button, Checkbox, CheckboxProps, Col } from 'antd';
import { observer } from 'mobx-react-lite';
import React, { FC } from 'react';
import { Task } from '../../models/taskStore';
import { CloseCircleOutlined } from '@ant-design/icons';
import './taskList.css';
type TaskListProps = {
  tasks: Task[];
  onTaskDelete: (id: string) => void;
  onTaskUpdate: (id: string, state: boolean) => void;
};

const TaskList: FC<TaskListProps> = observer(({ tasks, onTaskDelete, onTaskUpdate }) => {
  console.log(tasks);
  const onChange: CheckboxProps['onChange'] = (event) => {
    onTaskUpdate(event.target.value, event.target.checked);
    console.log(event.target.value, event.target.checked);
  };

  if (tasks.length === 0) {
    return <div>Список задач пуст</div>;
  }

  return (
    <div className="taskList">
      {tasks.map((task, index) => (
        <Col key={index} span={24} className="row">
          <Checkbox onChange={onChange} checked={task.done} value={task.id} key={index}>
            {task.title}
          </Checkbox>
          <Button icon={<CloseCircleOutlined />} onClick={() => onTaskDelete(task.id)} />
        </Col>
      ))}
    </div>
  );
});

export { TaskList };
