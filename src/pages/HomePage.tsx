import React, { useState } from 'react';
import { Heart, MessageCircle, Users, Sparkles, Star, ArrowRight, Mail, Instagram, MessageSquare, ExternalLink, HelpCircle, FileText, Shield, Phone } from 'lucide-react';

interface HomePageProps {
  onPageChange: (page: string) => void;
}

const HomePage: React.FC<HomePageProps> = ({ onPageChange }) => {
  const [activeFeature, setActiveFeature] = useState(0);
  const [showFAQ, setShowFAQ] = useState(false);
  const [showPrivacy, setShowPrivacy] = useState(false);
  const [showTerms, setShowTerms] = useState(false);
  const [showContact, setShowContact] = useState(false);

  const features = [
    {
      icon: <Heart className="w-8 h-8" />,
      title: "Daily Love Tips",
      description: "Get authentic, actionable relationship advice delivered daily. No fluff, just real guidance that works.",
      example: "Say this instead of 'I'm fine': 'I need a moment to process, but I want to talk about this with you.'",
      page: "tips"
    },
    {
      icon: <MessageCircle className="w-8 h-8" />,
      title: "Ask Gaurisha",
      description: "Submit your relationship questions anonymously and get personalized advice from someone who truly understands.",
      example: "How do I know if they're really interested or just being polite?",
      page: "ask"
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Confession Box",
      description: "Share your love stories anonymously. Sometimes just getting it out helps, and you might help someone else too.",
      example: "I've been scared to tell my best friend I have feelings for them...",
      page: "confessions"
    },
    {
      icon: <Sparkles className="w-8 h-8" />,
      title: "Love Language Quiz",
      description: "Discover your love language and get customized tips for better communication and deeper connections.",
      example: "Your love language: Acts of Service - here's how to express and receive love better.",
      page: "love-language"
    }
  ];

  const testimonials = [
    {
      text: "Gaurisha's advice helped me finally have that difficult conversation. We're stronger than ever now.",
      author: "Anonymous, 24"
    },
    {
      text: "The daily tips are like having a wise friend in my pocket. So practical and real!",
      author: "Anonymous, 19"
    },
    {
      text: "I thought good relationships were just luck. Turns out, they're skills you can learn.",
      author: "Anonymous, 27"
    }
  ];

  const sampleTips = [
    {
      number: "017",
      tip: "When they say 'I'm busy,' don't chase. Love doesn't need reminders, effort does.",
      category: "boundaries"
    },
    {
      number: "023",
      tip: "Green flag: They remember small details about your day and ask follow-up questions.",
      category: "recognition"
    },
    {
      number: "031",
      tip: "Before saying 'you always' or 'you never,' pause. Use 'I feel' instead. Watch the magic happen.",
      category: "communication"
    }
  ];

  const faqData = [
    {
      question: "How do I submit a confession or question?",
      answer: "Use our universal Google Form to submit confessions, shoutouts, suggestions, or any questions anonymously or publicly. Your privacy is our priority."
    },
    {
      question: "Are my submissions really anonymous?",
      answer: "Yes! When you choose the anonymous option, we don't collect any personal information that could identify you. Your secrets are safe with us."
    },
    {
      question: "How often do you post new content?",
      answer: "We share daily love tips on Instagram and respond to submissions regularly. Follow @gaurisha0311 to never miss an update!"
    },
    {
      question: "Can I request specific relationship advice?",
      answer: "Absolutely! Use our Google Form to request specific topics or ask personal questions. We try to address as many requests as possible."
    },
    {
      question: "Do you offer private consultations?",
      answer: "Currently, we focus on community-based advice through our platforms. For urgent matters, you can reach out via our contact form."
    }
  ];

  const Modal = ({ isOpen, onClose, title, children }: any) => {
    if (!isOpen) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-3xl max-w-4xl max-h-[90vh] overflow-y-auto w-full">
          <div className="sticky top-0 bg-white border-b border-gray-200 p-6 rounded-t-3xl">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <span className="text-2xl">&times;</span>
              </button>
            </div>
          </div>
          <div className="p-6">
            {children}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-white pt-16">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-pink-50 via-purple-50 to-orange-50 min-h-screen flex items-center">
        <div className="absolute inset-0 bg-gradient-to-r from-pink-500/10 via-purple-500/10 to-orange-500/10"></div>
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center space-x-2 bg-white/80 backdrop-blur-sm rounded-full px-6 py-3 mb-8 shadow-lg">
              <Heart className="w-5 h-5 text-pink-500" />
              <span className="text-sm font-medium text-gray-700">Authentic Relationship Advice</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-pink-600 via-purple-600 to-orange-600 bg-clip-text text-transparent leading-tight">
              Love Guru Tips<br />
              <span className="text-4xl md:text-5xl">by Gaurisha</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
              Your feelings, my tips. Get real relationship advice that doesn't suck. 
              No toxic positivity, just honest guidance for modern love.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              <button
                onClick={() => onPageChange('tips')}
                className="group bg-gradient-to-r from-pink-500 to-purple-600 text-white px-8 py-4 rounded-full font-semibold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 flex items-center space-x-2"
              >
                <span>Explore Daily Tips</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <a
                href="https://instagram.com/gaurisha0311"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white text-gray-700 px-8 py-4 rounded-full font-semibold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 border border-gray-200 flex items-center space-x-2"
              >
                <Instagram className="w-5 h-5" />
                <span>Follow @gaurisha0311</span>
              </a>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-2xl mx-auto">
              <div className="text-center">
                <div className="text-2xl font-bold text-pink-600">10K+</div>
                <div className="text-sm text-gray-600">Hearts Healed</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">500+</div>
                <div className="text-sm text-gray-600">Questions Answered</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-orange-600">50+</div>
                <div className="text-sm text-gray-600">Daily Tips</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-pink-600">24/7</div>
                <div className="text-sm text-gray-600">Support</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              How I Help You Navigate Love
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Real advice for real situations. Whether you're single, dating, or in a relationship, 
              I've got your back with practical tips that actually work.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            <div className="space-y-4">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className={`p-6 rounded-2xl cursor-pointer transition-all duration-300 ${
                    activeFeature === index
                      ? 'bg-gradient-to-r from-pink-500 to-purple-600 text-white shadow-xl'
                      : 'bg-gray-50 hover:bg-gray-100'
                  }`}
                  onClick={() => setActiveFeature(index)}
                >
                  <div className="flex items-start space-x-4">
                    <div className={`p-3 rounded-full ${
                      activeFeature === index ? 'bg-white/20' : 'bg-white'
                    }`}>
                      <div className={activeFeature === index ? 'text-white' : 'text-pink-500'}>
                        {feature.icon}
                      </div>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                      <p className={`text-sm mb-3 ${
                        activeFeature === index ? 'text-white/90' : 'text-gray-600'
                      }`}>
                        {feature.description}
                      </p>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onPageChange(feature.page);
                        }}
                        className={`text-sm font-medium flex items-center space-x-1 ${
                          activeFeature === index ? 'text-white' : 'text-pink-500'
                        }`}
                      >
                        <span>Try it now</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="bg-gradient-to-br from-gray-50 to-white p-8 rounded-3xl shadow-lg">
              <div className="mb-6">
                <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-pink-500 to-purple-600 text-white px-4 py-2 rounded-full text-sm font-medium mb-4">
                  <Sparkles className="w-4 h-4" />
                  <span>Live Preview</span>
                </div>
                <h4 className="text-2xl font-bold text-gray-900 mb-3">
                  {features[activeFeature].title}
                </h4>
              </div>
              
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <p className="text-gray-700 leading-relaxed italic">
                  "{features[activeFeature].example}"
                </p>
                <div className="mt-4 flex items-center justify-between">
                  <span className="text-sm text-gray-500">— Gaurisha, Your Love Guru</span>
                  <Heart className="w-5 h-5 text-pink-500" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sample Tips Section */}
      <section className="py-24 bg-gradient-to-br from-purple-50 to-pink-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Real Tips That Work
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Here's a taste of the daily wisdom you'll receive. No sugarcoating, just honest insights.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {sampleTips.map((tip, index) => (
              <div key={index} className="bg-white p-8 rounded-3xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
                <div className="mb-6">
                  <div className="inline-flex items-center space-x-2 mb-4">
                    <span className="bg-gradient-to-r from-pink-500 to-purple-600 text-white px-3 py-1 rounded-full text-sm font-bold">
                      Tip #{tip.number}
                    </span>
                    <span className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-sm capitalize">
                      {tip.category}
                    </span>
                  </div>
                </div>
                
                <blockquote className="text-lg text-gray-700 leading-relaxed mb-6">
                  "{tip.tip}"
                </blockquote>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500 font-medium">— Gaurisha 💖</span>
                  <div className="flex space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <button
              onClick={() => onPageChange('tips')}
              className="bg-gradient-to-r from-pink-500 to-purple-600 text-white px-8 py-4 rounded-full font-semibold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 flex items-center space-x-2 mx-auto"
            >
              <span>See All Daily Tips</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Love Stories & Transformations
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Real people, real results. See how Gaurisha's advice has helped others navigate their relationships.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="relative">
                <div className="bg-gradient-to-br from-pink-50 to-purple-50 p-8 rounded-3xl shadow-lg">
                  <div className="mb-6">
                    <div className="w-12 h-12 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full flex items-center justify-center mb-4">
                      <Heart className="w-6 h-6 text-white" />
                    </div>
                  </div>
                  
                  <blockquote className="text-lg text-gray-700 leading-relaxed mb-6">
                    "{testimonial.text}"
                  </blockquote>
                  
                  <footer className="text-sm text-gray-500 font-medium">
                    {testimonial.author}
                  </footer>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-r from-pink-600 via-purple-600 to-orange-600">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Ready to Transform Your Love Life?
          </h2>
          <p className="text-xl text-white/90 mb-12 max-w-2xl mx-auto">
            Join thousands who've discovered that great relationships aren't just luck—they're skills you can learn.
          </p>
          
          <div className="grid md:grid-cols-4 gap-6 max-w-5xl mx-auto mb-12">
            <button
              onClick={() => onPageChange('tips')}
              className="bg-white/10 backdrop-blur-sm p-6 rounded-2xl hover:bg-white/20 transition-all duration-300 transform hover:-translate-y-1"
            >
              <Heart className="w-8 h-8 text-white mx-auto mb-4" />
              <h3 className="text-lg font-bold text-white mb-2">Daily Tips</h3>
              <p className="text-white/80 text-sm">Love wisdom daily</p>
            </button>
            <button
              onClick={() => onPageChange('ask')}
              className="bg-white/10 backdrop-blur-sm p-6 rounded-2xl hover:bg-white/20 transition-all duration-300 transform hover:-translate-y-1"
            >
              <MessageSquare className="w-8 h-8 text-white mx-auto mb-4" />
              <h3 className="text-lg font-bold text-white mb-2">Ask Questions</h3>
              <p className="text-white/80 text-sm">Get personal advice</p>
            </button>
            <button
              onClick={() => onPageChange('confessions')}
              className="bg-white/10 backdrop-blur-sm p-6 rounded-2xl hover:bg-white/20 transition-all duration-300 transform hover:-translate-y-1"
            >
              <Users className="w-8 h-8 text-white mx-auto mb-4" />
              <h3 className="text-lg font-bold text-white mb-2">Share Stories</h3>
              <p className="text-white/80 text-sm">Anonymous confessions</p>
            </button>
            <button
              onClick={() => setShowContact(true)}
              className="bg-white/10 backdrop-blur-sm p-6 rounded-2xl hover:bg-white/20 transition-all duration-300 transform hover:-translate-y-1"
            >
              <Mail className="w-8 h-8 text-white mx-auto mb-4" />
              <h3 className="text-lg font-bold text-white mb-2">Get in Touch</h3>
              <p className="text-white/80 text-sm">Contact Gaurisha</p>
            </button>
          </div>
          
          <a
            href="https://forms.gle/TQE6MtgrMiTvzn7v7"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white text-purple-600 px-12 py-6 rounded-full font-bold text-xl shadow-2xl hover:shadow-3xl transform hover:-translate-y-2 transition-all duration-300 inline-flex items-center space-x-3"
          >
            <span>Start Your Journey Today</span>
            <ArrowRight className="w-6 h-6" />
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="container mx-auto px-6">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">
              Love Guru Tips by Gaurisha
            </h3>
            <p className="text-gray-400 max-w-md mx-auto">
              Authentic relationship advice for the modern heart. Because love shouldn't be this complicated.
            </p>
          </div>
          
          <div className="grid md:grid-cols-4 gap-8 max-w-4xl mx-auto mb-8">
            <div>
              <h4 className="font-bold mb-4 text-pink-400">Services</h4>
              <ul className="space-y-2 text-gray-400">
                <li><button onClick={() => onPageChange('tips')} className="hover:text-white transition-colors text-left">Daily Love Tips</button></li>
                <li><button onClick={() => onPageChange('ask')} className="hover:text-white transition-colors text-left">Anonymous Q&A</button></li>
                <li><button onClick={() => onPageChange('confessions')} className="hover:text-white transition-colors text-left">Confession Box</button></li>
                <li><button onClick={() => onPageChange('love-language')} className="hover:text-white transition-colors text-left">Love Language Quiz</button></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4 text-purple-400">Topics</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Dating Advice</li>
                <li>Communication</li>
                <li>Breakup Healing</li>
                <li>Self-Love</li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4 text-orange-400">Connect</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="https://instagram.com/gaurisha0311" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                    Instagram
                  </a>
                </li>
                <li>
                  <a href="https://forms.gle/TQE6MtgrMiTvzn7v7" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                    Submit Form
                  </a>
                </li>
                <li>Telegram</li>
                <li>WhatsApp</li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4 text-pink-400">Support</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <button onClick={() => setShowFAQ(true)} className="hover:text-white transition-colors text-left">
                    FAQ
                  </button>
                </li>
                <li>
                  <button onClick={() => setShowContact(true)} className="hover:text-white transition-colors text-left">
                    Contact
                  </button>
                </li>
                <li>
                  <button onClick={() => setShowPrivacy(true)} className="hover:text-white transition-colors text-left">
                    Privacy Policy
                  </button>
                </li>
                <li>
                  <button onClick={() => setShowTerms(true)} className="hover:text-white transition-colors text-left">
                    Terms & Conditions
                  </button>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 pt-8 text-center">
            <p className="text-gray-400">
              © 2025 Love Guru Tips by Gaurisha. Made with 💖 for better relationships.
            </p>
          </div>
        </div>
      </footer>

      {/* Modals */}
      <Modal isOpen={showFAQ} onClose={() => setShowFAQ(false)} title="Frequently Asked Questions">
        <div className="space-y-6">
          {faqData.map((faq, index) => (
            <div key={index} className="border-b border-gray-200 pb-6 last:border-b-0">
              <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-start space-x-2">
                <HelpCircle className="w-5 h-5 text-pink-500 mt-0.5 flex-shrink-0" />
                <span>{faq.question}</span>
              </h3>
              <p className="text-gray-600 leading-relaxed ml-7">{faq.answer}</p>
            </div>
          ))}
          <div className="bg-pink-50 p-6 rounded-xl">
            <h3 className="font-semibold text-gray-900 mb-2">Still have questions?</h3>
            <p className="text-gray-600 mb-4">Feel free to reach out through our contact form or submit your question anonymously.</p>
            <a
              href="https://forms.gle/TQE6MtgrMiTvzn7v7"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-2 bg-pink-500 text-white px-4 py-2 rounded-lg hover:bg-pink-600 transition-colors"
            >
              <span>Ask Your Question</span>
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </div>
      </Modal>

      <Modal isOpen={showContact} onClose={() => setShowContact(false)} title="Contact Information">
        <div className="space-y-6">
          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <Mail className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Get in Touch with Gaurisha</h3>
            <p className="text-gray-600">We'd love to hear from you! Choose your preferred way to connect.</p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6">
            <a
              href="https://forms.gle/TQE6MtgrMiTvzn7v7"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gradient-to-r from-pink-50 to-purple-50 p-6 rounded-xl hover:shadow-lg transition-all duration-300 border border-pink-100"
            >
              <MessageSquare className="w-8 h-8 text-pink-500 mb-4" />
              <h4 className="font-semibold text-gray-900 mb-2">Universal Form</h4>
              <p className="text-gray-600 text-sm mb-3">Submit confessions, questions, or suggestions anonymously or publicly.</p>
              <div className="flex items-center text-pink-500 text-sm font-medium">
                <span>Submit Now</span>
                <ExternalLink className="w-4 h-4 ml-1" />
              </div>
            </a>
            
            <a
              href="https://instagram.com/gaurisha0311"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gradient-to-r from-purple-50 to-orange-50 p-6 rounded-xl hover:shadow-lg transition-all duration-300 border border-purple-100"
            >
              <Instagram className="w-8 h-8 text-purple-500 mb-4" />
              <h4 className="font-semibold text-gray-900 mb-2">Instagram DM</h4>
              <p className="text-gray-600 text-sm mb-3">Follow and send a direct message for quick responses.</p>
              <div className="flex items-center text-purple-500 text-sm font-medium">
                <span>@gaurisha0311</span>
                <ExternalLink className="w-4 h-4 ml-1" />
              </div>
            </a>
          </div>
          
          <div className="bg-gray-50 p-6 rounded-xl">
            <h4 className="font-semibold text-gray-900 mb-3">Response Time</h4>
            <ul className="space-y-2 text-gray-600">
              <li className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span>Instagram DMs: Usually within 24 hours</span>
              </li>
              <li className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span>Form submissions: 2-3 business days</span>
              </li>
              <li className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                <span>Anonymous questions: Featured in daily content</span>
              </li>
            </ul>
          </div>
        </div>
      </Modal>

      <Modal isOpen={showPrivacy} onClose={() => setShowPrivacy(false)} title="Privacy Policy">
        <div className="space-y-6 text-gray-600">
          <div className="flex items-start space-x-3">
            <Shield className="w-6 h-6 text-pink-500 mt-1 flex-shrink-0" />
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Your Privacy Matters</h3>
              <p>We are committed to protecting your privacy and ensuring your personal information is handled responsibly.</p>
            </div>
          </div>
          
          <div className="space-y-4">
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">Information We Collect</h4>
              <ul className="list-disc list-inside space-y-1 text-sm">
                <li>Information you voluntarily provide through our forms</li>
                <li>Anonymous submissions and confessions</li>
                <li>Basic analytics data for website improvement</li>
                <li>Social media interaction data (likes, follows, comments)</li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">How We Use Your Information</h4>
              <ul className="list-disc list-inside space-y-1 text-sm">
                <li>To provide personalized relationship advice</li>
                <li>To create content that helps our community</li>
                <li>To improve our services and user experience</li>
                <li>To respond to your questions and concerns</li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">Anonymous Submissions</h4>
              <p className="text-sm">When you choose to submit anonymously, we do not collect or store any personally identifiable information. Your privacy is completely protected.</p>
            </div>
            
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">Data Security</h4>
              <p className="text-sm">We implement appropriate security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.</p>
            </div>
            
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">Contact Us</h4>
              <p className="text-sm">If you have any questions about this Privacy Policy, please contact us through our contact form or Instagram DM.</p>
            </div>
          </div>
          
          <div className="bg-pink-50 p-4 rounded-lg">
            <p className="text-sm text-pink-800">
              <strong>Last updated:</strong> January 2025. We may update this policy from time to time. Any changes will be posted on this page.
            </p>
          </div>
        </div>
      </Modal>

      <Modal isOpen={showTerms} onClose={() => setShowTerms(false)} title="Terms & Conditions">
        <div className="space-y-6 text-gray-600">
          <div className="flex items-start space-x-3">
            <FileText className="w-6 h-6 text-purple-500 mt-1 flex-shrink-0" />
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Terms of Service</h3>
              <p>By using our services, you agree to these terms and conditions.</p>
            </div>
          </div>
          
          <div className="space-y-4">
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">Acceptance of Terms</h4>
              <p className="text-sm">By accessing and using Love Guru Tips by Gaurisha, you accept and agree to be bound by the terms and provision of this agreement.</p>
            </div>
            
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">Nature of Advice</h4>
              <ul className="list-disc list-inside space-y-1 text-sm">
                <li>Our content is for informational and entertainment purposes</li>
                <li>Advice provided is based on personal experience and general relationship principles</li>
                <li>We are not licensed therapists or professional counselors</li>
                <li>For serious mental health concerns, please consult a professional</li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">User Responsibilities</h4>
              <ul className="list-disc list-inside space-y-1 text-sm">
                <li>Provide accurate information when submitting forms</li>
                <li>Respect other community members</li>
                <li>Do not share harmful, offensive, or inappropriate content</li>
                <li>Use the service responsibly and ethically</li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">Content Usage</h4>
              <ul className="list-disc list-inside space-y-1 text-sm">
                <li>Anonymous submissions may be featured in our content</li>
                <li>We reserve the right to edit submissions for clarity and length</li>
                <li>You retain ownership of your original content</li>
                <li>Our advice and tips are protected by copyright</li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">Limitation of Liability</h4>
              <p className="text-sm">We provide advice in good faith but cannot guarantee specific outcomes. Users are responsible for their own decisions and actions based on our content.</p>
            </div>
            
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">Changes to Terms</h4>
              <p className="text-sm">We reserve the right to modify these terms at any time. Continued use of our services constitutes acceptance of any changes.</p>
            </div>
          </div>
          
          <div className="bg-purple-50 p-4 rounded-lg">
            <p className="text-sm text-purple-800">
              <strong>Last updated:</strong> January 2025. For questions about these terms, please contact us through our available channels.
            </p>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default HomePage;