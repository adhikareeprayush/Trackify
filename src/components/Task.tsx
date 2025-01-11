import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Clock, Calendar, Tag, Timer, Trash2 } from "lucide-react";
import { taskStore, type Task as TaskType } from "../utils/taskStore";

const Task = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [task, setTask] = useState<TaskType | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedTask, setEditedTask] = useState<Partial<TaskType>>({});

  useEffect(() => {
    if (id) {
      const foundTask = taskStore.getTaskById(id);
      if (foundTask) {
        setTask(foundTask);
        setEditedTask(foundTask);
      }
    }
  }, [id]);

  const handleSave = () => {
    if (id && editedTask) {
      const updated = taskStore.updateTask(id, editedTask);
      if (updated) {
        setTask(updated);
        setIsEditing(false);
      }
    }
  };

  const handleDelete = () => {
    if (id && window.confirm('Are you sure you want to delete this task?')) {
      taskStore.deleteTask(id);
      navigate('/');
    }
  };

  if (!task) {
    return <div className="ml-[300px] p-8">Loading...</div>;
  }

  return (
    <div className="min-h-screen flex flex-col ml-[300px] bg-slate-50 p-8">
      <div className="bg-white rounded-lg shadow-sm border border-slate-200">
        <div className="p-6 border-b border-slate-200">
          {isEditing ? (
            <div className="flex flex-col gap-4">
              <input
                type="text"
                value={editedTask.title || ''}
                onChange={(e) => setEditedTask({ ...editedTask, title: e.target.value })}
                className="text-2xl font-semibold p-2 border rounded"
              />
              <div className="flex gap-2">
                <button
                  onClick={handleSave}
                  className="bg-violet-600 text-white px-4 py-2 rounded-lg"
                >
                  Save
                </button>
                <button
                  onClick={() => setIsEditing(false)}
                  className="bg-slate-200 px-4 py-2 rounded-lg"
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <div className="flex justify-between items-center">
              <h1 className="text-2xl font-semibold">{task.title}</h1>
              <div className="flex gap-2">
                <button
                  onClick={() => setIsEditing(true)}
                  className="bg-violet-600 text-white px-4 py-2 rounded-lg"
                >
                  Edit
                </button>
                <button
                  onClick={handleDelete}
                  className="bg-red-100 text-red-600 p-2 rounded-lg hover:bg-red-200"
                >
                  <Trash2 size={20} />
                </button>
              </div>
            </div>
          )}
        </div>

        <div className="p-6 grid grid-cols-2 gap-6">
          <div className="flex items-center gap-3">
            <Calendar className="text-violet-600" />
            <div>
              <p className="text-sm text-slate-500">Due Date</p>
              <p>{new Date(task.dueDate).toLocaleDateString()}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Clock className="text-violet-600" />
            <div>
              <p className="text-sm text-slate-500">Created On</p>
              <p>{new Date(task.createdOn).toLocaleDateString()}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Tag className="text-violet-600" />
            <div>
              <p className="text-sm text-slate-500">Category</p>
              <p>{task.category}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Timer className="text-violet-600" />
            <div>
              <p className="text-sm text-slate-500">Time Spent</p>
              <p>{task.hoursSpent}</p>
            </div>
          </div>
        </div>

        <div className="p-6 border-t border-slate-200">
          <h2 className="font-semibold mb-4">Notes</h2>
          {isEditing ? (
            <textarea
              value={editedTask.notes || ''}
              onChange={(e) => setEditedTask({ ...editedTask, notes: e.target.value })}
              className="w-full h-48 p-3 border rounded"
            />
          ) : (
            <div className="prose max-w-none">
              {task.notes.split('\n').map((line, i) => (
                <p key={i}>{line}</p>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Task;