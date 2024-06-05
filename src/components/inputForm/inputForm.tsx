import { Button, Form, FormProps, Input } from 'antd';
import { observer } from 'mobx-react-lite';
import React from 'react';
import { Task, useTaskStoreContext } from '../../models/taskStore';
import { v4 as uuidv4 } from 'uuid';
import './inputForm.css';
const InputForm = observer(() => {
  const taskStore = useTaskStoreContext();

  const onFinish: FormProps<{ title: string }>['onFinish'] = (values) => {
    taskStore.addTask(new Task(uuidv4(), values.title, false));
  };
  return (
    <Form className="addTaskForm" autoComplete="off" name="addTask" onFinish={onFinish}>
      <Form.Item style={{ flex: 1 }} name={'title'}>
        <Input />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Добавить задачу
        </Button>
      </Form.Item>
    </Form>
  );
});

export { InputForm };
