import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Clock, Eye } from 'lucide-react';
import { formatViews, formatDate, formatDuration } from '../utils/formatters';
import { Video } from '../types/Video';

interface VideoCardProps {
  video: Video;
}

const VideoCard: React.FC<VideoCardProps> = ({ video }) => {
  const navigate = useNavigate();
  
  const handleClick = () => {
    navigate(`/video/${video.id}`);
  };
  
  return (
    <div 
      className="card group cursor-pointer overflow-hidden"
      onClick={handleClick}
    >
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
        <div className="flex space-x-3">
          <img 
            src={video.creator.avatar}
            alt={video.creator.name}
            className="h-9 w-9 rounded-full object-cover flex-shrink-0"
          />
          
          <div>
            <h3 className="font-medium text-gray-900 dark:text-white line-clamp-2 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
              {video.title}
            </h3>
            
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              {video.creator.name}
            </p>
            
            <div className="mt-1 flex items-center text-xs text-gray-500 dark:text-gray-400 space-x-2">
              <span className="flex items-center">
                <Eye className="h-3 w-3 mr-1" />
                {formatViews(video.views)}
              </span>
              <span>•</span>
              <span>
                {formatDate(video.uploadedAt)}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoCard;