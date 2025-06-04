
import { useNavigate, useParams } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { ArrowLeft, Zap, Target } from 'lucide-react';

const ExerciseType = () => {
  const { topicId } = useParams();
  const navigate = useNavigate();

  const topicTitles: { [key: string]: string } = {
    work: 'Робота',
    travel: 'Подорожі',
    food: 'Їжа',
    family: 'Сім\'я',
    technology: 'Технології',
    health: 'Здоров\'я'
  };

  const exerciseTypes = [
    {
      id: 'flashcards',
      title: 'Флеш-карти',
      description: 'Вивчайте слова за допомогою інтерактивних карток з перекладом',
      icon: Zap,
      color: 'from-blue-500 to-blue-600',
      route: `/flashcards/${topicId}`
    },
    {
      id: 'translation',
      title: 'Вибір перекладу',
      description: 'Оберіть правильний переклад з декількох варіантів відповіді',
      icon: Target,
      color: 'from-green-500 to-green-600',
      route: `/translation/${topicId}`
    }
  ];

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <Button 
            variant="ghost" 
            onClick={() => navigate('/topics')}
            className="text-gray-600 hover:text-gray-800 mb-6"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Назад до тем
          </Button>

          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            {topicTitles[topicId || ''] || 'Невідома тема'}
          </h1>
          <p className="text-gray-600">
            Оберіть тип вправи для вивчення слів
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          {exerciseTypes.map((exercise, index) => (
            <motion.div
              key={exercise.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 * index }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Card 
                className="cursor-pointer h-full hover:shadow-xl transition-all duration-300 border-2 border-gray-100 hover:border-language-primary/30"
                onClick={() => navigate(exercise.route)}
              >
                <CardHeader className="text-center pb-4">
                  <div className={`w-20 h-20 mx-auto rounded-full bg-gradient-to-r ${exercise.color} flex items-center justify-center mb-4 shadow-lg`}>
                    <exercise.icon className="h-10 w-10 text-white" />
                  </div>
                  <CardTitle className="text-2xl font-bold text-gray-800">
                    {exercise.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-gray-600 text-lg leading-relaxed mb-6">
                    {exercise.description}
                  </p>
                  <Button 
                    className={`w-full bg-gradient-to-r ${exercise.color} hover:opacity-90 text-white font-semibold py-3 rounded-xl`}
                  >
                    Почати вправу
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="mt-12 text-center"
        >
          <div className="bg-gradient-to-r from-language-primary/10 to-language-accent/10 rounded-2xl p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              💡 Поради для ефективного навчання
            </h3>
            <p className="text-gray-600">
              Рекомендуємо спочатку вивчити слова за допомогою флеш-карт, а потім закріпити знання вправами на переклад
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ExerciseType;
