
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { motion } from 'framer-motion';
import { Calendar, Target, Trophy, TrendingUp } from 'lucide-react';

const Profile = () => {
  const { user } = useAuth();

  const stats = [
    { label: 'Вивчено слів', value: '248', icon: Target, color: 'text-blue-600' },
    { label: 'Дні поспіль', value: '12', icon: Calendar, color: 'text-green-600' },
    { label: 'Досягнення', value: '8', icon: Trophy, color: 'text-yellow-600' },
    { label: 'Точність', value: '87%', icon: TrendingUp, color: 'text-purple-600' }
  ];

  const achievements = [
    { name: 'Перші кроки', description: 'Вивчено 10 слів', earned: true },
    { name: 'Студент', description: 'Вивчено 100 слів', earned: true },
    { name: 'Дослідник', description: 'Вивчено 5 тем', earned: true },
    { name: 'Майстер', description: 'Вивчено 500 слів', earned: false },
    { name: 'Полігіот', description: 'Вивчено 1000 слів', earned: false }
  ];

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
            Мій профіль
          </h1>
          <p className="text-gray-600">
            Ваш прогрес та досягнення у вивченні мов
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-1"
          >
            <Card className="shadow-lg">
              <CardHeader className="text-center">
                <Avatar className="w-24 h-24 mx-auto mb-4">
                  <AvatarImage src={user?.avatar} />
                  <AvatarFallback className="bg-language-primary text-white text-2xl">
                    {user?.name.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <CardTitle className="text-2xl text-gray-800">
                  {user?.name}
                </CardTitle>
                <p className="text-gray-600">{user?.email}</p>
                <Badge className="bg-language-primary text-white mt-2">
                  Активний студент
                </Badge>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Загальний прогрес</span>
                      <span className="font-medium">68%</span>
                    </div>
                    <Progress value={68} className="h-3" />
                  </div>
                  <div className="text-center text-sm text-gray-600">
                    Рівень: Середній
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="lg:col-span-2"
          >
            <div className="grid grid-cols-2 gap-4 mb-8">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 * index }}
                >
                  <Card className="shadow-md hover:shadow-lg transition-all duration-300">
                    <CardContent className="p-6">
                      <div className="flex items-center space-x-3">
                        <stat.icon className={`w-8 h-8 ${stat.color}`} />
                        <div>
                          <div className="text-2xl font-bold text-gray-800">
                            {stat.value}
                          </div>
                          <div className="text-sm text-gray-600">
                            {stat.label}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>

            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Trophy className="w-6 h-6 text-yellow-600" />
                  <span>Досягнення</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 gap-3">
                  {achievements.map((achievement, index) => (
                    <motion.div
                      key={achievement.name}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: 0.1 * index }}
                      className={`flex items-center space-x-3 p-3 rounded-lg border-2 ${
                        achievement.earned 
                          ? 'border-yellow-200 bg-yellow-50' 
                          : 'border-gray-200 bg-gray-50'
                      }`}
                    >
                      <div className={`text-2xl ${achievement.earned ? '' : 'grayscale'}`}>
                        🏆
                      </div>
                      <div className="flex-1">
                        <div className={`font-semibold ${
                          achievement.earned ? 'text-yellow-800' : 'text-gray-500'
                        }`}>
                          {achievement.name}
                        </div>
                        <div className={`text-sm ${
                          achievement.earned ? 'text-yellow-700' : 'text-gray-400'
                        }`}>
                          {achievement.description}
                        </div>
                      </div>
                      {achievement.earned && (
                        <Badge className="bg-yellow-100 text-yellow-800">
                          Отримано
                        </Badge>
                      )}
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
