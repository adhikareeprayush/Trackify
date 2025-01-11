import { BrowserRouter, Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Home from "./components/Home";
import AllTasks from "./components/AllTasks";
import Task from "./components/Task";
import Settings from "./components/Settings";

const App = () => {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-white flex">
        <Sidebar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/tasks" element={<AllTasks />} />
          <Route path="/task/:id" element={<Task />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;
