"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  TrendingUp,
  Sun,
  Shield,
  Wifi,
  Zap,
  Clock,
  DollarSign,
  Percent,
  Calendar,
  MapPin,
  CheckCircle2,
  Loader2,
  Phone,
  Mail,
  ArrowRight,
  Building,
  Users,
  Briefcase,
  ChevronRight
} from 'lucide-react';

interface Investment {
  id: number;
  title: string;
  description: string;
  category: string;
  icon: string;
  min_investment: string;
  expected_return: string;
  duration: string;
  image: string;
  features: string[];
  status: string;
  featured: boolean;
  created_at: string;
}

const iconMap: { [key: string]: any } = {
  TrendingUp: TrendingUp,
  Sun: Sun,
  Shield: Shield,
  Wifi: Wifi,
  Zap: Zap,
  Building: Building,
  Users: Users,
  Briefcase: Briefcase,
};

const categoryColors: { [key: string]: string } = {
  Infrastructure: 'bg-blue-500',
  Energy: 'bg-amber-500',
  Security: 'bg-red-500',
  Connectivity: 'bg-emerald-500',
};

export default function InvestPage() {
  const [investments, setInvestments] = useState<Investment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showFeatured, setShowFeatured] = useState(false);

  useEffect(() => {
    fetchInvestments();
  }, [selectedCategory, showFeatured]);

  const fetchInvestments = async () => {
    try {
      setLoading(true);
      let url = '/api/invest?status=active';
      if (selectedCategory !== 'all') {
        url += `&category=${selectedCategory}`;
      }
      if (showFeatured) {
        url += '&featured=true';
      }
      
      const response = await fetch(url);
      const data = await response.json();
      
      if (data.success) {
        setInvestments(data.data);
      } else {
        setError('Failed to load investment opportunities');
      }
    } catch (err) {
      setError('Network error');
    } finally {
      setLoading(false);
    }
  };

  const getIcon = (iconName: string) => {
    return iconMap[iconName] || TrendingUp;
  };

  const categories = ['all', 'Infrastructure', 'Energy', 'Security', 'Connectivity'];

  return (
    <div className="min-h-screen bg-white">

      {/* ============ HEADER ============ */}
      <div className="relative bg-blue-950 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(#ffffff12_1px,transparent_1px)] bg-[length:36px_36px]" />
        <div className="absolute -top-24 -right-24 w-72 h-72 bg-emerald-500/30 rounded-full blur-3xl" />
        <div className="absolute -bottom-32 -left-16 w-72 h-72 bg-yellow-400/10 rounded-full blur-3xl" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16 sm:py-20 relative z-10">
          <p className="text-yellow-400 font-semibold tracking-widest text-xs sm:text-sm">INVEST WITH US</p>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white mt-2 sm:mt-3 max-w-2xl leading-tight">
            Grow Your Wealth While Building Kenya's Digital Future
          </h1>
          <p className="text-blue-100 text-sm sm:text-base mt-3 sm:mt-4 max-w-xl leading-relaxed">
            Invest in our infrastructure, energy, and security projects. We offer competitive returns and a chance to make a real difference in your community.
          </p>
          
          <div className="flex flex-wrap gap-3 mt-6">
            <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 text-sm text-blue-50">
              <span className="font-bold">500+</span> Investors
            </div>
            <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 text-sm text-blue-50">
              <span className="font-bold">KSh 50M+</span> Raised
            </div>
            <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 text-sm text-blue-50">
              <span className="font-bold">15-20%</span> Average Returns
            </div>
          </div>
        </div>
      </div>

      {/* ============ FILTERS ============ */}
      <section className="py-6 px-4 sm:px-6 bg-white border-b border-slate-100 sticky top-16 z-20 bg-white/90 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center gap-3 sm:gap-4">
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                  selectedCategory === cat
                    ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/20'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {cat === 'all' ? 'All Projects' : cat}
              </button>
            ))}
          </div>
          <button
            onClick={() => setShowFeatured(!showFeatured)}
            className={`ml-auto px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
              showFeatured
                ? 'bg-amber-500 text-white shadow-lg shadow-amber-500/20'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            {showFeatured ? '⭐ Featured Only' : 'All Projects'}
          </button>
        </div>
      </section>

      {/* ============ INVESTMENT OPPORTUNITIES ============ */}
      <section className="py-12 sm:py-20 px-4 sm:px-6 bg-slate-50">
        <div className="max-w-7xl mx-auto">
          {loading ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="w-8 h-8 text-emerald-500 animate-spin" />
              <span className="ml-3 text-slate-600">Loading investment opportunities...</span>
            </div>
          ) : error ? (
            <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-red-700 text-center">
              {error}
            </div>
          ) : investments.length === 0 ? (
            <div className="bg-white rounded-2xl border border-slate-100 p-12 text-center">
              <Briefcase className="w-16 h-16 text-slate-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-slate-700 mb-2">No Investment Opportunities Available</h3>
              <p className="text-slate-500 max-w-md mx-auto">
                We're currently updating our investment portfolio. Please check back soon or contact us for more information.
              </p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {investments.map((investment) => {
                const IconComponent = getIcon(investment.icon);
                const categoryColor = categoryColors[investment.category] || 'bg-blue-500';
                
                return (
                  <div
                    key={investment.id}
                    className={`bg-white rounded-2xl sm:rounded-3xl shadow-lg border overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 ${
                      investment.featured ? 'border-amber-500 ring-2 ring-amber-500/20' : 'border-slate-100'
                    }`}
                  >
                    {/* Image */}
                    <div className="relative h-48 sm:h-56 bg-slate-200 overflow-hidden">
                      <img
                        src={investment.image || '/images/invest/default.jpg'}
                        alt={investment.title}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = '/images/invest/default.jpg';
                        }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                      {investment.featured && (
                        <div className="absolute top-4 left-4 z-10">
                          <span className="bg-amber-500 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg">
                            ⭐ Featured
                          </span>
                        </div>
                      )}
                      <div className="absolute top-4 right-4 z-10">
                        <div className={`w-10 h-10 rounded-full ${categoryColor} flex items-center justify-center shadow-lg`}>
                          <IconComponent className="w-5 h-5 text-white" />
                        </div>
                      </div>
                      <div className="absolute bottom-4 left-4 z-10">
                        <span className="bg-black/50 backdrop-blur-sm text-white text-xs font-medium px-3 py-1.5 rounded-full">
                          {investment.category}
                        </span>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-5 sm:p-6">
                      <h3 className="text-lg sm:text-xl font-bold text-blue-950 mb-2">
                        {investment.title}
                      </h3>
                      <p className="text-slate-600 text-sm leading-relaxed mb-4">
                        {investment.description}
                      </p>

                      {/* Key Metrics */}
                      <div className="grid grid-cols-3 gap-2 mb-4 p-3 bg-slate-50 rounded-xl">
                        <div className="text-center">
                          <DollarSign className="w-4 h-4 text-emerald-600 mx-auto mb-1" />
                          <p className="text-xs text-slate-500">Min. Investment</p>
                          <p className="text-sm font-bold text-blue-950">KSh {investment.min_investment}</p>
                        </div>
                        <div className="text-center">
                          <Percent className="w-4 h-4 text-emerald-600 mx-auto mb-1" />
                          <p className="text-xs text-slate-500">Expected Return</p>
                          <p className="text-sm font-bold text-emerald-600">{investment.expected_return}</p>
                        </div>
                        <div className="text-center">
                          <Calendar className="w-4 h-4 text-emerald-600 mx-auto mb-1" />
                          <p className="text-xs text-slate-500">Duration</p>
                          <p className="text-sm font-bold text-blue-950">{investment.duration}</p>
                        </div>
                      </div>

                      {/* Features */}
                      <div className="flex flex-wrap gap-1.5 mb-4">
                        {investment.features?.slice(0, 3).map((feature, idx) => (
                          <span key={idx} className="text-[10px] bg-slate-100 text-slate-600 px-2 py-1 rounded-full">
                            {feature}
                          </span>
                        ))}
                        {investment.features?.length > 3 && (
                          <span className="text-[10px] bg-slate-100 text-slate-600 px-2 py-1 rounded-full">
                            +{investment.features.length - 3} more
                          </span>
                        )}
                      </div>

                      <div className="flex gap-3">
                        <Link
                          href="/contact"
                          className="flex-1 bg-emerald-500 hover:bg-emerald-600 text-white text-center font-semibold py-2.5 rounded-xl transition-all duration-300 text-sm"
                        >
                          Invest Now
                        </Link>
                        <button
                          onClick={() => {
                            // Open details modal or expand
                            alert(`Investment Details for: ${investment.title}\n\n${investment.description}\n\nMin Investment: KSh ${investment.min_investment}\nExpected Return: ${investment.expected_return}\nDuration: ${investment.duration}`);
                          }}
                          className="px-4 py-2.5 border border-slate-200 hover:bg-slate-50 rounded-xl transition-colors text-sm font-medium text-slate-600"
                        >
                          Details
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* ============ WHY INVEST WITH US ============ */}
      <section className="py-16 sm:py-20 px-4 sm:px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <p className="text-emerald-600 font-semibold tracking-widest text-xs sm:text-sm">WHY INVEST</p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-blue-950 mt-2">
              Smart Investment, Real Impact
            </h2>
            <p className="text-slate-600 mt-4">
              Join hundreds of investors who are building Kenya's digital future
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: TrendingUp,
                title: "Competitive Returns",
                desc: "Earn 15-20% returns on your investment with our proven business model and growth strategy."
              },
              {
                icon: Shield,
                title: "Secured Investments",
                desc: "All investments are backed by tangible assets and our experienced management team."
              },
              {
                icon: Users,
                title: "Community Impact",
                desc: "Your investment creates jobs and improves internet access in underserved communities."
              },
              {
                icon: Clock,
                title: "Flexible Terms",
                desc: "Choose from various investment durations and minimum amounts to suit your financial goals."
              }
            ].map((item, i) => (
              <div key={i} className="bg-slate-50 rounded-2xl sm:rounded-3xl p-6 sm:p-8 border border-slate-100 hover:shadow-lg transition-all duration-300">
                <div className="w-12 h-12 rounded-2xl bg-emerald-500 flex items-center justify-center mb-4">
                  <item.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-bold text-blue-950 mb-2">{item.title}</h3>
                <p className="text-slate-600 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ CTA ============ */}
      <section className="py-16 sm:py-20 px-4 sm:px-6 bg-gradient-to-br from-emerald-600 to-emerald-700 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold mb-4">
            Ready to Invest?
          </h2>
          <p className="text-emerald-50 text-base sm:text-lg mb-8 max-w-2xl mx-auto">
            Speak with our investment team today and learn how you can be part of Kenya's digital transformation.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="tel:0700541561"
              className="bg-white text-emerald-700 font-bold px-8 sm:px-10 py-3 sm:py-4 rounded-full text-sm sm:text-lg hover:bg-yellow-400 hover:text-blue-950 transition-all duration-300 flex items-center gap-3 shadow-lg shadow-black/20"
            >
              <Phone className="w-5 h-5" />
              Call 0700 541 561
            </a>
            <a
              href="mailto:invest@ultrafynetworks.co.ke"
              className="border-2 border-white/80 hover:border-white font-semibold px-8 sm:px-10 py-3 sm:py-4 rounded-full text-sm sm:text-lg hover:bg-white/10 transition-all duration-300"
            >
              <Mail className="w-5 h-5 inline-block mr-2" />
              Email Us
            </a>
          </div>
          <p className="text-emerald-200 text-xs sm:text-sm mt-4">
            WhatsApp: 0703 199 691
          </p>
        </div>
      </section>
    </div>
  );
}