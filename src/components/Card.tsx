import { ClipboardList, Timer, Calendar } from "lucide-react";
import { Link } from "react-router-dom";
import type { Task } from "../utils/taskStore";

type CardProps = Task;

const Card = ({ id, title, dueDate, hoursSpent, category }: CardProps) => {  return (
    <div className="flex flex-col gap-4 p-6 bg-white shadow-sm border-[0.3px] border-slate-200 rounded-lg hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <ClipboardList className="text-violet-600" size={24} />
          <div>
            <h3 className="font-semibold text-lg">{title}</h3>
            <span className="text-sm text-slate-500">{category}</span>
          </div>
        </div>
        <Link
          to={`/task/${id}`}
          className="bg-violet-50 text-violet-600 px-3 py-1 rounded-md hover:bg-violet-100 transition-colors"
        >
          Open
        </Link>
      </div>

      <div className="flex flex-col gap-3">
        <div className="flex items-center gap-2 text-slate-600">
          <Calendar size={16} />
          <p className="text-sm">Due {new Date(dueDate).toLocaleDateString()}</p>
        </div>

        <div className="flex items-center gap-2 text-slate-600">
          <Timer size={16} />
          <p className="text-sm">{hoursSpent} spent</p>
        </div>
      </div>
    </div>
  );
};

export default Card;