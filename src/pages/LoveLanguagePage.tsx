import React, { useState } from 'react';
import { Heart, ArrowLeft, CheckCircle, RotateCcw, Share2 } from 'lucide-react';
import { supabase, getSessionId } from '../lib/supabase';

interface LoveLanguagePageProps {
  onPageChange: (page: string) => void;
}

const LoveLanguagePage: React.FC<LoveLanguagePageProps> = ({ onPageChange }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [showResult, setShowResult] = useState(false);
  const [result, setResult] = useState<any>(null);

  const questions = [
    {
      id: 'q1',
      question: "What makes you feel most loved?",
      options: [
        { text: "When someone tells me they love me", language: 'words', points: 3 },
        { text: "When someone spends quality time with me", language: 'time', points: 3 },
        { text: "When someone gives me a thoughtful gift", language: 'gifts', points: 3 },
        { text: "When someone helps me with tasks", language: 'acts', points: 3 },
        { text: "When someone hugs or touches me affectionately", language: 'touch', points: 3 }
      ]
    },
    {
      id: 'q2',
      question: "What hurts you most in a relationship?",
      options: [
        { text: "When they don't say 'I love you' back", language: 'words', points: 2 },
        { text: "When they're always busy and have no time for me", language: 'time', points: 2 },
        { text: "When they forget important occasions", language: 'gifts', points: 2 },
        { text: "When they don't help when I'm overwhelmed", language: 'acts', points: 2 },
        { text: "When they avoid physical affection", language: 'touch', points: 2 }
      ]
    },
    {
      id: 'q3',
      question: "How do you prefer to show love to others?",
      options: [
        { text: "By telling them how much they mean to me", language: 'words', points: 2 },
        { text: "By planning special activities together", language: 'time', points: 2 },
        { text: "By surprising them with meaningful gifts", language: 'gifts', points: 2 },
        { text: "By doing things to make their life easier", language: 'acts', points: 2 },
        { text: "By being physically affectionate", language: 'touch', points: 2 }
      ]
    },
    {
      id: 'q4',
      question: "What would be the perfect date for you?",
      options: [
        { text: "Deep conversations about our feelings", language: 'words', points: 2 },
        { text: "A whole day together without distractions", language: 'time', points: 2 },
        { text: "Receiving a surprise that shows they know me", language: 'gifts', points: 2 },
        { text: "Having them plan everything so I can relax", language: 'acts', points: 2 },
        { text: "Cuddling while watching a movie", language: 'touch', points: 2 }
      ]
    },
    {
      id: 'q5',
      question: "What makes you feel most appreciated?",
      options: [
        { text: "Hearing specific compliments about who I am", language: 'words', points: 3 },
        { text: "Having someone's undivided attention", language: 'time', points: 3 },
        { text: "Receiving something that reminds them of me", language: 'gifts', points: 3 },
        { text: "Having someone notice and help without being asked", language: 'acts', points: 3 },
        { text: "A warm hug after a difficult day", language: 'touch', points: 3 }
      ]
    },
    {
      id: 'q6',
      question: "When you're stressed, what helps you most?",
      options: [
        { text: "Hearing 'You've got this' and words of encouragement", language: 'words', points: 2 },
        { text: "Having someone sit with me and listen", language: 'time', points: 2 },
        { text: "Receiving comfort food or a small pick-me-up", language: 'gifts', points: 2 },
        { text: "Having someone take care of my responsibilities", language: 'acts', points: 2 },
        { text: "A long hug or back rub", language: 'touch', points: 2 }
      ]
    },
    {
      id: 'q7',
      question: "What would make you feel most secure in a relationship?",
      options: [
        { text: "Regular verbal affirmations of love", language: 'words', points: 3 },
        { text: "Consistent quality time together", language: 'time', points: 3 },
        { text: "Thoughtful gestures and surprises", language: 'gifts', points: 3 },
        { text: "Reliable support in daily life", language: 'acts', points: 3 },
        { text: "Regular physical affection", language: 'touch', points: 3 }
      ]
    }
  ];

  const loveLanguages = {
    words: {
      name: "Words of Affirmation",
      description: "You feel most loved when you hear verbal expressions of love, appreciation, and encouragement.",
      tips: [
        "Ask for specific compliments when you need them",
        "Express appreciation when your partner uses loving words",
        "Share how much their words mean to you",
        "Write love notes to each other",
        "Use 'I love you' variations that feel authentic"
      ],
      emoji: "💬"
    },
    time: {
      name: "Quality Time",
      description: "You feel most loved when you have your partner's undivided attention and presence.",
      tips: [
        "Schedule regular one-on-one time together",
        "Put away phones during conversations",
        "Plan activities you both enjoy",
        "Practice active listening",
        "Create rituals like morning coffee together"
      ],
      emoji: "⏰"
    },
    gifts: {
      name: "Receiving Gifts",
      description: "You feel most loved through thoughtful gifts that show your partner knows and thinks about you.",
      tips: [
        "It's about thoughtfulness, not expense",
        "Keep a list of things your partner mentions wanting",
        "Celebrate small occasions, not just big ones",
        "Appreciate the thought behind every gift",
        "Give gifts that show you listen and remember"
      ],
      emoji: "🎁"
    },
    acts: {
      name: "Acts of Service",
      description: "You feel most loved when your partner does helpful things that make your life easier.",
      tips: [
        "Communicate what tasks would help you most",
        "Appreciate efforts even if they're not perfect",
        "Take turns handling responsibilities",
        "Notice and acknowledge when they help",
        "Ask 'How can I make your day easier?'"
      ],
      emoji: "🤝"
    },
    touch: {
      name: "Physical Touch",
      description: "You feel most loved through appropriate physical affection and closeness.",
      tips: [
        "Communicate your touch preferences clearly",
        "Initiate affection when you need it",
        "Respect boundaries and ask for consent",
        "Use non-sexual touch throughout the day",
        "Hold hands, hug, and cuddle regularly"
      ],
      emoji: "🤗"
    }
  };

  const handleAnswer = (option: any) => {
    const newAnswers = { ...answers };
    if (!newAnswers[option.language]) {
      newAnswers[option.language] = 0;
    }
    newAnswers[option.language] += option.points;
    setAnswers(newAnswers);

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      calculateResult(newAnswers);
    }
  };

  const calculateResult = async (finalAnswers: Record<string, number>) => {
    // Find the highest scoring love language
    const sortedLanguages = Object.entries(finalAnswers)
      .sort(([,a], [,b]) => b - a)
      .map(([language, score]) => ({ language, score }));

    const primaryLanguage = sortedLanguages[0]?.language || 'words';
    const secondaryLanguage = sortedLanguages[1]?.language || 'time';

    const quizResult = {
      primary: loveLanguages[primaryLanguage as keyof typeof loveLanguages],
      secondary: loveLanguages[secondaryLanguage as keyof typeof loveLanguages],
      scores: finalAnswers,
      completedAt: new Date().toISOString()
    };

    setResult(quizResult);
    setShowResult(true);

    // Save to database
    try {
      await supabase.from('quiz_results').insert({
        quiz_type: 'love_language',
        user_session: getSessionId(),
        answers: finalAnswers,
        result: quizResult
      });
    } catch (error) {
      console.error('Error saving quiz result:', error);
    }
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setAnswers({});
    setShowResult(false);
    setResult(null);
  };

  const shareResult = () => {
    if (navigator.share) {
      navigator.share({
        title: 'My Love Language Result',
        text: `I just discovered my love language is ${result.primary.name}! Take the quiz to find yours.`,
        url: window.location.href
      });
    } else {
      // Fallback for browsers that don't support Web Share API
      const text = `I just discovered my love language is ${result.primary.name}! Take the quiz to find yours: ${window.location.href}`;
      navigator.clipboard.writeText(text);
      alert('Result copied to clipboard!');
    }
  };

  if (showResult && result) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50 pt-16">
        <div className="container mx-auto px-6 py-8">
          <button
            onClick={() => onPageChange('home')}
            className="flex items-center space-x-2 text-gray-600 hover:text-pink-500 mb-4 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Home</span>
          </button>

          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <div className="text-6xl mb-4">{result.primary.emoji}</div>
              <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent mb-4">
                Your Love Language
              </h1>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                {result.primary.name}
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                {result.primary.description}
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 mb-8">
              {/* Primary Love Language */}
              <div className="bg-white rounded-2xl p-8 shadow-lg">
                <div className="text-center mb-6">
                  <div className="text-4xl mb-2">{result.primary.emoji}</div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">Primary</h3>
                  <h4 className="text-xl font-semibold text-pink-600">{result.primary.name}</h4>
                </div>
                <div>
                  <h5 className="font-semibold text-gray-900 mb-3">How to nurture this:</h5>
                  <ul className="space-y-2">
                    {result.primary.tips.map((tip: string, index: number) => (
                      <li key={index} className="flex items-start space-x-2">
                        <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700">{tip}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Secondary Love Language */}
              <div className="bg-white rounded-2xl p-8 shadow-lg">
                <div className="text-center mb-6">
                  <div className="text-4xl mb-2">{result.secondary.emoji}</div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">Secondary</h3>
                  <h4 className="text-xl font-semibold text-purple-600">{result.secondary.name}</h4>
                </div>
                <div>
                  <h5 className="font-semibold text-gray-900 mb-3">Also important to you:</h5>
                  <ul className="space-y-2">
                    {result.secondary.tips.slice(0, 3).map((tip: string, index: number) => (
                      <li key={index} className="flex items-start space-x-2">
                        <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700">{tip}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="text-center space-y-4">
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={shareResult}
                  className="bg-gradient-to-r from-pink-500 to-purple-600 text-white px-8 py-4 rounded-full font-semibold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 flex items-center space-x-2 mx-auto sm:mx-0"
                >
                  <Share2 className="w-5 h-5" />
                  <span>Share Result</span>
                </button>
                <button
                  onClick={resetQuiz}
                  className="bg-white text-gray-700 px-8 py-4 rounded-full font-semibold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 border border-gray-200 flex items-center space-x-2 mx-auto sm:mx-0"
                >
                  <RotateCcw className="w-5 h-5" />
                  <span>Retake Quiz</span>
                </button>
              </div>
            </div>

            {/* Additional Tips */}
            <div className="mt-12 bg-gradient-to-r from-pink-500 to-purple-600 rounded-2xl p-8 text-white">
              <h3 className="text-2xl font-bold mb-4 text-center">💡 Pro Tips for Your Relationship</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold mb-2">For You:</h4>
                  <ul className="space-y-1 text-white/90">
                    <li>• Communicate your love language to your partner</li>
                    <li>• Give specific examples of what makes you feel loved</li>
                    <li>• Appreciate when they speak your language</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">For Your Partner:</h4>
                  <ul className="space-y-1 text-white/90">
                    <li>• Learn their love language too</li>
                    <li>• Practice speaking each other's languages</li>
                    <li>• Remember: it's about their preference, not yours</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50 pt-16">
      <div className="container mx-auto px-6 py-8">
        <button
          onClick={() => onPageChange('home')}
          className="flex items-center space-x-2 text-gray-600 hover:text-pink-500 mb-4 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back to Home</span>
        </button>

        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent mb-4">
              Love Language Quiz
            </h1>
            <p className="text-xl text-gray-600">
              Discover how you prefer to give and receive love in relationships
            </p>
          </div>

          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex justify-between text-sm text-gray-600 mb-2">
              <span>Question {currentQuestion + 1} of {questions.length}</span>
              <span>{Math.round(((currentQuestion + 1) / questions.length) * 100)}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-gradient-to-r from-pink-500 to-purple-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
              ></div>
            </div>
          </div>

          {/* Question */}
          <div className="bg-white rounded-2xl p-8 shadow-lg">
            <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
              {questions[currentQuestion].question}
            </h2>

            <div className="space-y-4">
              {questions[currentQuestion].options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswer(option)}
                  className="w-full p-4 text-left bg-gray-50 hover:bg-pink-50 border border-gray-200 hover:border-pink-300 rounded-xl transition-all duration-200 hover:shadow-md"
                >
                  <span className="text-gray-700">{option.text}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Quiz Info */}
          <div className="mt-8 bg-white rounded-2xl p-6 shadow-lg">
            <h3 className="font-semibold text-gray-900 mb-3">About Love Languages</h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              The 5 Love Languages theory by Dr. Gary Chapman suggests that people express and receive love in different ways. 
              Understanding your love language can help you communicate your needs and better understand your partner's needs too.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoveLanguagePage;