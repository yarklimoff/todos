import { Task, TaskStore } from '../models/taskStore';

const mockTasks = [new Task('0', 'abc', false), new Task('1', 'def', true)];

describe('TaskStore', () => {
  test('Class TaskStore work correctly', () => {
    const store = new TaskStore();
    store.addTask(mockTasks[0]);
    const lastTask = store.tasks.at(-1);
    expect(lastTask?.title).toBe('abc');

    store.updateTask(lastTask?.id, true);
    expect(lastTask?.done).toBe(true);

    store.deleteTask(lastTask?.id);
    expect(store.tasks.at(-1)?.id).not.toBe(lastTask?.id);
  });
});
