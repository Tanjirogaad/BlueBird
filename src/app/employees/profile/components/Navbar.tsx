"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { IoLogOut, IoClose } from "react-icons/io5";

export default function Navbar() {
  const router = useRouter();
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    router.push("/");
  };

  return (
    <>
      <nav className="w-full h-16 flex items-center justify-between px-4 md:px-6 bg-linear-to-r from-blue-600 to-blue-800 shadow-lg sticky top-0 z-50">
        <div className="flex items-center gap-3">
          <div className="bg-white p-2 rounded-lg shadow-md">
            <div className="font-bold text-lg md:text-xl text-blue-600">
              🕊️ Blue Bird
            </div>
          </div>
          <div className="hidden md:block h-8 w-px bg-blue-400"></div>
          <div className="hidden md:block text-sm text-blue-100">
            نظام إدارة الموظفين
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowLogoutConfirm(true)}
            className="px-4 py-2 rounded-lg bg-white/20 hover:bg-white/30 text-white border border-white/30 hover:border-white/50 transition-all duration-200 flex items-center gap-2 group"
          >
            <IoLogOut />
            <span className="font-medium">تسجيل الخروج</span>
          </button>
        </div>
      </nav>

      {showLogoutConfirm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 animate-fadeIn">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-gray-800">
                تأكيد تسجيل الخروج
              </h3>
              <button
                onClick={() => setShowLogoutConfirm(false)}
                className="p-2 hover:bg-gray-100 rounded-full transition"
              >
                <IoClose className="text-xl" />
              </button>
            </div>

            <p className="text-gray-600 mb-8 text-right">
              هل أنت متأكد من رغبتك في تسجيل الخروج من النظام؟
            </p>

            <div className="flex gap-3 justify-end">
              <button
                onClick={() => setShowLogoutConfirm(false)}
                className="px-6 py-3 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 transition-all duration-200 font-medium"
              >
                إلغاء
              </button>
              <button
                onClick={handleLogout}
                className="px-6 py-3 rounded-lg bg-linear-to-r from-red-500 to-red-600 text-white hover:from-red-600 hover:to-red-700 transition-all duration-200 shadow-md hover:shadow-lg font-medium flex items-center gap-2"
              >
                <IoLogOut />
                تسجيل الخروج
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
