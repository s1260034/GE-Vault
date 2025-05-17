import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Play, Clock, ChevronRight, Upload, Activity } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { getMockVideos } from '../utils/mockData';
import VideoCard from '../components/VideoCard';
import { Video } from '../types/Video';

const Home = () => {
  const [recentVideos, setRecentVideos] = useState<Video[]>([]);
  const [trendingVideos, setTrendingVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // Simulating API call to get videos
    const loadVideos = async () => {
      try {
        setLoading(true);
        const allVideos = getMockVideos();
        
        // Sort by date for recent videos
        const recent = [...allVideos].sort((a, b) => 
          new Date(b.uploadedAt).getTime() - new Date(a.uploadedAt).getTime()
        ).slice(0, 6);
        
        // Sort by views for trending videos
        const trending = [...allVideos].sort((a, b) => b.views - a.views).slice(0, 6);
        
        setRecentVideos(recent);
        setTrendingVideos(trending);
      } catch (error) {
        console.error('Error loading videos:', error);
      } finally {
        setLoading(false);
      }
    };
    
    loadVideos();
  }, []);

  return (
    <div className="space-y-8">
      {/* Hero section */}
      <section className="relative rounded-xl overflow-hidden h-64 md:h-80">
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-purple-600 flex items-center">
          <div className="absolute inset-0 bg-black opacity-20"></div>
          <div className="relative z-10 px-6 md:px-10 max-w-2xl">
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Welcome back, {user?.name}
            </h1>
            <p className="text-white text-opacity-90 mb-6">
              Your personal video library awaits. Upload, organize, and watch your content anytime, anywhere.
            </p>
            <button 
              className="btn btn-primary flex items-center gap-2"
              onClick={() => navigate('/upload')}
            >
              <Upload className="h-5 w-5" />
              Upload New Video
            </button>
          </div>
        </div>
      </section>

      {/* Recent videos section */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold flex items-center gap-2">
            <Clock className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
            Recently Added
          </h2>
          <button className="text-sm text-indigo-600 dark:text-indigo-400 flex items-center gap-1 hover:underline">
            View all <ChevronRight className="h-4 w-4" />
          </button>
        </div>
        
        {loading ? (
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
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {recentVideos.map((video) => (
              <VideoCard key={video.id} video={video} />
            ))}
          </div>
        )}
      </section>

      {/* Trending videos section */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold flex items-center gap-2">
            <Activity className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
            Trending Now
          </h2>
          <button className="text-sm text-indigo-600 dark:text-indigo-400 flex items-center gap-1 hover:underline">
            View all <ChevronRight className="h-4 w-4" />
          </button>
        </div>
        
        {loading ? (
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
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {trendingVideos.map((video) => (
              <VideoCard key={video.id} video={video} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default Home;