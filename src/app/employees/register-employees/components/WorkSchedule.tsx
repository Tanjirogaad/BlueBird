import {
  FaClock,
  FaCalendarCheck,
  FaUmbrellaBeach,
  FaHeartbeat,
  FaSun,
  FaMoon,
} from "react-icons/fa";

export default function WorkSchedule({
  data,
  onChange,
  onTimeOffChange,
}: {
  data: any;
  onChange: (e: any, field?: any) => void;
  onTimeOffChange: (dayId: any) => void;
}) {
  const weekDays = [
    {
      label: "السبت",
      color:
        "bg-blue-50 text-blue-700 peer-checked:bg-blue-600 peer-checked:text-white",
    },
    {
      label: "الأحد",
      color:
        "bg-green-50 text-green-700 peer-checked:bg-green-600 peer-checked:text-white",
    },
    {
      label: "الاثنين",
      color:
        "bg-purple-50 text-purple-700 peer-checked:bg-purple-600 peer-checked:text-white",
    },
    {
      label: "الثلاثاء",
      color:
        "bg-yellow-50 text-yellow-700 peer-checked:bg-yellow-500 peer-checked:text-white",
    },
    {
      label: "الأربعاء",
      color:
        "bg-pink-50 text-pink-700 peer-checked:bg-pink-600 peer-checked:text-white",
    },
    {
      label: "الخميس",
      color:
        "bg-indigo-50 text-indigo-700 peer-checked:bg-indigo-600 peer-checked:text-white",
    },
    {
      label: "الجمعة",
      color:
        "bg-red-50 text-red-700 peer-checked:bg-red-600 peer-checked:text-white",
    },
  ];

  // دالة للتحقق إذا كان اليوم مختاراً
  const isDaySelected = (dayId: string) => {
    return data.TimeOff.includes(dayId);
  };

  return (
    <div className="group overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-xl shadow-gray-200/50 transition-all hover:shadow-2xl hover:shadow-teal-500/5 mt-6">
      {/* Header Section */}
      <div className="relative border-b border-gray-100 p-8">
        <div className="absolute top-0 right-0 -mt-8 -mr-8 h-32 w-32 rounded-full bg-teal-50/50 blur-3xl"></div>
        <div className="relative flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-teal-500 text-white shadow-lg shadow-teal-500/30 ring-4 ring-teal-50 transition-transform group-hover:scale-105">
            <FaCalendarCheck className="text-xl" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-900">
              جدول العمل والإجازات
            </h2>
            <p className="mt-1 text-sm font-medium text-gray-500">
              تحديد ساعات العمل وأيام الإجازات
            </p>
          </div>
        </div>
      </div>

      {/* Form Content */}
      <div className="p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Start Time */}
          <div className="space-y-3">
            <label className="text-sm font-bold text-gray-700">
              بداية العمل
            </label>
            <div className="relative">
              <input
                type="time"
                value={data.StartTime}
                onChange={(e) => onChange(e, "StartTime")}
                className="peer w-full rounded-xl border-transparent bg-gray-50 px-4 py-3.5 pl-10 text-gray-700 outline-none ring-1 ring-gray-200 transition-all focus:bg-white focus:ring-4 focus:ring-teal-500/10"
              />
              <FaSun className="absolute left-3 top-1/2 -translate-y-1/2 text-amber-500 transition-colors" />
            </div>
          </div>

          {/* End Time */}
          <div className="space-y-3">
            <label className="text-sm font-bold text-gray-700">
              نهاية العمل
            </label>
            <div className="relative">
              <input
                type="time"
                value={data.EndTime}
                onChange={(e) => onChange(e, "EndTime")}
                className="peer w-full rounded-xl border-transparent bg-gray-50 px-4 py-3.5 pl-10 text-gray-700 outline-none ring-1 ring-gray-200 transition-all focus:bg-white focus:ring-4 focus:ring-teal-500/10"
              />
              <FaMoon className="absolute left-3 top-1/2 -translate-y-1/2 text-indigo-500 transition-colors" />
            </div>
          </div>

          {/* Work Days - Full Width */}
          <div className="col-span-1 md:col-span-2 space-y-4">
            <div className="flex items-center justify-between">
              <label className="text-sm font-bold text-gray-700">
                أيام الاجازة
              </label>
              <div className="text-sm text-gray-500">
                {data.TimeOff.length > 0 ? (
                  <span className="font-medium text-teal-600">
                    {data.TimeOff.length} يوم مختار
                  </span>
                ) : (
                  <span>لم يتم اختيار أيام</span>
                )}
              </div>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-7 gap-3">
              {weekDays.map((day, index) => (
                <div key={index} className="relative">
                  <input
                    type="checkbox"
                    name="weekDays"
                    id={day.label}
                    checked={isDaySelected(day.label)}
                    onChange={() => onTimeOffChange(day.label)}
                    className="peer hidden"
                  />
                  <label
                    htmlFor={day.label}
                    className={`flex cursor-pointer flex-col items-center justify-center rounded-2xl p-4 transition-all hover:scale-105 active:scale-95 ${day.color} ring-1 ring-transparent peer-checked:shadow-lg peer-checked:ring-offset-2`}
                  >
                    <span className="text-sm font-bold">{day.label}</span>
                  </label>
                </div>
              ))}
            </div>
          </div>

          {/* Annual Leave */}
          <div className="space-y-3">
            <label className="text-sm font-bold text-gray-700">
              الإجازات السنوية
            </label>
            <div className="relative">
              <input
                type="text"
                placeholder="عدد أيام الإجازة السنوية"
                value={data.AnnualLeave}
                onChange={(e) => onChange(e, "AnnualLeave")}
                className="peer w-full rounded-xl border-transparent bg-gray-50 px-4 py-3.5 pl-10 text-gray-700 outline-none ring-1 ring-gray-200 transition-all focus:bg-white focus:ring-4 focus:ring-teal-500/10"
              />
              <FaUmbrellaBeach className="absolute left-3 top-1/2 -translate-y-1/2 text-teal-400 transition-colors peer-focus:text-teal-600" />
            </div>
          </div>

          {/* Sick Leave */}
          <div className="space-y-3">
            <label className="text-sm font-bold text-gray-700">
              الإجازات المرضية
            </label>
            <div className="relative">
              <input
                type="text"
                placeholder="عدد أيام الإجازة المرضية"
                value={data.SickLeave}
                onChange={(e) => onChange(e, "SickLeave")}
                className="peer w-full rounded-xl border-transparent bg-gray-50 px-4 py-3.5 pl-10 text-gray-700 outline-none ring-1 ring-gray-200 transition-all focus:bg-white focus:ring-4 focus:ring-teal-500/10"
              />
              <FaHeartbeat className="absolute left-3 top-1/2 -translate-y-1/2 text-red-400 transition-colors peer-focus:text-red-600" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
