import './matchMedia';
import { InputForm } from '../components/inputForm/inputForm';
import { TaskStore, TaskStoreContext } from '../models/taskStore';
import { fireEvent, render, screen } from '@testing-library/react';

describe('InputForm', () => {
  test('Input work correctly', async () => {
    const taskStore = new TaskStore();

    render(
      <TaskStoreContext.Provider value={taskStore}>
        <InputForm />
      </TaskStoreContext.Provider>,
    );

    const input = screen.getByRole('textbox');
    expect(input).toBeInTheDocument();
    expect(input).toHaveValue('');

    const value = 'New task';

    fireEvent.change(input, { target: { value } });

    const button = screen.getByText('Добавить задачу');
    fireEvent.click(button);
    await new Promise((r) => setTimeout(r, 100));
    const newTask = taskStore.tasks.at(-1);
    expect(taskStore.tasks.length).toBeGreaterThan(0);
    expect(newTask?.title).toBe('New task');
  });
});
