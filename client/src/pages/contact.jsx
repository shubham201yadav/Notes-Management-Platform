import { useState } from "react";
import MainLayout from "../components/MainLayout";
import { Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin, Send } from "lucide-react";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <MainLayout>
      <div>
        {/* Hero Section */}
        <section className="relative pt-32 pb-24 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white overflow-hidden">
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-20 left-10 w-72 h-72 bg-purple-500 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute bottom-20 right-10 w-96 h-96 bg-indigo-500 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1s" }}></div>
          </div>

          <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
            <span className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-400 to-orange-500 text-slate-900 font-bold px-4 py-2 rounded-full text-xs uppercase tracking-wide shadow-lg mb-6">
              <span className="w-2 h-2 bg-slate-900 rounded-full animate-pulse"></span>
              Demo Contact
            </span>

            <h1 className="text-5xl md:text-6xl lg:text-7xl font-black mt-6 leading-tight">
              Contact the <span className="bg-gradient-to-r from-amber-400 via-orange-500 to-pink-500 bg-clip-text text-transparent">Demo Team</span>
            </h1>

            <p className="mt-6 text-gray-300 text-lg max-w-3xl mx-auto leading-relaxed">
              This contact page is for demonstration purposes only. The details below are sample values used to preview the layout and form experience.
            </p>
          </div>
        </section>

        {/* Contact Info Cards */}
        <section className="py-16 px-4 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-3 gap-8 mb-16">
              <div className="group relative p-8 bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-200 rounded-2xl hover:shadow-2xl transition-all duration-300 overflow-hidden">
                <div className="relative z-10">
                  <div className="mb-4 inline-flex p-4 bg-gradient-to-br from-amber-200 to-orange-200 rounded-xl text-amber-700 group-hover:scale-110 transition-transform duration-300">
                    <Mail className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">Email</h3>
                  <a href="mailto:demo@example.com" className="text-amber-700 font-semibold hover:text-amber-800 transition">
                    demo@example.com
                  </a>
                </div>
                <div className="absolute -bottom-2 -right-2 w-24 h-24 bg-gradient-to-br from-amber-400/20 to-orange-500/20 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-500"></div>
              </div>

              <div className="group relative p-8 bg-gradient-to-br from-purple-50 to-pink-50 border border-purple-200 rounded-2xl hover:shadow-2xl transition-all duration-300 overflow-hidden">
                <div className="relative z-10">
                  <div className="mb-4 inline-flex p-4 bg-gradient-to-br from-purple-200 to-pink-200 rounded-xl text-purple-700 group-hover:scale-110 transition-transform duration-300">
                    <Phone className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">Phone</h3>
                  <a href="tel:+911234567890" className="text-purple-700 font-semibold hover:text-purple-800 transition">
                    +91 12345 67890
                  </a>
                </div>
                <div className="absolute -bottom-2 -right-2 w-24 h-24 bg-gradient-to-br from-purple-400/20 to-pink-500/20 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-500"></div>
              </div>

              <div className="group relative p-8 bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200 rounded-2xl hover:shadow-2xl transition-all duration-300 overflow-hidden">
                <div className="relative z-10">
                  <div className="mb-4 inline-flex p-4 bg-gradient-to-br from-green-200 to-emerald-200 rounded-xl text-green-700 group-hover:scale-110 transition-transform duration-300">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">Location</h3>
                  <p className="text-green-700 font-semibold">
                    Demo Address<br />
                    <span className="text-sm">Sample City</span>
                  </p>
                </div>
                <div className="absolute -bottom-2 -right-2 w-24 h-24 bg-gradient-to-br from-green-400/20 to-emerald-500/20 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-500"></div>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Form Section */}
        <section className="py-16 px-4 bg-gradient-to-b from-white to-slate-50">
          <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12">
              <div className="bg-white border border-gray-200 rounded-2xl p-8 shadow-lg">
                <h2 className="text-3xl font-bold text-slate-900 mb-8">Send a Demo Message</h2>

                {submitted && (
                  <div className="mb-6 p-4 bg-green-100 border border-green-400 text-green-800 rounded-xl">
                    ✓ Demo form submitted successfully. No real message was sent.
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <label className="block text-sm font-semibold text-slate-900 mb-2">Full Name *</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      placeholder="Your Name"
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 transition"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-slate-900 mb-2">Email *</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      placeholder="your@email.com"
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 transition"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-slate-900 mb-2">Phone</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+91 XXXX XXX XXX"
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 transition"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-slate-900 mb-2">Subject *</label>
                    <input
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      placeholder="How can we help?"
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 transition"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-slate-900 mb-2">Message *</label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows="5"
                      placeholder="Tell us more about your inquiry..."
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 transition resize-none"
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white font-bold py-3 rounded-xl transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2 group"
                  >
                    <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    Send Demo Message
                  </button>
                </form>
              </div>

              <div className="space-y-8">
                <div className="bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 rounded-2xl p-8 border border-purple-500/30 text-white">
                  <h3 className="text-2xl font-bold mb-6">Why Contact the Demo Team?</h3>
                  <ul className="space-y-4 text-gray-300">
                    <li className="flex items-start gap-3">
                      <span className="text-amber-400 font-bold text-lg mt-0.5">✓</span>
                      <span className="font-semibold">Preview the contact experience for a sample project</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-amber-400 font-bold text-lg mt-0.5">✓</span>
                      <span className="font-semibold">Test the form layout and visual design</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-amber-400 font-bold text-lg mt-0.5">✓</span>
                      <span className="font-semibold">See how a polished demo page feels in action</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-slate-900 rounded-2xl p-8 text-white">
                  <h3 className="text-2xl font-bold mb-6">Connect With the Demo</h3>
                  <p className="text-gray-300 mb-6">These links are placeholders for a presentation-only layout.</p>
                  <div className="flex gap-4">
                    <a href="#" className="p-4 bg-white/10 hover:bg-amber-500 rounded-full text-white transition-all transform hover:scale-110">
                      <Facebook className="w-6 h-6" />
                    </a>
                    <a href="#" className="p-4 bg-white/10 hover:bg-blue-500 rounded-full text-white transition-all transform hover:scale-110">
                      <Twitter className="w-6 h-6" />
                    </a>
                    <a href="#" className="p-4 bg-white/10 hover:bg-pink-500 rounded-full text-white transition-all transform hover:scale-110">
                      <Instagram className="w-6 h-6" />
                    </a>
                    <a href="#" className="p-4 bg-white/10 hover:bg-blue-600 rounded-full text-white transition-all transform hover:scale-110">
                      <Linkedin className="w-6 h-6" />
                    </a>
                  </div>
                </div>

                <div className="bg-white border border-gray-200 rounded-2xl p-8">
                  <h3 className="text-2xl font-bold text-slate-900 mb-4">Response Time</h3>
                  <p className="text-gray-700 mb-4">
                    This is a <span className="font-bold text-amber-700">demo response</span> section.
                  </p>
                  <p className="text-sm text-gray-600">
                    No real support process is being used for this preview.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Map Section */}
        <section className="py-16 px-4 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                Demo Map Preview
              </h2>
              <p className="text-gray-600">A placeholder map block for the demo experience.</p>
            </div>

            <div className="relative rounded-2xl overflow-hidden shadow-2xl h-96 bg-gray-200 flex items-center justify-center">
              <div className="text-center px-6">
                <p className="text-2xl font-semibold text-slate-700">Map Placeholder</p>
                <p className="text-sm text-slate-500 mt-2">No real location data is shown here.</p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </MainLayout>
  );
};

export default Contact;
