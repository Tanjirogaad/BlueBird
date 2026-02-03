"use client";

import { useRef, useEffect } from "react";
import {
  User,
  Briefcase,
  Phone,
  MapPin,
  GraduationCap,
  CreditCard,
  Calendar,
  Mail,
  FileText,
  Shield,
  Clock,
  Users,
  X,
  Check,
} from "lucide-react";

interface Employee {
  PersonalInformation?: {
    FullName?: string;
    NationalIDNumber?: string;
    DateOfBirth?: string;
    Gender?: string;
    Nationality?: string;
    Religion?: string;
    MaritalStatus?: string;
  };
  Address?: {
    Governorate?: string;
    Area?: string;
    DetailedAddress?: string;
    PhoneNumbers?: string[];
  };
  EducationalQualifications?: {
    Qualification?: string;
    Specialization?: string;
    University?: string;
    GraduationYear?: string;
  };
  JobInformation?: {
    EmployeeCode?: string;
    Department?: string;
    JobTitle?: string;
    WorkLocation?: string;
    HiringDate?: string;
    EmploymentStatus?: string;
    DirectManagers?: string[];
  };
  WorkSchedule?: {
    StartTime?: string;
    EndTime?: string;
    TimeOff?: string[];
    SickLeave?: string;
    AnnualLeave?: string;
  };
  Accounts?: {
    SocialInsuranceNumber?: string;
    AccountHolderName?: string;
    BankName?: string;
    BankAccountNumber?: string;
    Salary?: string;
  };
  Contacts?: {
    Relationship?: string;
    PersonName?: string;
    PhoneNumber?: string;
    Address?: string;
  };
  Account?: {
    email?: string;
  };
  updatedAt?: { $date: string };
}

interface EmployeeDetailsModalProps {
  employee: Employee;
  isOpen: boolean;
  onClose: () => void;
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export default function EmployeeDetailsModal({
  employee,
  isOpen,
  onClose,
  activeTab,
  onTabChange,
}: EmployeeDetailsModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);

  // إغلاق النافذة عند النقر خارجها
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  // ثابت: أحجام الهيدر والتبويبات لتجنب تغيير الحجم المفاجئ
  const HEADER_HEIGHT = 96; // px
  const TAB_HEIGHT = 56; // px

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-6 z-50 backdrop-blur-sm">
      <div
        ref={modalRef}
        className="bg-white rounded-2xl w-[980px] max-w-full h-[80vh] min-h-[560px] overflow-hidden flex flex-col shadow-2xl"
        role="dialog"
        aria-modal="true"
      >
        {/* Header */}
        <div
          className="flex items-center justify-between px-6"
          style={{ height: `${HEADER_HEIGHT}px` }}
        >
          <div className="flex items-center gap-4 min-w-0">
            <div className="relative ">
              <div className="w-20 h-20 bg-linear-to-br from-blue-50 to-blue-100 rounded-full flex items-center justify-center">
                <User className="h-10 w-10 text-blue-600" />
              </div>
              <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-green-500 rounded-full border-4 border-white flex items-center justify-center">
                <Check className="h-3 w-3 text-white" />
              </div>
            </div>

            <div className="min-w-0">
              <h2 className="text-2xl font-bold text-gray-800 truncate">
                {employee.PersonalInformation?.FullName || "غير متوفر"}
              </h2>
              <div className="flex items-center gap-3 mt-2 flex-wrap">
                <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium truncate max-w-[220px]">
                  {employee.JobInformation?.JobTitle || "غير محدد"}
                </span>
                <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium truncate max-w-[160px]">
                  {employee.JobInformation?.Department || "غير محدد"}
                </span>
                <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-medium truncate max-w-[140px]">
                  {employee.JobInformation?.EmployeeCode || "غير محدد"}
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              aria-label="Close"
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X className="h-6 w-6 text-gray-500" />
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div
          className="border-t border-b border-gray-200 px-6 flex items-center"
          style={{ height: `${TAB_HEIGHT}px` }}
        >
          <div className="flex space-x-6 overflow-x-auto min-w-0">
            {[
              { id: "personal", label: "المعلومات الشخصية", icon: User },
              { id: "job", label: "المعلومات الوظيفية", icon: Briefcase },
              { id: "contact", label: "جهات الاتصال", icon: Phone },
              { id: "education", label: "المؤهلات", icon: GraduationCap },
              { id: "financial", label: "المعلومات المالية", icon: CreditCard },
              { id: "schedule", label: "جدول العمل", icon: Calendar },
            ].map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => onTabChange(tab.id)}
                  className={`flex items-center gap-2 py-2 px-2 border-b-2 transition-colors whitespace-nowrap ${
                    activeTab === tab.id
                      ? "border-blue-600 text-blue-600"
                      : "border-transparent text-gray-600 hover:text-gray-800"
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  <span className="font-medium text-sm truncate">
                    {tab.label}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-auto p-6 min-h-0">
          {/* Use a container grid with fixed card heights to avoid layout shift */}

          {activeTab === "personal" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gray-50 rounded-xl p-5 min-h-[220px] flex flex-col justify-start">
                <h3 className="font-semibold text-lg text-gray-800 mb-4 flex items-center gap-2">
                  <User className="h-5 w-5 text-blue-600" />
                  <span>المعلومات الشخصية</span>
                </h3>
                <div className="space-y-3 flex-1">
                  {[
                    {
                      label: "الرقم القومي",
                      value: employee.PersonalInformation?.NationalIDNumber,
                    },
                    {
                      label: "تاريخ الميلاد",
                      value: employee.PersonalInformation?.DateOfBirth,
                    },
                    {
                      label: "الجنس",
                      value: employee.PersonalInformation?.Gender,
                    },
                    {
                      label: "الحالة الاجتماعية",
                      value: employee.PersonalInformation?.MaritalStatus,
                    },
                    {
                      label: "الجنسية",
                      value: employee.PersonalInformation?.Nationality,
                    },
                    {
                      label: "الديانة",
                      value: employee.PersonalInformation?.Religion,
                    },
                  ].map((item, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between"
                    >
                      <span className="text-gray-600">{item.label}</span>
                      <span className="font-medium text-gray-800 max-w-[60%] text-right truncate">
                        {item.value || "غير متوفر"}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-gray-50 rounded-xl p-5 min-h-[220px] flex flex-col">
                <h3 className="font-semibold text-lg text-gray-800 mb-4 flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-blue-600" />
                  <span>العنوان</span>
                </h3>
                <div className="space-y-3 flex-1">
                  {[
                    { label: "المحافظة", value: employee.Address?.Governorate },
                    { label: "المنطقة", value: employee.Address?.Area },
                    {
                      label: "العنوان التفصيلي",
                      value: employee.Address?.DetailedAddress,
                    },
                  ].map((item, index) => (
                    <div
                      key={index}
                      className="flex items-start justify-between"
                    >
                      <span className="text-gray-600">{item.label}</span>
                      <span className="font-medium text-gray-800 text-right max-w-[60%] truncate">
                        {item.value || "غير متوفر"}
                      </span>
                    </div>
                  ))}

                  <div className="pt-4 mt-4 border-t border-gray-200">
                    <h4 className="font-medium text-gray-700 mb-2">
                      أرقام الهاتف
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {(employee.Address?.PhoneNumbers ?? []).length > 0 ? (
                        (employee.Address?.PhoneNumbers ?? []).map(
                          (phone, idx) => (
                            <span
                              key={idx}
                              className="px-3 py-1.5 bg-white border border-gray-300 rounded-lg text-gray-700"
                            >
                              {phone}
                            </span>
                          ),
                        )
                      ) : (
                        <span className="text-gray-500">غير متوفر</span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "job" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gray-50 rounded-xl p-5 min-h-[220px]">
                <h3 className="font-semibold text-lg text-gray-800 mb-4 flex items-center gap-2">
                  <Briefcase className="h-5 w-5 text-blue-600" />
                  <span>المعلومات الوظيفية</span>
                </h3>
                <div className="space-y-3">
                  {[
                    {
                      label: "كود الموظف",
                      value: employee.JobInformation?.EmployeeCode,
                    },
                    {
                      label: "تاريخ التعيين",
                      value: employee.JobInformation?.HiringDate,
                    },
                    {
                      label: "حالة التوظيف",
                      value: employee.JobInformation?.EmploymentStatus,
                    },
                    {
                      label: "موقع العمل",
                      value: employee.JobInformation?.WorkLocation,
                    },
                  ].map((item, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between"
                    >
                      <span className="text-gray-600">{item.label}</span>
                      <span className="font-medium text-gray-800 truncate">
                        {item.value || "غير متوفر"}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-gray-50 rounded-xl p-5 min-h-[220px]">
                <h3 className="font-semibold text-lg text-gray-800 mb-4 flex items-center gap-2">
                  <Users className="h-5 w-5 text-blue-600" />
                  <span>الفريق والإدارة</span>
                </h3>
                <div className="space-y-3">
                  <h4 className="font-medium text-gray-700 mb-2">
                    المديرون المباشرون
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {(employee.JobInformation?.DirectManagers ?? []).length >
                    0 ? (
                      (employee.JobInformation?.DirectManagers ?? []).map(
                        (manager, idx) => (
                          <span
                            key={idx}
                            className="px-3 py-1.5 bg-blue-50 text-blue-700 rounded-lg truncate max-w-[160px]"
                          >
                            {manager}
                          </span>
                        ),
                      )
                    ) : (
                      <span className="text-gray-500">غير محدد</span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "contact" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gray-50 rounded-xl p-5 min-h-[220px]">
                <h3 className="font-semibold text-lg text-gray-800 mb-4 flex items-center gap-2">
                  <Phone className="h-5 w-5 text-blue-600" />
                  <span>معلومات الاتصال</span>
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">البريد الإلكتروني</span>
                    <div className="flex items-center gap-2">
                      <Mail className="h-4 w-4 text-gray-500" />
                      <span className="font-medium text-gray-800 truncate">
                        {employee.Account?.email || "غير متوفر"}
                      </span>
                    </div>
                  </div>

                  <div className="pt-4 mt-4 border-t border-gray-200">
                    <h4 className="font-medium text-gray-700 mb-2">
                      أرقام الهاتف
                    </h4>
                    <div className="space-y-2">
                      {(employee.Address?.PhoneNumbers ?? []).length > 0 ? (
                        (employee.Address?.PhoneNumbers ?? []).map(
                          (phone, idx) => (
                            <div
                              key={idx}
                              className="flex items-center justify-between"
                            >
                              <span className="text-gray-600">
                                الهاتف {idx + 1}
                              </span>
                              <span className="font-medium text-gray-800 truncate">
                                {phone}
                              </span>
                            </div>
                          ),
                        )
                      ) : (
                        <span className="text-gray-500">غير متوفر</span>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 rounded-xl p-5 min-h-[220px]">
                <h3 className="font-semibold text-lg text-gray-800 mb-4 flex items-center gap-2">
                  <Shield className="h-5 w-5 text-blue-600" />
                  <span>جهة اتصال الطوارئ</span>
                </h3>
                <div className="space-y-3">
                  {[
                    { label: "الاسم", value: employee.Contacts?.PersonName },
                    {
                      label: "صلة القرابة",
                      value: employee.Contacts?.Relationship,
                    },
                    {
                      label: "رقم الهاتف",
                      value: employee.Contacts?.PhoneNumber,
                    },
                    { label: "العنوان", value: employee.Contacts?.Address },
                  ].map((item, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between"
                    >
                      <span className="text-gray-600">{item.label}</span>
                      <span className="font-medium text-gray-800 text-right max-w-[60%] truncate">
                        {item.value || "غير متوفر"}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === "education" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gray-50 rounded-xl p-5 min-h-[220px]">
                <h3 className="font-semibold text-lg text-gray-800 mb-4 flex items-center gap-2">
                  <GraduationCap className="h-5 w-5 text-blue-600" />
                  <span>المؤهلات التعليمية</span>
                </h3>
                <div className="space-y-3">
                  {[
                    {
                      label: "المؤهل",
                      value: employee.EducationalQualifications?.Qualification,
                    },
                    {
                      label: "التخصص",
                      value: employee.EducationalQualifications?.Specialization,
                    },
                    {
                      label: "الجامعة",
                      value: employee.EducationalQualifications?.University,
                    },
                    {
                      label: "سنة التخرج",
                      value: employee.EducationalQualifications?.GraduationYear,
                    },
                  ].map((item, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between"
                    >
                      <span className="text-gray-600">{item.label}</span>
                      <span className="font-medium text-gray-800 truncate">
                        {item.value || "غير متوفر"}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === "financial" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gray-50 rounded-xl p-5 min-h-[220px]">
                <h3 className="font-semibold text-lg text-gray-800 mb-4 flex items-center gap-2">
                  <CreditCard className="h-5 w-5 text-blue-600" />
                  <span>المعلومات البنكية</span>
                </h3>
                <div className="space-y-3">
                  {[
                    {
                      label: "اسم صاحب الحساب",
                      value: employee.Accounts?.AccountHolderName,
                    },
                    { label: "اسم البنك", value: employee.Accounts?.BankName },
                    {
                      label: "رقم الحساب البنكي",
                      value: employee.Accounts?.BankAccountNumber,
                    },
                  ].map((item, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between"
                    >
                      <span className="text-gray-600">{item.label}</span>
                      <span className="font-medium text-gray-800 truncate">
                        {item.value || "غير متوفر"}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-gray-50 rounded-xl p-5 min-h-[220px]">
                <h3 className="font-semibold text-lg text-gray-800 mb-4 flex items-center gap-2">
                  <FileText className="h-5 w-5 text-blue-600" />
                  <span>المعلومات الأخرى</span>
                </h3>
                <div className="space-y-3">
                  {[
                    {
                      label: "رقم التأمين الاجتماعي",
                      value: employee.Accounts?.SocialInsuranceNumber,
                    },
                    {
                      label: "الراتب",
                      value: employee.Accounts?.Salary
                        ? `$${employee.Accounts?.Salary}`
                        : undefined,
                    },
                  ].map((item, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between"
                    >
                      <span className="text-gray-600">{item.label}</span>
                      <span className="font-medium text-gray-800 truncate">
                        {item.value || "غير متوفر"}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === "schedule" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gray-50 rounded-xl p-5 min-h-[220px]">
                <h3 className="font-semibold text-lg text-gray-800 mb-4 flex items-center gap-2">
                  <Clock className="h-5 w-5 text-blue-600" />
                  <span>جدول العمل</span>
                </h3>
                <div className="space-y-3">
                  {[
                    {
                      label: "وقت البدء",
                      value: employee.WorkSchedule?.StartTime,
                    },
                    {
                      label: "وقت الانتهاء",
                      value: employee.WorkSchedule?.EndTime,
                    },
                  ].map((item, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between"
                    >
                      <span className="text-gray-600">{item.label}</span>
                      <span className="font-medium text-gray-800 truncate">
                        {item.value || "غير متوفر"}
                      </span>
                    </div>
                  ))}

                  <div className="pt-4 mt-4 border-t border-gray-200">
                    <h4 className="font-medium text-gray-700 mb-2">
                      أيام الإجازة الأسبوعية
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {(employee.WorkSchedule?.TimeOff ?? []).length > 0 ? (
                        (employee.WorkSchedule?.TimeOff ?? []).map(
                          (day, idx) => (
                            <span
                              key={idx}
                              className="px-3 py-1.5 bg-amber-50 text-amber-700 rounded-lg"
                            >
                              {day}
                            </span>
                          ),
                        )
                      ) : (
                        <span className="text-gray-500">غير محدد</span>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 rounded-xl p-5 min-h-[220px]">
                <h3 className="font-semibold text-lg text-gray-800 mb-4 flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-blue-600" />
                  <span>رصيد الإجازات</span>
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="from-green-50 to-green-100 border border-green-200 rounded-xl p-4 min-h-[100px] flex items-center gap-3">
                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                      <Calendar className="h-6 w-6 text-green-600" />
                    </div>
                    <div>
                      <p className="text-sm text-green-700">الإجازة السنوية</p>
                      <p className="text-2xl font-bold text-green-900">
                        {employee.WorkSchedule?.AnnualLeave || "0"} يوم
                      </p>
                    </div>
                  </div>

                  <div className="from-blue-50 to-blue-100 border border-blue-200 rounded-xl p-4 min-h-[100px] flex items-center gap-3">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                      <Calendar className="h-6 w-6 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-sm text-blue-700">الإجازة المرضية</p>
                      <p className="text-2xl font-bold text-blue-900">
                        {employee.WorkSchedule?.SickLeave || "0"} يوم
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
