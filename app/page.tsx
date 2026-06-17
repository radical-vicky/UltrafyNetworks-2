import Image from 'next/image';
import { Phone, Wifi, Zap, ShieldCheck, Headset, MapPin, Star, ChevronRight } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen bg-white">

      {/* ============ HERO ============ */}
      <section
        className="relative min-h-[100dvh] flex items-center bg-cover bg-center bg-no-repeat text-white overflow-hidden"
        style={{ backgroundImage: "url('/images/hero.jpg')" }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-blue-950/80 via-blue-900/85 to-blue-700/90" />
        <div className="absolute inset-0 bg-[radial-gradient(#ffffff15_1px,transparent_1px)] bg-[length:40px_40px]" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-24 pb-32 relative z-10 w-full">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">

            <div className="space-y-6 sm:space-y-8">
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/30 rounded-full px-3 sm:px-4 py-1.5">
                <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                <span className="text-xs sm:text-sm font-medium tracking-wide">Now live in Thika</span>
              </div>

              <div>
                <p className="text-blue-200 text-sm sm:text-lg tracking-widest font-medium">FAST · RELIABLE · EFFICIENT</p>
                <h1 className="text-4xl sm:text-5xl lg:text-7xl font-extrabold leading-[1.05] mt-3 sm:mt-4">
                  UltrafyFiberNet<br />
                  <span className="text-yellow-400">Tuko Thika</span>
                </h1>
              </div>

              <p className="text-base sm:text-xl text-blue-50 max-w-md leading-relaxed">
                Premium fibre internet built for Thika homes and businesses. No buffering, no excuses — just fast, dependable connection your whole family can count on.
              </p>

              {/* Offer Banner */}
              <div className="bg-yellow-400/20 backdrop-blur-md border border-yellow-400/30 rounded-2xl px-4 sm:px-6 py-3 sm:py-4 text-center">
                <p className="text-yellow-200 font-bold text-sm sm:text-base">
                  SPECIAL OFFER: Get 1 Month Free After Installation
                </p>
                <p className="text-blue-100 text-xs sm:text-sm mt-1">Limited time offer — available for all packages</p>
              </div>

              {/* Packages - Mobile Responsive Grid */}
              <div className="grid grid-cols-4 gap-2 sm:gap-4 pt-2 sm:pt-4">
                {[
                  { speed: "5", price: "1,000", accent: "from-emerald-500 to-emerald-400" },
                  { speed: "8", price: "1,500", accent: "from-blue-500 to-cyan-400" },
                  { speed: "15", price: "2,000", accent: "from-purple-500 to-violet-400" },
                  { speed: "30", price: "3,000", accent: "from-orange-500 to-amber-400" },
                ].map((pkg, i) => (
                  <div
                    key={i}
                    className="bg-white/10 backdrop-blur-md border border-white/30 rounded-2xl sm:rounded-3xl p-2 sm:p-5 text-center hover:scale-105 hover:bg-white/15 transition-all duration-300"
                  >
                    <div className={`text-lg sm:text-4xl font-extrabold bg-gradient-to-br ${pkg.accent} bg-clip-text text-transparent`}>
                      {pkg.speed}
                    </div>
                    <div className="text-[8px] sm:text-sm text-white/70 -mt-1">Mbps</div>
                    <div className="mt-1 sm:mt-3 text-sm sm:text-2xl font-bold">KSh {pkg.price}</div>
                    <div className="text-[7px] sm:text-xs text-white/60">per month</div>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap gap-3 sm:gap-4 pt-2">
                <a
                  href="#contact"
                  className="bg-emerald-500 text-white font-bold px-6 sm:px-10 py-3 sm:py-4 rounded-full text-sm sm:text-lg hover:bg-emerald-600 transition-all duration-300 shadow-lg shadow-emerald-500/20"
                >
                  Get Connected Now
                </a>
                <a
                  href="tel:0700541561"
                  className="border-2 border-white/80 hover:border-white font-semibold px-4 sm:px-8 py-3 sm:py-4 rounded-full text-sm sm:text-lg flex items-center gap-2 sm:gap-3 hover:bg-white/10 transition-all duration-300"
                >
                  <Phone className="w-4 h-4 sm:w-5 sm:h-5" />
                  0700 541 561
                </a>
              </div>
            </div>

            <div className="hidden lg:block" />
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 bg-blue-950/80 backdrop-blur-sm py-4 sm:py-6 text-center z-20 border-t border-white/10">
          <p className="text-2xl sm:text-4xl md:text-5xl font-extrabold tracking-widest">0700 541 561</p>
          <p className="text-blue-200 text-xs sm:text-sm mt-1">Call or WhatsApp us anytime for instant support</p>
        </div>
      </section>

      {/* ============ PACKAGES SECTION ============ */}
      <section id="packages" className="py-16 sm:py-24 px-4 sm:px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
            <p className="text-blue-600 font-semibold tracking-widest text-xs sm:text-sm">OUR PACKAGES</p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-blue-950 mt-2 sm:mt-3">
              Choose Your Perfect Plan
            </h2>
            <p className="text-slate-600 text-sm sm:text-base mt-4">Select the speed that fits your household needs</p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {[
              { speed: "5", price: "1,000", originalPrice: "1,500", accent: "from-emerald-500 to-emerald-400", tag: "Starter" },
              { speed: "8", price: "1,500", originalPrice: "2,000", accent: "from-blue-500 to-cyan-400", tag: "Most Popular", popular: true },
              { speed: "15", price: "2,000", originalPrice: "2,500", accent: "from-purple-500 to-violet-400", tag: "Standard" },
              { speed: "30", price: "3,000", originalPrice: "4,000", accent: "from-orange-500 to-amber-400", tag: "Premium" },
            ].map((pkg, i) => (
              <div
                key={i}
                className={`relative bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-lg border transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl ${
                  pkg.popular ? 'border-blue-500 ring-2 ring-blue-500/20' : 'border-slate-100'
                }`}
              >
                {pkg.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span className="bg-gradient-to-r from-blue-600 to-blue-700 text-white text-[10px] sm:text-xs font-bold px-3 sm:px-4 py-1 sm:py-1.5 rounded-full">
                      Most Popular
                    </span>
                  </div>
                )}
                
                <div className="text-center">
                  <div className={`w-14 h-14 sm:w-16 sm:h-16 mx-auto rounded-2xl bg-gradient-to-br ${pkg.accent} flex items-center justify-center mb-3 sm:mb-4`}>
                    <Wifi className="h-6 w-6 sm:h-8 sm:w-8 text-white" />
                  </div>
                  
                  <div className="text-xs sm:text-sm text-slate-500 font-medium mb-1">{pkg.tag}</div>
                  
                  <div className="text-4xl sm:text-5xl font-extrabold text-blue-950">
                    {pkg.speed}
                  </div>
                  <div className="text-xs sm:text-sm text-slate-500 mb-2">Mbps</div>
                  
                  <div className="flex items-center justify-center gap-2 sm:gap-3">
                    <span className="text-2xl sm:text-3xl font-bold text-blue-600">KSh {pkg.price}</span>
                    <span className="text-xs sm:text-sm text-slate-400 line-through">KSh {pkg.originalPrice}</span>
                  </div>
                  <div className="text-[10px] sm:text-xs text-green-600 font-medium mt-1">
                    Save {Math.round(((parseInt(pkg.originalPrice) - parseInt(pkg.price)) / parseInt(pkg.originalPrice)) * 100)}%
                  </div>
                  
                  <ul className="mt-4 sm:mt-6 space-y-1.5 sm:space-y-2 text-left">
                    <li className="flex items-center gap-2 text-xs sm:text-sm text-slate-600">
                      <span className="text-green-500 text-sm sm:text-base">✓</span> Unlimited data
                    </li>
                    <li className="flex items-center gap-2 text-xs sm:text-sm text-slate-600">
                      <span className="text-green-500 text-sm sm:text-base">✓</span> Free installation
                    </li>
                    <li className="flex items-center gap-2 text-xs sm:text-sm text-slate-600">
                      <span className="text-green-500 text-sm sm:text-base">✓</span> 1 month free
                    </li>
                  </ul>
                  
                  <a
                    href="#contact"
                    className={`mt-4 sm:mt-6 inline-flex w-full items-center justify-center rounded-xl sm:rounded-2xl px-4 sm:px-6 py-2.5 sm:py-3 font-semibold transition-all duration-300 text-sm sm:text-base ${
                      pkg.popular
                        ? 'bg-emerald-500 text-white hover:bg-emerald-600 hover:shadow-xl hover:-translate-y-0.5'
                        : 'bg-slate-100 text-blue-900 hover:bg-slate-200'
                    }`}
                  >
                    Get Connected
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ WHY CHOOSE US ============ */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 bg-slate-50">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-2xl mb-12 sm:mb-16">
            <p className="text-blue-600 font-semibold tracking-widest text-xs sm:text-sm">WHY ULTRAFYFIBERNET</p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-blue-950 mt-2 sm:mt-3">
              Internet that actually works when you need it
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {[
              { icon: Zap, title: "Real fibre speeds", desc: "What we advertise is what you get — no shared bandwidth tricks, no peak-hour slowdowns." },
              { icon: ShieldCheck, title: "99.5% uptime", desc: "Our network is monitored around the clock so outages get caught before you notice them." },
              { icon: Headset, title: "Local support", desc: "Talk to a real technician based in Thika, not a call centre script in another county." },
              { icon: MapPin, title: "Same-day install", desc: "Order before noon and most homes in our coverage zone are online by evening." },
            ].map((item, i) => (
              <div key={i} className="group bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 border border-slate-100 hover:shadow-lg transition-all duration-300">
                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-blue-950 flex items-center justify-center mb-4 sm:mb-5 group-hover:bg-blue-600 transition-colors duration-300">
                  <item.icon className="w-6 h-6 sm:w-7 sm:h-7 text-yellow-400" />
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-blue-950 mb-2">{item.title}</h3>
                <p className="text-sm sm:text-base text-slate-600 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ HOW IT WORKS ============ */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-2xl mb-12 sm:mb-16">
            <p className="text-blue-600 font-semibold tracking-widest text-xs sm:text-sm">GETTING STARTED</p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-blue-950 mt-2 sm:mt-3">
              Three steps to getting wired in Thika
            </h2>
          </div>

          <div className="grid sm:grid-cols-3 gap-6 sm:gap-10 relative">
            <div className="hidden sm:block absolute top-8 left-[16.5%] right-[16.5%] h-0.5 bg-blue-200" />

            {[
              { step: "1", title: "Check coverage", desc: "Tell us your location in Thika and we'll confirm if your home or business is within our fibre zone." },
              { step: "2", title: "Pick a package", desc: "Choose the speed that fits your household, from 5 Mbps starter plans to 30 Mbps for heavy streaming." },
              { step: "3", title: "We install for free", desc: "Our technician sets up your router and runs the line — most installs take under two hours. Plus, get 1 month free!" },
            ].map((item, i) => (
              <div key={i} className="relative bg-slate-50 rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-100">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-blue-950 text-yellow-400 font-extrabold text-base sm:text-lg flex items-center justify-center mb-4 sm:mb-5 relative z-10">
                  {item.step}
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-blue-950 mb-2">{item.title}</h3>
                <p className="text-sm sm:text-base text-slate-600 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ COVERAGE - Thika Areas ============ */}
      <section id="coverage" className="py-16 sm:py-24 px-4 sm:px-6 bg-blue-950 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(#ffffff10_1px,transparent_1px)] bg-[length:32px_32px]" />
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div>
              <p className="text-yellow-400 font-semibold tracking-widest text-xs sm:text-sm">COVERAGE AREA</p>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold mt-2 sm:mt-3 mb-4 sm:mb-6">
                Already lighting up Thika and beyond
              </h2>
              <p className="text-blue-100 text-base sm:text-lg leading-relaxed mb-6 sm:mb-8 max-w-lg">
                We're expanding fast across Thika and neighbouring areas. If you don't see your area listed yet, reach out — we add new zones every month based on demand.
              </p>
              <div className="flex flex-wrap gap-2 sm:gap-3">
                {["Thika Town", "Weitethie", "Ngoingwa", "Gatukuyu", "Mangu", "Section 9", "Kiganjo", "Makongeni"].map((area, i) => (
                  <span key={i} className="bg-white/10 border border-white/20 rounded-full px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-medium">
                    {area}
                  </span>
                ))}
              </div>
            </div>
            <div className="relative h-60 sm:h-80 rounded-2xl sm:rounded-3xl bg-white/5 border border-white/10 flex items-center justify-center">
              <p className="text-blue-300 text-xs sm:text-sm">Coverage Map - Thika Region</p>
            </div>
          </div>
        </div>
      </section>

      {/* ============ TESTIMONIALS ============ */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-2xl mb-12 sm:mb-16">
            <p className="text-blue-600 font-semibold tracking-widest text-xs sm:text-sm">WHAT OUR CUSTOMERS SAY</p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-blue-950 mt-2 sm:mt-3">
              Trusted by homes across Thika
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {[
              { name: "Grace Wanjiru", area: "Weitethie", quote: "Switched from mobile data and never looked back. My kids' online classes run without a single freeze now." },
              { name: "Peter Mwangi", area: "Ngoingwa", quote: "Installation took less than two hours and support actually picks up the phone when I call." },
              { name: "Sarah Akinyi", area: "Section 9", quote: "The 30 Mbps plan handles three of us streaming at once with no lag. Best decision for our home this year." },
            ].map((t, i) => (
              <div key={i} className="bg-slate-50 rounded-2xl sm:rounded-3xl p-6 sm:p-8 border border-slate-100">
                <div className="flex gap-1 mb-3 sm:mb-4">
                  {Array.from({ length: 5 }).map((_, j) => (
                    <Star key={j} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-sm sm:text-base text-slate-700 leading-relaxed mb-4 sm:mb-6">"{t.quote}"</p>
                <p className="font-bold text-blue-950">{t.name}</p>
                <p className="text-xs sm:text-sm text-slate-500">{t.area}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ FAQ ============ */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 bg-slate-50">
        <div className="max-w-4xl mx-auto">
          <div className="mb-12 sm:mb-16">
            <p className="text-blue-600 font-semibold tracking-widest text-xs sm:text-sm">QUESTIONS</p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-blue-950 mt-2 sm:mt-3">
              Common questions, answered
            </h2>
          </div>

          <div className="space-y-3 sm:space-y-4">
            {[
              { q: "Is installation really free?", a: "Yes. Once you're within our Thika coverage zone, our technician installs your router and runs the fibre line at no extra cost." },
              { q: "Do I really get 1 month free?", a: "Yes! All new customers who sign up get their first month absolutely free after installation. This applies to all our packages." },
              { q: "Can I upgrade my package later?", a: "Anytime. Call or WhatsApp us and we'll switch your plan before your next billing cycle." },
              { q: "What happens if I have an outage?", a: "Our network is monitored continuously. Report it through the support line and a technician is dispatched the same day for on-site issues." },
              { q: "Do you offer business packages?", a: "Yes, we work with shops, offices, and cyber cafes in Thika on custom plans — contact us for pricing." },
            ].map((item, i) => (
              <details key={i} className="group bg-white rounded-2xl border border-slate-100 px-4 sm:px-6 py-4 sm:py-5">
                <summary className="flex items-center justify-between cursor-pointer font-semibold text-blue-950 list-none text-sm sm:text-base">
                  {item.q}
                  <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 text-slate-400 group-open:rotate-90 transition-transform duration-200 flex-shrink-0 ml-4" />
                </summary>
                <p className="text-sm sm:text-base text-slate-600 mt-3 leading-relaxed">{item.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ============ CONTACT CTA ============ */}
      <section id="contact" className="py-16 sm:py-24 px-4 sm:px-6 bg-gradient-to-br from-blue-600 to-blue-700 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(
