
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { Sun, Moon, CheckCircle, Trophy, Gamepad2 } from 'lucide-react';

const Home = () => {
  const navigate = useNavigate();
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <div className={`min-h-screen transition-all duration-300 ${
      isDarkMode ? 'bg-gray-900' : 'bg-gray-50'
    }`}>
      {/* Header */}
      <header className="px-6 py-4 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-language-primary rounded-lg flex items-center justify-center">
            <span className="text-white font-bold">B</span>
          </div>
          <span className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
            BREWORDS
          </span>
        </div>
        
        <div className="flex items-center space-x-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            className={isDarkMode ? 'text-white hover:bg-gray-800' : 'text-gray-600 hover:bg-gray-100'}
          >
            {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </Button>
          
          <Button 
            onClick={() => navigate('/register')}
            className="bg-language-primary hover:bg-language-primary-dark text-white px-6 py-2 rounded-full"
          >
            Register
          </Button>
          
          <Button 
            variant="outline"
            onClick={() => navigate('/login')}
            className={`px-6 py-2 rounded-full border-2 ${
              isDarkMode 
                ? 'border-gray-600 text-white hover:bg-gray-800' 
                : 'border-gray-300 text-gray-700 hover:bg-gray-100'
            }`}
          >
            Login
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-12">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className={`text-5xl lg:text-6xl font-bold mb-6 ${
              isDarkMode ? 'text-white' : 'text-gray-900'
            }`}>
              Learn words<br />
              online
            </h1>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <Button 
                onClick={() => navigate('/login')}
                className="bg-language-primary hover:bg-language-primary-dark text-white px-8 py-4 text-lg rounded-xl font-semibold mb-12"
              >
                Start learning
              </Button>
            </motion.div>

            {/* Statistics */}
            <div className="grid grid-cols-2 gap-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                className="flex items-center space-x-3"
              >
                <CheckCircle className="w-12 h-12 text-green-500" />
                <div>
                  <div className={`text-3xl font-bold ${
                    isDarkMode ? 'text-white' : 'text-gray-900'
                  }`}>
                    1025
                  </div>
                  <div className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>
                    translated words
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="flex items-center space-x-3"
              >
                <div className="flex space-x-1">
                  {[1, 2, 3, 4].map((i) => (
                    <div 
                      key={i} 
                      className={`w-3 bg-yellow-400 rounded`}
                      style={{ height: `${i * 8 + 16}px` }}
                    />
                  ))}
                </div>
                <div>
                  <div className={`text-lg font-semibold ${
                    isDarkMode ? 'text-white' : 'text-gray-900'
                  }`}>
                    Progress tracking
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.7 }}
                className="flex items-center space-x-3"
              >
                <Trophy className="w-12 h-12 text-blue-500" />
                <div>
                  <div className={`text-3xl font-bold ${
                    isDarkMode ? 'text-white' : 'text-gray-900'
                  }`}>
                    32
                  </div>
                  <div className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>
                    different topics
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.8 }}
                className="flex items-center space-x-3"
              >
                <Gamepad2 className="w-12 h-12 text-language-primary" />
                <div>
                  <div className={`text-lg font-semibold ${
                    isDarkMode ? 'text-white' : 'text-gray-900'
                  }`}>
                    learn by playing
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Right Column - Illustration */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="relative">
              {/* Background Elements */}
              <div className="absolute top-0 right-0 w-24 h-24 bg-yellow-400 rounded-full opacity-20"></div>
              <div className="absolute top-12 right-12 w-12 h-12 bg-yellow-400 rounded-full opacity-30"></div>
              <div className="absolute top-6 right-6 w-6 h-6 bg-yellow-400 rounded-full opacity-40"></div>
              
              {/* Light bulb */}
              <div className="absolute top-4 right-8 w-16 h-16 bg-yellow-400 rounded-full flex items-center justify-center">
                <div className="w-8 h-8 bg-yellow-300 rounded-full relative">
                  <div className="absolute inset-2 bg-yellow-200 rounded-full"></div>
                </div>
              </div>

              {/* Main illustration container */}
              <div className="bg-gradient-to-br from-blue-100 to-blue-200 rounded-3xl p-8 relative overflow-hidden">
                {/* Progress bars background */}
                <div className="absolute left-8 top-8 space-y-2">
                  <div className="w-12 h-8 bg-yellow-400 rounded"></div>
                  <div className="w-16 h-8 bg-yellow-400 rounded"></div>
                  <div className="w-8 h-8 bg-yellow-400 rounded"></div>
                </div>
                
                {/* Character */}
                <div className="relative z-10 flex justify-center">
                  <div className="w-32 h-32 bg-language-primary rounded-full flex items-center justify-center">
                    <div className="w-24 h-24 bg-language-primary-dark rounded-full flex items-center justify-center">
                      <div className="w-4 h-4 bg-white rounded-full"></div>
                    </div>
                  </div>
                </div>
                
                {/* Laptop/Device */}
                <div className="mt-4 bg-yellow-400 rounded-xl p-4 relative">
                  <div className="bg-language-primary rounded-lg h-16 flex items-center justify-center">
                    <div className="w-8 h-4 bg-white rounded"></div>
                  </div>
                </div>
                
                {/* Books stack */}
                <div className="absolute bottom-0 right-8 space-y-1">
                  <div className="w-16 h-3 bg-yellow-300 rounded"></div>
                  <div className="w-16 h-3 bg-yellow-400 rounded"></div>
                  <div className="w-16 h-3 bg-yellow-500 rounded"></div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Footer */}
      <footer className={`mt-24 py-8 border-t ${
        isDarkMode ? 'border-gray-800 bg-gray-900' : 'border-gray-200 bg-white'
      }`}>
        <div className="container mx-auto px-6">
          <div className="flex justify-between items-center">
            <div className="flex space-x-6 text-sm">
              <a href="#" className={`hover:underline ${
                isDarkMode ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'
              }`}>
                PRIVACY POLICY
              </a>
              <a href="#" className={`hover:underline ${
                isDarkMode ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'
              }`}>
                TERMS OF SERVICE
              </a>
              <a href="#" className={`hover:underline ${
                isDarkMode ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'
              }`}>
                CONTACT US
              </a>
            </div>
            
            <div className={`text-sm ${
              isDarkMode ? 'text-gray-400' : 'text-gray-600'
            }`}>
              © 2025 BREWORDS. ALL RIGHTS RESERVED.
            </div>
            
            <div className="flex space-x-4">
              <a href="#" className={`hover:text-language-primary ${
                isDarkMode ? 'text-gray-400' : 'text-gray-600'
              }`}>
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                </svg>
              </a>
              <a href="#" className={`hover:text-language-primary ${
                isDarkMode ? 'text-gray-400' : 'text-gray-600'
              }`}>
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z"/>
                </svg>
              </a>
              <a href="#" className={`hover:text-language-primary ${
                isDarkMode ? 'text-gray-400' : 'text-gray-600'
              }`}>
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.749.099.12.112.225.085.346-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.402.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.357-.629-2.748-1.378 0 0-.599 2.282-.744 2.840-.282 1.084-1.064 2.456-1.549 3.235C9.584 23.815 10.77 24.001 12.017 24.001c6.624 0 11.99-5.367 11.99-11.988C24.007 5.367 18.641.001 12.017.001z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;