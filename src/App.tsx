import Sidebar from "./components/Sidebar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Task from "./components/Task";

const App: React.FC = () => {


  return (
    <BrowserRouter>
      <div className="min-h-screen bg-white flex items-center justify-center w-full">
        <Sidebar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/task/:id" element={<Task />} />
      </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;
