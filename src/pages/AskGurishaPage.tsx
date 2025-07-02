import React, { useState, useEffect } from 'react';
import { MessageCircle, Send, ArrowLeft, Clock, CheckCircle, Heart, Search, Filter } from 'lucide-react';
import { supabase, getSessionId } from '../lib/supabase';
import { Question } from '../types/database';

interface AskGurishaPageProps {
  onPageChange: (page: string) => void;
}

const AskGurishaPage: React.FC<AskGurishaPageProps> = ({ onPageChange }) => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [newQuestion, setNewQuestion] = useState('');
  const [isAnonymous, setIsAnonymous] = useState(true);
  const [category, setCategory] = useState('general');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showSubmitForm, setShowSubmitForm] = useState(false);

  const categories = ['all', 'dating', 'relationships', 'communication', 'breakup', 'self-love', 'general'];

  useEffect(() => {
    fetchQuestions();
  }, []);

  const fetchQuestions = async () => {
    try {
      const { data, error } = await supabase
        .from('questions')
        .select('*')
        .eq('is_published', true)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setQuestions(data || []);
    } catch (error) {
      console.error('Error fetching questions:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newQuestion.trim()) return;

    setSubmitting(true);
    try {
      const { error } = await supabase
        .from('questions')
        .insert({
          question: newQuestion.trim(),
          is_anonymous: isAnonymous,
          category: category,
          is_published: false
        });

      if (error) throw error;

      setNewQuestion('');
      setShowSubmitForm(false);
      alert('Your question has been submitted! Gaurisha will review it and may feature it in upcoming content.');
    } catch (error) {
      console.error('Error submitting question:', error);
      alert('There was an error submitting your question. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const filteredQuestions = questions.filter(question => {
    const matchesSearch = question.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (question.answer && question.answer.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory === 'all' || question.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50 pt-16 flex items-center justify-center">
        <div className="text-center">
          <MessageCircle className="w-12 h-12 text-pink-500 animate-pulse mx-auto mb-4" />
          <p className="text-gray-600">Loading questions...</p>
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
              Ask Gaurisha
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Got a burning question about love, dating, or relationships? Ask anonymously and get real advice that actually helps.
            </p>
          </div>

          {/* Submit Question Button */}
          <div className="text-center mb-8">
            <button
              onClick={() => setShowSubmitForm(!showSubmitForm)}
              className="bg-gradient-to-r from-pink-500 to-purple-600 text-white px-8 py-4 rounded-full font-semibold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 flex items-center space-x-2 mx-auto"
            >
              <MessageCircle className="w-5 h-5" />
              <span>Ask Your Question</span>
            </button>
          </div>

          {/* Submit Form */}
          {showSubmitForm && (
            <div className="bg-white rounded-2xl p-8 shadow-lg mb-8 max-w-2xl mx-auto">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Submit Your Question</h3>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Your Question
                  </label>
                  <textarea
                    value={newQuestion}
                    onChange={(e) => setNewQuestion(e.target.value)}
                    placeholder="What's on your mind? Ask anything about love, dating, relationships..."
                    className="w-full p-4 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent resize-none"
                    rows={4}
                    required
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Category
                    </label>
                    <select
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      className="w-full p-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                    >
                      {categories.filter(cat => cat !== 'all').map(cat => (
                        <option key={cat} value={cat}>
                          {cat.charAt(0).toUpperCase() + cat.slice(1)}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Privacy
                    </label>
                    <div className="flex items-center space-x-4 pt-3">
                      <label className="flex items-center">
                        <input
                          type="radio"
                          checked={isAnonymous}
                          onChange={() => setIsAnonymous(true)}
                          className="mr-2 text-pink-500"
                        />
                        <span className="text-sm">Anonymous</span>
                      </label>
                      <label className="flex items-center">
                        <input
                          type="radio"
                          checked={!isAnonymous}
                          onChange={() => setIsAnonymous(false)}
                          className="mr-2 text-pink-500"
                        />
                        <span className="text-sm">Public</span>
                      </label>
                    </div>
                  </div>
                </div>

                <div className="flex gap-4">
                  <button
                    type="submit"
                    disabled={submitting}
                    className="flex-1 bg-gradient-to-r from-pink-500 to-purple-600 text-white py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-200 flex items-center justify-center space-x-2 disabled:opacity-50"
                  >
                    <Send className="w-5 h-5" />
                    <span>{submitting ? 'Submitting...' : 'Submit Question'}</span>
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

          {/* Search and Filter */}
          <div className="bg-white rounded-2xl p-6 shadow-lg mb-8">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search questions and answers..."
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
          </div>
        </div>

        {/* Questions List */}
        {filteredQuestions.length === 0 ? (
          <div className="text-center py-12">
            <MessageCircle className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-600 mb-2">No questions found</h3>
            <p className="text-gray-500">Try adjusting your search or be the first to ask a question!</p>
          </div>
        ) : (
          <div className="space-y-6">
            {filteredQuestions.map((question) => (
              <div
                key={question.id}
                className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-4">
                    <span className="bg-gradient-to-r from-pink-500 to-purple-600 text-white px-3 py-1 rounded-full text-sm font-bold">
                      Q&A
                    </span>
                    <div className="flex items-center space-x-2">
                      <span className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-sm capitalize">
                        {question.category}
                      </span>
                      <span className="text-sm text-gray-500">
                        {new Date(question.created_at).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-start space-x-2">
                    <MessageCircle className="w-6 h-6 text-pink-500 mt-1 flex-shrink-0" />
                    <span>{question.question}</span>
                  </h3>
                </div>

                {question.answer && (
                  <div className="bg-gradient-to-r from-pink-50 to-purple-50 p-6 rounded-xl">
                    <div className="flex items-center space-x-2 mb-3">
                      <div className="w-8 h-8 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full flex items-center justify-center">
                        <Heart className="w-4 h-4 text-white" />
                      </div>
                      <span className="font-semibold text-gray-900">Gaurisha's Answer:</span>
                    </div>
                    <p className="text-gray-700 leading-relaxed">{question.answer}</p>
                    {question.answered_at && (
                      <div className="flex items-center space-x-2 mt-4 text-sm text-gray-500">
                        <CheckCircle className="w-4 h-4" />
                        <span>Answered on {new Date(question.answered_at).toLocaleDateString()}</span>
                      </div>
                    )}
                  </div>
                )}

                {!question.answer && (
                  <div className="bg-yellow-50 p-4 rounded-xl">
                    <div className="flex items-center space-x-2 text-yellow-700">
                      <Clock className="w-5 h-5" />
                      <span className="font-medium">Waiting for Gaurisha's answer...</span>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* External Form CTA */}
        <div className="mt-12 bg-gradient-to-r from-pink-500 to-purple-600 rounded-2xl p-8 text-center text-white">
          <h3 className="text-2xl font-bold mb-4">Want to Submit Privately?</h3>
          <p className="text-white/90 mb-6">
            Use our universal form to submit questions, confessions, or suggestions completely anonymously.
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

export default AskGurishaPage;