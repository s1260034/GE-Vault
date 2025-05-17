import React, { useState, useEffect } from 'react';
import { 
  User, Mail, Edit2, Settings, LogOut, Film, Eye, Calendar,
  Grid, List, Trash2, MoreVertical
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { getMockVideos } from '../utils/mockData';
import { formatDate, formatViews, formatDuration } from '../utils/formatters';
import { Video } from '../types/Video';

const ProfileTabs = {
  VIDEOS: 'videos',
  SETTINGS: 'settings',
};

const ViewModes = {
  GRID: 'grid',
  LIST: 'list',
};

const Profile = () => {
  const [activeTab, setActiveTab] = useState(ProfileTabs.VIDEOS);
  const [viewMode, setViewMode] = useState(ViewModes.GRID);
  const [userVideos, setUserVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(true);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  // Stats
  const totalViews = userVideos.reduce((acc, video) => acc + video.views, 0);
  const uploadCount = userVideos.length;

  useEffect(() => {
    // Simulating API call to get user videos
    const loadUserVideos = async () => {
      try {
        setLoading(true);
        const allVideos = getMockVideos();
        
        // Filter videos for current user (in a real app, this would be a server-side operation)
        // For demo purposes, we're using all mock videos as the user's videos
        setUserVideos(allVideos);
      } catch (error) {
        console.error('Error loading videos:', error);
      } finally {
        setLoading(false);
      }
    };
    
    loadUserVideos();
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div>
      {/* Profile header */}
      <div className="mb-8">
        <div className="rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 h-32"></div>
        
        <div className="px-4 sm:px-0 -mt-16">
          <div className="flex flex-col sm:flex-row items-center sm:items-end sm:space-x-5">
            <div className="flex-shrink-0">
              <img 
                src={user?.avatar || 'https://i.pravatar.cc/150?img=1'} 
                alt={user?.name} 
                className="h-32 w-32 rounded-full border-4 border-white dark:border-gray-800 bg-white"
              />
            </div>
            
            <div className="mt-6 sm:mt-0 sm:flex-1 text-center sm:text-left">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h1 className="text-2xl font-bold text-gray-900 dark:text-white truncate">
                    {user?.name || 'User Name'}
                  </h1>
                  <p className="text-sm text-gray-500 dark:text-gray-400 flex items-center justify-center sm:justify-start gap-1">
                    <Mail className="h-4 w-4" />
                    {user?.email || 'user@example.com'}
                  </p>
                </div>
                
                <div className="mt-4 sm:mt-0 flex flex-wrap justify-center sm:justify-end gap-2">
                  <button className="btn btn-outline flex items-center gap-2">
                    <Edit2 className="h-5 w-5" />
                    <span>Edit Profile</span>
                  </button>
                  
                  <button 
                    className="btn btn-outline flex items-center gap-2"
                    onClick={handleLogout}
                  >
                    <LogOut className="h-5 w-5" />
                    <span>Logout</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Profile stats */}
      <div className="mb-8 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="card p-4 flex items-center space-x-4">
          <div className="h-12 w-12 rounded-full bg-indigo-100 dark:bg-indigo-900 flex items-center justify-center">
            <Film className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
          </div>
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">Videos</p>
            <p className="text-xl font-semibold">{uploadCount}</p>
          </div>
        </div>
        
        <div className="card p-4 flex items-center space-x-4">
          <div className="h-12 w-12 rounded-full bg-teal-100 dark:bg-teal-900 flex items-center justify-center">
            <Eye className="h-6 w-6 text-teal-600 dark:text-teal-400" />
          </div>
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">Total Views</p>
            <p className="text-xl font-semibold">{formatViews(totalViews)}</p>
          </div>
        </div>
        
        <div className="card p-4 flex items-center space-x-4">
          <div className="h-12 w-12 rounded-full bg-purple-100 dark:bg-purple-900 flex items-center justify-center">
            <Calendar className="h-6 w-6 text-purple-600 dark:text-purple-400" />
          </div>
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">Member Since</p>
            <p className="text-xl font-semibold">{formatDate(new Date().toISOString())}</p>
          </div>
        </div>
      </div>
      
      {/* Tab navigation */}
      <div className="border-b border-gray-200 dark:border-gray-700 mb-6">
        <nav className="flex space-x-8">
          <button
            className={`pb-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === ProfileTabs.VIDEOS
                ? 'border-indigo-500 text-indigo-600 dark:border-indigo-400 dark:text-indigo-400'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300'
            }`}
            onClick={() => setActiveTab(ProfileTabs.VIDEOS)}
          >
            Videos
          </button>
          
          <button
            className={`pb-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === ProfileTabs.SETTINGS
                ? 'border-indigo-500 text-indigo-600 dark:border-indigo-400 dark:text-indigo-400'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300'
            }`}
            onClick={() => setActiveTab(ProfileTabs.SETTINGS)}
          >
            Settings
          </button>
        </nav>
      </div>
      
      {/* Tab content */}
      {activeTab === ProfileTabs.VIDEOS && (
        <div>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold">Your Videos</h2>
            
            <div className="flex items-center space-x-2">
              <button
                className={`p-2 rounded-md ${
                  viewMode === ViewModes.GRID
                    ? 'bg-gray-200 dark:bg-gray-700'
                    : 'hover:bg-gray-100 dark:hover:bg-gray-800'
                }`}
                onClick={() => setViewMode(ViewModes.GRID)}
              >
                <Grid className="h-5 w-5" />
              </button>
              
              <button
                className={`p-2 rounded-md ${
                  viewMode === ViewModes.LIST
                    ? 'bg-gray-200 dark:bg-gray-700'
                    : 'hover:bg-gray-100 dark:hover:bg-gray-800'
                }`}
                onClick={() => setViewMode(ViewModes.LIST)}
              >
                <List className="h-5 w-5" />
              </button>
            </div>
          </div>
          
          {loading ? (
            viewMode === ViewModes.GRID ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="card animate-pulse">
                    <div className="h-40 bg-gray-300 dark:bg-gray-700"></div>
                    <div className="p-4 space-y-3">
                      <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-3/4"></div>
                      <div className="h-3 bg-gray-300 dark:bg-gray-700 rounded w-1/2"></div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="card p-4 animate-pulse">
                    <div className="flex items-center space-x-4">
                      <div className="h-20 w-32 bg-gray-300 dark:bg-gray-700 rounded"></div>
                      <div className="flex-1 space-y-3">
                        <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-3/4"></div>
                        <div className="h-3 bg-gray-300 dark:bg-gray-700 rounded w-1/2"></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )
          ) : userVideos.length === 0 ? (
            <div className="text-center py-12">
              <Film className="mx-auto h-12 w-12 text-gray-400 dark:text-gray-500" />
              <h3 className="mt-2 text-lg font-medium text-gray-900 dark:text-gray-100">No videos yet</h3>
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                You haven't uploaded any videos yet.
              </p>
              <div className="mt-6">
                <button
                  className="btn btn-primary"
                  onClick={() => navigate('/upload')}
                >
                  Upload Video
                </button>
              </div>
            </div>
          ) : viewMode === ViewModes.GRID ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {userVideos.map((video) => (
                <div key={video.id} className="card group">
                  <div className="relative aspect-video overflow-hidden">
                    <img 
                      src={video.thumbnailUrl} 
                      alt={video.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute bottom-2 right-2 bg-black bg-opacity-70 text-white text-xs px-1 rounded">
                      {formatDuration(video.duration)}
                    </div>
                  </div>
                  
                  <div className="p-4">
                    <div className="flex justify-between">
                      <h3 className="font-medium truncate" title={video.title}>
                        {video.title}
                      </h3>
                      
                      <div className="dropdown relative ml-2">
                        <button className="p-1 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800">
                          <MoreVertical className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                    
                    <div className="mt-1 flex items-center text-xs text-gray-500 dark:text-gray-400">
                      <span className="flex items-center gap-1">
                        <Eye className="h-3 w-3" />
                        {formatViews(video.views)} views
                      </span>
                      <span className="mx-2">•</span>
                      <span>{formatDate(video.uploadedAt)}</span>
                    </div>
                    
                    <div className="mt-3 flex gap-2">
                      <button 
                        className="btn btn-outline py-1 px-2 text-xs"
                        onClick={() => navigate(`/video/${video.id}`)}
                      >
                        View
                      </button>
                      <button className="btn btn-outline py-1 px-2 text-xs">
                        Edit
                      </button>
                      <button className="btn py-1 px-2 text-xs bg-red-100 dark:bg-red-900/20 text-red-600 dark:text-red-400 hover:bg-red-200">
                        <Trash2 className="h-3 w-3" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              {userVideos.map((video) => (
                <div key={video.id} className="card p-4">
                  <div className="flex flex-col sm:flex-row sm:items-center">
                    <div 
                      className="sm:flex-shrink-0 mb-4 sm:mb-0 sm:mr-4 cursor-pointer"
                      onClick={() => navigate(`/video/${video.id}`)}
                    >
                      <div className="relative aspect-video w-full sm:w-48 overflow-hidden rounded">
                        <img 
                          src={video.thumbnailUrl} 
                          alt={video.title}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute bottom-2 right-2 bg-black bg-opacity-70 text-white text-xs px-1 rounded">
                          {formatDuration(video.duration)}
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 
                            className="font-medium hover:text-indigo-600 dark:hover:text-indigo-400 cursor-pointer"
                            onClick={() => navigate(`/video/${video.id}`)}
                          >
                            {video.title}
                          </h3>
                          
                          <div className="mt-1 text-sm text-gray-500 dark:text-gray-400 line-clamp-2">
                            {video.description}
                          </div>
                          
                          <div className="mt-2 flex items-center text-xs text-gray-500 dark:text-gray-400">
                            <span className="flex items-center gap-1">
                              <Eye className="h-3 w-3" />
                              {formatViews(video.views)} views
                            </span>
                            <span className="mx-2">•</span>
                            <span>{formatDate(video.uploadedAt)}</span>
                            <span className="mx-2">•</span>
                            <span className="capitalize">{video.category}</span>
                          </div>
                        </div>
                        
                        <div className="dropdown relative">
                          <button className="p-1 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800">
                            <MoreVertical className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                      
                      <div className="mt-3 flex gap-2">
                        <button 
                          className="btn btn-outline py-1.5 px-3 text-sm"
                          onClick={() => navigate(`/video/${video.id}`)}
                        >
                          View
                        </button>
                        <button className="btn btn-outline py-1.5 px-3 text-sm">
                          Edit
                        </button>
                        <button className="btn py-1.5 px-3 text-sm bg-red-100 dark:bg-red-900/20 text-red-600 dark:text-red-400 hover:bg-red-200">
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
      
      {activeTab === ProfileTabs.SETTINGS && (
        <div className="space-y-8">
          <div className="card p-6">
            <h3 className="text-lg font-medium mb-4">Account Settings</h3>
            
            <div className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Full Name
                </label>
                <input
                  id="name"
                  type="text"
                  className="input"
                  defaultValue={user?.name || ''}
                  placeholder="Your name"
                />
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Email Address
                </label>
                <input
                  id="email"
                  type="email"
                  className="input"
                  defaultValue={user?.email || ''}
                  placeholder="your.email@example.com"
                />
              </div>
              
              <div>
                <button className="btn btn-primary">
                  Save Changes
                </button>
              </div>
            </div>
          </div>
          
          <div className="card p-6">
            <h3 className="text-lg font-medium mb-4">Password</h3>
            
            <div className="space-y-6">
              <div>
                <label htmlFor="current-password" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Current Password
                </label>
                <input
                  id="current-password"
                  type="password"
                  className="input"
                  placeholder="••••••••"
                />
              </div>
              
              <div>
                <label htmlFor="new-password" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  New Password
                </label>
                <input
                  id="new-password"
                  type="password"
                  className="input"
                  placeholder="••••••••"
                />
              </div>
              
              <div>
                <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Confirm New Password
                </label>
                <input
                  id="confirm-password"
                  type="password"
                  className="input"
                  placeholder="••••••••"
                />
              </div>
              
              <div>
                <button className="btn btn-primary">
                  Update Password
                </button>
              </div>
            </div>
          </div>
          
          <div className="card p-6">
            <h3 className="text-lg font-medium mb-4">Notification Preferences</h3>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Email Notifications</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Receive notifications about your videos
                  </p>
                </div>
                
                <div className="relative inline-block w-12 h-6 transition duration-200 ease-in-out">
                  <input 
                    type="checkbox" 
                    id="email-toggle"
                    className="w-0 h-0 opacity-0"
                    defaultChecked 
                  />
                  <label 
                    htmlFor="email-toggle"
                    className="block absolute left-0 w-12 h-6 rounded-full bg-gray-300 dark:bg-gray-600 cursor-pointer before:content-[''] before:absolute before:w-4 before:h-4 before:bg-white before:rounded-full before:left-1 before:top-1 before:transition-transform before:duration-200 
                    peer-checked:bg-indigo-600 peer-checked:before:transform peer-checked:before:translate-x-[24px]"
                  ></label>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Video Activity</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Receive updates about likes and comments
                  </p>
                </div>
                
                <div className="relative inline-block w-12 h-6 transition duration-200 ease-in-out">
                  <input 
                    type="checkbox" 
                    id="activity-toggle"
                    className="w-0 h-0 opacity-0"
                    defaultChecked 
                  />
                  <label 
                    htmlFor="activity-toggle"
                    className="block absolute left-0 w-12 h-6 rounded-full bg-gray-300 dark:bg-gray-600 cursor-pointer before:content-[''] before:absolute before:w-4 before:h-4 before:bg-white before:rounded-full before:left-1 before:top-1 before:transition-transform before:duration-200 
                    peer-checked:bg-indigo-600 peer-checked:before:transform peer-checked:before:translate-x-[24px]"
                  ></label>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Marketing Emails</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Receive tips, updates, and offers
                  </p>
                </div>
                
                <div className="relative inline-block w-12 h-6 transition duration-200 ease-in-out">
                  <input 
                    type="checkbox" 
                    id="marketing-toggle"
                    className="w-0 h-0 opacity-0"
                  />
                  <label 
                    htmlFor="marketing-toggle"
                    className="block absolute left-0 w-12 h-6 rounded-full bg-gray-300 dark:bg-gray-600 cursor-pointer before:content-[''] before:absolute before:w-4 before:h-4 before:bg-white before:rounded-full before:left-1 before:top-1 before:transition-transform before:duration-200 
                    peer-checked:bg-indigo-600 peer-checked:before:transform peer-checked:before:translate-x-[24px]"
                  ></label>
                </div>
              </div>
            </div>
          </div>
          
          <div className="card p-6 border border-red-300 dark:border-red-800">
            <h3 className="text-lg font-medium text-red-600 dark:text-red-400 mb-4">Danger Zone</h3>
            
            <p className="mb-4 text-gray-700 dark:text-gray-300">
              Once you delete your account, there is no going back. Please be certain.
            </p>
            
            <button className="btn bg-red-600 hover:bg-red-700 text-white">
              Delete Account
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;