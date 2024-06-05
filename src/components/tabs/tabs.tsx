import { TabsProps, Tabs as TabsAntd } from 'antd';
import { observer } from 'mobx-react-lite';
import { TaskList } from '../taskList/taskList';
import { useTaskStoreContext } from '../../models/taskStore';

const Tabs = observer(() => {
  const taskStore = useTaskStoreContext();

  const items: TabsProps['items'] = [
    {
      key: '1',
      label: <div>Все ({taskStore.tasks.length})</div>,
      children: (
        <TaskList
          tasks={taskStore.tasks}
          onTaskDelete={taskStore.deleteTask}
          onTaskUpdate={taskStore.updateTask}
        />
      ),
    },
    {
      key: '2',
      label: <div>Выполненные ({taskStore.tasks.filter((task) => task.done).length})</div>,
      children: (
        <TaskList
          tasks={taskStore.tasks.filter((task) => task.done)}
          onTaskDelete={taskStore.deleteTask}
          onTaskUpdate={taskStore.updateTask}
        />
      ),
    },
    {
      key: '3',
      label: <div>Невыполненные ({taskStore.tasks.filter((task) => !task.done).length})</div>,
      children: (
        <TaskList
          tasks={taskStore.tasks.filter((task) => !task.done)}
          onTaskDelete={taskStore.deleteTask}
          onTaskUpdate={taskStore.updateTask}
        />
      ),
    },
  ];
  return <TabsAntd items={items} />;
});

export { Tabs };
