import Link from "next/link";
import {
  Wrench,
  Headset,
  Users,
  MapPin,
  Clock,
  Briefcase,
  Heart,
  TrendingUp,
  GraduationCap,
} from "lucide-react";

interface Role {
  title: string;
  department: string;
  location: string;
  type: string;
  icon: typeof Wrench;
  desc: string;
}

const openRoles: Role[] = [
  {
    title: "Field Technician",
    department: "Network Operations",
    location: "Thika",
    type: "Full-time",
    icon: Wrench,
    desc: "Install and maintain fibre connections for homes and businesses, troubleshoot on-site issues, and keep our network running reliably across Thika.",
  },
  {
    title: "Customer Support Agent",
    department: "Customer Experience",
    location: "Thika",
    type: "Full-time",
    icon: Headset,
    desc: "Be the first voice customers hear — handle billing questions, technical support calls, and walk-in inquiries with patience and clarity.",
  },
  {
    title: "Sales Representative",
    department: "Sales & Marketing",
    location: "Thika",
    type: "Full-time",
    icon: TrendingUp,
    desc: "Help grow our customer base across Thika. Engage with potential clients, explain our packages, and drive adoption of fibre internet in new areas.",
  },
];

const perks = [
  { icon: Heart, title: "Health cover", desc: "Medical insurance for you and your immediate family." },
  { icon: TrendingUp, title: "Room to grow", desc: "We promote from within as the company expands into new areas." },
  { icon: GraduationCap, title: "On-the-job training", desc: "Hands-on training for technical roles, no prior fibre experience required." },
  { icon: Users, title: "A close-knit team", desc: "Small enough that your work is visible, big enough to make an impact." },
];

export default function CareersPage() {
  return (
    <div className="min-h-screen bg-white">

      {/* ============ HEADER ============ */}
      <div className="relative bg-blue-950 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(#ffffff12_1px,transparent_1px)] bg-[length:36px_36px]" />
        <div className="absolute -top-24 -right-24 w-72 h-72 bg-emerald-500/30 rounded-full blur-3xl" />
        <div className="absolute -bottom-32 -left-16 w-72 h-72 bg-yellow-400/10 rounded-full blur-3xl" />

        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16 sm:py-20 relative z-10">
          <p className="text-yellow-400 font-semibold tracking-widest text-xs sm:text-sm">CAREERS</p>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white mt-2 sm:mt-3 max-w-2xl leading-tight">
            Help us keep Thika connected
          </h1>
          <p className="text-blue-100 text-sm sm:text-base mt-3 sm:mt-4 max-w-xl leading-relaxed">
            We're a growing local team building the internet, power, and security infrastructure our community relies on. Come build it with us.
          </p>
        </div>
      </div>

      {/* ============ OPEN ROLES ============ */}
      <section className="py-12 sm:py-20 px-4 sm:px-6 bg-white">
        <div className="max-w-5xl mx-auto">
          <p className="text-emerald-600 font-semibold tracking-widest text-xs sm:text-sm">OPEN ROLES</p>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-blue-950 mt-2 sm:mt-3 mb-6 sm:mb-10 max-w-xl">
            Current openings
          </h2>

          <div className="space-y-4 sm:space-y-5">
            {openRoles.map((role, i) => (
              <div
                key={i}
                className="bg-slate-50 rounded-2xl sm:rounded-3xl border border-slate-100 p-5 sm:p-7 hover:shadow-lg transition-all duration-300 flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6"
              >
                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-blue-950 flex items-center justify-center shrink-0">
                  <role.icon className="w-6 h-6 sm:w-7 sm:h-7 text-yellow-400" />
                </div>

                <div className="flex-1">
                  <h3 className="text-lg sm:text-xl font-bold text-blue-950">{role.title}</h3>
                  <p className="text-slate-600 text-xs sm:text-sm leading-relaxed mt-1 sm:mt-2 mb-2 sm:mb-3 max-w-2xl">{role.desc}</p>
                  <div className="flex flex-wrap gap-2 sm:gap-3 text-[10px] sm:text-xs font-medium text-slate-500">
                    <span className="flex items-center gap-1 sm:gap-1.5 bg-white border border-slate-200 rounded-full px-2 sm:px-3 py-1 sm:py-1.5">
                      <Briefcase className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                      {role.department}
                    </span>
                    <span className="flex items-center gap-1 sm:gap-1.5 bg-white border border-slate-200 rounded-full px-2 sm:px-3 py-1 sm:py-1.5">
                      <MapPin className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                      {role.location}
                    </span>
                    <span className="flex items-center gap-1 sm:gap-1.5 bg-white border border-slate-200 rounded-full px-2 sm:px-3 py-1 sm:py-1.5">
                      <Clock className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                      {role.type}
                    </span>
                  </div>
                </div>

                <Link
                  href="/contact"
                  className="bg-emerald-500 hover:bg-emerald-600 text-white font-semibold px-5 sm:px-6 py-2.5 sm:py-3 rounded-xl transition-colors text-center shrink-0 text-sm sm:text-base"
                >
                  Apply now
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ WHY JOIN US ============ */}
      <section className="py-12 sm:py-20 px-4 sm:px-6 bg-slate-50">
        <div className="max-w-6xl mx-auto">
          <p className="text-emerald-600 font-semibold tracking-widest text-xs sm:text-sm">WHY JOIN US</p>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-blue-950 mt-2 sm:mt-3 mb-6 sm:mb-10 max-w-xl">
            What it's like working here
          </h2>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {perks.map((perk, i) => (
              <div key={i} className="bg-white rounded-2xl sm:rounded-3xl border border-slate-100 p-5 sm:p-7">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-blue-950 flex items-center justify-center mb-3 sm:mb-5">
                  <perk.icon className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-400" />
                </div>
                <h3 className="text-base sm:text-lg font-bold text-blue-950 mb-1 sm:mb-2">{perk.title}</h3>
                <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">{perk.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ GENERAL APPLICATION ============ */}
      <section className="py-12 sm:py-20 px-4 sm:px-6 bg-white">
        <div className="max-w-3xl mx-auto text-center">
          <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-blue-950 flex items-center justify-center mx-auto mb-4 sm:mb-6">
            <Users className="w-6 h-6 sm:w-7 sm:h-7 text-yellow-400" />
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-blue-950 mb-3 sm:mb-4">
            Don't see a role that fits?
          </h2>
          <p className="text-slate-600 text-sm sm:text-lg leading-relaxed mb-6 sm:mb-9 max-w-xl mx-auto">
            We're growing fast and always interested in meeting skilled people across technical, sales, and support roles. Send us your details and we'll reach out when something opens up.
          </p>
          <Link
            href="/contact"
            className="inline-block bg-emerald-500 hover:bg-emerald-600 text-white font-bold px-8 sm:px-10 py-3 sm:py-4 rounded-full text-sm sm:text-lg transition-all duration-300 shadow-lg shadow-emerald-500/20"
          >
            Submit a general application
          </Link>
        </div>
      </section>
    </div>
  );
    }
