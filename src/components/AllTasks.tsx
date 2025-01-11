import { useState } from "react";
import { Plus, Search, Filter } from "lucide-react";
import Card from "./Card";
import { taskStore, type Task } from "../utils/taskStore";
import NewTaskModal from "./NewTaskModal";

const AllTasks = () => {
  const [tasks, setTasks] = useState<Task[]>(taskStore.getAllTasks());
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<"all" | "ongoing" | "completed">("all");
  const [category, setCategory] = useState<string>("all");
  const [showNewTaskModal, setShowNewTaskModal] = useState(false);

  const categories = [...new Set(tasks.map(task => task.category))];

  const handleAddTask = (newTask: Omit<Task, 'id' | 'createdOn' | 'modifiedDate'>) => {
    const task = taskStore.addTask(newTask);
    setTasks(taskStore.getAllTasks());
  };

  const filteredTasks = tasks.filter(task => {
    const matchesSearch = task.title.toLowerCase().includes(search.toLowerCase()) ||
                         task.category.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = filter === "all" ? true : 
                         filter === "ongoing" ? task.status === "Ongoing" :
                         task.status === "Completed";
    const matchesCategory = category === "all" ? true : task.category === category;

    return matchesSearch && matchesStatus && matchesCategory;
  });

  return (
    <div className="ml-[300px] flex flex-col gap-6 min-h-screen bg-slate-50 p-8">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">All Tasks</h1>
        <button 
          onClick={() => setShowNewTaskModal(true)}
          className="flex items-center gap-2 bg-violet-600 text-white px-4 py-2 rounded-lg hover:bg-violet-700 transition-colors"
        >
          <Plus size={20} />
          <span>New Task</span>
        </button>
      </div>

      <div className="flex flex-col gap-6 bg-white p-6 rounded-lg shadow-sm">
        <div className="flex items-center gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
            <input
              type="text"
              placeholder="Search tasks..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-600"
            />
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Filter size={20} className="text-slate-400" />
              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value as "all" | "ongoing" | "completed")}
                className="border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-violet-600"
              >
                <option value="all">All Status</option>
                <option value="ongoing">Ongoing</option>
                <option value="completed">Completed</option>
              </select>
            </div>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-violet-600"
            >
              <option value="all">All Categories</option>
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredTasks.map((task) => (
            <Card key={task.id} {...task} />
          ))}
        </div>

        {filteredTasks.length === 0 && (
          <div className="text-center py-8 text-slate-500">
            No tasks found matching your criteria
          </div>
        )}
      </div>

      {showNewTaskModal && (
        <NewTaskModal
          onClose={() => setShowNewTaskModal(false)}
          onSubmit={handleAddTask}
        />
      )}
    </div>
  );
};

export default AllTasks;
