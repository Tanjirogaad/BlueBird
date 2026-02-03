import {
  FaUser,
  FaIdCard,
  FaVenusMars,
  FaGlobe,
  FaHeart,
  FaCamera,
  FaUpload,
} from "react-icons/fa";
import { MARITAL_STATUS } from "@/data";

export default function PersonalInformation({
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
    <div className="group overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-xl shadow-gray-200/50 transition-all hover:shadow-2xl hover:shadow-blue-500/5">
      {/* Header Section */}
      <div className="relative border-b border-gray-100 p-8">
        <div className="absolute top-0 right-0 -mt-8 -mr-8 h-32 w-32 rounded-full bg-blue-50/50 blur-3xl"></div>
        <div className="relative flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-600 text-white shadow-lg shadow-blue-500/30 ring-4 ring-blue-50 transition-transform group-hover:scale-105">
            <FaUser className="text-xl" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-900">
              المعلومات الشخصية
            </h2>
            <p className="mt-1 text-sm font-medium text-gray-500">
              البيانات الأساسية للتعريف بالموظف
            </p>
          </div>
        </div>
      </div>

      {/* Form Content */}
      <div className="p-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          {/* Full Name */}
          <div className="space-y-3">
            <label className="text-sm font-bold text-gray-700">
              الاسم الكامل <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <input
                type="text"
                className="peer w-full rounded-xl border-transparent bg-gray-50 px-4 py-3.5 pl-10 text-gray-700 outline-none ring-1 ring-gray-200 transition-all focus:bg-white focus:ring-4 focus:ring-blue-500/10"
                placeholder="أدخل الاسم الرباعي"
                required
                // value={data.FullName}
                onChange={(e) => onChange(e, "FullName")}
              />
              <FaUser className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 transition-colors peer-focus:text-blue-600" />
            </div>
          </div>

          {/* National ID */}
          <div className="space-y-3">
            <label className="text-sm font-bold text-gray-700">
              رقم الهوية الوطنية <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <input
                type="text"
                className="peer w-full rounded-xl border-transparent bg-gray-50 px-4 py-3.5 pl-10 text-gray-700 outline-none ring-1 ring-gray-200 transition-all focus:bg-white focus:ring-4 focus:ring-blue-500/10"
                placeholder="رقم الهوية المكون من 14 رقم"
                required
                value={data.NationalIDNumber}
                onChange={(e) => onChange(e, "NationalIDNumber")}
              />
              <FaIdCard className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 transition-colors peer-focus:text-blue-600" />
            </div>
          </div>

          {/* Birth Date */}
          <div className="space-y-3">
            <label className="text-sm font-bold text-gray-700">
              تاريخ الميلاد <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <input
                type="date"
                className="peer w-full rounded-xl border-transparent bg-gray-50 px-4 py-3.5 text-gray-700 outline-none ring-1 ring-gray-200 transition-all focus:bg-white focus:ring-4 focus:ring-blue-500/10"
                required
                value={data.DateOfBirth}
                onChange={(e) => onChange(e, "DateOfBirth")}
              />
            </div>
          </div>

          {/* Gender */}
          <div className="space-y-3">
            <label className="text-sm font-bold text-gray-700">
              الجنس <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <select
                className="peer w-full appearance-none rounded-xl border-transparent bg-gray-50 px-4 py-3.5 pl-10 text-gray-700 outline-none ring-1 ring-gray-200 transition-all focus:bg-white focus:ring-4 focus:ring-blue-500/10"
                required
                value={data.Gender}
                onChange={(e) => onChange(e, "Gender")}
              >
                <option value="">اختر الجنس</option>
                <option value="ذكر">ذكر</option>
                <option value="أنثى">أنثى</option>
              </select>
              <FaVenusMars className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 transition-colors peer-focus:text-blue-600" />
            </div>
          </div>

          {/* Nationality */}
          <div className="space-y-3">
            <label className="text-sm font-bold text-gray-700">
              الجنسية <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <input
                type="text"
                className="peer w-full rounded-xl border-transparent bg-gray-50 px-4 py-3.5 pl-10 text-gray-700 outline-none ring-1 ring-gray-200 transition-all focus:bg-white focus:ring-4 focus:ring-blue-500/10"
                placeholder="أدخل الجنسية"
                required
                value={data.Nationality}
                onChange={(e) => onChange(e, "Nationality")}
              />
              <FaGlobe className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 transition-colors peer-focus:text-blue-600" />
            </div>
          </div>

          {/* Religion */}
          <div className="space-y-3">
            <label className="text-sm font-bold text-gray-700">الدين</label>
            <div className="relative">
              <input
                type="text"
                className="peer w-full rounded-xl border-transparent bg-gray-50 px-4 py-3.5 pl-10 text-gray-700 outline-none ring-1 ring-gray-200 transition-all focus:bg-white focus:ring-4 focus:ring-blue-500/10"
                placeholder="أدخل الديانة"
                value={data.Religion}
                onChange={(e) => onChange(e, "Religion")}
              />
              <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 transition-colors peer-focus:text-blue-600">
                ☪
              </div>
            </div>
          </div>

          {/* Marital Status */}
          <div className="space-y-3">
            <label className="text-sm font-bold text-gray-700">
              الحالة الاجتماعية
            </label>
            <div className="relative">
              <select
                className="peer w-full appearance-none rounded-xl border-transparent bg-gray-50 px-4 py-3.5 pl-10 text-gray-700 outline-none ring-1 ring-gray-200 transition-all focus:bg-white focus:ring-4 focus:ring-blue-500/10"
                value={data.MaritalStatus}
                onChange={(e) => onChange(e, "MaritalStatus")}
              >
                <option value="">اختر الحالة</option>
                {MARITAL_STATUS.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
              <FaHeart className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 transition-colors peer-focus:text-blue-600" />
            </div>
          </div>

          {/* Profile Image (Full Width) */}
          <div className="col-span-1 md:col-span-2 space-y-3">
            <label className="text-sm font-bold text-gray-700">
              الصورة الشخصية
            </label>
            <div className="group/upload relative overflow-hidden rounded-2xl border-2 border-dashed border-gray-200 bg-gray-50 p-8 text-center transition-all hover:border-blue-500 hover:bg-blue-50/50">
              <div className="flex flex-col items-center gap-4">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white shadow-sm ring-1 ring-gray-200 transition-transform group-hover/upload:scale-110">
                  <FaCamera className="text-2xl text-gray-400 group-hover/upload:text-blue-600" />
                </div>
                <div>
                  <button
                    type="button"
                    className="rounded-lg bg-gray-900 px-6 py-2.5 text-sm font-bold text-white shadow-lg shadow-gray-900/10 transition-transform hover:-translate-y-0.5 hover:shadow-gray-900/20 active:translate-y-0"
                  >
                    <span className="flex items-center gap-2">
                      <FaUpload />
                      رفع صورة جديدة
                    </span>
                  </button>
                  <p className="mt-3 text-xs font-medium text-gray-500">
                    PNG, JPG حتى 5 ميجابايت
                  </p>
                </div>
              </div>
              <input
                type="file"
                className="absolute inset-0 cursor-pointer opacity-0"
                accept="image/*"
                // value={data.PersonalPhoto} // File inputs should not have a value attribute for security reasons
                onChange={(e) => onChange(e, "PersonalPhoto")}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
