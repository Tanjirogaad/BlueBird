"use client";

import { User, Calendar, Phone } from "lucide-react";

interface Employee {
  PersonalInformation?: {
    FullName?: string;
  };
  JobInformation?: {
    EmployeeCode?: string;
    Department?: string;
    JobTitle?: string;
    HiringDate?: string;
    EmploymentStatus?: string;
  };
  Address?: {
    PhoneNumbers?: string[];
  };
}

interface EmployeeCardProps {
  employee: Employee;
  onClick: (employee: any) => void;
  viewMode: "grid" | "list";
}

export default function EmployeeGridCard({
  employee,
  onClick,
  viewMode,
}: EmployeeCardProps) {
  if (viewMode !== "grid") return null;

  const name = employee.PersonalInformation?.FullName || "غير متوفر";
  const code = employee.JobInformation?.EmployeeCode || "غير متوفر";
  const department = employee.JobInformation?.Department || "غير محدد";
  const jobTitle = employee.JobInformation?.JobTitle || "غير محدد";
  const hiringDateRaw = employee.JobInformation?.HiringDate;
  const status = employee.JobInformation?.EmploymentStatus || "غير محدد";
  const phones = employee.Address?.PhoneNumbers || [];

  // تحقق من حالة الموظف لتلوين الحالة
  const isActive =
    status.toLowerCase().includes("active") ||
    status.toLowerCase().includes("مفعل");

  // صيغة التاريخ YYYY/MM/DD
  const formatDate = (d?: string) => {
    if (!d) return "غير محدد";
    const parsed = new Date(d);
    if (Number.isNaN(parsed.getTime())) return d;
    const yyyy = parsed.getFullYear();
    const mm = String(parsed.getMonth() + 1).padStart(2, "0");
    const dd = String(parsed.getDate()).padStart(2, "0");
    return `${yyyy}/${mm}/${dd}`;
  };

  // حساب المدة منذ التعيين
  const getDurationSince = (d?: string) => {
    if (!d) return "";
    const start = new Date(d);
    if (Number.isNaN(start.getTime())) return "";
    const now = new Date();
    const diffMs = now.getTime() - start.getTime();
    if (diffMs < 0) return "تاريخ في المستقبل";
    const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    if (days >= 365) {
      const years = Math.floor(days / 365);
      return years === 1 ? `بقاله سنة` : `بقاله ${years} سنوات`;
    }
    if (days >= 30) {
      const months = Math.floor(days / 30);
      return months === 1 ? `بقاله شهر` : `بقاله ${months} شهور`;
    }
    return days === 1 ? `بقاله يوم` : `بقاله ${days} أيام`;
  };

  // helper لتنظيف رقم الهاتف قبل وضعه في href (يزيل مسافات وأحرف غير رقمية شائعة)
  const normalizeTel = (p: string) => p.replace(/[^\d+]/g, "");

  return (
    <div
      className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer border border-gray-200 hover:border-blue-300 overflow-hidden group"
      onClick={() => onClick(employee)}
    >
      <div className="p-4 flex flex-col h-full justify-between">
        {/* رأس الكارد: الاسم + الحالة */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-3 rtl:space-x-reverse">
            <div className="relative">
              <div className="w-14 h-14 rounded-full flex items-center justify-center bg-linear-to-br from-blue-100 to-blue-200 group-hover:from-blue-200 group-hover:to-blue-300 transition-all">
                <User className="h-7 w-7 text-blue-600" />
              </div>
              <div
                className={`absolute -bottom-1 -right-1 w-5 h-5 rounded-full border-2 border-white ${
                  isActive ? "bg-green-500" : "bg-gray-400"
                }`}
              ></div>
            </div>
            <div>
              <h3 className="font-bold text-gray-800 group-hover:text-blue-600 transition-colors line-clamp-1 pr-1">
                {name}
              </h3>
              {/* تم عرض المسمى هنا بدل الادارة */}
              <div className="flex items-center space-x-2 rtl:space-x-reverse mt-1">
                <span className="text-sm text-gray-600 pr-2">{jobTitle}</span>
              </div>
            </div>
          </div>

          <span
            className={`text-xs px-2 py-1 rounded-full mt-2 font-medium ${
              isActive
                ? "bg-green-100 text-green-800"
                : "bg-gray-100 text-gray-800"
            }`}
          >
            {status}
          </span>
        </div>

        {/* تفاصيل الموظف */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            {/* كود الموظف */}
            <div className="flex items-center space-x-2 rtl:space-x-reverse">
              <div>
                <p className="text-xs text-gray-500">الكود</p>
                <p className="font-medium text-gray-700 truncate">{code}</p>
              </div>
            </div>

            {/* الآن هذا المكان يعرض القسم بدل المسمى */}
            <div className="flex items-center space-x-2 rtl:space-x-reverse">
              <div>
                <p className="text-xs text-gray-500">القسم</p>
                <p className="font-medium text-gray-700 line-clamp-1 max-w-[120px]">
                  {department}
                </p>
              </div>
            </div>
          </div>

          {/* اظهر كل ارقام الهاتف */}
          <div className="flex items-center justify-between">
            <div className="flex items-start space-x-2 rtl:space-x-reverse">
              <div className="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center">
                <Phone className="h-4 w-4 text-blue-600" />
              </div>
              <div className="pr-3">
                <p className="text-xs text-gray-500">الهاتف</p>

                {phones.length > 0 ? (
                  <div className="flex gap-2">
                    {phones.map((p, idx) => {
                      const display = p || "غير متوفر";
                      const href = p ? `tel:${normalizeTel(p)}` : undefined;
                      return href ? (
                        <a
                          key={idx}
                          href={href}
                          onClick={(e) => e.stopPropagation()}
                          className="font-medium text-gray-700 hover:text-blue-600 transition-colors text-sm"
                        >
                          {display}
                        </a>
                      ) : (
                        <p
                          key={idx}
                          className="font-medium text-gray-400 text-sm"
                        >
                          {display}
                        </p>
                      );
                    })}
                  </div>
                ) : (
                  <p className="font-medium text-gray-400">غير متوفر</p>
                )}
              </div>
            </div>
          </div>

          {/* تاريخ التعيين + المدة */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2 rtl:space-x-reverse">
              <Calendar className="h-4 w-4 text-gray-500" />
              <span className="text-sm text-gray-600">
                {formatDate(hiringDateRaw)}
              </span>
            </div>
            <div className="text-xs text-gray-500">
              {getDurationSince(hiringDateRaw)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
