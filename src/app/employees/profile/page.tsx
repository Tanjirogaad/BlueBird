"use client";
import { useEffect, useState } from "react";
import axios, { AxiosError } from "axios";
import Loading from "./components/Loading";
import EmployeeProfile from "./components/EmployeeProfile";
import { useRouter } from "next/navigation";
import Navbar from "./components/Navbar";
import CompanyRules from "./components/CompanyRules";
import Employees from "./components/Employees";
import Companies from "./components/Companies";
import Drivers from "./components/Driver";

interface Employee {
  FullName: string;
  EmployeeCode: string;
  AnnualLeave?: string;
  data?: [];
}

interface ProfileResponse {
  employee: Employee;
}

interface RefreshTokenResponse {
  accessToken: string;
}

type Tab = "profile" | "rules" | "employees" | "companies" | "drivers";

export default function ProfilePage() {
  const router = useRouter();
  const [data, setData] = useState<Employee | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [admin, setAdmin] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<Tab>("profile");
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);
  const [isMobile, setIsMobile] = useState<boolean>(false);

  const fetchProfile = async (): Promise<Employee> => {
    const accessToken = localStorage.getItem("accessToken");
    if (!accessToken) throw new Error("No access token found");

    const res = await axios.get<ProfileResponse>(
      "http://192.168.1.168:4000/api/employee/profile",
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      },
    );
    return res.data.employee;
  };

  const refreshToken = async (): Promise<string> => {
    const refreshToken = localStorage.getItem("refreshToken");
    if (!refreshToken) throw new Error("No refresh token found");

    const res = await axios.post<RefreshTokenResponse>(
      "http://192.168.1.168:4000/api/employee/refresh-token",
      { refreshtoken: refreshToken },
    );
    return res.data.accessToken;
  };

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const employee = await fetchProfile();
        setData(employee);
        if ([1, 2, 3, 8, 10].includes(+employee?.EmployeeCode)) {
          setAdmin(true);
        }
        const token = localStorage.getItem("accessToken");
        if (!token) {
          router.push("/");
        }
      } catch (err) {
        const error = err as AxiosError;
        if (error.response?.status === 401) {
          try {
            const newAccessToken = await refreshToken();
            localStorage.setItem("accessToken", newAccessToken);

            const employee = await fetchProfile();
            setData(employee);
          } catch (refreshErr) {
            const refreshError = refreshErr as AxiosError;
            if (refreshError.response?.status === 401) {
              localStorage.removeItem("accessToken");
              localStorage.removeItem("refreshToken");
              router.push("/");
            } else {
              console.error("Failed to refresh token:", refreshErr);
            }
          }
        } else {
          console.error("Failed to fetch profile:", err);
        }
      } finally {
        setLoading(false);
      }
    };

    loadProfile();
  }, [router]);

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      if (!mobile) {
        setIsSidebarOpen(true);
      } else {
        setIsSidebarOpen(false);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="flex flex-col md:flex-row gap-4 md:gap-6 p-4 md:p-6">
        {isMobile && (
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="md:hidden flex items-center justify-center p-3 bg-blue-600 text-white rounded-lg mb-4 font-medium"
          >
            <span className="ml-2">☰</span>
            {isSidebarOpen ? "إغلاق القائمة" : "فتح القائمة"}
          </button>
        )}

        <aside
          className={`
            ${isMobile ? (isSidebarOpen ? "block" : "hidden") : "block"}
             md:w-48
            flex flex-col gap-3
            bg-white md:bg-transparent
            p-4 md:p-0
            rounded-lg md:rounded-none
            shadow-lg md:shadow-none
            mb-4 md:mb-0
            z-30 md:z-auto
            ${isMobile && isSidebarOpen ? "fixed inset-y-0 left-0 right-0 top-16 h-[calc(100vh-64px)] overflow-y-auto" : ""}
          `}
        >
          {isMobile && isSidebarOpen && (
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-bold text-lg">القائمة</h3>
              <button
                onClick={() => setIsSidebarOpen(false)}
                className="p-2 text-red-600 hover:bg-red-50 rounded-full"
              >
                ✕
              </button>
            </div>
          )}

          <button
            onClick={() => {
              setActiveTab("profile");
              if (isMobile) setIsSidebarOpen(false);
            }}
            className={`
              py-3 px-4 rounded-lg text-right font-medium transition-all duration-200
              whitespace-nowrap flex items-center justify-end gap-2
              ${
                activeTab === "profile"
                  ? "bg-blue-100 border-2 border-blue-600 font-semibold text-blue-700"
                  : "bg-white border border-gray-300 hover:bg-gray-100 hover:border-gray-400"
              }
            `}
          >
            <span>📋</span>
            <span>معلوماتي</span>
          </button>

          <button
            onClick={() => {
              setActiveTab("rules");
              if (isMobile) setIsSidebarOpen(false);
            }}
            className={`
              py-3 px-4 rounded-lg text-right font-medium transition-all duration-200
              whitespace-nowrap flex items-center justify-end gap-2
              ${
                activeTab === "rules"
                  ? "bg-blue-100 border-2 border-blue-600 font-semibold text-blue-700"
                  : "bg-white border border-gray-300 hover:bg-gray-100 hover:border-gray-400"
              }
            `}
          >
            <span>📜</span>
            <span>سياسة الشركة</span>
          </button>

          {admin && (
            <>
              <button
                onClick={() => {
                  setActiveTab("employees");
                  if (isMobile) setIsSidebarOpen(false);
                }}
                className={`
                py-3 px-4 rounded-lg text-right font-medium transition-all duration-200
                whitespace-nowrap flex items-center justify-end gap-2
                ${
                  activeTab === "employees"
                    ? "bg-blue-100 border-2 border-blue-600 font-semibold text-blue-700"
                    : "bg-white border border-gray-300 hover:bg-gray-100 hover:border-gray-400"
                }
              `}
              >
                <span>👥</span>
                <span>الموظفين</span>
              </button>

              <button
                onClick={() => {
                  setActiveTab("companies");
                  if (isMobile) setIsSidebarOpen(false);
                }}
                className={`
                py-3 px-4 rounded-lg text-right font-medium transition-all duration-200
                whitespace-nowrap flex items-center justify-end gap-2
                ${
                  activeTab === "companies"
                    ? "bg-blue-100 border-2 border-blue-600 font-semibold text-blue-700"
                    : "bg-white border border-gray-300 hover:bg-gray-100 hover:border-gray-400"
                }
              `}
              >
                <span>🏢</span>
                <span>الشركات</span>
              </button>

              <button
                onClick={() => {
                  setActiveTab("drivers");
                  if (isMobile) setIsSidebarOpen(false);
                }}
                className={`
                py-3 px-4 rounded-lg text-right font-medium transition-all duration-200
                whitespace-nowrap flex items-center justify-end gap-2
                ${
                  activeTab === "drivers"
                    ? "bg-blue-100 border-2 border-blue-600 font-semibold text-blue-700"
                    : "bg-white border border-gray-300 hover:bg-gray-100 hover:border-gray-400"
                }
              `}
              >
                <span>🏢</span>
                <span>السائقين</span>
              </button>
            </>
          )}
        </aside>

        {/* Overlay for mobile sidebar */}
        {isMobile && isSidebarOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-30 z-20"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}

        {/* Main Content */}
        <main className="flex-1 w-full min-h-[calc(100vh-120px)]">
          <div className="bg-white rounded-lg shadow-sm p-4 md:p-6 w-full">
            {!loading && activeTab === "profile" && data && (
              <EmployeeProfile employee={data} />
            )}

            {!loading && activeTab === "employees" && data && (
              <Employees employees={data.data || []} />
            )}

            {!loading && activeTab === "companies" && data && <Companies />}
            {!loading && activeTab === "drivers" && data && <Drivers />}

            {!loading && activeTab === "profile" && !data && (
              <div className="text-center py-8 text-gray-500">
                <p className="text-lg">لم يتم العثور على بيانات الموظف.</p>
              </div>
            )}

            {!loading && activeTab === "rules" && <CompanyRules />}

            {loading && (
              <div className="flex justify-center items-center py-8">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
                <span className="mr-3 text-gray-600">جاري التحميل...</span>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
