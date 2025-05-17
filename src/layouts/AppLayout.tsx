import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Menu, X, Home, Upload, User, LogOut, Film, Search, Moon, Sun } from 'lucide-react';

interface AppLayoutProps {
  children: React.ReactNode;
}

const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(localStorage.getItem('darkMode') === 'true');
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const toggleDarkMode = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    localStorage.setItem('darkMode', newDarkMode.toString());
    if (newDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  React.useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <div className="h-screen flex bg-gray-50 dark:bg-gray-900 overflow-hidden">
      {sidebarOpen && (
        <div 
          className="fixed inset-0 z-20 bg-gray-900 bg-opacity-50 transition-opacity lg:hidden"
          onClick={toggleSidebar}
        ></div>
      )}

      <div 
        className={`fixed inset-y-0 left-0 z-30 w-64 bg-white dark:bg-gray-800 shadow-lg transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:h-screen ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between px-4 py-5 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center space-x-2">
              <Film className="h-8 w-8 text-indigo-600 dark:text-indigo-400" />
              <h1 className="text-xl font-bold text-gray-900 dark:text-white">GE-Vault</h1>
            </div>
            <button className="lg:hidden" onClick={toggleSidebar}>
              <X className="h-6 w-6 text-gray-500 dark:text-gray-400" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto py-4 px-3">
            <nav className="space-y-1">
              <button 
                className={`sidebar-link w-full text-left ${isActive('/') ? 'active' : ''}`}
                onClick={() => navigate('/')}
              >
                <Home className="h-5 w-5" />
                <span>ホーム</span>
              </button>

              <button 
                className={`sidebar-link w-full text-left ${isActive('/upload') ? 'active' : ''}`}
                onClick={() => navigate('/upload')}
              >
                <Upload className="h-5 w-5" />
                <span>アップロード</span>
              </button>

              <button 
                className={`sidebar-link w-full text-left ${isActive('/profile') ? 'active' : ''}`}
                onClick={() => navigate('/profile')}
              >
                <User className="h-5 w-5" />
                <span>プロフィール</span>
              </button>
            </nav>
          </div>

          <div className="p-4 border-t border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between mb-4">
              <button
                className="sidebar-link py-1.5"
                onClick={toggleDarkMode}
              >
                {darkMode ? (
                  <>
                    <Sun className="h-5 w-5" />
                    <span>ライトモード</span>
                  </>
                ) : (
                  <>
                    <Moon className="h-5 w-5" />
                    <span>ダークモード</span>
                  </>
                )}
              </button>
            </div>
            
            <div className="flex items-center">
              <img 
                src={user?.avatar || 'https://i.pravatar.cc/150?img=1'} 
                alt="ユーザー" 
                className="h-8 w-8 rounded-full mr-3"
              />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                  {user?.name || 'ユーザー'}
                </p>
                <p className="text-xs text-gray-500 truncate dark:text-gray-400">
                  {user?.email || 'user@example.com'}
                </p>
              </div>
              <button 
                className="ml-2 p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
                onClick={handleLogout}
              >
                <LogOut className="h-5 w-5 text-gray-500 dark:text-gray-400" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white dark:bg-gray-800 shadow-sm z-10">
          <div className="px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
            <button 
              className="lg:hidden"
              onClick={toggleSidebar}
            >
              <Menu className="h-6 w-6 text-gray-500 dark:text-gray-400" />
            </button>

            <div className="max-w-lg w-full lg:max-w-xs mx-auto lg:mx-0">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  className="input pl-10"
                  type="text"
                  placeholder="動画を検索..."
                />
              </div>
            </div>

            <div className="hidden lg:flex items-center">
              <button
                className="btn btn-primary"
                onClick={() => navigate('/upload')}
              >
                アップロード
              </button>
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-auto p-4 sm:p-6 lg:p-8 bg-gray-50 dark:bg-gray-900">
          {children}
        </main>
      </div>
    </div>
  );
};

export default AppLayout;