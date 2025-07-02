import React, { useState, useEffect } from 'react';
import { Heart, Bookmark, Shuffle, Filter, Search, ArrowLeft } from 'lucide-react';
import { supabase, getSessionId } from '../lib/supabase';
import { LoveTip, TipVote, TipBookmark } from '../types/database';

interface DailyTipsPageProps {
  onPageChange: (page: string) => void;
}

const DailyTipsPage: React.FC<DailyTipsPageProps> = ({ onPageChange }) => {
  const [tips, setTips] = useState<LoveTip[]>([]);
  const [filteredTips, setFilteredTips] = useState<LoveTip[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [userVotes, setUserVotes] = useState<Set<string>>(new Set());
  const [userBookmarks, setUserBookmarks] = useState<Set<string>>(new Set());
  const [showBookmarksOnly, setShowBookmarksOnly] = useState(false);

  const categories = ['all', 'boundaries', 'communication', 'recognition', 'self-worth', 'reality-check', 'healing', 'respect', 'support'];

  useEffect(() => {
    fetchTips();
    fetchUserInteractions();
  }, []);

  useEffect(() => {
    filterTips();
  }, [tips, searchTerm, selectedCategory, showBookmarksOnly, userBookmarks]);

  const fetchTips = async () => {
    try {
      const { data, error } = await supabase
        .from('love_tips')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setTips(data || []);
    } catch (error) {
      console.error('Error fetching tips:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchUserInteractions = async () => {
    const sessionId = getSessionId();
    
    try {
      // Fetch user votes
      const { data: votes } = await supabase
        .from('tip_votes')
        .select('tip_id')
        .eq('user_session', sessionId);

      if (votes) {
        setUserVotes(new Set(votes.map(v => v.tip_id)));
      }

      // Fetch user bookmarks
      const { data: bookmarks } = await supabase
        .from('tip_bookmarks')
        .select('tip_id')
        .eq('user_session', sessionId);

      if (bookmarks) {
        setUserBookmarks(new Set(bookmarks.map(b => b.tip_id)));
      }
    } catch (error) {
      console.error('Error fetching user interactions:', error);
    }
  };

  const filterTips = () => {
    let filtered = tips;

    if (searchTerm) {
      filtered = filtered.filter(tip => 
        tip.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
        tip.category.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedCategory !== 'all') {
      filtered = filtered.filter(tip => tip.category === selectedCategory);
    }

    if (showBookmarksOnly) {
      filtered = filtered.filter(tip => userBookmarks.has(tip.id));
    }

    setFilteredTips(filtered);
  };

  const handleVote = async (tipId: string) => {
    const sessionId = getSessionId();
    
    try {
      if (userVotes.has(tipId)) {
        // Remove vote
        await supabase
          .from('tip_votes')
          .delete()
          .eq('tip_id', tipId)
          .eq('user_session', sessionId);

        setUserVotes(prev => {
          const newSet = new Set(prev);
          newSet.delete(tipId);
          return newSet;
        });

        // Update tip vote count
        const tip = tips.find(t => t.id === tipId);
        if (tip) {
          await supabase
            .from('love_tips')
            .update({ vote_count: Math.max(0, tip.vote_count - 1) })
            .eq('id', tipId);
        }
      } else {
        // Add vote
        await supabase
          .from('tip_votes')
          .insert({
            tip_id: tipId,
            user_session: sessionId,
            vote_type: 'love'
          });

        setUserVotes(prev => new Set([...prev, tipId]));

        // Update tip vote count
        const tip = tips.find(t => t.id === tipId);
        if (tip) {
          await supabase
            .from('love_tips')
            .update({ vote_count: tip.vote_count + 1 })
            .eq('id', tipId);
        }
      }

      // Refresh tips to get updated counts
      fetchTips();
    } catch (error) {
      console.error('Error voting on tip:', error);
    }
  };

  const handleBookmark = async (tipId: string) => {
    const sessionId = getSessionId();
    
    try {
      if (userBookmarks.has(tipId)) {
        // Remove bookmark
        await supabase
          .from('tip_bookmarks')
          .delete()
          .eq('tip_id', tipId)
          .eq('user_session', sessionId);

        setUserBookmarks(prev => {
          const newSet = new Set(prev);
          newSet.delete(tipId);
          return newSet;
        });

        // Update tip bookmark count
        const tip = tips.find(t => t.id === tipId);
        if (tip) {
          await supabase
            .from('love_tips')
            .update({ bookmark_count: Math.max(0, tip.bookmark_count - 1) })
            .eq('id', tipId);
        }
      } else {
        // Add bookmark
        await supabase
          .from('tip_bookmarks')
          .insert({
            tip_id: tipId,
            user_session: sessionId
          });

        setUserBookmarks(prev => new Set([...prev, tipId]));

        // Update tip bookmark count
        const tip = tips.find(t => t.id === tipId);
        if (tip) {
          await supabase
            .from('love_tips')
            .update({ bookmark_count: tip.bookmark_count + 1 })
            .eq('id', tipId);
        }
      }

      // Refresh tips to get updated counts
      fetchTips();
    } catch (error) {
      console.error('Error bookmarking tip:', error);
    }
  };

  const shuffleTips = () => {
    const shuffled = [...filteredTips].sort(() => Math.random() - 0.5);
    setFilteredTips(shuffled);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50 pt-16 flex items-center justify-center">
        <div className="text-center">
          <Heart className="w-12 h-12 text-pink-500 animate-pulse mx-auto mb-4" />
          <p className="text-gray-600">Loading love tips...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50 pt-16">
      <div className="container mx-auto px-6 py-8">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => onPageChange('home')}
            className="flex items-center space-x-2 text-gray-600 hover:text-pink-500 mb-4 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Home</span>
          </button>
          
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent mb-4">
              Daily Love Tips
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Real relationship advice that doesn't suck. Vote for your favorites and bookmark the ones that hit different.
            </p>
          </div>

          {/* Controls */}
          <div className="bg-white rounded-2xl p-6 shadow-lg mb-8">
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
              <div className="flex flex-col sm:flex-row gap-4 flex-1">
                <div className="relative flex-1 max-w-md">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Search tips..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                  />
                </div>
                
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent bg-white"
                >
                  {categories.map(category => (
                    <option key={category} value={category}>
                      {category === 'all' ? 'All Categories' : category.charAt(0).toUpperCase() + category.slice(1)}
                    </option>
                  ))}
                </select>
              </div>
              
              <div className="flex gap-2">
                <button
                  onClick={() => setShowBookmarksOnly(!showBookmarksOnly)}
                  className={`flex items-center space-x-2 px-4 py-3 rounded-xl transition-all duration-200 ${
                    showBookmarksOnly
                      ? 'bg-pink-500 text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  <Bookmark className="w-5 h-5" />
                  <span className="hidden sm:inline">Bookmarks</span>
                </button>
                
                <button
                  onClick={shuffleTips}
                  className="flex items-center space-x-2 px-4 py-3 bg-purple-500 text-white rounded-xl hover:bg-purple-600 transition-colors"
                >
                  <Shuffle className="w-5 h-5" />
                  <span className="hidden sm:inline">Shuffle</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Tips Grid */}
        {filteredTips.length === 0 ? (
          <div className="text-center py-12">
            <Heart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-600 mb-2">No tips found</h3>
            <p className="text-gray-500">Try adjusting your search or filters</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTips.map((tip) => (
              <div
                key={tip.id}
                className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
              >
                <div className="mb-4">
                  <div className="flex items-center justify-between mb-3">
                    <span className="bg-gradient-to-r from-pink-500 to-purple-600 text-white px-3 py-1 rounded-full text-sm font-bold">
                      Tip #{tip.tip_number}
                    </span>
                    <span className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-sm capitalize">
                      {tip.category}
                    </span>
                  </div>
                </div>
                
                <blockquote className="text-gray-700 leading-relaxed mb-6 text-lg">
                  "{tip.content}"
                </blockquote>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500 font-medium">— {tip.author} 💖</span>
                  
                  <div className="flex items-center space-x-3">
                    <button
                      onClick={() => handleVote(tip.id)}
                      className={`flex items-center space-x-1 px-3 py-2 rounded-full transition-all duration-200 ${
                        userVotes.has(tip.id)
                          ? 'bg-pink-500 text-white'
                          : 'bg-gray-100 text-gray-600 hover:bg-pink-100 hover:text-pink-600'
                      }`}
                    >
                      <Heart className={`w-4 h-4 ${userVotes.has(tip.id) ? 'fill-current' : ''}`} />
                      <span className="text-sm font-medium">{tip.vote_count}</span>
                    </button>
                    
                    <button
                      onClick={() => handleBookmark(tip.id)}
                      className={`p-2 rounded-full transition-all duration-200 ${
                        userBookmarks.has(tip.id)
                          ? 'bg-purple-500 text-white'
                          : 'bg-gray-100 text-gray-600 hover:bg-purple-100 hover:text-purple-600'
                      }`}
                    >
                      <Bookmark className={`w-4 h-4 ${userBookmarks.has(tip.id) ? 'fill-current' : ''}`} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Stats */}
        <div className="mt-12 bg-white rounded-2xl p-6 shadow-lg">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div>
              <div className="text-2xl font-bold text-pink-600">{tips.length}</div>
              <div className="text-sm text-gray-600">Total Tips</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-purple-600">{tips.reduce((sum, tip) => sum + tip.vote_count, 0)}</div>
              <div className="text-sm text-gray-600">Total Loves</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-orange-600">{tips.reduce((sum, tip) => sum + tip.bookmark_count, 0)}</div>
              <div className="text-sm text-gray-600">Total Bookmarks</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-pink-600">{userBookmarks.size}</div>
              <div className="text-sm text-gray-600">Your Bookmarks</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DailyTipsPage;