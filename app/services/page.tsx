"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import {
  Wifi,
  Sun,
  Zap,
  Video,
  ShieldAlert,
  Flame,
  Lock,
  Truck,
  ArrowUpCircle,
  Phone,
  CheckCircle2,
  Loader2,
} from "lucide-react";

interface Service {
  id: number;
  title: string;
  description: string;
  icon: string;
  color: string;
  image: string;
  category: string;
  features: string[];
  status: string;
  created_at: string;
}

const iconMap: { [key: string]: any } = {
  Wifi: Wifi,
  Sun: Sun,
  Zap: Zap,
  Video: Video,
  Camera: Video,
  ShieldAlert: ShieldAlert,
  Flame: Flame,
  Lock: Lock,
  Truck: Truck,
  ArrowUpCircle: ArrowUpCircle,
  Shield: ShieldAlert,
  TrendingUp: ArrowUpCircle,
  Headset: Phone,
  Users: Lock,
};

const internetPackages = [
  { speed: "5", price: "1,000", accent: "from-emerald-500 to-emerald-400" },
  { speed: "8", price: "1,500", accent: "from-blue-500 to-cyan-400" },
  { speed: "15", price: "2,000", accent: "from-purple-500 to-violet-400" },
  { speed: "30", price: "3,000", accent: "from-orange-500 to-amber-400" },
];

const addOns = [
  { icon: Truck, title: "Relocation", desc: "Moving house? We'll transfer and reinstall your existing internet connection at the new address." },
  { icon: ArrowUpCircle, title: "Package upgrades", desc: "Outgrown your current speed? Switch to a faster plan anytime before your next billing cycle." },
];

export default function ServicesPage() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchServices = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/services');
      const data = await response.json();
      
      if (data.success) {
        setServices(data.data);
      } else {
        setError('Failed to load services');
      }
    } catch (err) {
      setError('Network error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  const getIcon = (iconName: string) => {
    return iconMap[iconName] || Wifi;
  };

  return (
    <div className="min-h-screen bg-white">

      {/* HEADER */}
      <div className="relative bg-blue-950 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(#ffffff12_1px,transparent_1px)] bg-[length:36px_36px]" />
        <div className="absolute -top-24 -right-24 w-72 h-72 bg-emerald-500/30 rounded-full blur-3xl" />
        <div className="absolute -bottom-32 -left-16 w-72 h-72 bg-yellow-400/10 rounded-full blur-3xl" />

        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16 sm:py-20 relative z-10">
          <p className="text-yellow-400 font-semibold tracking-widest text-xs sm:text-sm">OUR SERVICES</p>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white mt-2 sm:mt-3 max-w-2xl leading-tight">
            More than internet — everything that keeps your home and business running
          </h1>
          <p className="text-blue-100 text-sm sm:text-base mt-3 sm:mt-4 max-w-xl leading-relaxed">
            From fibre installation to solar, security, and fire safety — our technicians handle it all under one roof in Thika.
          </p>
        </div>
      </div>

      {/* INTERNET PACKAGES */}
      <section className="py-12 sm:py-20 px-4 sm:px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-3 mb-2 sm:mb-3">
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-blue-950 flex items-center justify-center">
              <Wifi className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-400" />
            </div>
            <p className="text-emerald-600 font-semibold tracking-widest text-xs sm:text-sm">FIBRE INTERNET</p>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-blue-950 mb-6 sm:mb-10 max-w-xl">
            Pick a speed that fits your household
          </h2>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {internetPackages.map((pkg, i) => (
              <div
                key={i}
                className="rounded-2xl sm:rounded-3xl border border-slate-100 bg-slate-50 p-5 sm:p-7 text-center hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
              >
                <div className={`text-4xl sm:text-5xl font-extrabold bg-gradient-to-br ${pkg.accent} bg-clip-text text-transparent`}>
                  {pkg.speed}
                </div>
                <div className="text-xs sm:text-sm text-slate-500 -mt-1 mb-3 sm:mb-4">Mbps</div>
                <div className="text-xl sm:text-2xl font-bold text-blue-950">KSh {pkg.price}</div>
                <div className="text-[10px] sm:text-xs text-slate-400 mb-4 sm:mb-5">per month</div>
                <ul className="text-xs sm:text-sm text-slate-600 text-left space-y-1.5 sm:space-y-2 mb-4 sm:mb-6">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-600 mt-0.5 shrink-0" />
                    Unlimited data
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-600 mt-0.5 shrink-0" />
                    Free installation
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-600 mt-0.5 shrink-0" />
                    24/7 technical support
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-600 mt-0.5 shrink-0" />
                    1 month free
                  </li>
                </ul>
                <Link
                  href="/contact"
                  className="block w-full bg-emerald-500 hover:bg-emerald-600 text-white font-semibold py-2.5 sm:py-3 rounded-xl transition-colors text-sm sm:text-base"
                >
                  Choose plan
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* DYNAMIC SERVICES FROM DATABASE */}
      <section className="py-12 sm:py-20 px-4 sm:px-6 bg-slate-50">
        <div className="max-w-6xl mx-auto">
          <p className="text-emerald-600 font-semibold tracking-widest text-xs sm:text-sm">INSTALLATIONS &amp; SECURITY</p>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-blue-950 mt-2 sm:mt-3 mb-6 sm:mb-10 max-w-xl">
            Professional services done right
          </h2>

          {loading ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="w-8 h-8 text-emerald-500 animate-spin" />
              <span className="ml-3 text-slate-600">Loading services...</span>
            </div>
          ) : error ? (
            <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-red-700 text-center">
              {error}
            </div>
          ) : services.length === 0 ? (
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-8 text-center">
              <p className="text-amber-800 font-medium">No services available yet</p>
              <p className="text-amber-700 text-sm mt-1">Check back soon for our full service list</p>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {services.map((service) => {
                const IconComponent = getIcon(service.icon);
                return (
                  <div
                    key={service.id}
                    className="bg-white rounded-2xl sm:rounded-3xl border border-slate-100 overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                  >
                    <div className="relative h-48 sm:h-56 bg-slate-200 overflow-hidden">
                      <img
                        src={service.image || '/images/services/placeholder.jpg'}
                        alt={service.title}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = '/images/services/placeholder.jpg';
                        }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                      <div className="absolute top-4 right-4 z-10">
                        <div className={`w-10 h-10 rounded-full ${service.color || 'bg-blue-500'} flex items-center justify-center shadow-lg`}>
                          <IconComponent className="w-5 h-5 text-white" />
                        </div>
                      </div>
                      <div className="absolute bottom-4 left-4 z-10">
                        <span className="bg-black/50 backdrop-blur-sm text-white text-xs font-medium px-3 py-1.5 rounded-full">
                          {service.category || 'Service'}
                        </span>
                      </div>
                    </div>

                    <div className="p-5 sm:p-6">
                      <h3 className="text-lg sm:text-xl font-bold text-blue-950 mb-2">{service.title}</h3>
                      <p className="text-slate-600 text-sm leading-relaxed mb-4">{service.description}</p>
                      
                      <div className="flex flex-wrap gap-1.5 mb-4">
                        {service.features?.slice(0, 3).map((feature, idx) => (
                          <span key={idx} className="text-[10px] bg-slate-100 text-slate-600 px-2 py-1 rounded-full">
                            {feature}
                          </span>
                        ))}
                        {service.features?.length > 3 && (
                          <span className="text-[10px] bg-slate-100 text-slate-600 px-2 py-1 rounded-full">
                            +{service.features.length - 3} more
                          </span>
                        )}
                      </div>

                      <Link
                        href="/contact"
                        className="inline-flex items-center gap-1 text-sm font-semibold text-emerald-600 hover:text-emerald-700 transition-colors"
                      >
                        Get a quote →
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* ADD-ONS */}
      <section className="py-12 sm:py-20 px-4 sm:px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <p className="text-emerald-600 font-semibold tracking-widest text-xs sm:text-sm">ALREADY A CUSTOMER?</p>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-blue-950 mt-2 sm:mt-3 mb-6 sm:mb-10 max-w-xl">
            Manage your existing connection
          </h2>

          <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
            {addOns.map((item, i) => (
              <div
                key={i}
                className="flex items-start gap-4 sm:gap-5 bg-slate-50 rounded-2xl sm:rounded-3xl border border-slate-100 p-5 sm:p-7 hover:shadow-lg transition-all duration-300"
              >
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-blue-950 flex items-center justify-center shrink-0">
                  <item.icon className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-400" />
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-bold text-blue-950 mb-1 sm:mb-1.5">{item.title}</h3>
                  <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 sm:py-20 px-4 sm:px-6 bg-gradient-to-br from-emerald-600 to-emerald-700 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(#ffffff15_1px,transparent_1px)] bg-[length:40px_40px]" />
        <div className="max-w-3xl mx-auto text-center relative z-10">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold mb-3 sm:mb-5">
            Not sure which service you need?
          </h2>
          <p className="text-emerald-50 text-base sm:text-lg max-w-xl mx-auto mb-6 sm:mb-9 leading-relaxed">
            Tell us what you're trying to solve — internet, power, or security — and we'll recommend the right fit.
          </p>
          <div className="flex flex-wrap justify-center gap-3 sm:gap-4">
            <a
              href="tel:0700541561"
              className="bg-white text-emerald-700 font-bold px-6 sm:px-9 py-3 sm:py-4 rounded-full text-sm sm:text-lg hover:bg-yellow-400 hover:text-blue-950 transition-all duration-300 flex items-center gap-2 sm:gap-3"
            >
              <Phone className="w-4 h-4 sm:w-5 sm:h-5" />
              Call 0700 541 561
            </a>
            <Link
              href="/contact"
              className="border-2 border-white/80 hover:border-white font-semibold px-6 sm:px-9 py-3 sm:py-4 rounded-full text-sm sm:text-lg hover:bg-white/10 transition-all duration-300"
            >
              Send us a message
            </Link>
          </div>
          <p className="text-emerald-200 text-xs sm:text-sm mt-4">
            WhatsApp: 0703 199 691
          </p>
        </div>
      </section>
    </div>
  );
}
