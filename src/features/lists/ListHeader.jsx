import { FaUserCircle } from "react-icons/fa";
export default function ListHeader({ activeList }) {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-4">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-semibold">
            {activeList ? activeList.name : "یک لیست انتخاب کنید"}
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            {activeList
              ? "مدیریت وظایف، اولویت‌ها و وضعیت انجام."
              : "از ستون سمت چپ یک لیست انتخاب یا ایجاد کنید."}
          </p>
        </div>

        <div className="ml-5">
          <FaUserCircle  size={'30px'}/>
        </div>
      </div>
    </div>
  );
}
