import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

const Task = () => {
  const { id } = useParams<{ id: string }>();
  interface TaskType {
    id: string;
    title: string;
    category: string;
    createdOn: string;
    modifiedDate: string;
    dueDate: string;
    timeSpent: string;
    notes: string;
  }

  const [coverImg, setCoverImg] = useState<string>(
    "https://images.unsplash.com/photo-1731432245362-26f9c0f1ba2f?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  );

  const changeCover = () => {
    const newCover = prompt("Enter new cover image URL");
    if (newCover) {
      setCoverImg(newCover);
    }
  };

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
        <div className="w-full h-[320px] bg-red-500 relative">
          <img src={coverImg} alt="" className="w-full h-full object-cover" />
          <button
            className="absolute top-4 right-4 bg-slate-100 text-slate-400 px-2 py-1 rounded-md"
            onClick={() => changeCover()}
          >
            Change Cover
          </button>
        </div>
        <div className="flex flex-col w-full p-4">
          <h3 className="text-2xl ">{task.title}</h3>
          <span className="border-[1px] bg-slate-100 border-slate-200 rounded-md px-2 cursor-pointer w-fit">
            {task.createdOn}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Task;
