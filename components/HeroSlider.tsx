"use client";

import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Pause, Play, Phone, ArrowRight } from 'lucide-react';

interface Slide {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  cta_text: string;
  cta_link: string;
  badge: string;
  display_order: number;
  status: string;
}

export default function HeroSlider() {
  const [slides, setSlides] = useState<Slide[]>([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [progress, setProgress] = useState(0);
  const [loading, setLoading] = useState(true);

  const totalSlides = slides.length;

  useEffect(() => {
    fetchSlides();
  }, []);

  const fetchSlides = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/slider?status=active');
      const data = await response.json();
      if (data.success) {
        setSlides(data.data);
      }
    } catch (error) {
      console.error('Failed to fetch slides:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let interval: NodeJS.Timeout;
    let progressInterval: NodeJS.Timeout;
    
    if (isPlaying && totalSlides > 0) {
      progressInterval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            return 0;
          }
          return prev + 0.5;
        });
      }, 50);

      interval = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % totalSlides);
        setProgress(0);
      }, 5000);
    }

    return () => {
      clearInterval(interval);
      clearInterval(progressInterval);
    };
  }, [isPlaying, totalSlides]);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
    setProgress(0);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
    setProgress(0);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
    setProgress(0);
  };

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  if (loading) {
    return (
      <div className="w-full flex items-center justify-center" style={{ height: 'calc(100vh - 80px)', minHeight: '550px' }}>
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="text-gray-500 mt-4">Loading slides...</p>
        </div>
      </div>
    );
  }

  if (slides.length === 0) {
    return (
      <div className="w-full flex items-center justify-center bg-slate-100" style={{ height: 'calc(100vh - 80px)', minHeight: '550px' }}>
        <div className="text-center">
          <p className="text-gray-500">No slides available. Add some in the admin panel.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full overflow-hidden" style={{ height: 'calc(100vh - 80px)', minHeight: '550px' }}>
      {/* Slides */}
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            index === currentSlide ? 'opacity-100' : 'opacity-0'
          }`}
        >
          {/* Background Image */}
          <div className="absolute inset-0 bg-slate-900">
            <img
              src={slide.image}
              alt={slide.title}
              className="w-full h-full object-cover"
              loading={index === 0 ? 'eager' : 'lazy'}
              onError={(e) => {
                (e.target as HTMLImageElement).style.display = 'none';
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent" />
          </div>
          
          <div className="absolute inset-0 bg-gradient-to-t from-blue-950/90 via-blue-900/60 to-transparent" />

          {/* Content */}
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 w-full h-full flex items-center">
            <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center w-full">
              <div className="space-y-4 sm:space-y-6 animate-fade-in-up max-w-2xl">
                {/* Badge */}
                <div className="inline-flex items-center gap-2 bg-emerald-500/20 backdrop-blur-md border border-emerald-400/30 rounded-full px-4 py-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-xs sm:text-sm font-medium tracking-wide text-emerald-300">
                    {slide.badge || 'Featured'}
                  </span>
                </div>

                {/* Title */}
                <div>
                  <p className="text-emerald-400 text-sm sm:text-base tracking-widest font-medium uppercase">
                    FAST · RELIABLE · EFFICIENT
                  </p>
                  <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-extrabold leading-[1.05] mt-2 sm:mt-3 text-white">
                    {slide.title}<br />
                    <span className="text-emerald-400">{slide.subtitle}</span>
                  </h1>
                </div>

                {/* Description */}
                <p className="text-sm sm:text-base lg:text-lg text-gray-300 max-w-md leading-relaxed">
                  {slide.description}
                </p>

                {/* CTA Buttons */}
                <div className="flex flex-wrap gap-3 sm:gap-4 pt-2">
                  <a
                    href={slide.cta_link}
                    className="group bg-emerald-500 hover:bg-emerald-600 text-white font-semibold px-6 sm:px-8 lg:px-10 py-3 sm:py-3.5 rounded-full text-sm sm:text-base lg:text-lg transition-all duration-300 shadow-lg shadow-emerald-500/30 hover:shadow-xl hover:-translate-y-0.5 inline-flex items-center gap-2"
                  >
                    {slide.cta_text}
                    <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" />
                  </a>
                  <a
                    href="tel:0700541561"
                    className="border-2 border-white/30 hover:border-white text-white font-medium px-5 sm:px-7 lg:px-9 py-3 sm:py-3.5 rounded-full text-sm sm:text-base lg:text-lg flex items-center gap-2 hover:bg-white/10 transition-all duration-300"
                  >
                    <Phone className="w-4 h-4 sm:w-5 sm:h-5" />
                    <span className="hidden sm:inline">Call </span>0700 541 561
                  </a>
                </div>

                {/* Trust Indicators */}
                <div className="flex items-center gap-6 pt-4">
                  <div className="flex items-center gap-2">
                    <div className="flex -space-x-2">
                      {[1, 2, 3, 4].map((i) => (
                        <div key={i} className="w-7 h-7 rounded-full bg-emerald-500/30 border-2 border-emerald-400 flex items-center justify-center text-[10px] font-bold text-emerald-300">
                          {String.fromCharCode(64 + i)}
                        </div>
                      ))}
                    </div>
                    <span className="text-xs text-gray-400">
                      <span className="text-white font-semibold">500+</span> happy customers
                    </span>
                  </div>
                  <div className="flex items-center gap-1 text-gray-400">
                    <span className="text-yellow-400">★★★★★</span>
                    <span className="text-xs">4.9/5</span>
                  </div>
                </div>
              </div>

              <div className="hidden lg:block" />
            </div>
          </div>
        </div>
      ))}

      {/* Progress Bar */}
      <div className="absolute bottom-8 left-0 right-0 z-20 max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center gap-3 sm:gap-4">
          <div className="flex-1 flex gap-1 sm:gap-1.5">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className="flex-1 h-1.5 rounded-full bg-white/20 overflow-hidden transition-all duration-300 hover:bg-white/40 cursor-pointer group"
                aria-label={`Go to slide ${index + 1}`}
              >
                <div
                  className={`h-full bg-emerald-400 transition-all duration-700 ease-out ${
                    index === currentSlide ? 'w-full' : 'w-0'
                  }`}
                />
              </button>
            ))}
          </div>

          <div className="flex items-center gap-1 sm:gap-2 bg-black/30 backdrop-blur-sm rounded-full p-1">
            <button
              onClick={prevSlide}
              className="p-1.5 sm:p-2 rounded-full hover:bg-white/20 transition-all duration-200 text-white/70 hover:text-white hover:scale-110 cursor-pointer"
              aria-label="Previous slide"
            >
              <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
            <button
              onClick={togglePlay}
              className="p-1.5 sm:p-2 rounded-full hover:bg-white/20 transition-all duration-200 text-white/70 hover:text-white hover:scale-110 cursor-pointer"
              aria-label={isPlaying ? 'Pause slideshow' : 'Play slideshow'}
            >
              {isPlaying ? <Pause className="w-4 h-4 sm:w-5 sm:h-5" /> : <Play className="w-4 h-4 sm:w-5 sm:h-5" />}
            </button>
            <button
              onClick={nextSlide}
              className="p-1.5 sm:p-2 rounded-full hover:bg-white/20 transition-all duration-200 text-white/70 hover:text-white hover:scale-110 cursor-pointer"
              aria-label="Next slide"
            >
              <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Slide Counter */}
      <div className="absolute bottom-16 right-4 sm:right-8 z-20 text-white/40 text-xs sm:text-sm font-mono tracking-wider">
        <span className="text-white/80 font-semibold">{String(currentSlide + 1).padStart(2, '0')}</span>
        <span className="mx-1">/</span>
        <span>{String(totalSlides).padStart(2, '0')}</span>
      </div>
    </div>
  );
}