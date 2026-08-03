import MainLayout from "../components/MainLayout";
import { Award, Users, TrendingUp, GraduationCap, Star, Target } from "lucide-react";

const About = () => {
  return (
    <MainLayout>
      <div className="pt-0">
        {/* Hero Section */}
        <section className="relative pt-32 pb-20 bg-gradient-to-br from-slate-950 via-purple-900 to-slate-950 text-white overflow-hidden">
          <div className="absolute inset-0 opacity-30">
            <div className="absolute top-32 left-20 w-80 h-80 bg-amber-500 rounded-full blur-3xl"></div>
            <div className="absolute bottom-40 right-20 w-96 h-96 bg-purple-500 rounded-full blur-3xl"></div>
          </div>

          <div className="max-w-7xl mx-auto px-6 relative z-10">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
                  <span className="text-white">About </span>
                  <span className="bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent">This Demo</span>
                </h1>

                <p className="text-gray-300 text-lg mb-8 leading-relaxed max-w-xl">
                  This page is a demo showcase for an education-themed website. The content shown here is fictional and intended only for interface preview.
                </p>

                <div className="flex gap-3 mb-8">
                  <div className="bg-white/10 backdrop-blur-sm border border-amber-400/50 rounded-lg px-4 py-2">
                    <p className="text-amber-300 text-sm font-semibold">Demo Profile</p>
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm border border-amber-400/50 rounded-lg px-4 py-2">
                    <p className="text-amber-300 text-sm font-semibold">Sample Content</p>
                  </div>
                </div>

                <a
                  href="/register"
                  className="inline-block bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white px-8 py-4 rounded-lg font-semibold transition-all shadow-lg hover:shadow-xl"
                >
                  View Demo
                </a>
              </div>

              <div className="flex justify-center mt-10 md:mt-0">
                <div className="relative w-72 h-[24rem] md:w-96 md:h-[30rem]">
                  <div className="absolute inset-0 bg-gradient-to-br from-amber-500 to-orange-600 rounded-2xl p-1">
                    <div className="w-full h-full rounded-2xl bg-slate-950/10 overflow-hidden flex items-center justify-center">
                      <div className="text-center text-white px-6">
                        <p className="text-2xl font-bold">Demo Image</p>
                        <p className="text-sm text-white/80 mt-2">Placeholder for visual preview</p>
                      </div>
                    </div>
                  </div>
                  <div className="absolute -bottom-6 right-1/2 translate-x-1/2 md:right-0 md:translate-x-0 bg-white text-slate-900 rounded-lg p-4 shadow-lg">
                    <p className="font-bold text-sm">Demo Educator<br />Sample Profile</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Quick Stats */}
        <section className="py-12 px-4 bg-white border-b border-gray-200">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-3 gap-6 md:gap-8">
              <div className="text-center">
                <p className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-amber-500 to-orange-600 bg-clip-text text-transparent mb-2">10+</p>
                <p className="text-gray-600 font-semibold">Demo Years</p>
              </div>
              <div className="text-center">
                <p className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-500 to-pink-600 bg-clip-text text-transparent mb-2">100+</p>
                <p className="text-gray-600 font-semibold">Sample Learners</p>
              </div>
              <div className="text-center">
                <p className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-green-500 to-emerald-600 bg-clip-text text-transparent mb-2">5+</p>
                <p className="text-gray-600 font-semibold">Demo Milestones</p>
              </div>
            </div>
          </div>
        </section>

        {/* About Content */}
        <section className="py-20 px-4 bg-gray-50">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12">
              <div>
                <h2 className="text-3xl font-bold text-slate-900 mb-6">Demo Journey</h2>
                <div className="space-y-4 text-gray-700 leading-relaxed">
                  <p>
                    This section presents a fictional story for a preview environment. It is designed to show how the about page can look with polished content and structure.
                  </p>
                  <p>
                    The layout highlights the visual experience of a learning platform without relying on real personal or institutional details.
                  </p>
                  <p>
                    Everything here can be replaced later with verified information once the project moves beyond the demo stage.
                  </p>
                </div>
              </div>

              <div>
                <h2 className="text-3xl font-bold text-slate-900 mb-6">Sample Qualifications</h2>
                <div className="space-y-4">
                  <QualificationCard
                    icon={<GraduationCap className="w-6 h-6" />}
                    title="Demo Degree"
                    description="Example academic background"
                  />
                  <QualificationCard
                    icon={<Award className="w-6 h-6" />}
                    title="Demo Certification"
                    description="Placeholder achievement badge"
                  />
                  <QualificationCard
                    icon={<Target className="w-6 h-6" />}
                    title="Example Expertise"
                    description="Illustrative subject knowledge"
                  />
                  <QualificationCard
                    icon={<Star className="w-6 h-6" />}
                    title="Demo Author"
                    description="Sample content creator"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Key Achievements */}
        <section className="py-20 px-4 bg-white">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Sample Achievements</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">A few example highlights for presentation purposes.</p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <AchievementCard
                title="Demo Success"
                stats="100+ Views"
                description="Example audience engagement"
                color="from-amber-500 to-orange-600"
              />
              <AchievementCard
                title="Preview Modules"
                stats="5+ Sections"
                description="Sample learning blocks"
                color="from-purple-500 to-pink-600"
              />
              <AchievementCard
                title="Mock Sessions"
                stats="20+ Hours"
                description="Illustrative training content"
                color="from-green-500 to-emerald-600"
              />
              <AchievementCard
                title="Sample Books"
                stats="3 Items"
                description="Placeholder resources"
                color="from-blue-500 to-cyan-600"
              />
            </div>
          </div>
        </section>

        {/* Teaching Philosophy */}
        <section className="py-20 px-4 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-8">Demo Philosophy</h2>

            <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-10 mb-8">
              <blockquote className="text-xl md:text-2xl leading-relaxed italic">
                “This section is meant to showcase the visual tone and structure of the page, not to represent a real educator or institution.”
              </blockquote>
              <p className="text-amber-300 font-semibold mt-6">— Demo Team</p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              <PhilosophyCard icon={<Target className="w-8 h-8" />} title="Simple Layout" description="A clear structure for presentation and review" />
              <PhilosophyCard icon={<TrendingUp className="w-8 h-8" />} title="Flexible Design" description="Easy to adapt once real content is ready" />
              <PhilosophyCard icon={<Users className="w-8 h-8" />} title="Preview Friendly" description="Built to look polished during demos" />
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 px-4 bg-white">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Ready for the Demo?</h2>
            <p className="text-gray-600 text-lg mb-8">This page is ready to be reviewed as a sample experience.</p>
            <a
              href="/register"
              className="inline-block bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white px-8 py-4 rounded-lg font-semibold transition-all shadow-lg hover:shadow-xl"
            >
              Explore Demo
            </a>
          </div>
        </section>
      </div>
    </MainLayout>
  );
};

const QualificationCard = ({ icon, title, description }) => (
  <div className="flex gap-4 p-4 bg-white rounded-lg border border-gray-200 hover:shadow-md transition-shadow">
    <div className="text-amber-600 flex-shrink-0">{icon}</div>
    <div className="text-left">
      <p className="font-semibold text-slate-900">{title}</p>
      <p className="text-sm text-gray-600">{description}</p>
    </div>
  </div>
);

const AchievementCard = ({ title, stats, description, color }) => (
  <div className={`bg-gradient-to-br ${color} rounded-xl p-8 text-white shadow-lg hover:shadow-xl transition-shadow`}>
    <p className="text-3xl font-bold mb-2">{stats}</p>
    <p className="text-lg font-semibold mb-3">{title}</p>
    <p className="text-white/90 text-sm">{description}</p>
  </div>
);

const PhilosophyCard = ({ icon, title, description }) => (
  <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg p-6 hover:bg-white/20 transition-all">
    <div className="text-amber-400 mb-4 flex justify-center">{icon}</div>
    <p className="font-semibold mb-2">{title}</p>
    <p className="text-sm text-gray-300">{description}</p>
  </div>
);

export default About;