import { useState, useEffect } from "react";
import { Plus } from "lucide-react";
import Card from "./Card";
import { getFormattedDate } from "../utils/utils";
import { taskStore, type Task } from "../utils/taskStore";
import NewTaskModal from "./NewTaskModal";

const Home = () => {
  const [date] = useState<Date>(new Date());
  const [tasks, setTasks] = useState<Task[]>([]);
  const [formattedDate] = useState<string>(getFormattedDate(date));
  const [showNewTaskModal, setShowNewTaskModal] = useState(false);

  useEffect(() => {
    setTasks(taskStore.getAllTasks());
  }, []);

  const handleAddTask = (newTask: Omit<Task, 'id' | 'createdOn' | 'modifiedDate'>) => {
    taskStore.addTask(newTask);
    setTasks(taskStore.getAllTasks());
  };

  const ongoingTasks = tasks.filter((task) => task.status === "Ongoing");

  return (
    <div className="ml-[300px] flex flex-col gap-10 flex-1 min-h-screen bg-slate-50 p-8">
      <div className="flex items-center justify-between w-full border-b-[1px] border-slate-200 pb-6">
        <h3 className="font-stylish text-4xl font-black">Hi, Welcome Back 👋</h3>
        <p className="text-slate-600">{formattedDate}</p>
      </div>

      <div className="flex items-center w-full flex-col gap-6">
        <div className="flex items-center w-full justify-between">
          <h4 className="text-2xl font-medium">
            Ongoing Tasks{" "}
            <span className="text-violet-600">({ongoingTasks.length})</span>
          </h4>
          <button 
            onClick={() => setShowNewTaskModal(true)}
            className="flex items-center gap-2 bg-violet-600 text-white px-4 py-2 rounded-lg hover:bg-violet-700 transition-colors"
          >
            <Plus size={20} />
            <span>Add New Task</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
          {ongoingTasks.map((task) => (
            <Card key={task.id} {...task} />
          ))}
        </div>
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

export default Home;