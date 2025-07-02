import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Heart, MessageCircle, Users, Brain, TestTube, Home } from 'lucide-react';

interface NavigationProps {
  currentPage: string;
  onPageChange: (page: string) => void;
}

const Navigation: React.FC<NavigationProps> = ({ currentPage, onPageChange }) => {
  const location = useLocation();
  
  const navItems = [
    { id: 'home', label: 'Home', icon: Home, path: '/' },
    { id: 'tips', label: 'Daily Tips', icon: Heart, path: '/tips' },
    { id: 'ask', label: 'Ask Gaurisha', icon: MessageCircle, path: '/ask' },
    { id: 'confessions', label: 'Confessions', icon: Users, path: '/confessions' },
    { id: 'love-language', label: 'Love Language', icon: Brain, path: '/love-language' },
    { id: 'quizzes', label: 'Love Tests', icon: TestTube, path: '/quizzes' },
  ];

  const getCurrentPageFromPath = (path: string) => {
    const item = navItems.find(item => item.path === path);
    return item ? item.id : 'home';
  };

  const currentPageId = getCurrentPageFromPath(location.pathname);

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-sm border-b border-gray-200 z-40">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link 
            to="/"
            className="flex items-center space-x-2 cursor-pointer"
            onClick={() => onPageChange('home')}
          >
            <Heart className="w-8 h-8 text-pink-500" />
            <span className="text-xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
              Love Guru Tips
            </span>
          </Link>
          
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentPageId === item.id;
              return (
                <Link
                  key={item.id}
                  to={item.path}
                  onClick={() => onPageChange(item.id)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-full transition-all duration-200 ${
                    isActive
                      ? 'bg-gradient-to-r from-pink-500 to-purple-600 text-white shadow-lg'
                      : 'text-gray-600 hover:text-pink-500 hover:bg-pink-50'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span className="text-sm font-medium">{item.label}</span>
                </Link>
              );
            })}
          </div>
          
          {/* Mobile menu */}
          <div className="md:hidden">
            <select
              value={currentPageId}
              onChange={(e) => {
                const selectedItem = navItems.find(item => item.id === e.target.value);
                if (selectedItem) {
                  onPageChange(selectedItem.id);
                  window.location.href = selectedItem.path;
                }
              }}
              className="bg-transparent border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-pink-500"
            >
              {navItems.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;