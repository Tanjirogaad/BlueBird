"use client";
import axios from "axios";
import { useState, FormEvent } from "react";

import PersonalInformation from "./components/PersonalInformation";
import Address from "./components/Address";
import EducationalQualifications from "./components/EducationalQualifications";
import JobInformation from "./components/JobInformation";
import WorkSchedule from "./components/WorkSchedule";
import Accounts from "./components/Accounts";
import Contacts from "./components/Contacts";
import Account from "./components/Account";

import {
  FaUserPlus,
  FaPaperPlane,
  FaTimes,
  FaCheck,
  FaUser,
  FaHome,
  FaGraduationCap,
  FaBriefcase,
  FaClock,
  FaCreditCard,
  FaPhone,
  FaKey,
} from "react-icons/fa";

export default function RegisterEmployees() {
  const [formData, setFormData] = useState({
    PersonalInformation: {
      FullName: "",
      NationalIDNumber: "",
      DateOfBirth: "",
      Gender: "",
      Nationality: "مصري",
      Religion: "مسلم",
      MaritalStatus: "",
      PersonalPhoto: "",
    },
    Address: {
      Governorate: "",
      Area: "",
      DetailedAddress: "",
      PhoneNumbers: [""],
    },
    EducationalQualifications: {
      Qualification: "",
      Specialization: "",
      University: "",
      GraduationYear: "",
    },
    JobInformation: {
      EmployeeCode: "",
      Department: "",
      JobTitle: "",
      WorkLocation: "6 اكتوبر الحي 11",
      HiringDate: "",
      EmploymentStatus: "",
      DirectManagers: [""],
    },
    WorkSchedule: {
      StartTime: "",
      EndTime: "",
      TimeOff: [] as string[],
      SickLeave: "365",
      AnnualLeave: "",
    },
    Accounts: {
      SocialInsuranceNumber: "",
      AccountHolderName: "",
      BankName: "",
      BankAccountNumber: "",
      Documents: [],
    },
    Contacts: {
      Relationship: "",
      PersonName: "",
      PhoneNumber: "",
      Address: "",
    },
    Account: {
      email: "",
      password: "",
    },
  });

  // دالة لتعديل البيانات
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
    section: string,
    field: string
  ) => {
    const value = e.target.value;

    setFormData((prev) => {
      if (section === "Address" && field === "Governorate") {
        return {
          ...prev,
          Address: {
            ...prev.Address,
            Governorate: value,
            Area: "",
          },
        };
      }

      return {
        ...prev,
        [section]: {
          ...prev[section as keyof typeof prev],
          [field]: value,
        },
      };
    });
  };

  // دالة لإضافة رقم هاتف جديد
  const handleAddPhoneNumber = () => {
    setFormData((prev) => ({
      ...prev,
      Address: {
        ...prev.Address,
        PhoneNumbers: [...prev.Address.PhoneNumbers, ""],
      },
    }));
  };

  // دالة لحذف رقم هاتف
  const handleRemovePhoneNumber = (index: number) => {
    setFormData((prev) => {
      const newPhoneNumbers = [...prev.Address.PhoneNumbers];
      newPhoneNumbers.splice(index, 1);
      return {
        ...prev,
        Address: {
          ...prev.Address,
          PhoneNumbers: newPhoneNumbers.length > 0 ? newPhoneNumbers : [""],
        },
      };
    });
  };

  // دالة لتغيير قيمة رقم هاتف معين
  const handlePhoneNumberChange = (index: number, value: string) => {
    setFormData((prev) => {
      const newPhoneNumbers = [...prev.Address.PhoneNumbers];
      newPhoneNumbers[index] = value;
      return {
        ...prev,
        Address: {
          ...prev.Address,
          PhoneNumbers: newPhoneNumbers,
        },
      };
    });
  };

  // دالة لإضافة مدير مباشر جديد
  const handleAddDirectManager = () => {
    setFormData((prev) => ({
      ...prev,
      JobInformation: {
        ...prev.JobInformation,
        DirectManagers: [...prev.JobInformation.DirectManagers, ""],
      },
    }));
  };

  // دالة لحذف مدير مباشر
  const handleRemoveDirectManager = (index: number) => {
    setFormData((prev) => {
      const newDirectManagers = [...prev.JobInformation.DirectManagers];
      newDirectManagers.splice(index, 1);
      return {
        ...prev,
        JobInformation: {
          ...prev.JobInformation,
          DirectManagers:
            newDirectManagers.length > 0 ? newDirectManagers : [""],
        },
      };
    });
  };

  // دالة لتغيير قيمة مدير مباشر معين
  const handleDirectManagerChange = (index: number, value: string) => {
    setFormData((prev) => {
      const newDirectManagers = [...prev.JobInformation.DirectManagers];
      newDirectManagers[index] = value;
      return {
        ...prev,
        JobInformation: {
          ...prev.JobInformation,
          DirectManagers: newDirectManagers,
        },
      };
    });
  };

  // دالة للتعامل مع أيام الإجازة
  const handleTimeOffChange = (dayId: any) => {
    setFormData((prev) => {
      const currentTimeOff = [...prev.WorkSchedule.TimeOff];
      const index = currentTimeOff.indexOf(dayId);

      if (index > -1) {
        // إذا اليوم موجود، قم بإزالته
        currentTimeOff.splice(index, 1);
      } else {
        // إذا اليوم غير موجود، قم بإضافته
        currentTimeOff.push(dayId);
      }

      return {
        ...prev,
        WorkSchedule: {
          ...prev.WorkSchedule,
          TimeOff: currentTimeOff,
        },
      };
    });
  };
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:4000/api/employee/register-employee",
        formData
      );
      console.log(response);
      alert("تم تسجيل الموظف بنجاح!");
    } catch (error) {
      console.error(error);
      alert("حدث خطأ أثناء تسجيل الموظف");
      console.log(error);
    }
  };

  const sections = [
    {
      id: "personal",
      title: "معلومات شخصية",
      icon: <FaUser />,
      component: (
        <PersonalInformation
          data={formData.PersonalInformation}
          onChange={(e, field) => handleChange(e, "PersonalInformation", field)}
        />
      ),
    },
    {
      id: "address",
      title: "العنوان",
      icon: <FaHome />,
      component: (
        <Address
          data={formData.Address}
          onChange={(e, field) => handleChange(e, "Address", field)}
          onAddPhoneNumber={handleAddPhoneNumber}
          onRemovePhoneNumber={handleRemovePhoneNumber}
          onPhoneNumberChange={handlePhoneNumberChange}
        />
      ),
    },
    {
      id: "education",
      title: "المؤهلات",
      icon: <FaGraduationCap />,
      component: (
        <EducationalQualifications
          data={formData.EducationalQualifications}
          onChange={(e, field) =>
            handleChange(e, "EducationalQualifications", field)
          }
        />
      ),
    },
    {
      id: "job",
      title: "معلومات الوظيفة",
      icon: <FaBriefcase />,
      component: (
        <JobInformation
          data={formData.JobInformation}
          onChange={(e, field) => handleChange(e, "JobInformation", field)}
          onAddDirectManager={handleAddDirectManager}
          onRemoveDirectManager={handleRemoveDirectManager}
          onDirectManagerChange={handleDirectManagerChange}
        />
      ),
    },
    {
      id: "schedule",
      title: "جدول العمل",
      icon: <FaClock />,
      component: (
        <WorkSchedule
          data={formData.WorkSchedule}
          onChange={(e, field) => handleChange(e, "WorkSchedule", field)}
          onTimeOffChange={handleTimeOffChange}
        />
      ),
    },
    {
      id: "accounts",
      title: "حسابات بنكية",
      icon: <FaCreditCard />,
      component: (
        <Accounts
          data={formData.Accounts}
          onChange={(e, field) => handleChange(e, "Accounts", field)}
        />
      ),
    },
    {
      id: "contacts",
      title: "جهات الاتصال",
      icon: <FaPhone />,
      component: (
        <Contacts
          data={formData.Contacts}
          onChange={(e, field) => handleChange(e, "Contacts", field)}
        />
      ),
    },
    {
      id: "account",
      title: "حساب النظام",
      icon: <FaKey />,
      component: (
        <Account
          data={formData.Account}
          onChange={(e, field) => handleChange(e, "Account", field)}
        />
      ),
    },
  ];

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-50 via-white to-gray-50 p-4 md:p-6 pb-20">
      <div className="max-w-7xl mx-auto">
        {/* Header Card */}
        <div className="relative bg-white rounded-3xl shadow-xl shadow-gray-200/50 border border-gray-100 p-8 mb-10 overflow-hidden group">
          <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-blue-50/50 rounded-full blur-3xl group-hover:bg-blue-100/50 transition-colors duration-500"></div>
          <div className="relative flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="flex items-center gap-5">
              <div className="p-4 bg-linear-to-br from-blue-600 to-indigo-700 rounded-2xl text-white shadow-lg shadow-blue-500/30">
                <FaUserPlus className="text-2xl" />
              </div>
              <div>
                <h1 className="text-3xl font-black text-gray-900 mb-1 tracking-tight">
                  تسجيل موظف جديد
                </h1>
                <p className="text-gray-500 font-medium">
                  نظام إدارة الموارد البشرية المتكامل
                </p>
              </div>
            </div>

            <div className="flex items-center gap-6 bg-gray-50/80 px-6 py-3 rounded-2xl border border-gray-100 backdrop-blur-sm">
              <div className="text-center">
                <div className="text-2xl font-black text-blue-600">8</div>
                <div className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                  أقسام
                </div>
              </div>
              <div className="h-10 w-px bg-gray-200"></div>
              <div className="text-center">
                <div className="text-2xl font-black text-emerald-500">25</div>
                <div className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                  حقل مطلوب
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex flex-col lg:flex-row gap-10">
          {/* Sidebar Navigation */}
          <div className="hidden lg:block lg:w-1/4">
            <div className="bg-white rounded-3xl shadow-xl shadow-gray-200/40 border border-gray-100 p-6 sticky top-8">
              <h3 className="text-lg font-bold text-gray-900 mb-6 pb-4 border-b border-gray-100 flex items-center gap-2">
                <span className="w-1.5 h-6 bg-blue-600 rounded-full"></span>
                خارطة الطريق
              </h3>

              <nav className="space-y-4">
                {sections.map((section, index) => (
                  <div key={section.id} className="relative group">
                    <a
                      href={`#${section.id}`}
                      className="flex items-center gap-4 p-3 rounded-xl hover:bg-gray-50 transition-all duration-200 cursor-pointer"
                    >
                      <div className="relative">
                        <div className="w-10 h-10 flex items-center justify-center rounded-xl bg-gray-50 text-gray-400 group-hover:bg-blue-50 group-hover:text-blue-600 transition-colors shadow-sm">
                          {section.icon}
                        </div>
                        {index < sections.length - 1 && (
                          <div className="absolute top-10 left-1/2 -ml-px w-0.5 h-6 bg-gray-100 group-hover:bg-blue-100/50 transition-colors"></div>
                        )}
                      </div>
                      <div className="flex-1">
                        <div className="font-bold text-gray-700 group-hover:text-gray-900 transition-colors">
                          {section.title}
                        </div>
                        <div className="text-xs font-medium text-gray-400 mt-0.5">
                          الخطوة {index + 1}
                        </div>
                      </div>
                    </a>
                  </div>
                ))}
              </nav>

              <div className="mt-8 pt-6 border-t border-gray-100">
                <div className="flex items-center gap-3 text-sm font-medium text-gray-500 bg-gray-50 p-3 rounded-xl border border-gray-100">
                  <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
                  <span>الحفظ التلقائي مفعل</span>
                </div>
              </div>
            </div>
          </div>

          {/* Form Sections */}
          <div className="lg:w-3/4">
            <div className="space-y-8">
              {sections.map((section, index) => (
                <div key={index} id={section.id} className="scroll-mt-24">
                  {section.component}
                </div>
              ))}
            </div>

            {/* Form Actions */}
            <div className="mt-12">
              <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/50 p-6 md:p-8 ring-1 ring-gray-900/5">
                <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
                  <div className="flex items-center gap-4 text-gray-700">
                    <div className="p-3 bg-blue-50 rounded-2xl text-blue-600">
                      <FaPaperPlane className="text-xl" />
                    </div>
                    <div>
                      <p className="font-bold text-gray-900">جاهز للإرسال؟</p>
                      <p className="text-sm font-medium text-gray-500">
                        يرجى مراجعة البيانات بدقة قبل الاعتماد النهائي
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 w-full sm:w-auto">
                    <button
                      type="button"
                      onClick={() => {
                        if (confirm("هل أنت متأكد من إلغاء التسجيل؟")) {
                          window.location.reload();
                        }
                      }}
                      className="flex-1 sm:flex-none px-6 py-4 border border-gray-200 text-gray-600 font-bold rounded-2xl hover:bg-gray-50 hover:text-gray-900 hover:border-gray-300 transition-all duration-200 flex items-center justify-center gap-2 focus:ring-4 focus:ring-gray-100"
                    >
                      <FaTimes />
                      <span>إلغاء</span>
                    </button>

                    <button
                      onClick={handleSubmit}
                      className="flex-1 sm:flex-none px-8 py-4 bg-linear-to-r from-blue-600 to-indigo-600 text-white font-bold rounded-2xl hover:from-blue-700 hover:to-indigo-700 hover:shadow-lg hover:shadow-blue-500/30 transition-all duration-200 flex items-center justify-center gap-3 transform active:scale-95 focus:ring-4 focus:ring-blue-500/20"
                    >
                      <FaCheck />
                      <span>تسجيل الموظف</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
