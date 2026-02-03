"use client";
import {
  User,
  Settings,
  Eye,
  EyeOff,
  CheckCircle,
  XCircle,
  AlertCircle,
} from "lucide-react";
import { useState, useEffect } from "react";
import axios from "axios";

type Employee = {
  FullName: string;
  EmployeeCode: string;
  AnnualLeave?: string;
};

type NewPassword = {
  code: string;
  OldPassword: string;
  NewPassword: string;
  ConfirmNewPassword: string;
};

type MessageType = "success" | "error" | "info" | null;

export default function EmployeeProfile({ employee }: { employee: Employee }) {
  const [showSettings, setShowSettings] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState({
    old: false,
    new: false,
    confirm: false,
  });
  const [isLoading, setIsLoading] = useState(false);

  // أخطاء لكل حقل على حدة
  const [passwordErrors, setPasswordErrors] = useState<{
    old?: string;
    new?: string;
    confirm?: string;
  }>({});

  const [message, setMessage] = useState<{ text: string; type: MessageType }>({
    text: "",
    type: null,
  });

  const [newPassword, setPassword] = useState<NewPassword>({
    code: employee.EmployeeCode,
    OldPassword: "",
    NewPassword: "",
    ConfirmNewPassword: "",
  });

  // إخفاء الرسالة تلقائياً بعد 5 ثوان
  useEffect(() => {
    if (message.text) {
      const timer = setTimeout(() => {
        setMessage({ text: "", type: null });
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  // validate -> ترجع object فيه أخطاء لكل حقل
  const validatePassword = () => {
    const errors: { old?: string; new?: string; confirm?: string } = {};

    if (!newPassword.OldPassword) {
      errors.old = "كلمة المرور الحالية مطلوبة";
    }

    if (!newPassword.NewPassword) {
      errors.new = "كلمة المرور الجديدة مطلوبة";
    } else if (newPassword.NewPassword.length < 6) {
      // تحذير اختياري: طول كلمة المرور
      errors.new = "كلمة المرور يجب أن تكون 6 أحرف على الأقل";
    }

    if (!newPassword.ConfirmNewPassword) {
      errors.confirm = "تأكيد كلمة المرور مطلوب";
    }

    if (
      newPassword.NewPassword &&
      newPassword.ConfirmNewPassword &&
      newPassword.NewPassword !== newPassword.ConfirmNewPassword
    ) {
      errors.confirm = "كلمات المرور غير متطابقة";
    }

    if (
      newPassword.OldPassword &&
      newPassword.NewPassword &&
      newPassword.OldPassword === newPassword.NewPassword
    ) {
      errors.new = "كلمة المرور الجديدة يجب أن تكون مختلفة عن القديمة";
    }

    return errors;
  };

  const handleChangePassword = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const errors = validatePassword();

    if (Object.keys(errors).length > 0) {
      setPasswordErrors(errors);
      // عرض أول رسالة خطأ كرسالة عامة أيضاً (اختياري)
      const firstKey = Object.keys(errors)[0] as keyof typeof errors;
      setMessage({ text: errors[firstKey]!, type: "error" });
      return;
    }

    setPasswordErrors({});
    setIsLoading(true);

    try {
      const response = await axios.patch(
        "https://backend-five-indol-46.vercel.app/api/employee/change-password",
        newPassword,
      );
      if (response.data.message === "Password reset successfully") {
        setMessage({ text: "لقد تم تغير كلمه المرور بنجاح", type: "success" });

        // إعادة تعيين الحقول
        setPassword({
          code: employee.EmployeeCode,
          OldPassword: "",
          NewPassword: "",
          ConfirmNewPassword: "",
        });

        setTimeout(() => {
          setShowSettings(false);
        }, 3000);
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const errorMsg =
          (error.response?.data?.message as string) ||
          "حدث خطأ أثناء تغيير كلمة المرور";

        if (errorMsg === "OldPassword not match") {
          setMessage({ text: "كلمة المرور القديمة غير صحيحة", type: "error" });
          setPasswordErrors((prev) => ({
            ...prev,
            old: "كلمة المرور القديمة غير صحيحة",
          }));
        } else {
          // رسالة عامة + يمكن تعيين خطأ للحقل المناسب لو كانت الرسالة واضحة
          setMessage({ text: errorMsg, type: "error" });
        }
      } else {
        setMessage({ text: "حدث خطأ غير متوقع", type: "error" });
      }
    } finally {
      setIsLoading(false);
    }
  };

  const togglePasswordVisibility = (field: keyof typeof showPassword) => {
    setShowPassword((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  const getMessageColor = (type: MessageType) => {
    switch (type) {
      case "success":
        return "bg-green-50 border-green-200 text-green-800";
      case "error":
        return "bg-red-50 border-red-200 text-red-800";
      case "info":
        return "bg-blue-50 border-blue-200 text-blue-800";
      default:
        return "";
    }
  };

  const getMessageIcon = (type: MessageType) => {
    switch (type) {
      case "success":
        return <CheckCircle className="w-5 h-5" />;
      case "error":
        return <XCircle className="w-5 h-5" />;
      case "info":
        return <AlertCircle className="w-5 h-5" />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      {/* رسالة التبليغ */}
      {message.text && (
        <div className="fixed top-4 right-4 left-4 md:left-auto md:right-4 md:w-96 z-50 animate-fade-in">
          <div
            className={`flex items-center gap-3 p-4 rounded-xl shadow-lg border ${getMessageColor(
              message.type,
            )}`}
          >
            <div>{getMessageIcon(message.type)}</div>
            <div className="flex-1">
              <p className="font-medium">{message.text}</p>
            </div>
            <button
              onClick={() => setMessage({ text: "", type: null })}
              className="text-gray-400 hover:text-gray-600"
            >
              <XCircle className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}

      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg p-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8 pb-6 border-b">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-linear-to-br from-indigo-100 to-purple-100 rounded-2xl">
              <User className="w-12 h-12 text-indigo-600" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-800">
                الملف الشخصي للموظف
              </h2>
            </div>
          </div>

          <button
            onClick={() => {
              setShowSettings(!showSettings);
              // عند فتح الإعدادات نحرر الأخطاء القديمة
              if (!showSettings) {
                setPasswordErrors({});
                setMessage({ text: "", type: null });
              }
            }}
            className="flex items-center gap-3 px-5 py-3 bg-linear-to-r from-blue-600 to-blue-800 text-white rounded-xl transition-all duration-300 shadow-md hover:shadow-lg"
          >
            <Settings className="w-5 h-5" />
            {showSettings ? "عرض الملف الشخصي" : "تغيير كلمة المرور"}
          </button>
        </div>

        {/* Content */}
        {!showSettings ? (
          // Employee Info View
          <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-linear-to-br from-indigo-50 to-white p-6 rounded-xl border border-indigo-100">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-2 bg-white rounded-lg shadow-sm">
                    <User className="w-6 h-6 text-indigo-500" />
                  </div>
                  <span className="text-xs font-medium text-indigo-600 bg-indigo-100 px-3 py-1 rounded-full">
                    الملف الشخصي
                  </span>
                </div>
                <p className="text-sm text-gray-500 mb-2">الاسم الكامل</p>
                <p className="text-xl font-bold text-gray-800">
                  {employee.FullName}
                </p>
              </div>

              <div className="bg-linear-to-br from-blue-50 to-white p-6 rounded-xl border border-blue-100">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-2 bg-white rounded-lg shadow-sm">
                    <div className="w-6 h-6 text-center font-bold text-blue-500">
                      #
                    </div>
                  </div>
                  <span className="text-xs font-medium text-blue-600 bg-blue-100 px-3 py-1 rounded-full">
                    المعرف
                  </span>
                </div>
                <p className="text-sm text-gray-500 mb-2">كود الموظف</p>
                <p className="text-xl font-mono font-bold text-gray-800 bg-white p-2 rounded-lg">
                  {employee.EmployeeCode}
                </p>
              </div>

              <div className="bg-linear-to-br from-emerald-50 to-white p-6 rounded-xl border border-emerald-100">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-2 bg-white rounded-lg shadow-sm">
                    <div className="w-6 h-6 text-center font-bold text-emerald-500">
                      ✓
                    </div>
                  </div>
                  <span className="text-xs font-medium text-emerald-600 bg-emerald-100 px-3 py-1 rounded-full">
                    الاجازات السنوية
                  </span>
                </div>
                <p className="text-sm text-gray-500 mb-2">
                  الاجازات السنوية المتبقية
                </p>
                <p className="text-3xl font-bold text-emerald-600">
                  {employee.AnnualLeave || "0"} يوم
                </p>
              </div>
            </div>
          </div>
        ) : (
          // Change Password Form
          <div className="max-w-lg mx-auto">
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-linear-to-br from-indigo-100 to-purple-100 rounded-2xl mb-4">
                <Settings className="w-8 h-8 text-indigo-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800">
                تغيير كلمة المرور
              </h3>
              <p className="text-gray-500 mt-2">
                أدخل كلمة المرور الحالية والجديدة
              </p>
            </div>

            <form onSubmit={handleChangePassword} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  كلمة المرور الحالية
                </label>
                <div className="relative">
                  <input
                    type={showPassword.old ? "text" : "password"}
                    placeholder="أدخل كلمة المرور الحالية"
                    value={newPassword.OldPassword}
                    onChange={(e) => {
                      setPassword({
                        ...newPassword,
                        OldPassword: e.target.value,
                      });
                      // مسح خطأ الحقل عند التعديل
                      setPasswordErrors((prev) => ({
                        ...prev,
                        old: undefined,
                      }));
                    }}
                    className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-300 pr-12 ${
                      passwordErrors.old ? "border-red-300" : "border-gray-300"
                    }`}
                  />
                  <button
                    type="button"
                    onClick={() => togglePasswordVisibility("old")}
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword.old ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                </div>

                {/* رسالة الخطأ الخاصة بالحقل */}
                {passwordErrors.old && (
                  <p className="text-red-600 text-sm mt-2">
                    {passwordErrors.old}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  كلمة المرور الجديدة
                </label>
                <div className="relative">
                  <input
                    type={showPassword.new ? "text" : "password"}
                    placeholder="أدخل كلمة المرور الجديدة (6 أحرف على الأقل)"
                    value={newPassword.NewPassword}
                    onChange={(e) => {
                      setPassword({
                        ...newPassword,
                        NewPassword: e.target.value,
                      });
                      setPasswordErrors((prev) => ({
                        ...prev,
                        new: undefined,
                      }));
                    }}
                    className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-300 pr-12 ${
                      passwordErrors.new ? "border-red-300" : "border-gray-300"
                    }`}
                  />
                  <button
                    type="button"
                    onClick={() => togglePasswordVisibility("new")}
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword.new ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                </div>

                {passwordErrors.new && (
                  <p className="text-red-600 text-sm mt-2">
                    {passwordErrors.new}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  تأكيد كلمة المرور الجديدة
                </label>
                <div className="relative">
                  <input
                    type={showPassword.confirm ? "text" : "password"}
                    placeholder="أعد إدخال كلمة المرور الجديدة"
                    value={newPassword.ConfirmNewPassword}
                    onChange={(e) => {
                      setPassword({
                        ...newPassword,
                        ConfirmNewPassword: e.target.value,
                      });
                      setPasswordErrors((prev) => ({
                        ...prev,
                        confirm: undefined,
                      }));
                    }}
                    className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-300 pr-12 ${
                      passwordErrors.confirm
                        ? "border-red-300"
                        : "border-gray-300"
                    }`}
                  />
                  <button
                    type="button"
                    onClick={() => togglePasswordVisibility("confirm")}
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword.confirm ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                </div>

                {passwordErrors.confirm && (
                  <p className="text-red-600 text-sm mt-2">
                    {passwordErrors.confirm}
                  </p>
                )}

                {/* Password Match Indicator */}
                {newPassword.NewPassword && newPassword.ConfirmNewPassword && (
                  <div
                    className={`mt-2 flex items-center gap-2 text-sm ${
                      newPassword.NewPassword === newPassword.ConfirmNewPassword
                        ? "text-green-600"
                        : "text-red-600"
                    }`}
                  >
                    {newPassword.NewPassword ===
                    newPassword.ConfirmNewPassword ? (
                      <CheckCircle className="w-4 h-4" />
                    ) : (
                      <XCircle className="w-4 h-4" />
                    )}
                    {newPassword.NewPassword === newPassword.ConfirmNewPassword
                      ? "كلمات المرور متطابقة"
                      : "كلمات المرور غير متطابقة"}
                  </div>
                )}
              </div>

              <div className="flex gap-4 pt-4">
                <button
                  type="button"
                  onClick={() => {
                    setShowSettings(false);
                    setPasswordErrors({});
                    setPassword({
                      code: employee.EmployeeCode,
                      OldPassword: "",
                      NewPassword: "",
                      ConfirmNewPassword: "",
                    });
                  }}
                  className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors duration-300"
                >
                  إلغاء
                </button>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="flex-1 px-6 py-3 bg-linear-to-r from-blue-600 to-blue-800 text-white rounded-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-md hover:shadow-lg"
                >
                  {isLoading ? (
                    <span className="flex items-center justify-center gap-2">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      جاري التغيير...
                    </span>
                  ) : (
                    "تغيير كلمة المرور"
                  )}
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
