
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/contexts/AuthContext';
import { motion } from 'framer-motion';
import { ArrowLeft, Mail, Lock, User } from 'lucide-react';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      alert('Паролі не співпадають');
      return;
    }
    
    setIsLoading(true);
    
    try {
      // Mock registration - replace with actual API call
      await login(email, password);
      navigate('/topics');
    } catch (error) {
      console.error('Registration error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-language-primary via-language-primary-dark to-language-accent flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md"
      >
        <Button 
          variant="ghost" 
          onClick={() => navigate('/')}
          className="text-white hover:bg-white/10 mb-6"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Назад
        </Button>

        <Card className="shadow-2xl border-0">
          <CardHeader className="text-center pb-4">
            <div className="w-16 h-16 bg-gradient-to-r from-language-primary to-language-accent rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">✨</span>
            </div>
            <CardTitle className="text-2xl font-bold text-gray-800">
              Створити акаунт
            </CardTitle>
            <p className="text-gray-600">Приєднуйтесь до нашої спільноти</p>
          </CardHeader>
          
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Ім'я</Label>
                <div className="relative">
                  <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="name"
                    type="text"
                    placeholder="Ваше ім'я"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="your@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10"
                    required
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="password">Пароль</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Підтвердіть пароль</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="confirmPassword"
                    type="password"
                    placeholder="••••••••"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              <Button 
                type="submit" 
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-language-primary to-language-accent hover:from-language-primary-dark hover:to-language-primary text-white font-semibold py-3 rounded-lg mt-6"
              >
                {isLoading ? 'Реєстрація...' : 'Зареєструватися'}
              </Button>
            </form>

            <div className="text-center mt-6">
              <p className="text-gray-600">
                Вже маєте акаунт?{' '}
                <Button 
                  variant="link" 
                  onClick={() => navigate('/login')}
                  className="text-language-accent p-0 h-auto"
                >
                  Увійти
                </Button>
              </p>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default Register;