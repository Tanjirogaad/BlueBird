"use client";
import { useState, useEffect, FormEvent, ChangeEvent } from "react";
import axios from "axios";
import Loading from "./Loading";
import { User, Plus, Search, FileText, Save } from "lucide-react";

type Driver = {
  name: string;
  nameEN: string;
  Customercode: string;
};

export default function Drivers() {
  const [drivers, setDrivers] = useState<Driver[]>([]);
  const [driver, setDriver] = useState<Driver>({
    name: "",
    nameEN: "",
    Customercode: "",
  });
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [showForm, setShowForm] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  // جلب جميع السائقين
  useEffect(() => {
    fetchDrivers();
  }, []);

  const fetchDrivers = async () => {
    try {
      setLoading(true);
      const res = await axios.get(
        "https://backend-five-indol-46.vercel.app/api/driver/get-drivers",
      );
      setDrivers(res.data.drivers || []);
      setError(null);
      console.log(drivers);
    } catch (err: any) {
      console.error("Failed to fetch drivers:", err);
      setError(err.response?.data?.message || "حدث خطأ في جلب بيانات السائقين");
    } finally {
      setLoading(false);
    }
  };

  // تسجيل سائق جديد
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    setSuccessMessage(null);

    try {
      // التحقق من الحقول المطلوبة
      if (
        !driver.name.trim() ||
        !driver.nameEN.trim() ||
        !driver.Customercode.trim()
      ) {
        setError("يرجى ملء جميع الحقول المطلوبة");
        setIsSubmitting(false);
        return;
      }

      // إرسال البيانات للخادم
      await axios.post(
        "http://192.168.1.168:4000/api/driver/register-driver",
        driver,
      );

      // إعادة جلب البيانات وإعادة تعيين النموذج
      await fetchDrivers();
      resetForm();
      setSuccessMessage("تم إضافة السائق بنجاح");

      // إخفاء الرسالة بعد 3 ثواني
      setTimeout(() => setSuccessMessage(null), 3000);
    } catch (err: any) {
      console.error("Failed to save driver:", err);
      const errorMsg =
        err.response?.data?.message ||
        (err.response?.status === 409
          ? "كود العميل مسجل مسبقاً"
          : "حدث خطأ في حفظ البيانات");
      setError(errorMsg);
    } finally {
      setIsSubmitting(false);
    }
  };

  // إعادة تعيين النموذج
  const resetForm = () => {
    setDriver({
      name: "",
      nameEN: "",
      Customercode: "",
    });
    setShowForm(false);
    setError(null);
  };

  // تحديث الحقول
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setDriver((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // تصفية السائقين حسب البحث (بحث بالاسم العربي، الإنجليزي، أو كود العميل)
  const filteredDrivers = drivers.filter((driver) => {
    // التأكد من تحويل القيم لنصوص وتجنب القيم الفارغة
    const name = driver.name || "";
    const nameEN = driver.nameEN || "";
    const customerCode = driver.Customercode || "";

    return (
      name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      nameEN.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customerCode.toString().includes(searchTerm)
    );
  });

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loading />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        {/* العنوان */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
            <User className="w-8 h-8 text-blue-600" />
            إدارة السائقين
          </h1>
          <p className="text-gray-600 mt-2">
            قم بإدارة وتنظيم بيانات السائقين المسجلين في النظام
          </p>
        </div>

        {/* الرسائل */}
        {error && (
          <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
            {error}
          </div>
        )}

        {successMessage && (
          <div className="mb-4 p-4 bg-green-50 border border-green-200 rounded-lg text-green-700">
            {successMessage}
          </div>
        )}

        {/* بطاقة النموذج */}
        <div
          className={`bg-white rounded-xl shadow-sm border ${showForm ? "mb-6" : "mb-8"}`}
        >
          <div className="p-6">
            <div className="mb-4" dir="ltr">
              <button onClick={() => setShowForm(!showForm)}>
                {showForm ? null : (
                  <div className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                    <Plus className="w-4 h-4" />
                    إضافة سائق
                  </div>
                )}
              </button>
            </div>

            {showForm && (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* اسم السائق بالعربي */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      اسم السائق بالعربي *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={driver.name}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                      placeholder="أدخل اسم السائق بالعربي"
                      required
                    />
                  </div>

                  {/* اسم السائق بالإنجليزية */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      اسم السائق بالإنجليزية *
                    </label>
                    <input
                      type="text"
                      name="nameEN"
                      value={driver.nameEN}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                      placeholder="أدخل اسم السائق بالإنجليزية"
                      required
                    />
                  </div>

                  {/* كود العميل */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      كود العميل *
                    </label>
                    <input
                      type="text"
                      name="Customercode"
                      value={driver.Customercode}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                      placeholder="أدخل كود العميل"
                      required
                    />
                  </div>
                </div>

                {/* أزرار النموذج */}
                <div className="flex gap-3 pt-4">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        جاري الحفظ...
                      </>
                    ) : (
                      <>
                        <Save className="w-4 h-4" />
                        حفظ
                      </>
                    )}
                  </button>
                  <button
                    type="button"
                    onClick={resetForm}
                    className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    إلغاء
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>

        {/* بطاقة قائمة السائقين */}
        <div className="bg-white rounded-xl shadow-sm border">
          <div className="p-6">
            {/* شريط البحث والإحصائيات */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
              <div>
                <h2 className="text-xl font-semibold text-gray-800">
                  قائمة السائقين
                </h2>
                <p className="text-gray-600 text-sm mt-1">
                  إجمالي السائقين: {drivers.length}
                </p>
              </div>

              <div className="relative w-full md:w-auto">
                <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="ابحث باسم السائق أو كود العميل..."
                  className="w-full md:w-80 py-3 pr-10 pl-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>

            {/* جدول السائقين */}
            {filteredDrivers.length === 0 ? (
              <div className="text-center py-12">
                <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500">
                  {searchTerm
                    ? "لا توجد نتائج للبحث"
                    : "لا توجد سائقين مسجلين بعد"}
                </p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="py-3 px-4 text-right text-sm font-semibold text-gray-900">
                        #
                      </th>
                      <th className="py-3 px-4 text-right text-sm font-semibold text-gray-900">
                        اسم السائق (عربي)
                      </th>
                      <th className="py-3 px-4 text-right text-sm font-semibold text-gray-900">
                        اسم السائق (إنجليزي)
                      </th>
                      <th className="py-3 px-4 text-right text-sm font-semibold text-gray-900">
                        كود العميل
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {filteredDrivers.map((driver, index) => (
                      <tr key={index} className="hover:bg-gray-50">
                        <td className="py-4 px-4 text-sm text-gray-600">
                          {index + 1}
                        </td>
                        <td className="py-4 px-4">
                          <div className="text-sm font-medium text-gray-900">
                            {driver.name}
                          </div>
                        </td>
                        <td className="py-4 px-4">
                          <div className="text-sm font-medium text-gray-900">
                            {driver.nameEN}
                          </div>
                        </td>
                        <td className="py-4 px-4">
                          <div className="text-sm font-medium text-gray-900">
                            {driver.Customercode}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>

        {/* ملاحظات */}
        <div className="mt-8 text-sm text-gray-500">
          <p>• جميع الحقول مطلوبة وملزمة</p>
          <p>• كود العميل يجب أن يكون فريداً ولا يتكرر</p>
          <p>• تم تصميم الواجهة بنفس نمط إدارة الشركات كما طلبت</p>
        </div>
      </div>
    </div>
  );
}
