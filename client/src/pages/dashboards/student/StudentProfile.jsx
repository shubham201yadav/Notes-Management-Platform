import { useAuth } from "../../../context/AuthContext";
import { Mail, User, Shield } from "lucide-react";

const StudentProfile = () => {
  const { user } = useAuth();

  const savedName = localStorage.getItem("name");
  const savedEmail = localStorage.getItem("email");
  const savedRole = localStorage.getItem("role");

  const name = user?.name || savedName || "Not Available";
  const email = user?.email || savedEmail || "Not Available";
  const role = user?.role || savedRole || "student";
  const formattedRole = role.charAt(0).toUpperCase() + role.slice(1);

  const initials =
    name && name !== "Not Available"
      ? name
          .split(" ")
          .map((part) => part[0])
          .join("")
          .slice(0, 2)
          .toUpperCase()
      : "S";

  return (
    <div className="max-w-5xl mx-auto space-y-6 px-1">
      <div className="bg-white border border-amber-200 rounded-2xl shadow-sm overflow-hidden">
        <div className="h-28 sm:h-32 bg-gradient-to-r from-amber-500 via-orange-500 to-yellow-500" />

        <div className="px-5 sm:px-8 pb-6 sm:pb-8 -mt-10 sm:-mt-12 flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-5">
          <div className="h-20 w-20 sm:h-24 sm:w-24 rounded-2xl bg-white border-4 border-white shadow-lg flex items-center justify-center text-xl sm:text-2xl font-bold text-amber-800">
            {initials}
          </div>

          <div className="min-w-0">
            <h2 className="text-xl sm:text-2xl font-bold text-amber-950 break-words">{name}</h2>
            <p className="text-amber-700 text-sm sm:text-base break-words">{email}</p>

            <span className="mt-3 inline-flex items-center rounded-full bg-amber-50 border border-amber-200 px-3 py-1 text-xs font-semibold text-amber-700">
              {formattedRole}
            </span>
          </div>
        </div>
      </div>

      <div className="bg-white border border-amber-200 rounded-2xl shadow-sm p-5 sm:p-6">
        <h3 className="text-lg font-semibold text-amber-950">Account Information</h3>
        <p className="text-sm text-amber-700 mt-1">Your student account details.</p>

        <div className="mt-6 grid sm:grid-cols-2 gap-4 sm:gap-5">
          <div className="flex items-start gap-3 p-4 rounded-xl border border-amber-200 bg-amber-50/70 hover:bg-white hover:border-amber-300 transition-colors">
            <User className="text-amber-600 mt-1 shrink-0" size={20} />
            <div>
              <p className="text-xs uppercase tracking-wide text-amber-700">Full Name</p>
              <p className="text-amber-950 font-semibold break-words">{name}</p>
            </div>
          </div>

          <div className="flex items-start gap-3 p-4 rounded-xl border border-amber-200 bg-amber-50/70 hover:bg-white hover:border-orange-300 transition-colors">
            <Mail className="text-orange-600 mt-1 shrink-0" size={20} />
            <div className="min-w-0">
              <p className="text-xs uppercase tracking-wide text-amber-700">Email Address</p>
              <p className="text-amber-950 font-semibold break-words">{email}</p>
            </div>
          </div>

          <div className="flex items-start gap-3 p-4 rounded-xl border border-amber-200 bg-amber-50/70 hover:bg-white hover:border-yellow-300 transition-colors sm:col-span-2">
            <Shield className="text-yellow-600 mt-1 shrink-0" size={20} />
            <div>
              <p className="text-xs uppercase tracking-wide text-amber-700">Account Role</p>
              <p className="text-amber-950 font-semibold">{formattedRole}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentProfile;
