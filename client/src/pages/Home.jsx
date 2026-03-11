import MainLayout from "../components/MainLayout";
import { BookOpen, Monitor, ShieldCheck, Download } from "lucide-react";

const Home = () => {
  return (
    <MainLayout>

      {/* ================= HERO SECTION ================= */}
      <section className="relative pt-32 pb-24 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-20 left-10 w-72 h-72 bg-purple-500 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-indigo-500 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center relative z-10">

          <div>
            <span className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-400 to-orange-500 text-slate-900 font-bold px-4 py-2 rounded-full text-xs uppercase tracking-wide shadow-lg">
              <span className="w-2 h-2 bg-slate-900 rounded-full animate-pulse"></span>
              Premium Geography Education
            </span>

            <h1 className="text-5xl md:text-6xl lg:text-7xl font-black mt-6 leading-tight">
              Master Geography with <br />
              <span className="bg-gradient-to-r from-amber-400 via-orange-500 to-pink-500 bg-clip-text text-transparent">
                Newtan Mandal
              </span>
            </h1>

            <p className="mt-6 text-gray-300 text-lg leading-relaxed">
              Expert Geography education platform by Newtan Mandal. Access comprehensive study materials,
              notes, and resources designed for school and college excellence.
            </p>

            <div className="mt-10 flex flex-col sm:flex-row gap-4">
              <a
                href="/login"
                className="group relative bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white px-8 py-4 rounded-xl font-bold transition-all inline-block shadow-xl hover:shadow-2xl hover:scale-105 overflow-hidden"
              >
                <span className="relative z-10">Get Started</span>
                <div className="absolute inset-0 bg-gradient-to-r from-white/0 to-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
              </a>


            </div>

            <p className="mt-6 text-sm text-amber-300/90 font-medium tracking-wide">
              Developed by Sampad Biswas
            </p>
          </div>

          {/* Right Card */}
          <div className="hidden md:block">
            <div className="relative bg-gradient-to-br from-white/10 to-white/5 border border-white/20 rounded-3xl p-8 backdrop-blur-xl shadow-2xl">
              <div className="absolute inset-0 bg-gradient-to-br from-amber-500/10 to-purple-500/10 rounded-3xl"></div>
              <div className="grid grid-cols-2 gap-6 relative z-10">
                <div className="bg-gradient-to-br from-amber-500 to-orange-600 p-6 rounded-2xl text-center shadow-2xl transform hover:scale-105 transition-transform">
                  <p className="text-3xl font-black">Geography</p>
                  <p className="text-white/90 text-sm font-semibold mt-1">Expert Teaching</p>
                </div>
                <div className="bg-gradient-to-br from-purple-600 to-indigo-700 p-6 rounded-2xl text-center shadow-2xl transform hover:scale-105 transition-transform">
                  <p className="text-3xl font-black">24/7</p>
                  <p className="text-purple-100 text-sm font-semibold mt-1">Access Materials</p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ================= FEATURES SECTION ================= */}
      <section className="py-24 bg-gradient-to-b from-slate-50 to-white relative">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(168,85,247,0.08),transparent_50%),radial-gradient(circle_at_70%_80%,rgba(251,146,60,0.08),transparent_50%)]"></div>
        
        <div className="max-w-7xl mx-auto px-6 relative z-10">

          <div className="text-center mb-16">
            <span className="inline-block px-4 py-2 bg-gradient-to-r from-amber-100 to-orange-100 text-amber-800 rounded-full text-sm font-bold mb-4">
              Premium Features
            </span>
            <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-4">
              Why Learn with <span className="bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">Newtan's Unity?</span>
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Comprehensive Geography education with expert guidance from Newtan Mandal.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">

            <FeatureCard
              icon={<Monitor className="w-8 h-8 text-amber-600" />}
              title="Digital Learning"
              desc="Access Geography study materials, notes, and resources online anytime, anywhere."
            />

            <FeatureCard
              icon={<BookOpen className="w-8 h-8 text-orange-600" />}
              title="Expert Content"
              desc="Curated Geography notes and materials by Newtan Mandal for school & college students."
            />

            <FeatureCard
              icon={<ShieldCheck className="w-8 h-8 text-amber-600" />}
              title="Secure Access"
              desc="Safe and organized platform with role-based access for students and admins."
            />

          </div>
        </div>
      </section>

      {/* ================= CTA SECTION ================= */}
      <section className="py-24 bg-gradient-to-b from-white to-slate-100">
        <div className="max-w-6xl mx-auto px-6">

          <div className="relative bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 rounded-3xl p-12 md:p-16 text-white overflow-hidden shadow-2xl">
            {/* Animated Background */}
            <div className="absolute inset-0 opacity-30">
              <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500 rounded-full blur-3xl"></div>
              <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-500 rounded-full blur-3xl"></div>
            </div>

            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="max-w-xl text-center md:text-left">
                <h2 className="text-3xl md:text-4xl font-black mb-4">
                  Start Your Geography Journey
                </h2>
                <p className="text-gray-300 text-lg">
                  Join Newtan's Unity and access comprehensive Geography study materials,
                  expert notes, and resources designed for your success.
                </p>
              </div>

              <a
                href="/login"
                className="group relative flex items-center gap-2 bg-gradient-to-r from-amber-500 to-orange-600 text-white px-8 py-4 rounded-xl font-bold shadow-xl hover:shadow-2xl hover:scale-105 transition-all overflow-hidden"
              >
                <span className="relative z-10 flex items-center gap-2">
                  <Download className="w-5 h-5" />
                  Access Dashboard
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-white/0 to-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
              </a>
            </div>

          </div>
        </div>
      </section>

    </MainLayout>
  );
};


// ================= Feature Card Component =================
const FeatureCard = ({ icon, title, desc }) => (
  <div className="group relative p-8 bg-white border border-gray-100 rounded-2xl hover:shadow-2xl transition-all duration-300 overflow-hidden">
    {/* Gradient overlay on hover */}
    <div className="absolute inset-0 bg-gradient-to-br from-amber-50 to-orange-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
    
    <div className="relative z-10">
      <div className="mb-4 inline-flex p-4 bg-gradient-to-br from-amber-100 to-orange-100 rounded-xl group-hover:scale-110 transition-transform duration-300">
        {icon}
      </div>
      <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-amber-700 transition-colors">{title}</h3>
      <p className="text-gray-600 leading-relaxed">{desc}</p>
    </div>
    
    {/* Decorative element */}
    <div className="absolute -bottom-2 -right-2 w-24 h-24 bg-gradient-to-br from-amber-400/20 to-orange-500/20 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-500"></div>
  </div>
);

export default Home;