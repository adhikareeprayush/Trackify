import { useState } from "react";
import { Save, Trash2 } from "lucide-react";
import { taskStore } from "../utils/taskStore";

const Settings = () => {
  const [showConfirm, setShowConfirm] = useState(false);
  const [notification, setNotification] = useState<string | null>(null);

  const exportTasks = () => {
    const tasks = taskStore.getAllTasks();
    const blob = new Blob([JSON.stringify(tasks, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "trackify-tasks.json";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    setNotification("Tasks exported successfully!");
    setTimeout(() => setNotification(null), 3000);
  };

  const importTasks = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const tasks = JSON.parse(e.target?.result as string);
          localStorage.setItem("tasks", JSON.stringify(tasks));
          setNotification("Tasks imported successfully! Please refresh the page.");
          setTimeout(() => setNotification(null), 3000);
        } catch (error) {
          setNotification("Error importing tasks. Please check the file format.");
          setTimeout(() => setNotification(null), 3000);
        }
      };
      reader.readAsText(file);
    }
  };

  const clearAllData = () => {
    localStorage.clear();
    setShowConfirm(false);
    setNotification("All data cleared successfully! Please refresh the page.");
    setTimeout(() => setNotification(null), 3000);
  };

  return (
    <div className="ml-[300px] flex flex-col gap-6 min-h-screen bg-slate-50 p-8">
      <h1 className="text-2xl font-semibold">Settings</h1>

      <div className="bg-white rounded-lg shadow-sm p-6 flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <h2 className="text-lg font-medium">Data Management</h2>
          <p className="text-slate-600">Export or import your tasks data</p>
          
          <div className="flex gap-4 mt-2">
            <button
              onClick={exportTasks}
              className="flex items-center gap-2 bg-violet-600 text-white px-4 py-2 rounded-lg hover:bg-violet-700 transition-colors"
            >
              <Save size={20} />
              Export Tasks
            </button>
            
            <label className="flex items-center gap-2 bg-violet-100 text-violet-600 px-4 py-2 rounded-lg hover:bg-violet-200 transition-colors cursor-pointer">
              <input
                type="file"
                accept=".json"
                onChange={importTasks}
                className="hidden"
              />
              Import Tasks
            </label>
          </div>
        </div>

        <div className="border-t pt-6">
          <h2 className="text-lg font-medium text-red-600">Danger Zone</h2>
          <p className="text-slate-600 mb-4">Clear all your data (This action cannot be undone)</p>
          
          {!showConfirm ? (
            <button
              onClick={() => setShowConfirm(true)}
              className="flex items-center gap-2 bg-red-100 text-red-600 px-4 py-2 rounded-lg hover:bg-red-200 transition-colors"
            >
              <Trash2 size={20} />
              Clear All Data
            </button>
          ) : (
            <div className="flex items-center gap-4">
              <button
                onClick={clearAllData}
                className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
              >
                Confirm Clear
              </button>
              <button
                onClick={() => setShowConfirm(false)}
                className="bg-slate-200 px-4 py-2 rounded-lg hover:bg-slate-300 transition-colors"
              >
                Cancel
              </button>
            </div>
          )}
        </div>
      </div>

      {notification && (
        <div className="fixed bottom-4 right-4 bg-violet-600 text-white px-6 py-3 rounded-lg shadow-lg">
          {notification}
        </div>
      )}
    </div>
  );
};

export default Settings;