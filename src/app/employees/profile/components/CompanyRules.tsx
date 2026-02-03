import {
  Clock,
  Fingerprint,
  AlertCircle,
  HandCoins,
  Timer,
} from "lucide-react";

export default function CompanyRules() {
  const rules = [
    {
      icon: HandCoins,
      title: "سياسة السلف",
      description:
        "لا تُصرف أي سلفة إلا بعد اليوم 15 من الشهر، وبموافقة مجلس الإدارة. ويُحدد مبلغ السلفة وفقًا لما يقرره المجلس.",
    },
    {
      icon: Clock,
      title: "الوقت الإضافي",
      description: "لا يُحتسب أي وقت إضافي إلا بموافقة المدير المباشر.",
    },
    {
      icon: Fingerprint,
      title: "تسجيل الحضور",
      description:
        "في حال نسيان تسجيل بصمة الحضور أو الانصراف، يُحتسب الموظف غائبًا.",
    },
    {
      icon: Timer,
      title: "سياسة التأخير",
      description:
        "مدة التأخير المسموح بها هي 30 دقيقة. أي تأخير عن 30 دقيقة في الحضور أو الانصراف يُحتسب متأخر.",
    },
  ];

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-50 to-blue-50 p-4 md:p-6 rtl">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
            📋 سياسة الشركة
          </h1>
          <p className="text-gray-600 text-lg">
            هذه القواعد والإجراءات تساعدنا على الحفاظ على بيئة عمل منظمة وفعالة
          </p>
        </div>

        {/* Rules Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {rules.map((rule, index) => {
            const IconComponent = rule.icon;
            return (
              <div
                key={index}
                className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200 p-6 transform hover:-translate-y-1"
              >
                <div className="flex items-start gap-4">
                  {/* Icon Container */}
                  <div>
                    <div className="p-3 rounded-xl bg-blue-100 text-blue-600">
                      <IconComponent className="w-7 h-7" />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-xl font-semibold text-gray-900">
                        {rule.title}
                      </h3>
                      <span className="text-xs font-medium px-3 py-1 rounded-full bg-gray-100 text-gray-800">
                        #{index + 1}
                      </span>
                    </div>

                    <p className="text-gray-700 leading-relaxed text-justify">
                      {rule.description}
                    </p>

                    {/* Decorative Element */}
                    <div className="mt-4 pt-4 border-t border-gray-100">
                      <div className="flex items-center text-sm text-gray-500">
                        <AlertCircle className="w-4 h-4 ml-1" />
                        <span>
                          هام: الالتزام بهذه القواعد إلزامي لجميع الموظفين
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
