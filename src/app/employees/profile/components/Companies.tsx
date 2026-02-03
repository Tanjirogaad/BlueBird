"use client";
import { useState, useEffect, FormEvent, ChangeEvent } from "react";
import axios from "axios";
import Loading from "./Loading";
import { Building2, Plus, Search, FileText, Save } from "lucide-react";

type Company = {
  Name: string;
  NameEN: string;
  Customercode: string;
  TaxRegistration: string;
};

export default function Companies() {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [company, setCompany] = useState<Company>({
    Name: "",
    NameEN: "",
    Customercode: "",
    TaxRegistration: "",
  });
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [showForm, setShowForm] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  // جلب جميع الشركات
  useEffect(() => {
    fetchCompanies();
  }, []);

  const fetchCompanies = async () => {
    try {
      setLoading(true);
      const res = await axios.get(
        "http://192.168.1.168:4000/api/companies/get-companies",
      );
      setCompanies(res.data.companies || []);
      setError(null);
    } catch (err: any) {
      console.error("Failed to fetch companies:", err);
      setError(err.response?.data?.message || "حدث خطأ في جلب بيانات الشركات");
    } finally {
      setLoading(false);
    }
  };

  // تسجيل/تحديث شركة
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    setSuccessMessage(null);

    try {
      if (!company.Name.trim() || !company.TaxRegistration.trim()) {
        setError("يرجى ملء جميع الحقول المطلوبة");
        setIsSubmitting(false);
        return;
      }
      await axios.post(
        "http://192.168.1.168:4000/api/companies/register-company",
        company,
      );
      // إعادة جلب البيانات وإعادة تعيين النموذج
      await fetchCompanies();
      resetForm();

      // إخفاء الرسالة بعد 3 ثواني
      setTimeout(() => setSuccessMessage(null), 3000);
    } catch (err: any) {
      console.error("Failed to save company:", err);
      const errorMsg =
        err.response?.data?.message ||
        (err.response?.status === 409
          ? "التسجيل الضريبي مسجل مسبقاً"
          : "حدث خطأ في حفظ البيانات");
      setError(errorMsg);
    } finally {
      setIsSubmitting(false);
    }
  };

  // إعادة تعيين النموذج
  const resetForm = () => {
    setCompany({
      Name: "",
      NameEN: "",
      Customercode: "",
      TaxRegistration: "",
    });
    setShowForm(false);
    setError(null);
  };

  // تحديث الحقول
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCompany((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // تصفية الشركات حسب البحث (بحث باسم الشركة، كود العميل، أو التسجيل الضريبي)
  const filteredCompanies = companies.filter(
    (comp) =>
      comp.Name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (comp.Customercode || "").includes(searchTerm) ||
      (comp.TaxRegistration || "").includes(searchTerm),
  );

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
            <Building2 className="w-8 h-8 text-blue-600" />
            إدارة الشركات
          </h1>
          <p className="text-gray-600 mt-2">
            قم بإدارة وتنظيم بيانات الشركات المسجلة في النظام
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
                    إضافة شركة
                  </div>
                )}
              </button>
            </div>

            {showForm && (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* اسم الشركة */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      اسم الشركة *
                    </label>
                    <input
                      type="text"
                      name="Name"
                      value={company.Name}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                      placeholder="أدخل اسم الشركة"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      اسم الشركة بالانجليزية *
                    </label>
                    <input
                      type="text"
                      name="NameEN"
                      value={company.NameEN}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                      placeholder="أدخل اسم الشركة بالانجليزية"
                      required
                    />
                  </div>
                  {/* كود العميل */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      كود العميل
                    </label>
                    <input
                      type="text"
                      name="Customercode"
                      value={company.Customercode}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                      placeholder="أدخل كود العميل"
                    />
                  </div>

                  {/* التسجيل الضريبي */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      التسجيل الضريبي *
                    </label>
                    <input
                      type="text"
                      name="TaxRegistration"
                      value={company.TaxRegistration}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                      placeholder="أدخل بيانات التسجيل الضريبي"
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

        {/* بطاقة قائمة الشركات */}
        <div className="bg-white rounded-xl shadow-sm border">
          <div className="p-6">
            {/* شريط البحث والإحصائيات */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
              <div>
                <h2 className="text-xl font-semibold text-gray-800">
                  قائمة الشركات
                </h2>
                <p className="text-gray-600 text-sm mt-1">
                  إجمالي الشركات: {companies.length}
                </p>
              </div>

              <div className="relative w-full md:w-auto">
                <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 -translate-x-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="ابحث باسم الشركة أو كود العميل أو التسجيل الضريبي..."
                  className="w-full md:w-80  py-3 px-8 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>

            {/* جدول الشركات */}
            {filteredCompanies.length === 0 ? (
              <div className="text-center py-12">
                <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500">
                  {searchTerm
                    ? "لا توجد نتائج للبحث"
                    : "لا توجد شركات مسجلة بعد"}
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
                        اسم الشركة
                      </th>
                      <th className="py-3 px-4 text-right text-sm font-semibold text-gray-900">
                        اسم الشركة بالانجليزية
                      </th>
                      <th className="py-3 px-4 text-right text-sm font-semibold text-gray-900">
                        كود العميل
                      </th>
                      <th className="py-3 px-4 text-right text-sm font-semibold text-gray-900">
                        التسجيل الضريبي
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {filteredCompanies.map((comp, index) => (
                      <tr key={index} className="hover:bg-gray-50">
                        <td className="py-4 px-4 text-sm text-gray-600">
                          {index + 1}
                        </td>
                        <td className="py-4 px-4">
                          <div className="text-sm font-medium text-gray-900">
                            {comp.Name}
                          </div>
                        </td>

                        <td className="py-4 px-4">
                          <div className="text-sm font-medium text-gray-900">
                            {comp.NameEN || "-"}
                          </div>
                        </td>
                        <td className="py-4 px-4">
                          <div className="text-sm font-medium text-gray-900">
                            {comp.Customercode || "-"}
                          </div>
                        </td>
                        <td className="py-4 px-4">
                          <div className="text-sm font-medium text-gray-900">
                            {comp.TaxRegistration || "-"}
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
          <p>
            • الحقول المطلوبة مع علامة * إلزامية (اسم الشركة، اسم الشركة
            بالانجليزية، والتسجيل الضريبي)
          </p>
          <p>• كود العميل اختياري حالياً</p>
          <p>• تم إزالة خيارات التعديل والحذف من الواجهة كما طلبت</p>
        </div>
      </div>
    </div>
  );
}
