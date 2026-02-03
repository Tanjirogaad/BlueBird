import { FaUsers, FaUser, FaPhone, FaMapMarkerAlt } from "react-icons/fa";

export default function Contacts({
  data,
  onChange,
}: {
  data: any;
  onChange: (e: React.ChangeEvent<HTMLInputElement>, field: string) => void;
}) {
  return (
    <div className="group overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-xl shadow-gray-200/50 transition-all hover:shadow-2xl hover:shadow-orange-500/5 mt-6">
      {/* Header Section */}
      <div className="relative border-b border-gray-100 p-8">
        <div className="absolute top-0 right-0 -mt-8 -mr-8 h-32 w-32 rounded-full bg-orange-50/50 blur-3xl"></div>
        <div className="relative flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-orange-500 text-white shadow-lg shadow-orange-500/30 ring-4 ring-orange-50 transition-transform group-hover:scale-105">
            <FaUsers className="text-xl" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-900">
              جهات الاتصال للطوارئ
            </h2>
            <p className="mt-1 text-sm font-medium text-gray-500">
              شخص يمكن التواصل معه في الحالات الطارئة
            </p>
          </div>
        </div>
      </div>

      {/* Form Content */}
      <div className="p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Person Name */}
          <div className="space-y-3">
            <label className="text-sm font-bold text-gray-700">اسم الشخص</label>
            <div className="relative">
              <input
                type="text"
                value={data.PersonName}
                onChange={(e) => onChange(e, "PersonName")}
                placeholder="أدخل اسم الشخص"
                className="peer w-full rounded-xl border-transparent bg-gray-50 px-4 py-3.5 pl-10 text-gray-700 outline-none ring-1 ring-gray-200 transition-all focus:bg-white focus:ring-4 focus:ring-orange-500/10"
              />
              <FaUser className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 transition-colors peer-focus:text-orange-500" />
            </div>
          </div>

          {/* Relationship */}
          <div className="space-y-3">
            <label className="text-sm font-bold text-gray-700">
              صلة القرابة
            </label>
            <div className="relative">
              <input
                type="text"
                value={data.Relationship}
                onChange={(e) => onChange(e, "Relationship")}
                placeholder="أدخل صلة القرابة"
                className="peer w-full rounded-xl border-transparent bg-gray-50 px-4 py-3.5 pl-10 text-gray-700 outline-none ring-1 ring-gray-200 transition-all focus:bg-white focus:ring-4 focus:ring-orange-500/10"
              />
              <FaUsers className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 transition-colors peer-focus:text-orange-500" />
            </div>
          </div>

          {/* Phone Number */}
          <div className="space-y-3">
            <label className="text-sm font-bold text-gray-700">
              رقم الهاتف
            </label>
            <div className="relative">
              <input
                type="text"
                value={data.PhoneNumber}
                onChange={(e) => onChange(e, "PhoneNumber")}
                placeholder="أدخل رقم الهاتف"
                className="peer w-full rounded-xl border-transparent bg-gray-50 px-4 py-3.5 pl-10 text-gray-700 outline-none ring-1 ring-gray-200 transition-all focus:bg-white focus:ring-4 focus:ring-orange-500/10"
              />
              <FaPhone className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 transition-colors peer-focus:text-orange-500" />
            </div>
          </div>

          {/* Address */}
          <div className="space-y-3">
            <label className="text-sm font-bold text-gray-700">العنوان</label>
            <div className="relative">
              <input
                type="text"
                placeholder="أدخل العنوان"
                value={data.Address}
                onChange={(e) => onChange(e, "Address")}
                className="peer w-full rounded-xl border-transparent bg-gray-50 px-4 py-3.5 pl-10 text-gray-700 outline-none ring-1 ring-gray-200 transition-all focus:bg-white focus:ring-4 focus:ring-orange-500/10"
              />
              <FaMapMarkerAlt className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 transition-colors peer-focus:text-orange-500" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
