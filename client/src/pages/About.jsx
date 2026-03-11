import MainLayout from "../components/MainLayout";
import { BookOpen, Award, Users, TrendingUp, GraduationCap, MapPin, Star, Target } from "lucide-react";

const About = () => {
  return (
    <MainLayout>
      <div className="pt-0">

        {/* Hero Section */}
        <section className="relative pt-32 pb-20 bg-gradient-to-br from-slate-950 via-purple-900 to-slate-950 text-white overflow-hidden">
          {/* Background Blur */}
          <div className="absolute inset-0 opacity-30">
            <div className="absolute top-32 left-20 w-80 h-80 bg-amber-500 rounded-full blur-3xl"></div>
            <div className="absolute bottom-40 right-20 w-96 h-96 bg-purple-500 rounded-full blur-3xl"></div>
          </div>

          <div className="max-w-7xl mx-auto px-6 relative z-10">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              {/* Left Content */}
              <div>
                <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
                  <span className="text-white">About </span>
                  <span className="bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent">Newtan Mandal</span>
                </h1>
                
                <p className="text-gray-300 text-lg mb-8 leading-relaxed max-w-xl">
                  20+ years of dedicated teaching excellence in Geography education. 
                  Passionate about inspiring students and making learning meaningful and impactful.
                </p>

                <div className="flex gap-3 mb-8">
                  <div className="bg-white/10 backdrop-blur-sm border border-amber-400/50 rounded-lg px-4 py-2">
                    <p className="text-amber-300 text-sm font-semibold">20+ Years Experience</p>
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm border border-amber-400/50 rounded-lg px-4 py-2">
                    <p className="text-amber-300 text-sm font-semibold">2000+ Students</p>
                  </div>
                </div>

                <a
                  href="/register"
                  className="inline-block bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white px-8 py-4 rounded-lg font-semibold transition-all shadow-lg hover:shadow-xl"
                >
                  Enroll Now
                </a>
              </div>

              {/* Right - Photo */}
              <div className="flex justify-center mt-10 md:mt-0">
                <div className="relative w-72 h-[24rem] md:w-96 md:h-[30rem]">
                  <div className="absolute inset-0 bg-gradient-to-br from-amber-500 to-orange-600 rounded-2xl p-1">
                    <div className="w-full h-full rounded-2xl bg-slate-950/10 overflow-hidden">
                    <img 
                      src="/educator.jpeg" 
                      alt="Newtan Mandal"
                      className="w-full h-full object-cover object-top rounded-2xl"
                    />
                    </div>
                  </div>
                  <div className="absolute -bottom-6 right-1/2 translate-x-1/2 md:right-0 md:translate-x-0 bg-white text-slate-900 rounded-lg p-4 shadow-lg">
                    <p className="font-bold text-sm">M.A Geography<br/>NET-SET Qualified</p>
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
                <p className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-amber-500 to-orange-600 bg-clip-text text-transparent mb-2">20+</p>
                <p className="text-gray-600 font-semibold">Years Teaching</p>
              </div>
              <div className="text-center">
                <p className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-500 to-pink-600 bg-clip-text text-transparent mb-2">2K+</p>
                <p className="text-gray-600 font-semibold">Students Guided</p>
              </div>
              <div className="text-center">
                <p className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-green-500 to-emerald-600 bg-clip-text text-transparent mb-2">150+</p>
                <p className="text-gray-600 font-semibold">Toppers Produced</p>
              </div>
            </div>
          </div>
        </section>

        {/* About Content */}
        <section className="py-20 px-4 bg-gray-50">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12">
              {/* Left Column */}
              <div>
                <h2 className="text-3xl font-bold text-slate-900 mb-6">My Journey</h2>
                <div className="space-y-4 text-gray-700 leading-relaxed">
                  <p>
                    My teaching career began in <strong>2007</strong> with a vision to make Geography education engaging and meaningful. Since then, I've dedicated myself to helping thousands of students understand and appreciate the complexities of our world.
                  </p>
                  <p>
                    At <strong>Madhurkul High School</strong> since 2013, I've created a learning environment where students don't just memorize facts, but develop critical thinking skills and a genuine passion for Geography.
                  </p>
                  <p>
                    My approach focuses on making abstract concepts tangible, connecting classroom learning to real-world applications, and ensuring every student feels confident and capable.
                  </p>
                </div>
              </div>

              {/* Right Column */}
              <div>
                <h2 className="text-3xl font-bold text-slate-900 mb-6">Qualifications & Expertise</h2>
                <div className="space-y-4">
                  <QualificationCard
                    icon={<GraduationCap className="w-6 h-6" />}
                    title="Master's Degree (M.A)"
                    description="Geography & Education"
                  />
                  <QualificationCard
                    icon={<Award className="w-6 h-6" />}
                    title="NET-SET Qualified"
                    description="National & State Eligibility Test"
                  />
                  <QualificationCard
                    icon={<Target className="w-6 h-6" />}
                    title="Specialized Training"
                    description="Advanced Geography Pedagogy"
                  />
                  <QualificationCard
                    icon={<Star className="w-6 h-6" />}
                    title="Published Author"
                    description="Geography educational materials"
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
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Key Achievements</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">Milestones that define my teaching excellence and student success</p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <AchievementCard
                title="Student Success"
                stats="150+ Toppers"
                description="Students who scored 90+ in Geography exams"
                color="from-amber-500 to-orange-600"
              />
              <AchievementCard
                title="Course Development"
                stats="8+ Modules"
                description="Comprehensive Geography curricula created"
                color="from-purple-500 to-pink-600"
              />
              <AchievementCard
                title="Online Teaching"
                stats="1000+ Hours"
                description="Virtual classroom sessions and online guidance"
                color="from-green-500 to-emerald-600"
              />
              <AchievementCard
                title="Publications"
                stats="2 Books"
                description="Authored educational materials for students"
                color="from-blue-500 to-cyan-600"
              />
            </div>
          </div>
        </section>

        {/* Teaching Philosophy */}
        <section className="py-20 px-4 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-8">Teaching Philosophy</h2>
            
            <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-10 mb-8">
              <blockquote className="text-xl md:text-2xl leading-relaxed italic">
                "Education is the most powerful tool for transformation. I'm committed to helping every student discover their potential and develop a lifelong passion for learning."
              </blockquote>
              <p className="text-amber-300 font-semibold mt-6">— Newtan Mandal</p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              <PhilosophyCard icon={<Target className="w-8 h-8" />} title="Student-Centric" description="Every lesson designed with student success in mind" />
              <PhilosophyCard icon={<TrendingUp className="w-8 h-8" />} title="Continuous Growth" description="Always evolving teaching methods and content" />
              <PhilosophyCard icon={<Users className="w-8 h-8" />} title="Inclusive Learning" description="Creating space for every student to thrive" />
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 px-4 bg-white">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Ready to Learn?</h2>
            <p className="text-gray-600 text-lg mb-8">Join hundreds of students who've transformed their Geography knowledge</p>
            <a
              href="/register"
              className="inline-block bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white px-8 py-4 rounded-lg font-semibold transition-all shadow-lg hover:shadow-xl"
            >
              Start Learning Today
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