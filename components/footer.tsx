import Link from "next/link";
import {
  Wifi,
  Phone,
  Mail,
  MessageCircle,
} from "lucide-react";

import {
  FaFacebookF,
  FaInstagram,
  FaXTwitter,
  FaLinkedinIn,
  FaYoutube,
} from "react-icons/fa6";

export default function Footer() {
  return (
    <footer className="bg-gradient-to-b from-white via-blue-100 to-blue-950 pt-16">

      {/* ============ START YOUR JOURNEY STRIP ============ */}
      <div className="max-w-6xl mx-auto px-6 pb-16">
        <div className="bg-blue-950 rounded-3xl px-6 sm:px-8 py-8 sm:py-10 flex flex-col lg:flex-row items-center justify-between gap-6 sm:gap-8 relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(#ffffff12_1px,transparent_1px)] bg-[length:32px_32px]" />
          <div className="relative z-10 text-center lg:text-left">
            <h3 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-white">
              Start your internet journey today
            </h3>
            <p className="text-blue-200 mt-1 sm:mt-2 text-sm sm:text-base">We're here whenever you need us.</p>
          </div>

          <div className="flex flex-wrap justify-center gap-2 sm:gap-3 relative z-10">
            <a
              href="https://wa.me/254703199691"
              className="flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white font-medium px-4 sm:px-5 py-2.5 sm:py-3 rounded-xl transition-colors text-sm sm:text-base"
            >
              <MessageCircle className="w-4 h-4" />
              WhatsApp Support
            </a>
            <a
              href="tel:0700541561"
              className="flex items-center gap-2 bg-white/10 border border-white/20 hover:bg-white/20 text-white font-medium px-4 sm:px-5 py-2.5 sm:py-3 rounded-xl transition-colors text-sm sm:text-base"
            >
              <Phone className="w-4 h-4 text-emerald-400" />
              0700 541 561
            </a>
            <a
              href="mailto:info@ultrafynetworks.co.ke"
              className="flex items-center gap-2 bg-white/10 border border-white/20 hover:bg-white/20 text-white font-medium px-4 sm:px-5 py-2.5 sm:py-3 rounded-xl transition-colors text-sm sm:text-base"
            >
              <Mail className="w-4 h-4 text-emerald-400" />
              Email Us
            </a>
          </div>
        </div>
      </div>

      {/* ============ LINK COLUMNS ============ */}
      <div className="max-w-6xl mx-auto px-6 pb-12">
        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-8 sm:gap-10">

          <div className="lg:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-blue-700 text-white font-bold text-[8px] leading-tight text-center">
                UFN
              </div>
              <span className="text-blue-950 font-extrabold text-lg sm:text-xl">UltrafyNetworks</span>
            </div>
            <p className="text-slate-600 text-sm leading-relaxed max-w-xs">
              Premium fibre internet built for Thika homes and businesses. Fast, reliable, and unlimited connectivity.
            </p>
          </div>

          <div>
            <p className="text-blue-950 font-bold mb-4 text-sm uppercase tracking-wide">Internet</p>
            <ul className="space-y-2.5 text-sm">
              <li><a href="#packages" className="text-slate-600 hover:text-emerald-500 transition-colors">Home plans</a></li>
              <li><a href="#packages" className="text-slate-600 hover:text-emerald-500 transition-colors">Business plans</a></li>
              <li><a href="#coverage" className="text-slate-600 hover:text-emerald-500 transition-colors">Coverage area</a></li>
            </ul>
          </div>

          <div>
            <p className="text-blue-950 font-bold mb-4 text-sm uppercase tracking-wide">Company</p>
            <ul className="space-y-2.5 text-sm">
              <li><Link href="/about" className="text-slate-600 hover:text-emerald-500 transition-colors">About us</Link></li>
              <li><Link href="/careers" className="text-slate-600 hover:text-emerald-500 transition-colors">Careers</Link></li>
              <li><a href="#contact" className="text-slate-600 hover:text-emerald-500 transition-colors">Contact</a></li>
            </ul>
          </div>

          <div>
            <p className="text-blue-950 font-bold mb-4 text-sm uppercase tracking-wide">Help</p>
            <ul className="space-y-2.5 text-sm">
              <li><Link href="/faq" className="text-slate-600 hover:text-emerald-500 transition-colors">FAQ</Link></li>
              <li><a href="#contact" className="text-slate-600 hover:text-emerald-500 transition-colors">Get support</a></li>
            </ul>
          </div>
        </div>

        {/* Social Icons */}
        <div className="flex flex-wrap items-center gap-3 mt-10">
          <span className="text-blue-950 text-sm font-medium mr-2">Follow us:</span>
          <a href="#" aria-label="Facebook" className="w-9 h-9 rounded-full bg-blue-950 hover:bg-emerald-500 flex items-center justify-center transition-colors text-white">
            <FaFacebookF className="h-4 w-4" />
          </a>
          <a href="#" aria-label="Instagram" className="w-9 h-9 rounded-full bg-blue-950 hover:bg-emerald-500 flex items-center justify-center transition-colors text-white">
            <FaInstagram className="h-4 w-4" />
          </a>
          <a href="#" aria-label="X / Twitter" className="w-9 h-9 rounded-full bg-blue-950 hover:bg-emerald-500 flex items-center justify-center transition-colors text-white">
            <FaXTwitter className="h-4 w-4" />
          </a>
          <a href="#" aria-label="LinkedIn" className="w-9 h-9 rounded-full bg-blue-950 hover:bg-emerald-500 flex items-center justify-center transition-colors text-white">
            <FaLinkedinIn className="h-4 w-4" />
          </a>
          <a href="#" aria-label="YouTube" className="w-9 h-9 rounded-full bg-blue-950 hover:bg-emerald-500 flex items-center justify-center transition-colors text-white">
            <FaYoutube className="h-4 w-4" />
          </a>
        </div>
      </div>

      {/* ============ BOTTOM BAR ============ */}
      <div className="border-t border-blue-900/40">
        <div className="max-w-6xl mx-auto px-6 py-5 sm:py-6 flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4 text-xs sm:text-sm">
          <p className="text-blue-100 text-center sm:text-left">
            &copy; {new Date().getFullYear()} UltrafyNetworks. All rights reserved.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6">
            <Link href="/privacy-policy" className="text-blue-100 hover:text-emerald-400 transition-colors">Privacy Policy</Link>
            <Link href="/terms-and-conditions" className="text-blue-100 hover:text-emerald-400 transition-colors">Terms &amp; Conditions</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}