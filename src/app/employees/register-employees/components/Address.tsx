import {
  FaMapMarkerAlt,
  FaBuilding,
  FaRoad,
  FaPhone,
  FaCity,
  FaPlus,
  FaTrash,
} from "react-icons/fa";
import { GOVERNORATES, AREAS_BY_GOVERNORATE } from "@/data";

export default function Address({
  data,
  onChange,
  onAddPhoneNumber,
  onRemovePhoneNumber,
  onPhoneNumberChange,
}: {
  data: any;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
    name: string,
    field?: string
  ) => void;
  onAddPhoneNumber: () => void;
  onRemovePhoneNumber: (index: number) => void;
  onPhoneNumberChange: (index: number, value: string) => void;
}) {
  return (
    <div className="group overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-xl shadow-gray-200/50 transition-all hover:shadow-2xl hover:shadow-green-500/5 mt-6">
      {/* Header Section */}
      <div className="relative border-b border-gray-100 p-8">
        <div className="absolute top-0 right-0 -mt-8 -mr-8 h-32 w-32 rounded-full bg-green-50/50 blur-3xl"></div>
        <div className="relative flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-green-600 text-white shadow-lg shadow-green-500/30 ring-4 ring-green-50 transition-transform group-hover:scale-105">
            <FaMapMarkerAlt className="text-xl" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-900">
              بيانات التواصل والعنوان
            </h2>
            <p className="mt-1 text-sm font-medium text-gray-500">
              عنوان السكن والمقاطعة التابع لها
            </p>
          </div>
        </div>
      </div>

      {/* Form Content */}
      <div className="p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Governorate Select */}
          <div className="space-y-3">
            <label className="text-sm font-bold text-gray-700">المحافظة</label>
            <div className="relative">
              <select
                className="peer w-full appearance-none rounded-xl border-transparent bg-gray-50 px-4 py-3.5 pl-10 text-gray-700 outline-none ring-1 ring-gray-200 transition-all focus:bg-white focus:ring-4 focus:ring-green-500/10"
                value={data.Governorate}
                onChange={(e) => onChange(e, "Governorate")}
              >
                <option value="">اختر المحافظة</option>
                {GOVERNORATES.map((governorate, index) => (
                  <option key={index} value={governorate}>
                    {governorate}
                  </option>
                ))}
              </select>
              <FaCity className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 transition-colors peer-focus:text-green-600" />
            </div>
          </div>

          {/* Area Select */}
          <div className="space-y-3">
            <label className="text-sm font-bold text-gray-700">
              المنطقة / الحي
            </label>
            <div className="relative">
              <select
                className="peer w-full appearance-none rounded-xl border-transparent bg-gray-50 px-4 py-3.5 pl-10 text-gray-700 outline-none ring-1 ring-gray-200 transition-all focus:bg-white focus:ring-4 focus:ring-green-500/10"
                value={data.Area}
                onChange={(e) => onChange(e, "Area")}
                disabled={!data.Governorate}
              >
                <option value="">اختر المنطقة</option>
                {data.Governorate &&
                  AREAS_BY_GOVERNORATE[data.Governorate]?.map((area, index) => (
                    <option key={index} value={area}>
                      {area}
                    </option>
                  ))}
              </select>
              <FaBuilding className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 transition-colors peer-focus:text-green-600" />
            </div>
          </div>

          {/* Detailed Address (Full Width) */}
          <div className="col-span-1 md:col-span-2 space-y-3">
            <label className="text-sm font-bold text-gray-700">
              العنوان التفصيلي
            </label>
            <div className="relative">
              <input
                type="text"
                placeholder="أدخل اسم الشارع، رقم المبنى، الطابق..."
                className="peer w-full rounded-xl border-transparent bg-gray-50 px-4 py-3.5 pl-10 text-gray-700 outline-none ring-1 ring-gray-200 transition-all focus:bg-white focus:ring-4 focus:ring-green-500/10"
                value={data.DetailedAddress}
                onChange={(e) => onChange(e, "DetailedAddress")}
              />
              <FaRoad className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 transition-colors peer-focus:text-green-600" />
            </div>
          </div>

          {/* Phone Numbers Section */}
          <div className="col-span-1 md:col-span-2 space-y-6">
            <div className="flex items-center justify-between">
              <label className="text-sm font-bold text-gray-700">
                أرقام الهاتف
              </label>
              <button
                type="button"
                onClick={onAddPhoneNumber}
                className="flex items-center gap-2 px-4 py-2 bg-green-50 text-green-600 rounded-xl hover:bg-green-100 transition-colors font-medium"
              >
                <FaPlus className="text-sm" />
                <span>إضافة رقم</span>
              </button>
            </div>

            <div className="space-y-4">
              {data.PhoneNumbers.map((phone: string, index: number) => (
                <div key={index} className="flex items-center gap-3">
                  <div className="relative flex-1">
                    <input
                      type="text"
                      placeholder="01xxxxxxxxx"
                      className="peer w-full rounded-xl border-transparent bg-gray-50 px-4 py-3.5 pl-10 text-gray-700 outline-none ring-1 ring-gray-200 transition-all focus:bg-white focus:ring-4 focus:ring-green-500/10"
                      value={phone}
                      onChange={(e) =>
                        onPhoneNumberChange(index, e.target.value)
                      }
                    />
                    <FaPhone className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 transition-colors peer-focus:text-green-600" />
                  </div>
                  {data.PhoneNumbers.length > 1 && (
                    <button
                      type="button"
                      onClick={() => onRemovePhoneNumber(index)}
                      className="p-3 bg-red-50 text-red-600 rounded-xl hover:bg-red-100 transition-colors"
                      title="حذف الرقم"
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
