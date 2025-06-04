
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Check, X, RotateCcw } from 'lucide-react';

interface Question {
  id: string;
  word: string;
  correctAnswer: string;
  options: string[];
  explanation?: string;
}

const mockQuestions: { [key: string]: Question[] } = {
  work: [
    {
      id: '1',
      word: 'Meeting',
      correctAnswer: 'Зустріч',
      options: ['Зустріч', 'Звіт', 'Проект', 'Команда'],
      explanation: 'Meeting означає зустріч або нараду'
    },
    {
      id: '2', 
      word: 'Deadline',
      correctAnswer: 'Дедлайн',
      options: ['Початок', 'Дедлайн', 'Перерва', 'Зустріч'],
      explanation: 'Deadline - це кінцевий термін виконання завдання'
    },
    {
      id: '3',
      word: 'Project',
      correctAnswer: 'Проект',
      options: ['Проект', 'Процес', 'Продукт', 'Програма'],
      explanation: 'Project - це проект або план роботи'
    }
  ],
  travel: [
    {
      id: '1',
      word: 'Airport',
      correctAnswer: 'Аеропорт',
      options: ['Аеропорт', 'Автобус', 'Готель', 'Ресторан']
    },
    {
      id: '2',
      word: 'Hotel',
      correctAnswer: 'Готель',
      options: ['Хостел', 'Готель', 'Будинок', 'Офіс']
    }
  ]
};

const Translation = () => {
  const { topicId } = useParams();
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [isCorrect, setIsCorrect] = useState(false);

  const questions = mockQuestions[topicId || ''] || [];
  const currentQuestion = questions[currentIndex];
  const progress = ((currentIndex + 1) / questions.length) * 100;

  const handleAnswerSelect = (answer: string) => {
    if (showResult) return;
    
    setSelectedAnswer(answer);
    const correct = answer === currentQuestion.correctAnswer;
    setIsCorrect(correct);
    setShowResult(true);
    
    if (correct) {
      setScore(score + 1);
    }
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setSelectedAnswer(null);
      setShowResult(false);
    } else {
      // Show final results
      navigate(`/exercise/${topicId}`, { 
        state: { completed: true, score, total: questions.length }
      });
    }
  };

  const resetQuiz = () => {
    setCurrentIndex(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setScore(0);
  };

  if (!currentQuestion) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Вправи для цієї теми не знайдено
          </h2>
          <Button onClick={() => navigate('/topics')}>
            Повернутися до тем
          </Button>
        </div>
      </div>
    );
  }

  const getOptionStyle = (option: string) => {
    if (!showResult) {
      return selectedAnswer === option 
        ? 'border-language-primary bg-language-primary/10' 
        : 'border-gray-200 hover:border-language-primary/50 hover:bg-gray-50';
    }
    
    if (option === currentQuestion.correctAnswer) {
      return 'border-green-500 bg-green-50 text-green-700';
    }
    
    if (option === selectedAnswer && !isCorrect) {
      return 'border-red-500 bg-red-50 text-red-700';
    }
    
    return 'border-gray-200 bg-gray-50 text-gray-400';
  };

  return (
    <div className="min-h-screen p-6 bg-gradient-to-br from-language-primary/5 to-language-accent/5">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <Button 
            variant="ghost" 
            onClick={() => navigate(`/exercise/${topicId}`)}
            className="text-gray-600 hover:text-gray-800 mb-6"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Назад до вправ
          </Button>

          <div className="flex items-center justify-between mb-4">
            <h1 className="text-3xl font-bold text-gray-800">
              Вибір перекладу
            </h1>
            <div className="flex items-center space-x-4">
              <div className="text-lg font-medium text-gray-600">
                {currentIndex + 1} / {questions.length}
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={resetQuiz}
              >
                <RotateCcw className="w-4 h-4 mr-2" />
                Почати заново
              </Button>
            </div>
          </div>

          <Progress value={progress} className="h-3 mb-2" />
          <div className="flex justify-between text-sm text-gray-500">
            <span>Прогрес: {Math.round(progress)}%</span>
            <span>Правильних відповідей: {score} / {questions.length}</span>
          </div>
        </motion.div>

        <AnimatePresence mode="wait">
          <motion.div
            key={currentQuestion.id}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            <Card className="shadow-xl border-2 border-gray-100 mb-8">
              <CardHeader className="text-center bg-gradient-to-r from-language-primary/10 to-language-accent/10">
                <CardTitle className="text-2xl text-gray-800 mb-4">
                  Оберіть переклад слова:
                </CardTitle>
                <div className="text-4xl font-bold text-language-primary">
                  {currentQuestion.word}
                </div>
              </CardHeader>
              <CardContent className="p-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {currentQuestion.options.map((option, index) => (
                    <motion.button
                      key={option}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      onClick={() => handleAnswerSelect(option)}
                      disabled={showResult}
                      className={`p-4 rounded-xl border-2 text-left font-medium transition-all duration-200 ${getOptionStyle(option)}`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-lg">{option}</span>
                        {showResult && option === currentQuestion.correctAnswer && (
                          <Check className="w-5 h-5 text-green-600" />
                        )}
                        {showResult && option === selectedAnswer && !isCorrect && (
                          <X className="w-5 h-5 text-red-600" />
                        )}
                      </div>
                    </motion.button>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </AnimatePresence>

        <AnimatePresence>
          {showResult && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <Card className={`mb-6 border-2 ${isCorrect ? 'border-green-500 bg-green-50' : 'border-red-500 bg-red-50'}`}>
                <CardContent className="p-6">
                  <div className="flex items-center space-x-3 mb-4">
                    {isCorrect ? (
                      <Check className="w-8 h-8 text-green-600" />
                    ) : (
                      <X className="w-8 h-8 text-red-600" />
                    )}
                    <span className={`text-xl font-bold ${isCorrect ? 'text-green-700' : 'text-red-700'}`}>
                      {isCorrect ? 'Правильно!' : 'Неправильно!'}
                    </span>
                  </div>
                  
                  {!isCorrect && (
                    <p className="text-gray-700 mb-2">
                      Правильна відповідь: <strong>{currentQuestion.correctAnswer}</strong>
                    </p>
                  )}
                  
                  {currentQuestion.explanation && (
                    <p className="text-gray-600 text-sm">
                      💡 {currentQuestion.explanation}
                    </p>
                  )}
                </CardContent>
              </Card>

              <div className="text-center">
                <Button
                  onClick={handleNext}
                  className="bg-gradient-to-r from-language-primary to-language-accent text-white font-semibold px-8 py-3 rounded-xl"
                >
                  {currentIndex < questions.length - 1 ? 'Наступне питання' : 'Завершити'}
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Translation;
