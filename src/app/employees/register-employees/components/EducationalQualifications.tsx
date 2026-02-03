import {
  FaGraduationCap,
  FaBook,
  FaUniversity,
  FaCalendarAlt,
} from "react-icons/fa";
import { QUALIFICATION } from "@/data";

export default function EducationalQualifications({
  data,
  onChange,
}: {
  data: any;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
    name: string
  ) => void;
}) {
  return (
    <div className="group overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-xl shadow-gray-200/50 transition-all hover:shadow-2xl hover:shadow-purple-500/5 mt-6">
      {/* Header Section */}
      <div className="relative border-b border-gray-100 p-8">
        <div className="absolute top-0 right-0 -mt-8 -mr-8 h-32 w-32 rounded-full bg-purple-50/50 blur-3xl"></div>
        <div className="relative flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-purple-600 text-white shadow-lg shadow-purple-500/30 ring-4 ring-purple-50 transition-transform group-hover:scale-105">
            <FaGraduationCap className="text-xl" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-900">
              المؤهلات التعليمية
            </h2>
            <p className="mt-1 text-sm font-medium text-gray-500">
              الدرجات العلمية والشهادات الحاصل عليها
            </p>
          </div>
        </div>
      </div>

      {/* Form Content */}
      <div className="p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Qualification Select */}
          <div className="space-y-3">
            <label className="text-sm font-bold text-gray-700">
              المؤهل العلمي
            </label>
            <div className="relative">
              <select
                className="peer w-full appearance-none rounded-xl border-transparent bg-gray-50 px-4 py-3.5 pl-10 text-gray-700 outline-none ring-1 ring-gray-200 transition-all focus:bg-white focus:ring-4 focus:ring-purple-500/10"
                required
                value={data.Qualification}
                onChange={(e) => onChange(e, "Qualification")}
              >
                <option value="">اختر المؤهل العلمي</option>
                {QUALIFICATION.map((qualification, index) => (
                  <option key={index} value={qualification}>
                    {qualification}
                  </option>
                ))}
              </select>
              <FaGraduationCap className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 transition-colors peer-focus:text-purple-600" />
            </div>
          </div>

          {/* Specialization */}
          <div className="space-y-3">
            <label className="text-sm font-bold text-gray-700">التخصص</label>
            <div className="relative">
              <input
                type="text"
                placeholder="أدخل التخصص الدراسي"
                required
                value={data.Specialization}
                onChange={(e) => onChange(e, "Specialization")}
                className="peer w-full rounded-xl border-transparent bg-gray-50 px-4 py-3.5 pl-10 text-gray-700 outline-none ring-1 ring-gray-200 transition-all focus:bg-white focus:ring-4 focus:ring-purple-500/10"
              />
              <FaBook className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 transition-colors peer-focus:text-purple-600" />
            </div>
          </div>

          {/* University */}
          <div className="space-y-3">
            <label className="text-sm font-bold text-gray-700">
              الجامعة / المؤسسة التعليمية
            </label>
            <div className="relative">
              <input
                type="text"
                placeholder="أدخل اسم الجامعة أو المؤسسة"
                value={data.University}
                onChange={(e) => onChange(e, "University")}
                className="peer w-full rounded-xl border-transparent bg-gray-50 px-4 py-3.5 pl-10 text-gray-700 outline-none ring-1 ring-gray-200 transition-all focus:bg-white focus:ring-4 focus:ring-purple-500/10"
              />
              <FaUniversity className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 transition-colors peer-focus:text-purple-600" />
            </div>
          </div>

          {/* Graduation Year */}
          <div className="space-y-3">
            <label className="text-sm font-bold text-gray-700">
              سنة التخرج
            </label>
            <div className="relative">
              <input
                type="text"
                placeholder="أدخل سنة التخرج"
                onChange={(e) => onChange(e, "GraduationYear")}
                value={data.GraduationYear}
                className="peer w-full rounded-xl border-transparent bg-gray-50 px-4 py-3.5 pl-10 text-gray-700 outline-none ring-1 ring-gray-200 transition-all focus:bg-white focus:ring-4 focus:ring-purple-500/10"
              />
              <FaCalendarAlt className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 transition-colors peer-focus:text-purple-600" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
