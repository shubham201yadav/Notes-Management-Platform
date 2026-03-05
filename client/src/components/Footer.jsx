import { Link } from "react-router-dom";
import { Mail, MapPin, Globe, Twitter, Instagram, Linkedin, GraduationCap, Download } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-slate-900 text-slate-400 mt-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-6 py-8 grid grid-cols-1 md:grid-cols-4 gap-8">

        {/* Brand & Mission */}
        <div className="col-span-1 md:col-span-1">
          <div className="flex items-center gap-2 text-white mb-4">
            <GraduationCap className="text-amber-500 w-6 h-6" />
            <span className="text-xl font-bold tracking-tight bg-gradient-to-r from-amber-500 to-orange-600 bg-clip-text text-transparent">Newtan's Unity</span>
          </div>
          <p className="text-sm leading-relaxed mb-4">
            Expert Geography education by Newtan Mandal. 
            Comprehensive study materials and resources for school and college students.
          </p>
          <div className="flex space-x-4">
            <SocialIcon icon={<Twitter size={18} />} />
            <SocialIcon icon={<Instagram size={18} />} />
            <SocialIcon icon={<Linkedin size={18} />} />
          </div>
        </div>

        {/* Navigation */}
        <div>
          <h3 className="text-white font-semibold mb-4 text-sm">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li><FooterLink to="/">Home</FooterLink></li>
            <li><FooterLink to="/about">About</FooterLink></li>
            <li><FooterLink to="/portfolio">Portfolio</FooterLink></li>

          </ul>
        </div>

        {/* Student Resources - HIGHLIGHTED */}
        <div>
          <h3 className="text-white font-semibold mb-4 text-sm">Geography Resources</h3>
          <ul className="space-y-2 text-sm">
            <li className="flex items-center gap-2 group">
               <Download size={14} className="text-amber-500" />
               <FooterLink to="/notes">Study Materials</FooterLink>
            </li>
            <li><FooterLink to="/login">Student Login</FooterLink></li>
            <li><FooterLink to="/register">Register Now</FooterLink></li>
            <li><FooterLink to="/about">About Teacher</FooterLink></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-white font-semibold mb-4 text-sm">Contact</h3>
          <div className="space-y-3 text-sm">
            <div className="flex items-start gap-3">
              <Mail className="text-amber-500 w-5 h-5 shrink-0" />
              <span>Teacher: Newtan Mandal</span>
            </div>
            <div className="flex items-start gap-3">
              <MapPin className="text-amber-500 w-5 h-5 shrink-0" />
              <span>Geography Education <br /> School & College</span>
            </div>

          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-slate-800 py-4 text-center text-xs tracking-widest uppercase text-slate-500">
        © {new Date().getFullYear()} Newtan's Unity - Geography by Newtan Mandal. All rights reserved. 
        <span className="mx-2">|</span> 
        Privacy Policy
      </div>
    </footer>
  );
};

// Helper Components for cleaner code
const FooterLink = ({ to, children }) => (
  <Link to={to} className="hover:text-amber-400 transition-colors duration-200 block">
    {children}
  </Link>
);

const SocialIcon = ({ icon }) => (
  <div className="p-2 border border-slate-700 rounded-lg hover:bg-gradient-to-r hover:from-amber-500 hover:to-orange-600 hover:text-white hover:border-transparent cursor-pointer transition-all duration-300">
    {icon}
  </div>
);

export default Footer;