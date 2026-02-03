import { FaEnvelope, FaLock } from "react-icons/fa";

export default function Account({
  data,
  onChange,
}: {
  data: any;
  onChange: (e: React.ChangeEvent<HTMLInputElement>, field: string) => void;
}) {
  return (
    <div className="group overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-xl shadow-gray-200/50 transition-all hover:shadow-2xl hover:shadow-cyan-500/5 mt-6">
      {/* Header Section */}
      <div className="relative border-b border-gray-100 p-8">
        <div className="absolute top-0 right-0 -mt-8 -mr-8 h-32 w-32 rounded-full bg-cyan-50/50 blur-3xl"></div>
        <div className="relative flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-cyan-500 text-white shadow-lg shadow-cyan-500/30 ring-4 ring-cyan-50 transition-transform group-hover:scale-105">
            <FaLock className="text-xl" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-900">
              معلومات حساب المستخدم
            </h2>
            <p className="mt-1 text-sm font-medium text-gray-500">
              بيانات الدخول للنظام والصلاحيات
            </p>
          </div>
        </div>
      </div>

      {/* Form Content */}
      <div className="p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Email */}
          <div className="space-y-3">
            <label className="text-sm font-bold text-gray-700">
              البريد الإلكتروني
            </label>
            <div className="relative">
              <input
                type="email"
                placeholder="أدخل البريد الإلكتروني"
                value={data.email}
                onChange={(e) => onChange(e, "email")}
                className="peer w-full rounded-xl border-transparent bg-gray-50 px-4 py-3.5 pl-10 text-gray-700 outline-none ring-1 ring-gray-200 transition-all focus:bg-white focus:ring-4 focus:ring-cyan-500/10"
              />
              <FaEnvelope className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 transition-colors peer-focus:text-cyan-500" />
            </div>
          </div>

          {/* Password */}
          <div className="space-y-3">
            <label className="text-sm font-bold text-gray-700">
              كلمة المرور
            </label>
            <div className="relative">
              <input
                type="password"
                placeholder="أدخل كلمة المرور"
                value={data.password}
                onChange={(e) => onChange(e, "password")}
                className="peer w-full rounded-xl border-transparent bg-gray-50 px-4 py-3.5 pl-10 text-gray-700 outline-none ring-1 ring-gray-200 transition-all focus:bg-white focus:ring-4 focus:ring-cyan-500/10"
              />
              <FaLock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 transition-colors peer-focus:text-cyan-500" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
