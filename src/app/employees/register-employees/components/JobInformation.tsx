import {
  FaUserTie,
  FaBuilding,
  FaBriefcase,
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaUserCheck,
  FaUserFriends,
  FaPlus,
  FaTrash,
} from "react-icons/fa";
import { DEPARTMENTS, EMPLOYEE_STATUS } from "@/data";

export default function JobInformation({
  data,
  onChange,
  onAddDirectManager,
  onRemoveDirectManager,
  onDirectManagerChange,
}: {
  data: any;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
    field?: any
  ) => void;
  onAddDirectManager: () => void;
  onRemoveDirectManager: (index: number) => void;
  onDirectManagerChange: (index: number, value: string) => void;
}) {
  return (
    <div className="group overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-xl shadow-gray-200/50 transition-all hover:shadow-2xl hover:shadow-amber-500/5 mt-6">
      {/* Header Section */}
      <div className="relative border-b border-gray-100 p-8">
        <div className="absolute top-0 right-0 -mt-8 -mr-8 h-32 w-32 rounded-full bg-amber-50/50 blur-3xl"></div>
        <div className="relative flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-500 text-white shadow-lg shadow-amber-500/30 ring-4 ring-amber-50 transition-transform group-hover:scale-105">
            <FaUserTie className="text-xl" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-900">معلومات الوظيفة</h2>
            <p className="mt-1 text-sm font-medium text-gray-500">
              التفاصيل الوظيفية والإدارية
            </p>
          </div>
        </div>
      </div>

      {/* Form Content */}
      <div className="p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Employee Code */}
          <div className="space-y-3">
            <label className="text-sm font-bold text-gray-700">
              كود الموظف
            </label>
            <div className="relative">
              <input
                type="text"
                placeholder="أدخل كود الموظف"
                value={data.EmployeeCode}
                onChange={(e) => onChange(e, "EmployeeCode")}
                className="peer w-full rounded-xl border-transparent bg-gray-50 px-4 py-3.5 pl-10 text-gray-700 outline-none ring-1 ring-gray-200 transition-all focus:bg-white focus:ring-4 focus:ring-amber-500/10"
              />
              <FaUserTie className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 transition-colors peer-focus:text-amber-500" />
            </div>
          </div>

          {/* Department */}
          <div className="space-y-3">
            <label className="text-sm font-bold text-gray-700">
              القسم / الإدارة
            </label>
            <div className="relative">
              <select
                value={data.Department}
                onChange={(e) => onChange(e, "Department")}
                className="peer w-full appearance-none rounded-xl border-transparent bg-gray-50 px-4 py-3.5 pl-10 text-gray-700 outline-none ring-1 ring-gray-200 transition-all focus:bg-white focus:ring-4 focus:ring-amber-500/10"
              >
                <option value="">اختر القسم</option>
                {DEPARTMENTS.map((department, index) => (
                  <option key={index} value={department}>
                    {department}
                  </option>
                ))}
              </select>
              <FaBuilding className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 transition-colors peer-focus:text-amber-500" />
            </div>
          </div>

          {/* Job Title */}
          <div className="space-y-3">
            <label className="text-sm font-bold text-gray-700">
              المسمى الوظيفي
            </label>
            <div className="relative">
              <input
                type="text"
                placeholder="أدخل المسمى الوظيفي"
                value={data.JobTitle}
                onChange={(e) => onChange(e, "JobTitle")}
                className="peer w-full rounded-xl border-transparent bg-gray-50 px-4 py-3.5 pl-10 text-gray-700 outline-none ring-1 ring-gray-200 transition-all focus:bg-white focus:ring-4 focus:ring-amber-500/10"
              />
              <FaBriefcase className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 transition-colors peer-focus:text-amber-500" />
            </div>
          </div>

          {/* Work Location */}
          <div className="space-y-3">
            <label className="text-sm font-bold text-gray-700">
              موقع العمل
            </label>
            <div className="relative">
              <input
                type="text"
                placeholder="أدخل موقع العمل"
                value={data.WorkLocation}
                onChange={(e) => onChange(e, "WorkLocation")}
                className="peer w-full rounded-xl border-transparent bg-gray-50 px-4 py-3.5 pl-10 text-gray-700 outline-none ring-1 ring-gray-200 transition-all focus:bg-white focus:ring-4 focus:ring-amber-500/10"
              />
              <FaMapMarkerAlt className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 transition-colors peer-focus:text-amber-500" />
            </div>
          </div>

          {/* Employment Date */}
          <div className="space-y-3">
            <label className="text-sm font-bold text-gray-700">
              تاريخ التوظيف
            </label>
            <div className="relative">
              <input
                type="date"
                value={data.HiringDate}
                onChange={(e) => onChange(e, "HiringDate")}
                className="peer w-full rounded-xl border-transparent bg-gray-50 px-4 py-3.5 pl-10 text-gray-700 outline-none ring-1 ring-gray-200 transition-all focus:bg-white focus:ring-4 focus:ring-amber-500/10"
              />
              <FaCalendarAlt className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 transition-colors peer-focus:text-amber-500" />
            </div>
          </div>

          {/* Employee Status */}
          <div className="space-y-3">
            <label className="text-sm font-bold text-gray-700">
              حالة الموظف
            </label>
            <div className="relative">
              <select
                value={data.EmploymentStatus}
                onChange={(e) => onChange(e, "EmploymentStatus")}
                className="peer w-full appearance-none rounded-xl border-transparent bg-gray-50 px-4 py-3.5 pl-10 text-gray-700 outline-none ring-1 ring-gray-200 transition-all focus:bg-white focus:ring-4 focus:ring-amber-500/10"
              >
                <option value="">اختر الحالة</option>
                {EMPLOYEE_STATUS.map((status, index) => (
                  <option key={index} value={status}>
                    {status}
                  </option>
                ))}
              </select>
              <FaUserCheck className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 transition-colors peer-focus:text-amber-500" />
            </div>
          </div>

          {/* Direct Managers (Full Width) */}
          <div className="col-span-1 md:col-span-2 space-y-6">
            <div className="flex items-center justify-between">
              <label className="text-sm font-bold text-gray-700">
                المديرين المباشرين
              </label>
              <button
                type="button"
                onClick={onAddDirectManager}
                className="flex items-center gap-2 px-4 py-2 bg-amber-50 text-amber-600 rounded-xl hover:bg-amber-100 transition-colors font-medium"
              >
                <FaPlus className="text-sm" />
                <span>إضافة مدير</span>
              </button>
            </div>

            <div className="space-y-4">
              {data.DirectManagers.map((manager: string, index: number) => (
                <div key={index} className="flex items-center gap-3">
                  <div className="relative flex-1">
                    <input
                      type="text"
                      placeholder="أدخل اسم المدير المباشر"
                      value={manager}
                      onChange={(e) =>
                        onDirectManagerChange(index, e.target.value)
                      }
                      className="peer w-full rounded-xl border-transparent bg-gray-50 px-4 py-3.5 pl-10 text-gray-700 outline-none ring-1 ring-gray-200 transition-all focus:bg-white focus:ring-4 focus:ring-amber-500/10"
                    />
                    <FaUserFriends className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 transition-colors peer-focus:text-amber-500" />
                  </div>
                  {data.DirectManagers.length > 1 && (
                    <button
                      type="button"
                      onClick={() => onRemoveDirectManager(index)}
                      className="p-3 bg-red-50 text-red-600 rounded-xl hover:bg-red-100 transition-colors"
                      title="حذف المدير"
                    >
                      <FaTrash className="text-sm" />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
