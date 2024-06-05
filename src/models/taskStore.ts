import { action, makeObservable, observable } from 'mobx';
import { createContext, useContext } from 'react';

const TaskStoreContext = createContext<TaskStore | null>(null);
type TaskProps = {
  id: string;
  title: string;
  done: boolean;
};
class Task {
  constructor(public id: string, public title: string, public done: boolean) {
    makeObservable(this, {
      done: observable,
      changeState: action,
    });
  }

  public changeState = (state: boolean) => {
    this.done = state;
  };
}

class TaskStore {
  tasks: Task[] = [];
  constructor() {
    makeObservable(this, {
      tasks: observable,
      addTask: action,
      deleteTask: action,
    });
    const existTasks = localStorage.getItem('todoTasks');
    if (existTasks !== null) {
      (JSON.parse(existTasks) as TaskProps[]).map((task) =>
        this.addTask(new Task(task.id, task.title, task.done)),
      );
    }
  }

  addTask = (task: Task) => {
    this.tasks.push(task);
    localStorage.setItem('todoTasks', JSON.stringify(this.tasks));
  };

  deleteTask = (id: string) => {
    this.tasks = this.tasks.filter((task) => task.id !== id);
    localStorage.setItem('todoTasks', JSON.stringify(this.tasks));
  };

  updateTask = (id: string, state: boolean) => {
    this.tasks.find((task) => task.id === id)?.changeState(state);
    localStorage.setItem('todoTasks', JSON.stringify(this.tasks));
  };
}

const useTaskStoreContext = (): TaskStore => {
  const taskStore = useContext(TaskStoreContext);
  console.assert(taskStore !== null, 'Хук выполнен вне контекста');
  return taskStore!;
};

export { TaskStore, useTaskStoreContext, TaskStoreContext, Task };
