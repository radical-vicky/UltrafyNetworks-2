"use client";

import { useState } from 'react';
import { Star, Loader2 } from 'lucide-react';

interface ReviewFormProps {
  onReviewSubmitted?: () => void;  // Callback to refresh testimonials
}

export default function ReviewForm({ onReviewSubmitted }: ReviewFormProps) {
  const [name, setName] = useState('');
  const [area, setArea] = useState('');
  const [quote, setQuote] = useState('');
  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSubmitting(true);
    
    try {
      const response = await fetch('/api/testimonials', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          name: name.trim(), 
          area: area.trim(), 
          quote: quote.trim(), 
          rating 
        })
      });
      
      const data = await response.json();
      
      if (response.ok) {
        setSuccess(true);
        setName('');
        setArea('');
        setQuote('');
        setRating(5);
        
        // Call the callback to refresh testimonials
        if (onReviewSubmitted) {
          onReviewSubmitted();
        }
        
        // Also reload after 2 seconds to show the new review
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      } else {
        setError(data.error || 'Failed to submit review. Please try again.');
      }
    } catch (error) {
      setError('Network error. Please check your connection and try again.');
    } finally {
      setSubmitting(false);
    }
  };

  if (success) {
    return (
      <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-6 text-center">
        <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="text-xl font-bold text-emerald-800 mb-2">Thank You!</h3>
        <p className="text-emerald-600">Your review has been submitted and is awaiting approval.</p>
        <p className="text-emerald-500 text-sm mt-1">Refreshing page to show updates...</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl sm:rounded-3xl shadow-lg border border-slate-100 p-6 sm:p-8">
      <h3 className="text-xl sm:text-2xl font-bold text-blue-950 mb-2">Share Your Experience</h3>
      <p className="text-slate-500 text-sm mb-6">Tell us about your experience with UltrafyFiberNet</p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="review-name" className="block text-sm font-medium text-slate-700 mb-1">
            Your Name *
          </label>
          <input
            id="review-name"
            type="text"
            placeholder="e.g. Grace Wanjiru"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 outline-none transition-all text-slate-900 placeholder:text-slate-400"
            required
          />
        </div>

        <div>
          <label htmlFor="review-area" className="block text-sm font-medium text-slate-700 mb-1">
            Your Area *
          </label>
          <input
            id="review-area"
            type="text"
            placeholder="e.g. Thika Town, Weitethie"
            value={area}
            onChange={(e) => setArea(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 outline-none transition-all text-slate-900 placeholder:text-slate-400"
            required
          />
        </div>

        <div>
          <label htmlFor="review-quote" className="block text-sm font-medium text-slate-700 mb-1">
            Your Review *
          </label>
          <textarea
            id="review-quote"
            placeholder="What do you love about our service?"
            value={quote}
            onChange={(e) => setQuote(e.target.value)}
            rows={4}
            className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 outline-none transition-all text-slate-900 placeholder:text-slate-400 resize-none"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">
            Rating *
          </label>
          <div className="flex gap-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => setRating(star)}
                onMouseEnter={() => setHoverRating(star)}
                onMouseLeave={() => setHoverRating(0)}
                className="text-3xl sm:text-4xl transition-all hover:scale-110 focus:outline-none"
                aria-label={`Rate ${star} stars`}
              >
                <span className={
                  star <= (hoverRating || rating)
                    ? 'text-yellow-400'
                    : 'text-gray-300'
                }>
                  ★
                </span>
              </button>
            ))}
            <span className="text-sm text-slate-500 ml-2 mt-1.5">
              {rating} / 5
            </span>
          </div>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-xl p-3 text-red-700 text-sm">
            {error}
          </div>
        )}

        <button
          type="submit"
          disabled={submitting}
          className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-3.5 rounded-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {submitting ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Submitting...
            </>
          ) : (
            'Submit Review'
          )}
        </button>

        <p className="text-xs text-slate-400 text-center mt-3">
          Your review will be reviewed before appearing on the site.
        </p>
      </form>
    </div>
  );
}
