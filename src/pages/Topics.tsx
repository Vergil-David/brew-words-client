
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { motion } from 'framer-motion';
import { Search, ChevronRight } from 'lucide-react';

interface Topic {
  id: string;
  title: string;
  description: string;
  wordsCount: number;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  progress: number;
  icon: string;
}

const mockTopics: Topic[] = [
  {
    id: 'work',
    title: 'Робота',
    description: 'Професійна лексика та офісне спілкування',
    wordsCount: 150,
    difficulty: 'intermediate',
    progress: 65,
    icon: '💼'
  },
  {
    id: 'travel',
    title: 'Подорожі',
    description: 'Словник для подорожей та туризму',
    wordsCount: 120,
    difficulty: 'beginner',
    progress: 80,
    icon: '✈️'
  },
  {
    id: 'food',
    title: 'Їжа',
    description: 'Кулінарна лексика та назви страв',
    wordsCount: 200,
    difficulty: 'beginner',
    progress: 45,
    icon: '🍽️'
  },
  {
    id: 'family',
    title: 'Сім\'я',
    description: 'Родинні стосунки та побутове спілкування',
    wordsCount: 80,
    difficulty: 'beginner',
    progress: 90,
    icon: '👨‍👩‍👧‍👦'
  },
  {
    id: 'technology',
    title: 'Технології',
    description: 'IT-термінологія та сучасні технології',
    wordsCount: 180,
    difficulty: 'advanced',
    progress: 30,
    icon: '💻'
  },
  {
    id: 'health',
    title: 'Здоров\'я',
    description: 'Медична лексика та здоровий спосіб життя',
    wordsCount: 110,
    difficulty: 'intermediate',
    progress: 55,
    icon: '🏥'
  }
];

const difficultyColors = {
  beginner: 'bg-green-100 text-green-800',
  intermediate: 'bg-yellow-100 text-yellow-800',
  advanced: 'bg-red-100 text-red-800'
};

const difficultyLabels = {
  beginner: 'Початковий',
  intermediate: 'Середній', 
  advanced: 'Просунутий'
};

const Topics = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const filteredTopics = mockTopics.filter(topic =>
    topic.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    topic.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleTopicClick = (topicId: string) => {
    navigate(`/exercise/${topicId}`);
  };

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Вибери тему для вивчення
          </h1>
          <p className="text-gray-600">
            Обери цікаву тему та почни вивчати нові слова
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-8"
        >
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <Input
              placeholder="Пошук тем..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 py-3 text-lg border-2 border-gray-200 focus:border-language-primary rounded-xl"
            />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {filteredTopics.map((topic, index) => (
            <motion.div
              key={topic.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 * index }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Card 
                className="cursor-pointer hover:shadow-lg transition-all duration-300 border-2 border-gray-100 hover:border-language-primary/30"
                onClick={() => handleTopicClick(topic.id)}
              >
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div className="text-3xl">{topic.icon}</div>
                    <ChevronRight className="h-5 w-5 text-gray-400" />
                  </div>
                  <CardTitle className="text-xl font-bold text-gray-800">
                    {topic.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4 text-sm">
                    {topic.description}
                  </p>
                  
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-500">Слів: {topic.wordsCount}</span>
                      <Badge className={difficultyColors[topic.difficulty]}>
                        {difficultyLabels[topic.difficulty]}
                      </Badge>
                    </div>
                    
                    <div className="space-y-1">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-500">Прогрес</span>
                        <span className="font-medium text-language-primary">{topic.progress}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-gradient-to-r from-language-primary to-language-accent h-2 rounded-full transition-all duration-300"
                          style={{ width: `${topic.progress}%` }}
                        />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {filteredTopics.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-medium text-gray-800 mb-2">
              Нічого не знайдено
            </h3>
            <p className="text-gray-600">
              Спробуйте змінити пошуковий запит
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Topics;
