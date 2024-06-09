import './matchMedia';
import { TaskStore, TaskStoreContext } from '../models/taskStore';
import { render, screen } from '@testing-library/react';
import { Tabs } from '../components/tabs/tabs';

describe('Tabs', () => {
  test('Tabs render correctly', () => {
    const taskStore = new TaskStore();
    render(
      <TaskStoreContext.Provider value={taskStore}>
        <Tabs />
      </TaskStoreContext.Provider>,
    );

    expect(screen.getByText(`Все (${taskStore.tasks.length})`)).toBeInTheDocument();
    expect(
      screen.getByText(`Невыполненные (${taskStore.tasks.filter((task) => !task.done).length})`),
    ).toBeInTheDocument();
    expect(
      screen.getByText(`Выполненные (${taskStore.tasks.filter((task) => task.done).length})`),
    ).toBeInTheDocument();
  });
});
