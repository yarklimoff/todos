import { memo, useMemo } from 'react';
import { TaskStore, TaskStoreContext } from '../../models/taskStore';
import './main.css';
import { Tabs } from '../tabs/tabs';
import { InputForm } from '../inputForm/inputForm';

const Main = memo(() => {
  const taskStore = useMemo(() => new TaskStore(), []);

  return (
    <div className="main">
      <h1>Todos</h1>
      <TaskStoreContext.Provider value={taskStore}>
        <InputForm />
        <Tabs />
      </TaskStoreContext.Provider>
    </div>
  );
});

export { Main };
