import React, { useState, useEffect } from 'react';
import { Users, Heart, Laugh, Frown, Flame, ArrowLeft, Send, Filter, Search } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { Confession } from '../types/database';

interface ConfessionsPageProps {
  onPageChange: (page: string) => void;
}

const ConfessionsPage: React.FC<ConfessionsPageProps> = ({ onPageChange }) => {
  const [confessions, setConfessions] = useState<Confession[]>([]);
  const [filteredConfessions, setFilteredConfessions] = useState<Confession[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [showSubmitForm, setShowSubmitForm] = useState(false);
  const [newConfession, setNewConfession] = useState('');
  const [confessionCategory, setConfessionCategory] = useState<'funny' | 'sad' | 'crush' | 'spicy' | 'general'>('general');
  const [submitting, setSubmitting] = useState(false);

  const categories = [
    { id: 'all', label: 'All', icon: Users, color: 'gray' },
    { id: 'funny', label: 'Funny', icon: Laugh, color: 'yellow' },
    { id: 'sad', label: 'Sad', icon: Frown, color: 'blue' },
    { id: 'crush', label: 'Crush', icon: Heart, color: 'pink' },
    { id: 'spicy', label: 'Spicy', icon: Flame, color: 'red' },
    { id: 'general', label: 'General', icon: Users, color: 'purple' }
  ];

  useEffect(() => {
    fetchConfessions();
  }, []);

  useEffect(() => {
    filterConfessions();
  }, [confessions, selectedCategory, searchTerm]);

  const fetchConfessions = async () => {
    try {
      const { data, error } = await supabase
        .from('confessions')
        .select('*')
        .eq('is_approved', true)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setConfessions(data || []);
    } catch (error) {
      console.error('Error fetching confessions:', error);
    } finally {
      setLoading(false);
    }
  };

  const filterConfessions = () => {
    let filtered = confessions;

    if (selectedCategory !== 'all') {
      filtered = filtered.filter(confession => confession.category === selectedCategory);
    }

    if (searchTerm) {
      filtered = filtered.filter(confession =>
        confession.content.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredConfessions(filtered);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newConfession.trim()) return;

    setSubmitting(true);
    try {
      const { error } = await supabase
        .from('confessions')
        .insert({
          content: newConfession.trim(),
          category: confessionCategory,
          is_approved: false
        });

      if (error) throw error;

      setNewConfession('');
      setShowSubmitForm(false);
      alert('Your confession has been submitted! It will be reviewed and may appear on the public wall soon.');
    } catch (error) {
      console.error('Error submitting confession:', error);
      alert('There was an error submitting your confession. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const getCategoryColor = (category: string) => {
    const cat = categories.find(c => c.id === category);
    return cat ? cat.color : 'gray';
  };

  const getCategoryIcon = (category: string) => {
    const cat = categories.find(c => c.id === category);
    return cat ? cat.icon : Users;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50 pt-16 flex items-center justify-center">
        <div className="text-center">
          <Users className="w-12 h-12 text-pink-500 animate-pulse mx-auto mb-4" />
          <p className="text-gray-600">Loading confessions...</p>
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
              Confession Box
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Share your love stories anonymously. Sometimes just getting it out helps, and you might help someone else too.
            </p>
          </div>

          {/* Submit Confession Button */}
          <div className="text-center mb-8">
            <button
              onClick={() => setShowSubmitForm(!showSubmitForm)}
              className="bg-gradient-to-r from-pink-500 to-purple-600 text-white px-8 py-4 rounded-full font-semibold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 flex items-center space-x-2 mx-auto"
            >
              <Users className="w-5 h-5" />
              <span>Share Your Story</span>
            </button>
          </div>

          {/* Submit Form */}
          {showSubmitForm && (
            <div className="bg-white rounded-2xl p-8 shadow-lg mb-8 max-w-2xl mx-auto">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Share Your Confession</h3>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Your Story
                  </label>
                  <textarea
                    value={newConfession}
                    onChange={(e) => setNewConfession(e.target.value)}
                    placeholder="Share your love story, confession, or experience anonymously..."
                    className="w-full p-4 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent resize-none"
                    rows={5}
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Category
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                    {categories.filter(cat => cat.id !== 'all').map(category => {
                      const Icon = category.icon;
                      return (
                        <button
                          key={category.id}
                          type="button"
                          onClick={() => setConfessionCategory(category.id as any)}
                          className={`flex flex-col items-center p-4 rounded-xl border-2 transition-all duration-200 ${
                            confessionCategory === category.id
                              ? `border-${category.color}-500 bg-${category.color}-50`
                              : 'border-gray-200 hover:border-gray-300'
                          }`}
                        >
                          <Icon className={`w-6 h-6 mb-2 ${
                            confessionCategory === category.id
                              ? `text-${category.color}-500`
                              : 'text-gray-400'
                          }`} />
                          <span className={`text-sm font-medium ${
                            confessionCategory === category.id
                              ? `text-${category.color}-700`
                              : 'text-gray-600'
                          }`}>
                            {category.label}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="flex gap-4">
                  <button
                    type="submit"
                    disabled={submitting}
                    className="flex-1 bg-gradient-to-r from-pink-500 to-purple-600 text-white py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-200 flex items-center justify-center space-x-2 disabled:opacity-50"
                  >
                    <Send className="w-5 h-5" />
                    <span>{submitting ? 'Submitting...' : 'Submit Confession'}</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowSubmitForm(false)}
                    className="px-6 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Filters */}
          <div className="bg-white rounded-2xl p-6 shadow-lg mb-8">
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search confessions..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                />
              </div>
              
              <div className="flex flex-wrap gap-2">
                {categories.map(category => {
                  const Icon = category.icon;
                  return (
                    <button
                      key={category.id}
                      onClick={() => setSelectedCategory(category.id)}
                      className={`flex items-center space-x-2 px-4 py-2 rounded-full transition-all duration-200 ${
                        selectedCategory === category.id
                          ? `bg-${category.color}-500 text-white`
                          : `bg-${category.color}-100 text-${category.color}-700 hover:bg-${category.color}-200`
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      <span className="text-sm font-medium">{category.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Confessions Grid */}
        {filteredConfessions.length === 0 ? (
          <div className="text-center py-12">
            <Users className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-600 mb-2">No confessions found</h3>
            <p className="text-gray-500">Try adjusting your search or be the first to share your story!</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredConfessions.map((confession) => {
              const CategoryIcon = getCategoryIcon(confession.category);
              const categoryColor = getCategoryColor(confession.category);
              
              return (
                <div
                  key={confession.id}
                  className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                >
                  <div className="mb-4">
                    <div className="flex items-center justify-between mb-3">
                      <div className={`flex items-center space-x-2 bg-${categoryColor}-100 px-3 py-1 rounded-full`}>
                        <CategoryIcon className={`w-4 h-4 text-${categoryColor}-500`} />
                        <span className={`text-sm font-medium text-${categoryColor}-700 capitalize`}>
                          {confession.category}
                        </span>
                      </div>
                      <span className="text-sm text-gray-500">
                        {new Date(confession.created_at).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                  
                  <blockquote className="text-gray-700 leading-relaxed mb-6 italic">
                    "{confession.content}"
                  </blockquote>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500 font-medium">— Anonymous 💖</span>
                    <div className="flex items-center space-x-2">
                      <Heart className="w-4 h-4 text-pink-500" />
                      <span className="text-sm text-gray-600">{confession.vote_count}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* External Form CTA */}
        <div className="mt-12 bg-gradient-to-r from-pink-500 to-purple-600 rounded-2xl p-8 text-center text-white">
          <h3 className="text-2xl font-bold mb-4">Want Complete Privacy?</h3>
          <p className="text-white/90 mb-6">
            Use our universal form to submit your confession with complete anonymity and privacy.
          </p>
          <a
            href="https://forms.gle/TQE6MtgrMiTvzn7v7"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white text-purple-600 px-8 py-4 rounded-full font-semibold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 inline-flex items-center space-x-2"
          >
            <Send className="w-5 h-5" />
            <span>Submit via Google Form</span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default ConfessionsPage;