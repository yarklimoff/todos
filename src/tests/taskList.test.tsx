import { TaskList } from '../components/taskList/taskList';
import { Task } from '../models/taskStore';
import { render, screen } from '@testing-library/react';

const mockTasks = [new Task('0', 'abc', false), new Task('1', 'def', true)];

describe('TaskList', () => {
  test('List of tasks render successfully', () => {
    render(<TaskList tasks={mockTasks} onTaskDelete={() => {}} onTaskUpdate={() => {}} />);
    const checkBox1 = screen.getByLabelText(/abc/i);
    const checkBox2 = screen.getByLabelText(/def/i);

    expect(checkBox1).not.toBeChecked();
    expect(checkBox2).toBeChecked();
    expect(screen.getByText(/abc/i)).toBeInTheDocument();
    expect(screen.getByText(/def/i)).toBeInTheDocument();
  });
});
