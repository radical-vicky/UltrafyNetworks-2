"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

import { 
  Loader2, 
  Check, 
  X, 
  Trash2, 
  Star, 
  Eye, 
  Search, 
  ChevronDown,
  RefreshCw,
  User,
  MapPin,
  Shield,
  Lock,
  MessageCircle,
  Filter,
  ArrowLeft,
  Clock,
  UserCheck,
  UserX,
  LogOut,  // ← Add this
  EyeOff,   // ← Add this
  AlertCircle // ← Add this
} from 'lucide-react';

interface Review {
  id: number;
  name: string;
  area: string;
  quote: string;
  rating: number;
  status: string;
  created_at: string;
}

export default function ReviewAdmin() {
  const router = useRouter();
  const [reviews, setReviews] = useState<Review[]>([]);
  const [filteredReviews, setFilteredReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [expandedReview, setExpandedReview] = useState<number | null>(null);
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [password, setPassword] = useState('');
  const [authError, setAuthError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    const auth = sessionStorage.getItem('adminAuth');
    if (auth === 'true') {
      setIsAuthorized(true);
      fetchReviews();
    }
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const adminPassword = 'admin123';
    if (password === adminPassword) {
      setIsAuthorized(true);
      sessionStorage.setItem('adminAuth', 'true');
      fetchReviews();
      setAuthError('');
    } else {
      setAuthError('Incorrect password');
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem('adminAuth');
    setIsAuthorized(false);
    setPassword('');
    router.push('/');
  };

  const fetchReviews = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/admin/reviews');
      const data = await response.json();
      if (data.success) {
        setReviews(data.data);
        setFilteredReviews(data.data);
      } else {
        setError('Failed to load reviews');
      }
    } catch (err) {
      setError('Network error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    filterReviews();
  }, [reviews, searchTerm, statusFilter]);

  const filterReviews = () => {
    let filtered = reviews;
    
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(
        (r) =>
          r.name.toLowerCase().includes(term) ||
          r.area.toLowerCase().includes(term) ||
          r.quote.toLowerCase().includes(term)
      );
    }
    
    if (statusFilter !== 'all') {
      filtered = filtered.filter((r) => r.status === statusFilter);
    }
    
    setFilteredReviews(filtered);
  };

  const updateStatus = async (id: number, status: string) => {
    try {
      const response = await fetch('/api/admin/reviews', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, status }),
      });
      if (response.ok) {
        fetchReviews();
      }
    } catch (err) {
      alert('Failed to update review');
    }
  };

  const deleteReview = async (id: number) => {
    if (!confirm('Are you sure you want to delete this review?')) return;
    try {
      const response = await fetch(`/api/admin/reviews?id=${id}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        fetchReviews();
      }
    } catch (err) {
      alert('Failed to delete review');
    }
  };

  const getStatusBadge = (status: string) => {
    const styles = {
      approved: 'bg-emerald-100 text-emerald-700 border-emerald-200',
      pending: 'bg-amber-100 text-amber-700 border-amber-200',
      rejected: 'bg-red-100 text-red-700 border-red-200',
    };
    const labels = {
      approved: 'Approved',
      pending: 'Pending',
      rejected: 'Rejected',
    };
    return (
      <span className={`px-2 sm:px-3 py-0.5 sm:py-1 rounded-full text-[10px] sm:text-xs font-medium border ${styles[status as keyof typeof styles] || styles.pending}`}>
        {labels[status as keyof typeof labels] || status}
      </span>
    );
  };

  const getStatusCounts = () => {
    const counts = { all: reviews.length, approved: 0, pending: 0, rejected: 0 };
    reviews.forEach((r) => {
      if (r.status === 'approved') counts.approved++;
      else if (r.status === 'pending') counts.pending++;
      else if (r.status === 'rejected') counts.rejected++;
    });
    return counts;
  };

  // ============ LOGIN SCREEN ============
  if (!isAuthorized) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-100 to-white p-4">
        <div className="bg-white rounded-3xl shadow-2xl border border-slate-100 p-8 max-w-md w-full">
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-xl">
              <Shield className="w-10 h-10 text-yellow-400" />
            </div>
            <h2 className="text-2xl font-bold text-blue-950">Review Management</h2>
            <p className="text-slate-500 text-sm mt-1">Enter password to access reviews</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter admin password..."
                  className="w-full px-4 py-3.5 bg-white border-2 border-slate-300 rounded-xl focus:bg-white focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100 outline-none transition-all text-slate-900 placeholder:text-slate-500 pr-12"
                  autoFocus
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-2 text-slate-400 hover:text-slate-600 transition-colors"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {authError && (
              <div className="bg-red-50 border border-red-200 rounded-xl p-3 text-red-700 text-sm flex items-center gap-2">
                <AlertCircle className="w-4 h-4" />
                {authError}
              </div>
            )}

            <button
              type="submit"
              className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-3.5 rounded-xl transition-all duration-300 shadow-lg shadow-emerald-500/20"
            >
              Access Dashboard
            </button>

            <p className="text-xs text-slate-400 text-center mt-4">Protected area. Authorized personnel only.</p>
          </form>
        </div>
      </div>
    );
  }

  const counts = getStatusCounts();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100">
        <div className="text-center">
          <Loader2 className="w-12 h-12 text-emerald-500 animate-spin mx-auto" />
          <p className="mt-4 text-slate-600 font-medium">Loading reviews...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50 p-4 sm:p-6 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-3">
            <button
              onClick={() => router.push('/admin')}
              className="p-2 hover:bg-slate-100 rounded-xl transition-all duration-200 group"
            >
              <ArrowLeft className="w-5 h-5 text-slate-500 group-hover:text-slate-700" />
            </button>
            <div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-blue-950">
                Review Management
              </h1>
              <p className="text-slate-500 text-sm mt-0.5">
                Manage customer reviews and testimonials
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              onClick={fetchReviews}
              className="flex items-center justify-center gap-1.5 sm:gap-2 bg-white hover:bg-slate-50 text-slate-700 px-3 sm:px-4 py-2.5 rounded-xl border-2 border-slate-300 transition-all duration-200 hover:shadow-md text-sm font-medium flex-1 sm:flex-none"
            >
              <RefreshCw className="w-4 h-4" />
              <span className="hidden xs:inline">Refresh</span>
            </button>
            <button
              onClick={handleLogout}
              className="flex items-center justify-center gap-1.5 sm:gap-2 bg-red-50 hover:bg-red-100 text-red-600 px-3 sm:px-4 py-2.5 rounded-xl border-2 border-red-200 transition-all duration-200 text-sm font-medium flex-1 sm:flex-none"
            >
              <LogOut className="w-4 h-4" />
              <span className="hidden xs:inline">Logout</span>
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mb-6">
          {[
            { label: 'Total', value: counts.all, color: 'text-blue-950', icon: MessageCircle },
            { label: 'Approved', value: counts.approved, color: 'text-emerald-600', icon: UserCheck },
            { label: 'Pending', value: counts.pending, color: 'text-amber-600', icon: Clock },
            { label: 'Rejected', value: counts.rejected, color: 'text-red-600', icon: UserX },
          ].map((stat, i) => (
            <div key={i} className="bg-white rounded-xl sm:rounded-2xl shadow-sm border border-slate-100 p-3 sm:p-5 hover:shadow-md transition-all duration-200">
              <div className="flex items-center gap-2">
                <stat.icon className={`w-4 h-4 ${stat.color}`} />
                <p className="text-[10px] text-slate-500 font-medium uppercase tracking-wider">{stat.label}</p>
              </div>
              <p className={`text-2xl sm:text-3xl font-bold ${stat.color} mt-1`}>{stat.value}</p>
            </div>
          ))}
        </div>

        {/* Filters - Updated with better visibility */}
        <div className="bg-white rounded-xl sm:rounded-2xl shadow-sm border border-slate-100 p-3 sm:p-4 md:p-6 mb-4 sm:mb-6">
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4">
            <div className="relative flex-1">
              <Search className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-slate-400 absolute left-3 sm:left-4 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search by name, area, or review..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-8 sm:pl-10 pr-3 sm:pr-4 py-3 bg-white border-2 border-slate-300 rounded-xl focus:bg-white focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100 outline-none transition-all text-slate-900 placeholder:text-slate-500 text-sm sm:text-base"
              />
            </div>
            
            <div className="relative w-full sm:w-44">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full px-3 sm:px-4 py-3 bg-white border-2 border-slate-300 rounded-xl focus:bg-white focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100 outline-none transition-all appearance-none text-slate-900 text-sm sm:text-base"
              >
                <option value="all">All Status</option>
                <option value="pending">Pending</option>
                <option value="approved">Approved</option>
                <option value="rejected">Rejected</option>
              </select>
              <ChevronDown className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-slate-400 absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-xl p-3 sm:p-4 text-red-700 text-xs sm:text-sm mb-4 sm:mb-6 flex items-center gap-2">
            <AlertCircle className="w-4 h-4" />
            {error}
          </div>
        )}

        {/* Reviews Table */}
        <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg border border-slate-100 overflow-hidden">
          {filteredReviews.length === 0 ? (
            <div className="text-center py-12 sm:py-16 px-4">
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                <MessageCircle className="w-8 h-8 sm:w-10 sm:h-10 text-slate-400" />
              </div>
              <h3 className="text-base sm:text-lg font-semibold text-slate-700 mb-1">No reviews found</h3>
              <p className="text-slate-400 text-xs sm:text-sm">
                {searchTerm || statusFilter !== 'all' 
                  ? 'Try adjusting your filters' 
                  : 'Customer reviews will appear here'}
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full min-w-[640px]">
                <thead className="bg-slate-50 border-b border-slate-100">
                  <tr>
                    <th className="text-left px-3 sm:px-4 py-3 sm:py-4 text-slate-600 font-semibold text-[10px] sm:text-xs uppercase tracking-wider">Name</th>
                    <th className="text-left px-3 sm:px-4 py-3 sm:py-4 text-slate-600 font-semibold text-[10px] sm:text-xs uppercase tracking-wider hidden sm:table-cell">Review</th>
                    <th className="text-left px-3 sm:px-4 py-3 sm:py-4 text-slate-600 font-semibold text-[10px] sm:text-xs uppercase tracking-wider">Rating</th>
                    <th className="text-left px-3 sm:px-4 py-3 sm:py-4 text-slate-600 font-semibold text-[10px] sm:text-xs uppercase tracking-wider hidden xs:table-cell">Status</th>
                    <th className="text-right px-3 sm:px-4 py-3 sm:py-4 text-slate-600 font-semibold text-[10px] sm:text-xs uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredReviews.map((review) => (
                    <tr key={review.id} className="border-b border-slate-100 hover:bg-slate-50 transition-colors duration-150">
                      <td className="px-3 sm:px-4 py-3 sm:py-4">
                        <div>
                          <p className="text-slate-800 font-medium text-sm sm:text-base flex items-center gap-1.5 sm:gap-2">
                            <User className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-slate-400" />
                            {review.name}
                          </p>
                          <p className="text-[10px] sm:text-xs text-slate-400 sm:hidden mt-0.5 flex items-center gap-1">
                            <MapPin className="w-3 h-3" />
                            {review.area}
                          </p>
                        </div>
                      </td>
                      <td className="px-3 sm:px-4 py-3 sm:py-4 text-slate-600 text-xs sm:text-sm hidden sm:table-cell">
                        <div className="max-w-xs">
                          {review.quote.length > 60 ? (
                            <>
                              {expandedReview === review.id 
                                ? review.quote 
                                : `${review.quote.substring(0, 60)}...`}
                              <button
                                onClick={() => setExpandedReview(expandedReview === review.id ? null : review.id)}
                                className="text-emerald-600 hover:text-emerald-700 font-medium text-[10px] sm:text-xs ml-1"
                              >
                                {expandedReview === review.id ? 'less' : 'more'}
                              </button>
                            </>
                          ) : (
                            review.quote
                          )}
                        </div>
                      </td>
                      <td className="px-3 sm:px-4 py-3 sm:py-4">
                        <div className="flex items-center gap-0.5 sm:gap-1">
                          <div className="flex text-yellow-400">
                            {Array.from({ length: 5 }).map((_, i) => (
                              <Star key={i} className={`w-3 h-3 sm:w-4 sm:h-4 ${i < review.rating ? 'fill-yellow-400' : 'text-slate-200'}`} />
                            ))}
                          </div>
                          <span className="text-[10px] sm:text-xs text-slate-400 ml-0.5 sm:ml-1">{review.rating}</span>
                        </div>
                      </td>
                      <td className="px-3 sm:px-4 py-3 sm:py-4 hidden xs:table-cell">
                        {getStatusBadge(review.status)}
                      </td>
                      <td className="px-3 sm:px-4 py-3 sm:py-4">
                        <div className="flex items-center justify-end gap-1 sm:gap-1.5">
                          {review.status === 'pending' && (
                            <>
                              <button
                                onClick={() => updateStatus(review.id, 'approved')}
                                className="p-1.5 sm:p-2 text-emerald-600 hover:bg-emerald-50 rounded-lg transition-all duration-200 hover:scale-110"
                                title="Approve"
                              >
                                <Check className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                              </button>
                              <button
                                onClick={() => updateStatus(review.id, 'rejected')}
                                className="p-1.5 sm:p-2 text-red-600 hover:bg-red-50 rounded-lg transition-all duration-200 hover:scale-110"
                                title="Reject"
                              >
                                <X className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                              </button>
                            </>
                          )}
                          <button
                            onClick={() => deleteReview(review.id)}
                            className="p-1.5 sm:p-2 text-red-500 hover:bg-red-50 rounded-lg transition-all duration-200 hover:scale-110"
                            title="Delete"
                          >
                            <Trash2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                          </button>
                          <button
                            onClick={() => setExpandedReview(expandedReview === review.id ? null : review.id)}
                            className="p-1.5 sm:p-2 text-slate-400 hover:bg-slate-100 rounded-lg transition-all duration-200 md:hidden"
                            title="View full review"
                          >
                            <Eye className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Footer */}
          <div className="bg-slate-50 border-t border-slate-100 px-3 sm:px-4 py-2.5 sm:py-3 flex flex-col sm:flex-row items-center justify-between gap-2 text-[10px] sm:text-xs text-slate-500">
            <span>
              Showing {filteredReviews.length} of {reviews.length} reviews
            </span>
            <span>
              Last updated: {new Date().toLocaleString()}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}