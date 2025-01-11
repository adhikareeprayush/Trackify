interface Task {
    id: string;
    title: string;
    category: string;
    createdOn: string;
    modifiedDate: string;
    dueDate: string;
    hoursSpent: string;
    notes: string;
    status: 'Ongoing' | 'Completed';
  }
  
  class TaskStore {
    private tasks: Task[] = [];
  
    constructor() {
      this.loadTasks();
    }
  
    private loadTasks() {
      const tasksJson = localStorage.getItem('tasks');
      if (tasksJson) {
        this.tasks = JSON.parse(tasksJson);
      } else {
        // Load initial tasks from tasks.json
        fetch('/tasks.json')
          .then((response) => response.json())
          .then((data) => {
            this.tasks = data;
            this.saveTasks();
          });
      }
    }
  
    private saveTasks() {
      localStorage.setItem('tasks', JSON.stringify(this.tasks));
    }
  
    getAllTasks(): Task[] {
      return this.tasks;
    }
  
    getTaskById(id: string): Task | undefined {
      return this.tasks.find((task) => task.id === id);
    }
  
    addTask(task: Omit<Task, 'id' | 'createdOn' | 'modifiedDate'>): Task {
      const newTask: Task = {
        ...task,
        id: crypto.randomUUID(),
        createdOn: new Date().toISOString(),
        modifiedDate: new Date().toISOString(),
      };
      this.tasks.push(newTask);
      this.saveTasks();
      return newTask;
    }
  
    updateTask(id: string, updates: Partial<Task>): Task | undefined {
      const taskIndex = this.tasks.findIndex((task) => task.id === id);
      if (taskIndex === -1) return undefined;
  
      const updatedTask = {
        ...this.tasks[taskIndex],
        ...updates,
        modifiedDate: new Date().toISOString(),
      };
  
      this.tasks[taskIndex] = updatedTask;
      this.saveTasks();
      return updatedTask;
    }
  
    deleteTask(id: string): boolean {
      const initialLength = this.tasks.length;
      this.tasks = this.tasks.filter((task) => task.id !== id);
      this.saveTasks();
      return this.tasks.length !== initialLength;
    }
  }
  
  export const taskStore = new TaskStore();
  export type { Task };