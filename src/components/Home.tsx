import Card from "./Card";
import { useState, useEffect } from "react";
import { getFormattedDate } from "../utils/utils";

const Home = () => {
  const [date] = useState<Date>(new Date());
  interface Task {
    id: string;
    title: string;
    dueDate: string;
    createdOn: string;
    hoursSpent: number;
  }

  const [tasks, setTasks] = useState<Task[]>([]);
  const [formattedDate] = useState<string>(getFormattedDate(date));
  useEffect(() => {
    const fetchTasks = async () => {
      const response = await fetch("../../tasks.json"); // Update with actual path
      const data = await response.json();
      setTasks(data);
    };

    fetchTasks();
  }, []);


  return (
    <div className="ml-[300px] flex flex-col gap-10 flex-1 min-h-screen bg-slate-100 p-4">
      <div className="flex items-center justify-between w-full border-b-[1px] border-slate-200 pb-3">
        <h3 className="font-stylish text-4xl font-black">Hi, Prayush 👋</h3>
        <p>{formattedDate}</p>
      </div>
      <div className="flex items-center w-full flex-col gap-4">
        <div className="flex items-center w-full justify-between">
          <h4 className="text-2xl font-regular">
            Ongoing Tasks <span className="text-violet-600">({tasks.length})</span>
          </h4>
          <button className="text-lg text-violet-600 px-4 py-2 rounded-md">View all</button>
        </div>
        <div className="flex items-center gap-2 flex-wrap w-full">
          {tasks.map((task) => (
            <Card key={task.id} {...task} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
