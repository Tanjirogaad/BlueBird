import {
  FaShieldAlt,
  FaUniversity,
  FaUser,
  FaHashtag,
  FaUpload,
  FaMoneyBillWave,
} from "react-icons/fa";
import { BANKS } from "@/data";

export default function Accounts({
  data,
  onChange,
}: {
  data: any;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
    field: string,
    subField?: string
  ) => void;
}) {
  return (
    <div className="group overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-xl shadow-gray-200/50 transition-all hover:shadow-2xl hover:shadow-emerald-500/5 mt-6">
      {/* Header Section */}
      <div className="relative border-b border-gray-100 p-8">
        <div className="absolute top-0 right-0 -mt-8 -mr-8 h-32 w-32 rounded-full bg-emerald-50/50 blur-3xl"></div>
        <div className="relative flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-500 text-white shadow-lg shadow-emerald-500/30 ring-4 ring-emerald-50 transition-transform group-hover:scale-105">
            <FaMoneyBillWave className="text-xl" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-900">
              المعلومات المالية والحسابات
            </h2>
            <p className="mt-1 text-sm font-medium text-gray-500">
              بيانات الحساب البنكي والراتب
            </p>
          </div>
        </div>
      </div>

      {/* Form Content */}
      <div className="p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Social Security Number */}
          <div className="space-y-3">
            <label className="text-sm font-bold text-gray-700">
              رقم التأمينات الاجتماعية
            </label>
            <div className="relative">
              <input
                type="text"
                placeholder="أدخل رقم التأمينات"
                value={data.SocialInsuranceNumber}
                onChange={(e) => onChange(e, "SocialInsuranceNumber")}
                className="peer w-full rounded-xl border-transparent bg-gray-50 px-4 py-3.5 pl-10 text-gray-700 outline-none ring-1 ring-gray-200 transition-all focus:bg-white focus:ring-4 focus:ring-emerald-500/10"
              />
              <FaShieldAlt className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 transition-colors peer-focus:text-emerald-600" />
            </div>
          </div>

          {/* Bank Select */}
          <div className="space-y-3">
            <label className="text-sm font-bold text-gray-700">اسم البنك</label>
            <div className="relative">
              <select
                className="peer w-full appearance-none rounded-xl border-transparent bg-gray-50 px-4 py-3.5 pl-10 text-gray-700 outline-none ring-1 ring-gray-200 transition-all focus:bg-white focus:ring-4 focus:ring-emerald-500/10"
                value={data.BankName}
                onChange={(e) => onChange(e, "BankName")}
              >
                <option value="">اختر البنك</option>
                {BANKS.map((bank, index) => (
                  <option key={index} value={bank}>
                    {bank}
                  </option>
                ))}
              </select>
              <FaUniversity className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 transition-colors peer-focus:text-emerald-600" />
            </div>
          </div>

          {/* Account Holder Name */}
          <div className="space-y-3">
            <label className="text-sm font-bold text-gray-700">
              اسم صاحب الحساب
            </label>
            <div className="relative">
              <input
                type="text"
                placeholder="أدخل اسم صاحب الحساب"
                value={data.AccountHolderName}
                onChange={(e) => onChange(e, "AccountHolderName")}
                className="peer w-full rounded-xl border-transparent bg-gray-50 px-4 py-3.5 pl-10 text-gray-700 outline-none ring-1 ring-gray-200 transition-all focus:bg-white focus:ring-4 focus:ring-emerald-500/10"
              />
              <FaUser className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 transition-colors peer-focus:text-emerald-600" />
            </div>
          </div>

          {/* Bank Account Number */}
          <div className="space-y-3">
            <label className="text-sm font-bold text-gray-700">
              رقم الحساب البنكي
            </label>
            <div className="relative">
              <input
                type="text"
                placeholder="أدخل رقم الحساب البنكي"
                value={data.BankAccountNumber}
                onChange={(e) => onChange(e, "BankAccountNumber")}
                className="peer w-full rounded-xl border-transparent bg-gray-50 px-4 py-3.5 pl-10 text-gray-700 outline-none ring-1 ring-gray-200 transition-all focus:bg-white focus:ring-4 focus:ring-emerald-500/10"
              />
              <FaHashtag className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 transition-colors peer-focus:text-emerald-600" />
            </div>
          </div>

          {/* File Upload (Full Width) */}
          <div className="col-span-1 md:col-span-2 space-y-3">
            <label className="text-sm font-bold text-gray-700">
              المرفقات والمستندات
            </label>
            <div className="group/upload relative overflow-hidden rounded-2xl border-2 border-dashed border-gray-200 bg-gray-50 p-8 text-center transition-all hover:border-emerald-500 hover:bg-emerald-50/50">
              <div className="flex flex-col items-center gap-4">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white shadow-sm ring-1 ring-gray-200 transition-transform group-hover/upload:scale-110">
                  <FaUpload className="text-2xl text-gray-400 group-hover/upload:text-emerald-600" />
                </div>
                <div>
                  <button
                    type="button"
                    className="rounded-lg bg-gray-900 px-6 py-2.5 text-sm font-bold text-white shadow-lg shadow-gray-900/10 transition-transform hover:-translate-y-0.5 hover:shadow-gray-900/20 active:translate-y-0"
                  >
                    <span className="flex items-center gap-2">
                      <FaUpload />
                      رفع مستندات
                    </span>
                  </button>
                  <p className="mt-3 text-xs font-medium text-gray-500">
                    PDF, JPG, PNG حتى 10 ميجابايت
                  </p>
                </div>
              </div>
              <input
                type="file"
                className="absolute inset-0 cursor-pointer opacity-0"
                accept=".pdf,.jpg,.jpeg,.png"
                onChange={(e) => onChange(e, "Documents")}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
