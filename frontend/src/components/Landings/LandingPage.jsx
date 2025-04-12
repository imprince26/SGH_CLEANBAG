import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../../hooks/useAuth';
import {
  Trash2,
  Award,
  MapPin,
  Sparkles,
  ArrowRight,
  Users,
  Recycle,
  ChevronDown
} from 'lucide-react';

function CleanbageApp() {
  const navigate = useNavigate();
  const { isAuthenticated, user } = useAuth();

  const features = [
    {
      icon: <Trash2 className="h-6 w-6 text-emerald-500" />,
      title: "Smart Waste Collection",
      description: "Real-time bin tracking and efficient collection"
    },
    {
      icon: <Award className="h-6 w-6 text-emerald-500" />,
      title: "Reward System",
      description: "Earn points for responsible waste management"
    },
    {
      icon: <MapPin className="h-6 w-6 text-emerald-500" />,
      title: "Bin Locator",
      description: "Find and report nearby waste bins easily"
    }
  ];

  return (
    <div className="relative min-h-screen">
      {!isAuthenticated ? (
        <div className="bg-emerald-50 min-h-screen py-16 px-4 border-b-2 border-emerald-200">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl mx-auto text-center"
          >
            <Sparkles className="h-12 w-12 text-emerald-400 mx-auto mb-6" />
            <h1 className="text-4xl font-bold text-emerald-500 mb-4">
              Welcome back, <span className="text-emerald-400">{user.name}</span>!
            </h1>
            <p className="text-emerald-800 text-lg mb-8">
              Continue making our community cleaner and greener
            </p>

            <motion.button
              onClick={() => navigate(`/${user.role}/dashboard`)}
              className="px-8 py-3 bg-emerald-500 text-white rounded-lg font-semibold 
                hover:bg-emerald-400 transition-all flex items-center gap-2 mx-auto"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Go to Dashboard
              <ArrowRight className="h-5 w-5" />
            </motion.button>
          </motion.div>
        </div>
      ) : (
        <div className="bg-emerald-50 min-h-screen">
          <div className="absolute inset-0 bg-[url('/images/pattern.svg')] opacity-5"></div>

          <div className="relative container mx-auto px-4 py-16 lg:py-24">
            <div className="grid lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
              {/* Left Column - Hero Content */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
              >
                <h1 className="text-4xl lg:text-5xl font-bold text-emerald-600 mb-6 leading-tight">
                  Smart Waste Management for a
                  <span className="text-emerald-400"> Cleaner Tomorrow</span>
                </h1>
                <p className="text-lg text-emerald-800 mb-8">
                  Join Cleanbage in revolutionizing waste management through technology
                  and community participation.
                </p>

                <div className="flex flex-col sm:flex-row gap-4">
                  <motion.button
                    onClick={() => navigate('/register')}
                    className="px-8 py-3 bg-emerald-500 text-white rounded-lg font-semibold 
                      hover:bg-emerald-400 transition-all flex items-center justify-center gap-2"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Get Started
                    <ArrowRight className="h-5 w-5" />
                  </motion.button>
                  <motion.button
                    onClick={() => navigate('/login')}
                    className="px-8 py-3 bg-emerald-700 text-emerald-100 rounded-lg font-semibold 
                      hover:bg-emerald-600 transition-all border border-emerald-600"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Sign In
                  </motion.button>
                </div>
              </motion.div>

              {/* Right Column - Features */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="space-y-4"
              >
                {features.map((feature, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ x: 10 }}
                    className="bg-transparent p-6 rounded-lg border border-emerald-400/50 
                      backdrop-blur-sm flex items-center gap-4 group cursor-pointer"
                  >
                    <div className="bg-transparent w-12 h-12 rounded-lg flex items-center 
                      justify-center group-hover:bg-emerald-400/50 transition-colors">
                      {feature.icon}
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-emerald-700 mb-1">
                        {feature.title}
                      </h3>
                      <p className="text-emerald-900 text-sm">
                        {feature.description}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </div>

            {/* Scroll Indicator */}
            {/* <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 }}
              className="absolute bottom-8 left-1/2  transform -translate-x-1/2 text-center"
            >
              <p className="text-emerald-700 text-sm mb-2">Discover More</p>
              <ChevronDown className="h-6 w-6 ml-8 text-emerald-900 animate-bounce" />
            </motion.div> */}
          </div>
        </div>
      )}
    </div>
  );
}

export default CleanbageApp;