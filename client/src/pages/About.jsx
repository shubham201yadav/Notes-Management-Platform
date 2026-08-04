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
                  <span className="bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent">Notes Manage Platform</span>
                </h1>

                <p className="text-gray-300 text-lg mb-8 leading-relaxed max-w-xl">
                  We build a single, well-organised home for geography study material — so students spend their time learning instead of hunting for notes.
                </p>

                <div className="flex gap-3 mb-8">
                  <div className="bg-white/10 backdrop-blur-sm border border-amber-400/50 rounded-lg px-4 py-2">
                    <p className="text-amber-300 text-sm font-semibold">School &amp; College</p>
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm border border-amber-400/50 rounded-lg px-4 py-2">
                    <p className="text-amber-300 text-sm font-semibold">Reviewed Notes</p>
                  </div>
                </div>

                <a
                  href="/register"
                  className="inline-block bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white px-8 py-4 rounded-lg font-semibold transition-all shadow-lg hover:shadow-xl"
                >
                  Join Free
                </a>
              </div>

              <div className="flex justify-center mt-10 md:mt-0">
                <div className="relative w-72 h-[24rem] md:w-96 md:h-[30rem]">
                  <div className="absolute inset-0 bg-gradient-to-br from-amber-500 to-orange-600 rounded-2xl p-1">
                    <div className="w-full h-full rounded-2xl overflow-hidden">
                      <img
                        src="https://images.unsplash.com/photo-1513258496099-48168024aec0?auto=format&fit=crop&w=900&q=80"
                        alt="Teacher explaining lesson to students"
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                    </div>
                  </div>
                  <div className="absolute -bottom-6 right-1/2 translate-x-1/2 md:right-0 md:translate-x-0 bg-white text-slate-900 rounded-lg p-4 shadow-lg">
                    <p className="font-bold text-sm">Our Educators<br />Subject Specialists</p>
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
                <p className="text-gray-600 font-semibold">Class Levels</p>
              </div>
              <div className="text-center">
                <p className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-500 to-pink-600 bg-clip-text text-transparent mb-2">100+</p>
                <p className="text-gray-600 font-semibold">Active Learners</p>
              </div>
              <div className="text-center">
                <p className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-green-500 to-emerald-600 bg-clip-text text-transparent mb-2">5+</p>
                <p className="text-gray-600 font-semibold">Subject Areas</p>
              </div>
            </div>
          </div>
        </section>

        {/* About Content */}
        <section className="py-20 px-4 bg-gray-50">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12">
              <div>
                <h2 className="text-3xl font-bold text-slate-900 mb-6">Our Story</h2>
                <div className="space-y-4 text-gray-700 leading-relaxed">
                  <p>
                    Notes Manage Platform started from a simple frustration: good study material existed, but it was scattered across notebooks, group chats and half-remembered links.
                  </p>
                  <p>
                    So we built one place for it. Every note is filed by subject, category and class level, with its attachments kept alongside it — open the topic and everything you need is already there.
                  </p>
                  <p>
                    The library keeps growing as our educators add new material, and students can reach all of it from any device, at any hour.
                  </p>
                </div>
              </div>

              <div>
                <h2 className="text-3xl font-bold text-slate-900 mb-6">What We Offer</h2>
                <div className="space-y-4">
                  <QualificationCard
                    icon={<GraduationCap className="w-6 h-6" />}
                    title="School and College Notes"
                    description="Material written for both stages of study"
                  />
                  <QualificationCard
                    icon={<Award className="w-6 h-6" />}
                    title="Reviewed Material"
                    description="Checked by an educator before it goes live"
                  />
                  <QualificationCard
                    icon={<Target className="w-6 h-6" />}
                    title="Focused Revision"
                    description="Filter by subject and class level in seconds"
                  />
                  <QualificationCard
                    icon={<Star className="w-6 h-6" />}
                    title="Downloadable Files"
                    description="PDFs and diagrams attached to every topic"
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
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">What We've Built</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">A growing library, shaped by what students actually ask for.</p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <AchievementCard
                title="Study Notes"
                stats="500+"
                description="Across school and college levels"
                color="from-amber-500 to-orange-600"
              />
              <AchievementCard
                title="Learning Modules"
                stats="5+ Sections"
                description="Organised by topic and difficulty"
                color="from-purple-500 to-pink-600"
              />
              <AchievementCard
                title="Study Material"
                stats="20+ Hours"
                description="Reading and revision content"
                color="from-green-500 to-emerald-600"
              />
              <AchievementCard
                title="Reference Books"
                stats="3 Titles"
                description="Curated to match the syllabus"
                color="from-blue-500 to-cyan-600"
              />
            </div>
          </div>
        </section>

        {/* Teaching Philosophy */}
        <section className="py-20 px-4 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-8">Our Approach</h2>

            <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-10 mb-8">
              <blockquote className="text-xl md:text-2xl leading-relaxed italic">
                &ldquo;A student should never lose an evening looking for the right notes. Our job is to make the material easy to find, so the effort goes into understanding it.&rdquo;
              </blockquote>
              <p className="text-amber-300 font-semibold mt-6">— The Notes Manage Platform Team</p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              <PhilosophyCard icon={<Target className="w-8 h-8" />} title="Clear Structure" description="Every note filed where you'd expect to find it" />
              <PhilosophyCard icon={<TrendingUp className="w-8 h-8" />} title="Always Growing" description="New material added as the syllabus moves" />
              <PhilosophyCard icon={<Users className="w-8 h-8" />} title="Student First" description="Built around how people actually revise" />
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 px-4 bg-white">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Ready to Get Started?</h2>
            <p className="text-gray-600 text-lg mb-8">Create an account and open the full library of notes today.</p>
            <a
              href="/register"
              className="inline-block bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white px-8 py-4 rounded-lg font-semibold transition-all shadow-lg hover:shadow-xl"
            >
              Create Free Account
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
