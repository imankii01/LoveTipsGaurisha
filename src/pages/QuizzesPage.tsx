import React, { useState } from 'react';
import { TestTube, ArrowLeft, Heart, Users, MessageSquare, RotateCcw, Share2 } from 'lucide-react';
import { supabase, getSessionId } from '../lib/supabase';

interface QuizzesPageProps {
  onPageChange: (page: string) => void;
}

const QuizzesPage: React.FC<QuizzesPageProps> = ({ onPageChange }) => {
  const [selectedQuiz, setSelectedQuiz] = useState<string | null>(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [showResult, setShowResult] = useState(false);
  const [result, setResult] = useState<any>(null);

  const quizzes = [
    {
      id: 'loyalty',
      title: 'How Loyal Are You in Love?',
      description: 'Discover your loyalty level and what it means for your relationships',
      icon: Heart,
      color: 'pink',
      questions: [
        {
          question: "Your ex texts you 'I miss you' while you're in a relationship. You:",
          options: [
            { text: "Immediately tell your current partner", points: 5 },
            { text: "Ignore the message completely", points: 4 },
            { text: "Reply briefly but keep it friendly", points: 2 },
            { text: "Have a long conversation about old times", points: 1 }
          ]
        },
        {
          question: "You're at a party and someone attractive starts flirting with you. You:",
          options: [
            { text: "Politely mention you're in a relationship", points: 5 },
            { text: "Enjoy the attention but don't cross any lines", points: 3 },
            { text: "Flirt back a little - it's harmless", points: 2 },
            { text: "See where it leads", points: 1 }
          ]
        },
        {
          question: "Your partner goes through a difficult time and becomes distant. You:",
          options: [
            { text: "Stay by their side and support them through it", points: 5 },
            { text: "Give them space but check in regularly", points: 4 },
            { text: "Start questioning if the relationship is worth it", points: 2 },
            { text: "Consider your other options", points: 1 }
          ]
        },
        {
          question: "You discover your partner has been hiding something minor from you. You:",
          options: [
            { text: "Talk to them calmly about communication", points: 5 },
            { text: "Feel hurt but try to understand their perspective", points: 4 },
            { text: "Wonder what else they might be hiding", points: 2 },
            { text: "Consider it a red flag for the relationship", points: 1 }
          ]
        },
        {
          question: "Your relationship hits a rough patch. Your first instinct is to:",
          options: [
            { text: "Work together to solve the problems", points: 5 },
            { text: "Suggest couples counseling or outside help", points: 4 },
            { text: "Take a break to think things through", points: 2 },
            { text: "Start considering if you'd be happier with someone else", points: 1 }
          ]
        }
      ],
      results: {
        high: {
          title: "Extremely Loyal",
          description: "You're the definition of ride-or-die. Your loyalty is unwavering, and you believe in working through problems together.",
          advice: "Your loyalty is beautiful, but make sure it's not being taken for granted. Set healthy boundaries."
        },
        medium: {
          title: "Selectively Loyal",
          description: "You're loyal when the relationship is healthy and fulfilling. You have standards and boundaries.",
          advice: "You balance loyalty with self-respect well. Trust your instincts about when to stay and when to go."
        },
        low: {
          title: "Conditionally Loyal",
          description: "Your loyalty depends on how the relationship serves you. You're quick to consider alternatives when things get tough.",
          advice: "Consider if you're giving relationships enough time to grow. Sometimes the best things require patience."
        }
      }
    },
    {
      id: 'attachment',
      title: 'How Attached Do You Get?',
      description: 'Understand your attachment style and how it affects your relationships',
      icon: Users,
      color: 'purple',
      questions: [
        {
          question: "When you start dating someone new, you:",
          options: [
            { text: "Take it slow and see how things develop", points: 1 },
            { text: "Feel excited but try to maintain your independence", points: 2 },
            { text: "Start imagining a future together pretty quickly", points: 4 },
            { text: "Become completely absorbed in the relationship", points: 5 }
          ]
        },
        {
          question: "If your partner doesn't text back for a few hours, you:",
          options: [
            { text: "Don't really notice or care", points: 1 },
            { text: "Assume they're busy and wait patiently", points: 2 },
            { text: "Start wondering if something's wrong", points: 4 },
            { text: "Feel anxious and send multiple follow-up texts", points: 5 }
          ]
        },
        {
          question: "When a relationship ends, you typically:",
          options: [
            { text: "Move on relatively quickly", points: 1 },
            { text: "Take time to process but eventually heal", points: 2 },
            { text: "Struggle for months to get over them", points: 4 },
            { text: "Feel like you'll never love anyone the same way", points: 5 }
          ]
        },
        {
          question: "Your ideal relationship involves:",
          options: [
            { text: "Maintaining separate lives that occasionally intersect", points: 1 },
            { text: "Being close but keeping your own interests and friends", points: 2 },
            { text: "Sharing most activities and having mutual friends", points: 4 },
            { text: "Being together as much as possible", points: 5 }
          ]
        },
        {
          question: "When your partner needs space, you:",
          options: [
            { text: "Appreciate having time for yourself too", points: 1 },
            { text: "Respect their need but miss them", points: 2 },
            { text: "Feel worried about what it means for the relationship", points: 4 },
            { text: "Take it personally and feel rejected", points: 5 }
          ]
        }
      ],
      results: {
        high: {
          title: "Highly Attached",
          description: "You form deep, intense connections quickly. Love feels all-consuming for you.",
          advice: "Your capacity for love is beautiful, but remember to maintain your individual identity. Practice self-soothing techniques."
        },
        medium: {
          title: "Moderately Attached",
          description: "You form meaningful connections while maintaining some independence. You're emotionally invested but not overwhelmed.",
          advice: "You have a healthy balance. Trust your instincts about when to get closer and when to maintain boundaries."
        },
        low: {
          title: "Lightly Attached",
          description: "You maintain emotional distance and independence in relationships. Commitment might feel challenging.",
          advice: "Consider if you're protecting yourself from vulnerability. Sometimes letting people in leads to beautiful connections."
        }
      }
    },
    {
      id: 'texting',
      title: 'Rate Your Texting Habits',
      description: 'Find out what your texting style says about you in relationships',
      icon: MessageSquare,
      color: 'orange',
      questions: [
        {
          question: "How quickly do you usually respond to texts from someone you're dating?",
          options: [
            { text: "Immediately - I always have my phone", points: 5 },
            { text: "Within an hour if I'm free", points: 4 },
            { text: "Within a few hours", points: 3 },
            { text: "By the end of the day", points: 2 },
            { text: "When I remember or feel like it", points: 1 }
          ]
        },
        {
          question: "If someone takes hours to reply to your text, you:",
          options: [
            { text: "Send multiple follow-up messages", points: 5 },
            { text: "Feel anxious but wait for their response", points: 4 },
            { text: "Assume they're busy and don't worry about it", points: 2 },
            { text: "Take just as long to reply back", points: 1 }
          ]
        },
        {
          question: "Your typical text length is:",
          options: [
            { text: "Paragraphs - I have a lot to say", points: 5 },
            { text: "A few sentences with details", points: 4 },
            { text: "One complete sentence", points: 3 },
            { text: "Short phrases", points: 2 },
            { text: "One word or emoji responses", points: 1 }
          ]
        },
        {
          question: "When you're upset with someone, you:",
          options: [
            { text: "Write long texts explaining exactly how you feel", points: 5 },
            { text: "Send a message asking to talk", points: 4 },
            { text: "Wait until you can talk in person", points: 2 },
            { text: "Give them the silent treatment", points: 1 }
          ]
        },
        {
          question: "You prefer to have serious conversations:",
          options: [
            { text: "Over text - I can think about my words", points: 5 },
            { text: "Over the phone", points: 3 },
            { text: "Video call", points: 2 },
            { text: "Always in person", points: 1 }
          ]
        }
      ],
      results: {
        high: {
          title: "The Constant Communicator",
          description: "You're always connected and love staying in touch. Texting is your primary love language.",
          advice: "Your enthusiasm is sweet, but remember that not everyone communicates the same way. Give people space to respond."
        },
        medium: {
          title: "The Balanced Texter",
          description: "You use texting appropriately and know when to switch to other forms of communication.",
          advice: "You've got great texting etiquette! You know how to stay connected without being overwhelming."
        },
        low: {
          title: "The Minimalist",
          description: "You prefer face-to-face communication and use texting sparingly. Quality over quantity is your motto.",
          advice: "Your preference for in-person connection is valuable, but remember that some people need more frequent contact to feel connected."
        }
      }
    }
  ];

  const handleQuizSelect = (quizId: string) => {
    setSelectedQuiz(quizId);
    setCurrentQuestion(0);
    setAnswers([]);
    setShowResult(false);
    setResult(null);
  };

  const handleAnswer = (points: number) => {
    const newAnswers = [...answers, points];
    setAnswers(newAnswers);

    const currentQuiz = quizzes.find(q => q.id === selectedQuiz);
    if (currentQuestion < currentQuiz!.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      calculateResult(newAnswers);
    }
  };

  const calculateResult = async (finalAnswers: number[]) => {
    const totalScore = finalAnswers.reduce((sum, score) => sum + score, 0);
    const maxScore = finalAnswers.length * 5;
    const percentage = (totalScore / maxScore) * 100;

    const currentQuiz = quizzes.find(q => q.id === selectedQuiz)!;
    let resultType: 'high' | 'medium' | 'low';

    if (percentage >= 70) {
      resultType = 'high';
    } else if (percentage >= 40) {
      resultType = 'medium';
    } else {
      resultType = 'low';
    }

    const quizResult = {
      quiz: currentQuiz.title,
      score: totalScore,
      maxScore,
      percentage: Math.round(percentage),
      result: currentQuiz.results[resultType],
      completedAt: new Date().toISOString()
    };

    setResult(quizResult);
    setShowResult(true);

    // Save to database
    try {
      await supabase.from('quiz_results').insert({
        quiz_type: selectedQuiz,
        user_session: getSessionId(),
        answers: finalAnswers,
        result: quizResult,
        score: totalScore
      });
    } catch (error) {
      console.error('Error saving quiz result:', error);
    }
  };

  const resetQuiz = () => {
    setSelectedQuiz(null);
    setCurrentQuestion(0);
    setAnswers([]);
    setShowResult(false);
    setResult(null);
  };

  const shareResult = () => {
    if (navigator.share) {
      navigator.share({
        title: `My ${result.quiz} Result`,
        text: `I just took the "${result.quiz}" quiz and got: ${result.result.title}! Take the quiz to see your result.`,
        url: window.location.href
      });
    } else {
      const text = `I just took the "${result.quiz}" quiz and got: ${result.result.title}! Take the quiz to see your result: ${window.location.href}`;
      navigator.clipboard.writeText(text);
      alert('Result copied to clipboard!');
    }
  };

  // Show result screen
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

          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-8">
              <div className="text-6xl mb-4">🎯</div>
              <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent mb-4">
                Your Result
              </h1>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                {result.result.title}
              </h2>
              <div className="text-2xl font-semibold text-purple-600 mb-4">
                {result.percentage}% Score
              </div>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-lg mb-8">
              <h3 className="text-xl font-bold text-gray-900 mb-4">What This Means:</h3>
              <p className="text-gray-700 leading-relaxed mb-6">
                {result.result.description}
              </p>
              
              <h4 className="text-lg font-semibold text-gray-900 mb-3">Advice for You:</h4>
              <p className="text-gray-700 leading-relaxed">
                {result.result.advice}
              </p>
            </div>

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
                  <span>Take Another Quiz</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Show quiz questions
  if (selectedQuiz) {
    const currentQuiz = quizzes.find(q => q.id === selectedQuiz)!;
    
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50 pt-16">
        <div className="container mx-auto px-6 py-8">
          <button
            onClick={resetQuiz}
            className="flex items-center space-x-2 text-gray-600 hover:text-pink-500 mb-4 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Quizzes</span>
          </button>

          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-8">
              <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent mb-4">
                {currentQuiz.title}
              </h1>
            </div>

            {/* Progress Bar */}
            <div className="mb-8">
              <div className="flex justify-between text-sm text-gray-600 mb-2">
                <span>Question {currentQuestion + 1} of {currentQuiz.questions.length}</span>
                <span>{Math.round(((currentQuestion + 1) / currentQuiz.questions.length) * 100)}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-gradient-to-r from-pink-500 to-purple-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${((currentQuestion + 1) / currentQuiz.questions.length) * 100}%` }}
                ></div>
              </div>
            </div>

            {/* Question */}
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <h2 className="text-xl font-bold text-gray-900 mb-8 text-center">
                {currentQuiz.questions[currentQuestion].question}
              </h2>

              <div className="space-y-4">
                {currentQuiz.questions[currentQuestion].options.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => handleAnswer(option.points)}
                    className="w-full p-4 text-left bg-gray-50 hover:bg-pink-50 border border-gray-200 hover:border-pink-300 rounded-xl transition-all duration-200 hover:shadow-md"
                  >
                    <span className="text-gray-700">{option.text}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Show quiz selection
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

        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent mb-4">
            Love Tests & Quizzes
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Discover more about yourself and your relationship patterns with these fun, insightful quizzes.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {quizzes.map((quiz) => {
            const Icon = quiz.icon;
            return (
              <div
                key={quiz.id}
                className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 cursor-pointer"
                onClick={() => handleQuizSelect(quiz.id)}
              >
                <div className="text-center mb-6">
                  <div className={`w-16 h-16 bg-gradient-to-r from-${quiz.color}-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4`}>
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    {quiz.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {quiz.description}
                  </p>
                </div>
                
                <div className="text-center">
                  <button className={`bg-gradient-to-r from-${quiz.color}-500 to-purple-600 text-white px-6 py-3 rounded-full font-semibold hover:shadow-lg transition-all duration-200`}>
                    Take Quiz
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Coming Soon */}
        <div className="mt-12 text-center">
          <div className="bg-white rounded-2xl p-8 shadow-lg max-w-2xl mx-auto">
            <TestTube className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-gray-900 mb-3">More Quizzes Coming Soon!</h3>
            <p className="text-gray-600">
              We're working on more fun and insightful quizzes to help you understand yourself and your relationships better.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuizzesPage;