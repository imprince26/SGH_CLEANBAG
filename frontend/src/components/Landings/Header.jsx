import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '@/hooks/useAuth';
import { 
  Menu, 
  X, 
  User, 
  LogOut, 
  Bell, 
  ChevronDown,
  Trash2,
  MapPin,
  BarChart3,
  Calendar,
  Users,
  Settings,
  Home
} from 'lucide-react';

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const navigationLinks = {
    resident: [
      { name: 'Dashboard', path: '/resident/dashboard', icon: BarChart3 },
      { name: 'Report Bin', path: '/resident/collections/report', icon: Trash2 },
      { name: 'Nearby Bins', path: '/resident/collections/nearby', icon: MapPin },
    ],
    collector: [
      { name: 'Dashboard', path: '/collector/dashboard', icon: BarChart3 },
      { name: 'Collections', path: '/collector/collections', icon: Trash2 },
      { name: 'Routes', path: '/collector/routes', icon: MapPin },
      { name: 'Schedule', path: '/collector/schedule', icon: Calendar },
    ],
    admin: [
      { name: 'Dashboard', path: '/admin/dashboard', icon: BarChart3 },
      { name: 'Collections', path: '/admin/collections', icon: Trash2 },
      { name: 'Users', path: '/admin/users', icon: Users },
      { name: 'Settings', path: '/admin/settings', icon: Settings },
    ],
    public: [
      { name: 'Home', path: '/', icon: Home },
      { name: 'About', path: '/about', icon: Users },
      { name: 'Services', path: '/services', icon: Trash2 },
    ]
  };

  const handleLogout = async () => {
    await logout();
    navigate('/login');
    setIsProfileOpen(false);
  };

  const activeLinks = user ? navigationLinks[user.role] : navigationLinks.public;

  return (
    <header className="fixed w-full top-0 z-50 bg-emerald-800 shadow-lg">
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo and Brand */}
          <Link to="/" className="flex items-center space-x-3">
            <Trash2 className="h-8 w-8 text-emerald-300" />
            <span className="text-xl font-bold text-white">CleanBage</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:space-x-6">
            {activeLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`flex items-center px-3 py-2 rounded-md text-sm font-medium 
                  ${location.pathname === link.path
                    ? 'text-white bg-emerald-700'
                    : 'text-emerald-100 hover:text-white hover:bg-emerald-700'
                  } transition-colors duration-200`}
              >
                <link.icon className="h-4 w-4 mr-2" />
                {link.name}
              </Link>
            ))}

            {user ? (
              <div className="relative">
                <button
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className="flex items-center px-3 py-2 rounded-md text-sm font-medium 
                    text-emerald-100 hover:text-white hover:bg-emerald-700"
                >
                  <User className="h-4 w-4 mr-2" />
                  {user.name}
                  <ChevronDown className="h-4 w-4 ml-1" />
                </button>

                <AnimatePresence>
                  {isProfileOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 
                        ring-black ring-opacity-5"
                    >
                      <div className="py-1">
                        <Link
                          to={`/${user.role}/profile`}
                          className="flex items-center px-4 py-2 text-sm text-gray-700 
                            hover:bg-emerald-50"
                          onClick={() => setIsProfileOpen(false)}
                        >
                          <User className="h-4 w-4 mr-2" />
                          Profile
                        </Link>
                        <button
                          onClick={handleLogout}
                          className="w-full flex items-center px-4 py-2 text-sm text-gray-700 
                            hover:bg-emerald-50"
                        >
                          <LogOut className="h-4 w-4 mr-2" />
                          Logout
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link
                  to="/login"
                  className="text-emerald-100 hover:text-white px-3 py-2 rounded-md 
                    text-sm font-medium"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="bg-emerald-600 text-white px-4 py-2 rounded-md text-sm 
                    font-medium hover:bg-emerald-500 transition-colors"
                >
                  Register
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-md text-emerald-100 hover:text-white 
              hover:bg-emerald-700 focus:outline-none"
          >
            {isMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden py-3"
            >
              <div className="space-y-1 pb-3 pt-2">
                {activeLinks.map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={`flex items-center px-3 py-2 rounded-md text-base font-medium 
                      ${location.pathname === link.path
                        ? 'text-white bg-emerald-700'
                        : 'text-emerald-100 hover:text-white hover:bg-emerald-700'
                      } transition-colors duration-200`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <link.icon className="h-5 w-5 mr-3" />
                    {link.name}
                  </Link>
                ))}

                {user ? (
                  <>
                    <Link
                      to={`/${user.role}/profile`}
                      className="flex items-center px-3 py-2 rounded-md text-base font-medium 
                        text-emerald-100 hover:text-white hover:bg-emerald-700"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <User className="h-5 w-5 mr-3" />
                      Profile
                    </Link>
                    <button
                      onClick={() => {
                        handleLogout();
                        setIsMenuOpen(false);
                      }}
                      className="w-full flex items-center px-3 py-2 rounded-md text-base 
                        font-medium text-emerald-100 hover:text-white hover:bg-emerald-700"
                    >
                      <LogOut className="h-5 w-5 mr-3" />
                      Logout
                    </button>
                  </>
                ) : (
                  <div className="space-y-2 pt-4 pb-3 border-t border-emerald-700">
                    <Link
                      to="/login"
                      className="flex items-center px-3 py-2 rounded-md text-base font-medium 
                        text-emerald-100 hover:text-white hover:bg-emerald-700"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Login
                    </Link>
                    <Link
                      to="/register"
                      className="flex items-center px-3 py-2 rounded-md text-base font-medium 
                        bg-emerald-600 text-white hover:bg-emerald-500"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Register
                    </Link>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
}

export default Header;