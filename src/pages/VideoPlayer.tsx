import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  Play, Pause, Volume2, VolumeX, Maximize, ArrowLeft, 
  ThumbsUp, MessageSquare, Share2, Bookmark, Heart, MoreVertical 
} from 'lucide-react';
import { getMockVideoById } from '../utils/mockData';
import { formatDate, formatDuration, formatViews } from '../utils/formatters';
import { Video } from '../types/Video';
import VideoCard from '../components/VideoCard';

const VideoPlayer = () => {
  const { id } = useParams<{ id: string }>();
  const [video, setVideo] = useState<Video | null>(null);
  const [related, setRelated] = useState<Video[]>([]);
  const [loading, setLoading] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [showControls, setShowControls] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const playerRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const navigate = useNavigate();

  // Load video data
  useEffect(() => {
    const loadVideo = async () => {
      try {
        setLoading(true);
        if (!id) return;
        
        const videoData = getMockVideoById(id);
        if (!videoData) {
          navigate('/not-found');
          return;
        }
        
        setVideo(videoData);
        
        // Get related videos
        const allVideos = getMockVideoById();
        const filteredRelated = allVideos
          .filter(v => v.id !== id)
          .sort(() => Math.random() - 0.5)
          .slice(0, 4);
        
        setRelated(filteredRelated);
      } catch (error) {
        console.error('Error loading video:', error);
      } finally {
        setLoading(false);
      }
    };
    
    loadVideo();
  }, [id, navigate]);

  // Handle video control functions
  const togglePlay = () => {
    if (!videoRef.current) return;
    
    if (isPlaying) {
      videoRef.current.pause();
    } else {
      videoRef.current.play();
    }
    
    setIsPlaying(!isPlaying);
  };
  
  const toggleMute = () => {
    if (!videoRef.current) return;
    
    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };
  
  const toggleFullscreen = () => {
    if (!playerRef.current) return;
    
    if (!document.fullscreenElement) {
      playerRef.current.requestFullscreen().catch(err => {
        console.error(`Error attempting to enable fullscreen: ${err.message}`);
      });
    } else {
      document.exitFullscreen();
    }
  };
  
  // Update fullscreen state when it changes
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
    };
  }, []);
  
  // Handle time updates
  const handleTimeUpdate = () => {
    if (!videoRef.current) return;
    
    setCurrentTime(videoRef.current.currentTime);
  };
  
  const handleLoadedMetadata = () => {
    if (!videoRef.current) return;
    
    setDuration(videoRef.current.duration);
  };
  
  // Handle seeking
  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!videoRef.current) return;
    
    const newTime = parseFloat(e.target.value);
    videoRef.current.currentTime = newTime;
    setCurrentTime(newTime);
  };
  
  // Hide controls after inactivity
  const handleMouseMove = () => {
    setShowControls(true);
    
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    
    timeoutRef.current = setTimeout(() => {
      if (isPlaying) {
        setShowControls(false);
      }
    }, 3000);
  };
  
  // Clean up timeout on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col space-y-4 animate-pulse">
        <div className="aspect-video bg-gray-300 dark:bg-gray-700 rounded-lg"></div>
        <div className="h-8 bg-gray-300 dark:bg-gray-700 rounded w-1/3"></div>
        <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-full"></div>
        <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-2/3"></div>
      </div>
    );
  }

  if (!video) {
    return (
      <div className="text-center py-10">
        <p className="text-xl font-semibold text-gray-800 dark:text-gray-200">Video not found</p>
        <button 
          className="mt-4 btn btn-primary"
          onClick={() => navigate('/')}
        >
          Go back to home
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Video player */}
      <div 
        ref={playerRef}
        className={`relative bg-black rounded-lg overflow-hidden ${
          isFullscreen ? 'fixed inset-0 z-50' : 'aspect-video'
        }`}
        onMouseMove={handleMouseMove}
      >
        <video
          ref={videoRef}
          src={video.videoUrl}
          poster={video.thumbnailUrl}
          className="w-full h-full"
          onClick={togglePlay}
          onTimeUpdate={handleTimeUpdate}
          onLoadedMetadata={handleLoadedMetadata}
        ></video>
        
        {/* Video controls */}
        <div className={`absolute inset-0 flex flex-col justify-between p-4 bg-gradient-to-t from-black/60 to-transparent transition-opacity duration-300 ${
          showControls ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}>
          {/* Top controls */}
          <div className="flex items-center">
            <button 
              className="p-2 text-white rounded-full hover:bg-black/20"
              onClick={() => navigate(-1)}
            >
              <ArrowLeft className="h-6 w-6" />
            </button>
            <p className="ml-2 font-medium text-white">{video.title}</p>
          </div>
          
          {/* Middle play button */}
          <div className="absolute inset-0 flex items-center justify-center">
            {!isPlaying && (
              <button 
                className="p-5 bg-white/20 backdrop-blur-sm rounded-full text-white hover:bg-white/30 transition-colors"
                onClick={togglePlay}
              >
                <Play className="h-10 w-10 fill-white" />
              </button>
            )}
          </div>
          
          {/* Bottom controls */}
          <div className="space-y-2">
            {/* Progress bar */}
            <div className="flex items-center gap-3 text-white">
              <span className="text-sm">{formatDuration(currentTime)}</span>
              <input
                type="range"
                min="0"
                max={duration || 100}
                value={currentTime}
                onChange={handleSeek}
                className="w-full h-1.5 bg-white/30 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:appearance-none"
              />
              <span className="text-sm">{formatDuration(duration)}</span>
            </div>
            
            {/* Control buttons */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <button
                  className="p-2 text-white rounded-full hover:bg-black/20"
                  onClick={togglePlay}
                >
                  {isPlaying ? <Pause className="h-6 w-6" /> : <Play className="h-6 w-6" />}
                </button>
                
                <button
                  className="p-2 text-white rounded-full hover:bg-black/20"
                  onClick={toggleMute}
                >
                  {isMuted ? <VolumeX className="h-6 w-6" /> : <Volume2 className="h-6 w-6" />}
                </button>
              </div>
              
              <button
                className="p-2 text-white rounded-full hover:bg-black/20"
                onClick={toggleFullscreen}
              >
                <Maximize className="h-6 w-6" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Video info */}
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold">{video.title}</h1>
          
          <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-2 text-gray-500 dark:text-gray-400">
            <span className="flex items-center gap-1">
              <Eye className="h-4 w-4" />
              {formatViews(video.views)} views
            </span>
            <span className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              {formatDate(video.uploadedAt)}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              {formatDuration(video.duration)}
            </span>
          </div>
        </div>
        
        <div className="flex flex-wrap gap-3">
          <button className="btn btn-outline flex items-center gap-2">
            <ThumbsUp className="h-5 w-5" />
            <span>Like</span>
          </button>
          <button className="btn btn-outline flex items-center gap-2">
            <MessageSquare className="h-5 w-5" />
            <span>Comment</span>
          </button>
          <button className="btn btn-outline flex items-center gap-2">
            <Share2 className="h-5 w-5" />
            <span>Share</span>
          </button>
          <button className="btn btn-outline flex items-center gap-2">
            <Bookmark className="h-5 w-5" />
            <span>Save</span>
          </button>
        </div>
        
        {/* Description */}
        <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
          <div className="flex items-center gap-3 mb-3">
            <img 
              src={video.creator.avatar} 
              alt={video.creator.name} 
              className="h-10 w-10 rounded-full object-cover"
            />
            <div>
              <p className="font-medium">{video.creator.name}</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {video.creator.subscribers} subscribers
              </p>
            </div>
            <button className="ml-auto btn btn-primary flex items-center gap-2">
              <Heart className="h-5 w-5" />
              <span>Subscribe</span>
            </button>
          </div>
          
          <p className="text-gray-700 dark:text-gray-300 whitespace-pre-line">
            {video.description}
          </p>
        </div>
        
        {/* Related videos */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Related Videos</h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {related.map((relatedVideo) => (
              <VideoCard key={relatedVideo.id} video={relatedVideo} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoPlayer;