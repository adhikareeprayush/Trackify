import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

const Task = () => {
  const { id } = useParams<{ id: string }>();
  interface TaskType {
    id: string;
    title: string;
    category: string;
    createdDate: string;
    modifiedDate: string;
    dueDate: string;
    timeSpent: string;
    notes: string;
  }
  
  const [task, setTask] = useState<TaskType | null>(null);

  useEffect(() => {
    const fetchTask = async () => {
      const response = await fetch("../../tasks.json"); // Update with actual path
      const data = await response.json();
      const foundTask = data.find((t: any) => t.id === id);
      setTask(foundTask);
    };

    fetchTask();
  }, [id]);

  if (!task) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen flex flex-col items-start justify-start ml-[300px] flex-1">
      <div className="flex flex-col border-b-[1px] border-slate-200 w-full pb-3">
        <div className="w-full h-[320px] bg-red-500">
          <img src="https://images.unsplash.com/photo-1731432245362-26f9c0f1ba2f?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" className="w-full h-full object-cover" />
        </div>
        <div className="flex flex-col w-full p-4">
        <h3 className="text-2xl ">
          {task.title}
        </h3>
        </div>
      </div>
    </div>
  );
};

export default Task;
