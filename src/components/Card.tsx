import { FaReact } from "react-icons/fa6";
import { IoMdTimer } from "react-icons/io";
import { Link } from "react-router-dom";

interface CardProps {
  id: string;
  title: string;
  dueDate: string;
  createdOn: string;
  hoursSpent: number;
}

const Card: React.FC<CardProps> = ({ id, title, dueDate, createdOn, hoursSpent }) => {
  return (
    <div className="flex flex-col gap-3 p-3 shadow-lg border-[0.3px] border-slate-300 rounded-md w-[400px]">
      <div className="flex items-center gap-2">
        <FaReact className="text-violet-600 text-2xl" />
        <p className="font-semibold">{title}</p>
        <Link
          to={`/task/${id}`}
          className="border-[1px] bg-slate-100 border-slate-200 rounded-md px-2 cursor-pointer"
        >
          Open
        </Link>
      </div>
      <div className="flex flex-col gap-2">
        <p className="text-sm text-slate-400">Due in {dueDate}</p>
        <div className="flex flex-col">
          <div className="flex flex-col gap-1">
            <p className="text-base">
              Created on <span className="font-regular text-violet-600">{createdOn}</span>
            </p>
            <div className="flex items-center gap-1">
              <IoMdTimer className="text-violet-600 text-base" />
              <p className="text-base">{hoursSpent} hours spent</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
