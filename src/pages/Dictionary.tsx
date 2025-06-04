
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { Search, Volume2, Star, BookOpen } from 'lucide-react';

interface DictionaryWord {
  id: string;
  word: string;
  translation: string;
  transcription: string;
  partOfSpeech: string;
  topic: string;
  example: string;
  isFavorite: boolean;
  learned: boolean;
}

const mockWords: DictionaryWord[] = [
  {
    id: '1',
    word: 'Meeting',
    translation: 'Зустріч',
    transcription: '[ˈmiːtɪŋ]',
    partOfSpeech: 'noun',
    topic: 'Робота',
    example: 'We have a meeting at 3 PM',
    isFavorite: true,
    learned: true
  },
  {
    id: '2',
    word: 'Airport',
    translation: 'Аеропорт',
    transcription: '[ˈeəpɔːt]',
    partOfSpeech: 'noun',
    topic: 'Подорожі',
    example: 'The airport is very busy today',
    isFavorite: false,
    learned: true
  },
  {
    id: '3',
    word: 'Deadline',
    translation: 'Дедлайн',
    transcription: '[ˈdedlaɪn]',
    partOfSpeech: 'noun',
    topic: 'Робота',
    example: 'The deadline is tomorrow',
    isFavorite: true,
    learned: false
  }
];

const Dictionary = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterTopic, setFilterTopic] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');

  const filteredWords = mockWords.filter(word => {
    const matchesSearch = word.word.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         word.translation.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTopic = filterTopic === 'all' || word.topic === filterTopic;
    const matchesStatus = filterStatus === 'all' || 
                         (filterStatus === 'learned' && word.learned) ||
                         (filterStatus === 'favorites' && word.isFavorite);
    
    return matchesSearch && matchesTopic && matchesStatus;
  });

  const topics = ['all', ...Array.from(new Set(mockWords.map(word => word.topic)))];

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
            Мій словник
          </h1>
          <p className="text-gray-600">
            Всі вивчені слова в одному місці
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-8"
        >
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Search className="w-5 h-5" />
                <span>Пошук та фільтри</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    placeholder="Пошук слів..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
                
                <select
                  value={filterTopic}
                  onChange={(e) => setFilterTopic(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-language-primary"
                >
                  <option value="all">Всі теми</option>
                  {topics.slice(1).map(topic => (
                    <option key={topic} value={topic}>{topic}</option>
                  ))}
                </select>

                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-language-primary"
                >
                  <option value="all">Всі слова</option>
                  <option value="learned">Вивчені</option>
                  <option value="favorites">Обрані</option>
                </select>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {filteredWords.map((word, index) => (
            <motion.div
              key={word.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 * index }}
            >
              <Card className="shadow-md hover:shadow-lg transition-all duration-300 border-2 border-gray-100 hover:border-language-primary/30">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <Badge variant="outline" className="text-xs">
                      {word.topic}
                    </Badge>
                    <div className="flex items-center space-x-2">
                      {word.isFavorite && (
                        <Star className="w-4 h-4 text-yellow-500 fill-current" />
                      )}
                      {word.learned && (
                        <Badge className="bg-green-100 text-green-800 text-xs">
                          Вивчено
                        </Badge>
                      )}
                    </div>
                  </div>
                  <CardTitle className="text-xl text-gray-800">
                    {word.word}
                  </CardTitle>
                  <p className="text-sm text-gray-500">
                    {word.transcription}
                  </p>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="text-lg font-semibold text-language-primary">
                      {word.translation}
                    </div>
                    
                    <div className="text-sm text-gray-600 bg-gray-50 p-3 rounded-lg border-l-4 border-language-primary">
                      <div className="flex items-center space-x-2 mb-1">
                        <BookOpen className="w-4 h-4" />
                        <span className="font-medium">Приклад:</span>
                      </div>
                      <p className="italic">"{word.example}"</p>
                    </div>

                    <div className="flex items-center justify-between pt-2">
                      <Badge variant="secondary" className="text-xs">
                        {word.partOfSpeech}
                      </Badge>
                      <Button variant="outline" size="sm">
                        <Volume2 className="w-4 h-4 mr-1" />
                        Озвучити
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {filteredWords.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <div className="text-6xl mb-4">📚</div>
            <h3 className="text-xl font-medium text-gray-800 mb-2">
              Слова не знайдено
            </h3>
            <p className="text-gray-600">
              Спробуйте змінити параметри пошуку або почніть вивчати нові теми
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Dictionary;
