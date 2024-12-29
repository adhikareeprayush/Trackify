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
    <div className="p-4">
      <h1 className="text-3xl font-bold">{task.title}</h1>
      <p><strong>Category:</strong> {task.category}</p>
      <p><strong>Created Date:</strong> {task.createdDate}</p>
      <p><strong>Modified Date:</strong> {task.modifiedDate}</p>
      <p><strong>Due Date:</strong> {task.dueDate}</p>
      <p><strong>Time Spent:</strong> {task.timeSpent}</p>
      <div>
        <h2 className="text-2xl font-semibold mt-4">Notes:</h2>
        <div className="bg-gray-100 p-3 rounded-md">
          <pre>{task.notes}</pre>
        </div>
      </div>
    </div>
  );
};

export default Task;
