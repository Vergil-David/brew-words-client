
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

const Welcome = () => {
  const navigate = useNavigate();
  const [isAnimating, setIsAnimating] = useState(false);

  const handleLogin = () => {
    setIsAnimating(true);
    setTimeout(() => {
      navigate('/login');
    }, 300);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-language-primary via-language-primary-dark to-language-accent flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="text-center max-w-md mx-auto"
      >
        <motion.div
          initial={{ y: -20 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-8"
        >
          <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
            <span className="text-4xl">🌍</span>
          </div>
          <h1 className="text-4xl font-bold text-white mb-4">
            Language Learning
          </h1>
          <p className="text-language-white/90 text-lg">
            Вивчайте мови легко та ефективно з інтерактивними флеш-картками та іграми
          </p>
        </motion.div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="space-y-4"
        >
          <Button 
            onClick={handleLogin}
            disabled={isAnimating}
            className="w-full bg-white text-language-primary hover:bg-gray-50 font-semibold py-3 px-8 text-lg rounded-xl shadow-lg transform transition-all duration-200 hover:scale-105"
          >
            {isAnimating ? 'Завантаження...' : 'Увійти'}
          </Button>
          
          <Button 
            variant="outline" 
            className="w-full border-white text-white hover:bg-white/10 font-semibold py-3 px-8 text-lg rounded-xl"
          >
            Реєстрація
          </Button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="mt-8 text-language-white/70 text-sm"
        >
          ✨ Понад 1000+ слів у різних темах
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Welcome;
