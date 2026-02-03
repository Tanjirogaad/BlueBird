// app/components/Employees.tsx
"use client";

import { useState, useEffect, useMemo } from "react";
import { AlertCircle } from "lucide-react";

import FilterComponent from "./componentsEmployees/FilterComponent";
import EmployeeGridCard from "./componentsEmployees/EmployeeGridCard";
import EmployeeListItem from "./componentsEmployees/EmployeeListItem";
import EmployeeDetailsModal from "./componentsEmployees/EmployeeDetailsModal";

interface PersonalInformation {
  FullName: string;
  NationalIDNumber: string;
  DateOfBirth: string;
  Gender: string;
  Nationality: string;
  Religion: string;
  MaritalStatus: string;
  PersonalPhoto: string;
}

interface Address {
  Governorate: string;
  Area: string;
  DetailedAddress: string;
  PhoneNumbers: string[];
}

interface EducationalQualifications {
  Qualification: string;
  Specialization: string;
  University: string;
  GraduationYear: string;
}

interface JobInformation {
  EmployeeCode: string;
  Department: string;
  JobTitle: string;
  WorkLocation: string;
  HiringDate: string;
  EmploymentStatus: string;
  DirectManagers: string[];
}

interface WorkSchedule {
  StartTime: string;
  EndTime: string;
  TimeOff: string[];
  SickLeave: string;
  AnnualLeave: string;
}

interface Accounts {
  SocialInsuranceNumber: string;
  AccountHolderName: string;
  BankName: string;
  BankAccountNumber: string;
  Documents: any[];
  Salary: string;
}

interface Contacts {
  Relationship: string;
  PersonName: string;
  PhoneNumber: string;
  Address: string;
}

interface Employee {
  PersonalInformation: PersonalInformation;
  Address: Address;
  EducationalQualifications: EducationalQualifications;
  JobInformation: JobInformation;
  WorkSchedule: WorkSchedule;
  Accounts: Accounts;
  Contacts: Contacts;
}

interface EmployeesProps {
  employees: Employee[] | null | undefined;
}

export default function Employees({ employees }: EmployeesProps) {
  const [filteredEmployees, setFilteredEmployees] = useState<Employee[]>([]);
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(
    null,
  );
  const [filters, setFilters] = useState({
    search: "",
    department: "",
    status: "",
  });
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [sortBy, setSortBy] = useState<string>("name");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [loading, setLoading] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<string>("personal");

  // تحميل الموظفين عند بداية التحميل
  useEffect(() => {
    if (employees && Array.isArray(employees)) {
      setLoading(true);
      // small fake delay for UX (كما كان في كودك)
      setTimeout(() => {
        setFilteredEmployees(employees);
        setLoading(false);
      }, 300);
    } else {
      setFilteredEmployees([]);
    }
  }, [employees]);

  // دالة applyFilters المحسّنة والآمنة
  const applyFilters = () => {
    if (!employees || !Array.isArray(employees)) {
      setFilteredEmployees([]);
      return;
    }

    let result = [...employees];

    const search = (filters.search ?? "").trim().toLowerCase();

    // بحث موحّد: يطابق الكود أو الاسم (OR)
    if (search) {
      result = result.filter((emp) => {
        const code = `${emp?.JobInformation?.EmployeeCode ?? ""}`.toLowerCase();
        const name =
          `${emp?.PersonalInformation?.FullName ?? ""}`.toLowerCase();
        return code.includes(search) || name.includes(search);
      });
    }

    // فلترة الإدارة (آمنة)
    if (filters.department) {
      const dept = filters.department.toLowerCase();
      result = result.filter((emp) =>
        `${emp?.JobInformation?.Department ?? ""}`.toLowerCase().includes(dept),
      );
    }

    // فلترة الحالة (آمنة)
    if (filters.status) {
      const status = filters.status.toLowerCase();
      result = result.filter((emp) =>
        `${emp?.JobInformation?.EmploymentStatus ?? ""}`
          .toLowerCase()
          .includes(status),
      );
    }

    // الترتيب
    result.sort((a, b) => {
      let aValue: string | number = "";
      let bValue: string | number = "";

      switch (sortBy) {
        case "name":
          aValue = `${a?.PersonalInformation?.FullName ?? ""}`;
          bValue = `${b?.PersonalInformation?.FullName ?? ""}`;
          break;
        case "code":
          aValue = `${a?.JobInformation?.EmployeeCode ?? ""}`;
          bValue = `${b?.JobInformation?.EmployeeCode ?? ""}`;
          break;
        case "department":
          aValue = `${a?.JobInformation?.Department ?? ""}`;
          bValue = `${b?.JobInformation?.Department ?? ""}`;
          break;
        case "hiringDate":
          // استخدم Date.parse ثم fallback إلى 0 عند الفشل
          aValue = Date.parse(a?.JobInformation?.HiringDate ?? "") || 0;
          bValue = Date.parse(b?.JobInformation?.HiringDate ?? "") || 0;
          break;
        default:
          aValue = `${a?.PersonalInformation?.FullName ?? ""}`;
          bValue = `${b?.PersonalInformation?.FullName ?? ""}`;
      }

      if (sortBy === "hiringDate") {
        return sortOrder === "asc"
          ? (aValue as number) - (bValue as number)
          : (bValue as number) - (aValue as number);
      } else {
        return sortOrder === "asc"
          ? String(aValue).localeCompare(String(bValue))
          : String(bValue).localeCompare(String(aValue));
      }
    });

    setFilteredEmployees(result);
  };

  // تطبيق الفلترة عند تغيير القيم
  useEffect(() => {
    applyFilters();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters, sortBy, sortOrder, employees]);

  const handleFilterChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleEmployeeClick = (employee: Employee) => {
    setSelectedEmployee(employee);
    setActiveTab("personal");
    document.body.style.overflow = "hidden";
  };

  const closeModal = () => {
    setSelectedEmployee(null);
    document.body.style.overflow = "auto";
  };

  const handleSort = (field: string) => {
    if (sortBy === field) {
      setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"));
    } else {
      setSortBy(field);
      setSortOrder("asc");
    }
  };

  const clearFilters = () => {
    setFilters({
      search: "",
      department: "",
      status: "",
    });
  };

  // استخراج الإدارات الفريدة للفلتر
  const uniqueDepartments = useMemo(() => {
    if (!employees || !Array.isArray(employees)) return [];
    return [
      ...new Set(
        employees
          .map((emp) => emp?.JobInformation?.Department)
          .filter((dept): dept is string => !!dept && dept !== "0"),
      ),
    ].sort();
  }, [employees]);

  // استخراج حالات التوظيف الفريدة
  const uniqueStatuses = useMemo(() => {
    if (!employees || !Array.isArray(employees)) return [];
    return [
      ...new Set(
        employees
          .map((emp) => emp?.JobInformation?.EmploymentStatus)
          .filter((status): status is string => !!status && status !== "0"),
      ),
    ].sort();
  }, [employees]);

  // احصائيات الموظفين
  const employeeStats = useMemo(() => {
    if (!employees || !Array.isArray(employees)) return null;

    const total = employees.length;
    const active = employees.filter(
      (emp) =>
        `${emp.JobInformation?.EmploymentStatus ?? ""}`
          .toLowerCase()
          .includes("active") ||
        `${emp.JobInformation?.EmploymentStatus ?? ""}`
          .toLowerCase()
          .includes("مفعل"),
    ).length;
    const managers = employees.filter(
      (emp) =>
        `${emp.JobInformation?.JobTitle ?? ""}`
          .toLowerCase()
          .includes("manager") ||
        `${emp.JobInformation?.JobTitle ?? ""}`.toLowerCase().includes("مدير"),
    ).length;

    return { total, active, managers };
  }, [employees]);

  // إذا كانت البيانات غير متاحة
  if (!employees) {
    return (
      <div className="p-6 text-center">
        <div className="text-gray-500">لا توجد بيانات للموظفين</div>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-6">
      {/* Header مع احصائيات */}
      <div className="mb-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">
              إدارة الموظفين
            </h1>
            <p className="text-gray-600">عرض وتصفية وإدارة بيانات الموظفين</p>
          </div>
        </div>
      </div>

      {/* مكون الفلتر */}
      <FilterComponent
        filters={filters}
        onFilterChange={handleFilterChange}
        onClearFilters={clearFilters}
        viewMode={viewMode}
        onViewModeChange={setViewMode}
        filteredCount={filteredEmployees.length}
        totalCount={employees.length}
      />

      {/* حالة التحميل */}
      {loading && (
        <div className="flex justify-center items-center py-12">
          <div className="flex flex-col items-center space-y-3">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            <p className="text-gray-600">جاري تحميل بيانات الموظفين...</p>
          </div>
        </div>
      )}

      {/* قائمة الموظفين */}
      {!loading && (
        <>
          {viewMode === "grid" ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {filteredEmployees.length > 0 ? (
                filteredEmployees.map((employee, index) => (
                  <EmployeeGridCard
                    key={index}
                    employee={employee}
                    onClick={handleEmployeeClick}
                    viewMode={viewMode}
                  />
                ))
              ) : (
                <div className="col-span-full text-center py-12">
                  <div className="w-24 h-24 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                    <AlertCircle className="h-12 w-12 text-gray-400" />
                  </div>
                  <h3 className="text-lg font-medium text-gray-800 mb-2">
                    لا توجد نتائج
                  </h3>
                  <p className="text-gray-600 mb-4">
                    لم نتمكن من العثور على موظفين مطابقين لمعايير البحث
                  </p>
                  <button
                    onClick={clearFilters}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    مسح جميع الفلاتر
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th className="py-3 px-4 text-right text-sm font-medium text-gray-700">
                        الموظف
                      </th>
                      <th className="py-3 px-4 text-right text-sm font-medium text-gray-700">
                        الكود
                      </th>
                      <th className="py-3 px-4 text-right text-sm font-medium text-gray-700">
                        الإدارة
                      </th>
                      <th className="py-3 px-4 text-right text-sm font-medium text-gray-700">
                        الارقام الشخصية
                      </th>
                      <th className="py-3 px-4 text-right text-sm font-medium text-gray-700">
                        حالة التوظيف
                      </th>
                      <th className="py-3 px-4 text-right text-sm font-medium text-gray-700">
                        تاريخ التعيين
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {filteredEmployees.length > 0 ? (
                      filteredEmployees.map((employee, index) => (
                        <EmployeeListItem
                          key={index}
                          employee={employee}
                          onClick={handleEmployeeClick}
                          viewMode={viewMode}
                        />
                      ))
                    ) : (
                      <tr>
                        <td colSpan={7} className="py-12 text-center">
                          <div className="flex flex-col items-center justify-center">
                            <AlertCircle className="h-12 w-12 text-gray-400 mb-4" />
                            <p className="text-gray-600">
                              لا توجد نتائج مطابقة للبحث
                            </p>
                          </div>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </>
      )}

      {/* نافذة تفاصيل الموظف */}
      {selectedEmployee && (
        <EmployeeDetailsModal
          employee={selectedEmployee}
          isOpen={!!selectedEmployee}
          onClose={closeModal}
          activeTab={activeTab}
          onTabChange={setActiveTab}
        />
      )}
    </div>
  );
}
