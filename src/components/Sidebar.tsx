import { Link, useLocation } from 'react-router-dom';
import { ClipboardList, Home, Settings, PlusCircle } from 'lucide-react';
import { useState } from 'react';
import NewTaskModal from './NewTaskModal';
import { taskStore } from '../utils/taskStore';

const Sidebar = () => {
  const location = useLocation();
  const [showNewTaskModal, setShowNewTaskModal] = useState(false);
  
  const menuItems = [
    { icon: <Home size={20} />, text: 'Home', path: '/' },
    { icon: <ClipboardList size={20} />, text: 'All Tasks', path: '/tasks' },
    { icon: <Settings size={20} />, text: 'Settings', path: '/settings' },
  ];

  const handleAddTask = (newTask: Omit<Task, 'id' | 'createdOn' | 'modifiedDate'>) => {
    taskStore.addTask(newTask);
    setShowNewTaskModal(false);
  };

  return (
    <div className="bg-violet-600 w-[300px] h-screen fixed top-0 left-0 shadow-lg flex flex-col text-white p-6">
      <div className="flex items-center gap-2 mb-10">
        <ClipboardList size={32} />
        <h1 className="font-stylish text-3xl">Trackify</h1>
      </div>
      
      <button 
        onClick={() => setShowNewTaskModal(true)}
        className="bg-white text-violet-600 flex items-center gap-2 py-2 px-4 rounded-lg mb-8 hover:bg-violet-50 transition-colors"
      >
        <PlusCircle size={20} />
        <span className="font-medium">New Task</span>
      </button>

      <nav className="flex flex-col gap-2">
        {menuItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`flex items-center gap-3 p-3 rounded-lg transition-colors ${
              location.pathname === item.path
                ? 'bg-violet-700'
                : 'hover:bg-violet-700/50'
            }`}
          >
            {item.icon}
            <span className="font-medium">{item.text}</span>
          </Link>
        ))}
      </nav>

      {showNewTaskModal && (
        <NewTaskModal
          onClose={() => setShowNewTaskModal(false)}
          onSubmit={handleAddTask}
        />
      )}
    </div>
  );
};

export default Sidebar;