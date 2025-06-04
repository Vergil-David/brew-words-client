
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, RotateCcw, ChevronLeft, ChevronRight, Volume2 } from 'lucide-react';

interface FlashCard {
  id: string;
  word: string;
  translation: string;
  transcription?: string;
  example?: string;
  audio?: string;
}

const mockCards: { [key: string]: FlashCard[] } = {
  work: [
    { id: '1', word: 'Meeting', translation: 'Зустріч', transcription: '[ˈmiːtɪŋ]', example: 'We have a meeting at 3 PM' },
    { id: '2', word: 'Deadline', translation: 'Дедлайн', transcription: '[ˈdedlaɪn]', example: 'The deadline is tomorrow' },
    { id: '3', word: 'Project', translation: 'Проект', transcription: '[ˈprɒdʒekt]', example: 'This project is very important' },
    { id: '4', word: 'Team', translation: 'Команда', transcription: '[tiːm]', example: 'Our team works well together' },
    { id: '5', word: 'Report', translation: 'Звіт', transcription: '[rɪˈpɔːt]', example: 'Please send me the report' }
  ],
  travel: [
    { id: '1', word: 'Airport', translation: 'Аеропорт', transcription: '[ˈeəpɔːt]', example: 'The airport is very busy' },
    { id: '2', word: 'Hotel', translation: 'Готель', transcription: '[həʊˈtel]', example: 'We booked a nice hotel' },
    { id: '3', word: 'Passport', translation: 'Паспорт', transcription: '[ˈpɑːspɔːt]', example: 'Don\'t forget your passport' }
  ]
};

const Flashcards = () => {
  const { topicId } = useParams();
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [completedCards, setCompletedCards] = useState<Set<string>>(new Set());

  const cards = mockCards[topicId || ''] || [];
  const currentCard = cards[currentIndex];
  const progress = ((currentIndex + 1) / cards.length) * 100;

  const handleNext = () => {
    if (currentIndex < cards.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setIsFlipped(false);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      setIsFlipped(false);
    }
  };

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
    if (!isFlipped) {
      setCompletedCards(prev => new Set([...prev, currentCard.id]));
    }
  };

  const handleKeyPress = (e: KeyboardEvent) => {
    if (e.code === 'Space') {
      e.preventDefault();
      handleFlip();
    } else if (e.code === 'ArrowRight') {
      handleNext();
    } else if (e.code === 'ArrowLeft') {
      handlePrevious();
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [currentIndex, isFlipped]);

  if (!currentCard) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Карти для цієї теми не знайдено
          </h2>
          <Button onClick={() => navigate('/topics')}>
            Повернутися до тем
          </Button>
        </div>
      </div>
    );
  }

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
              Флеш-карти
            </h1>
            <div className="text-lg font-medium text-gray-600">
              {currentIndex + 1} / {cards.length}
            </div>
          </div>

          <Progress value={progress} className="h-3 mb-2" />
          <p className="text-sm text-gray-500">
            Прогрес: {Math.round(progress)}%
          </p>
        </motion.div>

        <div className="flex items-center justify-center mb-8">
          <div className="relative w-full max-w-2xl h-96">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentCard.id}
                initial={{ rotateY: 90, opacity: 0 }}
                animate={{ rotateY: 0, opacity: 1 }}
                exit={{ rotateY: -90, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="absolute inset-0"
                style={{ perspective: '1000px' }}
              >
                <Card 
                  className="w-full h-full cursor-pointer shadow-2xl border-2 border-gray-200 hover:border-language-primary/30 transition-all duration-300"
                  onClick={handleFlip}
                >
                  <CardContent className="flex flex-col items-center justify-center h-full p-8 text-center">
                    <AnimatePresence mode="wait">
                      {!isFlipped ? (
                        <motion.div
                          key="front"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.2 }}
                          className="space-y-4"
                        >
                          <div className="text-4xl font-bold text-gray-800 mb-4">
                            {currentCard.word}
                          </div>
                          {currentCard.transcription && (
                            <div className="text-lg text-gray-500">
                              {currentCard.transcription}
                            </div>
                          )}
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="mt-4"
                          >
                            <Volume2 className="w-4 h-4 mr-2" />
                            Прослухати
                          </Button>
                          <div className="text-sm text-gray-400 mt-6">
                            Натисніть для перекладу
                          </div>
                        </motion.div>
                      ) : (
                        <motion.div
                          key="back"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.2 }}
                          className="space-y-4"
                        >
                          <div className="text-4xl font-bold text-language-primary mb-4">
                            {currentCard.translation}
                          </div>
                          {currentCard.example && (
                            <div className="text-lg text-gray-600 italic border-l-4 border-language-primary pl-4">
                              "{currentCard.example}"
                            </div>
                          )}
                          <div className="text-sm text-gray-400 mt-6">
                            Натисніть для слова
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </CardContent>
                </Card>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="flex items-center justify-center space-x-4"
        >
          <Button
            variant="outline"
            onClick={handlePrevious}
            disabled={currentIndex === 0}
            className="flex items-center space-x-2"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Попередня</span>
          </Button>

          <Button
            variant="outline"
            onClick={handleFlip}
            className="flex items-center space-x-2 px-6"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Перевернути</span>
          </Button>

          <Button
            variant="outline"
            onClick={handleNext}
            disabled={currentIndex === cards.length - 1}
            className="flex items-center space-x-2"
          >
            <span>Наступна</span>
            <ChevronRight className="w-4 h-4" />
          </Button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="mt-8 text-center text-sm text-gray-500"
        >
          <p>💡 Використовуйте клавіші: Пробіл - перевернути, ← → - навігація</p>
        </motion.div>
      </div>
    </div>
  );
};

export default Flashcards;
