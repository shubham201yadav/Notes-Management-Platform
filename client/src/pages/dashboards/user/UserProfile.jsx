import { useAuth } from "../../../context/AuthContext";
import { Mail, User, Shield } from "lucide-react";

const UserProfile = () => {
  const { user } = useAuth();

  const name = user?.name || "Not Available";
  const email = user?.email || "Not Available";
  const role = user?.role || "User";
  const formattedRole = role.charAt(0).toUpperCase() + role.slice(1);

  const initials =
    name && name !== "Not Available"
      ? name
          .split(" ")
          .map((part) => part[0])
          .join("")
          .slice(0, 2)
          .toUpperCase()
      : "U";

  return (
    <div className="max-w-5xl mx-auto space-y-6 px-1">
      <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
        <div className="h-28 sm:h-32 bg-gradient-to-r from-cyan-600 via-sky-600 to-blue-600" />

        <div className="px-5 sm:px-8 pb-6 sm:pb-8 -mt-10 sm:-mt-12 flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-5">
          <div className="h-20 w-20 sm:h-24 sm:w-24 rounded-2xl bg-white border-4 border-white shadow-lg flex items-center justify-center text-xl sm:text-2xl font-bold text-slate-700">
            {initials}
          </div>

          <div className="min-w-0">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 break-words">{name}</h2>
            <p className="text-slate-500 text-sm sm:text-base break-words">{email}</p>

            <span className="mt-3 inline-flex items-center rounded-full bg-blue-50 border border-blue-200 px-3 py-1 text-xs font-semibold text-blue-700">
              {formattedRole}
            </span>
          </div>
        </div>
      </div>

      <div className="bg-white border border-slate-200 rounded-2xl shadow-sm p-5 sm:p-6">
        <h3 className="text-lg font-semibold text-slate-900">
          Account Information
        </h3>
        <p className="text-sm text-slate-500 mt-1">
          Your personal account details.
        </p>

        <div className="mt-6 grid sm:grid-cols-2 gap-4 sm:gap-5">
          <div className="flex items-start gap-3 p-4 rounded-xl border border-slate-200 bg-slate-50/80 hover:bg-white hover:border-blue-200 transition-colors">
            <User className="text-blue-600 mt-1 shrink-0" size={20} />
            <div>
              <p className="text-xs uppercase tracking-wide text-slate-500">
                Full Name
              </p>
              <p className="text-slate-900 font-semibold break-words">{name}</p>
            </div>
          </div>

          <div className="flex items-start gap-3 p-4 rounded-xl border border-slate-200 bg-slate-50/80 hover:bg-white hover:border-green-200 transition-colors">
            <Mail className="text-green-600 mt-1 shrink-0" size={20} />
            <div className="min-w-0">
              <p className="text-xs uppercase tracking-wide text-slate-500">
                Email Address
              </p>
              <p className="text-slate-900 font-semibold break-words">
                {email}
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3 p-4 rounded-xl border border-slate-200 bg-slate-50/80 hover:bg-white hover:border-violet-200 transition-colors sm:col-span-2">
            <Shield className="text-violet-600 mt-1 shrink-0" size={20} />
            <div>
              <p className="text-xs uppercase tracking-wide text-slate-500">
                Account Role
              </p>
              <p className="text-slate-900 font-semibold">{formattedRole}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;