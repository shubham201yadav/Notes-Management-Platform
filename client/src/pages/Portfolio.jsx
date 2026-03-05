import MainLayout from "../components/MainLayout";
import { ShieldCheck, LayoutDashboard, FileDown, Rocket, Smartphone, Cloud } from "lucide-react";

const Portfolio = () => {

  const projects = [
    {
      title: "Secure Authentication",
      desc: "JWT & Bcrypt based secure login system.",
      icon: <ShieldCheck className="w-6 h-6" />
    },
    {
      title: "Role-Based Dashboards",
      desc: "Separate interfaces for Admin, SubAdmin & Students.",
      icon: <LayoutDashboard className="w-6 h-6" />
    },
    {
      title: "Digital Notes Repository",
      desc: "Centralized hub for notes and PDFs.",
      icon: <FileDown className="w-6 h-6" />
    },
    {
      title: "Real-time Notifications",
      desc: "Instant academic updates.",
      icon: <Rocket className="w-6 h-6" />
    },
    {
      title: "Responsive Design",
      desc: "Fully mobile optimized platform.",
      icon: <Smartphone className="w-6 h-6" />
    },
    {
      title: "Cloud Infrastructure",
      desc: "MongoDB powered scalable backend.",
      icon: <Cloud className="w-6 h-6" />
    }
  ];

  return (
    <MainLayout>

      <div className="pt-24 bg-slate-50 min-h-screen">

        {/* Header */}
        <div className="py-16 text-center">
          <h1 className="text-4xl font-bold text-slate-900">
            A Complete Digital Ecosystem
          </h1>
          <p className="text-gray-600 mt-4">
            Built using MERN stack with secure architecture.
          </p>
        </div>

        {/* Grid */}
        <div className="max-w-7xl mx-auto px-6 pb-24 grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((item, index) => (
            <div
              key={index}
              className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm hover:shadow-lg transition"
            >
              <div className="mb-4 text-indigo-600">
                {item.icon}
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">
                {item.title}
              </h3>
              <p className="text-gray-600 text-sm">
                {item.desc}
              </p>
            </div>
          ))}
        </div>

      </div>

    </MainLayout>
  );
};

export default Portfolio;