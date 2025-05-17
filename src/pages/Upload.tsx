import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Upload as UploadIcon, X, Image, AlertCircle, Check } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

// Video category options
const categoryOptions = [
  { value: 'education', label: 'Education' },
  { value: 'entertainment', label: 'Entertainment' },
  { value: 'gaming', label: 'Gaming' },
  { value: 'music', label: 'Music' },
  { value: 'sports', label: 'Sports' },
  { value: 'technology', label: 'Technology' },
  { value: 'travel', label: 'Travel' },
  { value: 'other', label: 'Other' },
];

// Privacy options
const privacyOptions = [
  { value: 'private', label: 'Private' },
  { value: 'unlisted', label: 'Unlisted' },
  { value: 'public', label: 'Public' },
];

const Upload = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [privacy, setPrivacy] = useState('private');
  const [tags, setTags] = useState('');
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [thumbnailFile, setThumbnailFile] = useState<File | null>(null);
  const [thumbnailPreview, setThumbnailPreview] = useState<string | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadComplete, setUploadComplete] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const videoInputRef = useRef<HTMLInputElement>(null);
  const thumbnailInputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const { user } = useAuth();

  // Handle video file selection
  const handleVideoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      
      // Check if file is a video
      if (!selectedFile.type.startsWith('video/')) {
        setError('Please select a valid video file');
        return;
      }
      
      // Check file size (limit to 100MB for demo)
      if (selectedFile.size > 100 * 1024 * 1024) {
        setError('Video file size must be less than 100MB');
        return;
      }
      
      setVideoFile(selectedFile);
      setError(null);
      
      // Auto-generate title from filename if empty
      if (!title) {
        const fileName = selectedFile.name.replace(/\.[^/.]+$/, ""); // Remove extension
        setTitle(fileName);
      }
    }
  };

  // Handle thumbnail file selection
  const handleThumbnailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      
      // Check if file is an image
      if (!selectedFile.type.startsWith('image/')) {
        setError('Please select a valid image file for the thumbnail');
        return;
      }
      
      setThumbnailFile(selectedFile);
      setThumbnailPreview(URL.createObjectURL(selectedFile));
      setError(null);
    }
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    if (!title.trim()) {
      setError('Please enter a title');
      return;
    }
    
    if (!videoFile) {
      setError('Please select a video file');
      return;
    }
    
    try {
      setIsUploading(true);
      setError(null);
      
      // Simulate upload progress
      const interval = setInterval(() => {
        setUploadProgress((prev) => {
          const newProgress = prev + Math.floor(Math.random() * 10);
          if (newProgress >= 100) {
            clearInterval(interval);
            return 100;
          }
          return newProgress;
        });
      }, 300);
      
      // Simulate upload delay
      await new Promise((resolve) => setTimeout(resolve, 3000));
      
      clearInterval(interval);
      setUploadProgress(100);
      setUploadComplete(true);
      
      // Simulate processing delay
      await new Promise((resolve) => setTimeout(resolve, 1500));
      
      // In a real app, we would save the video data and get the ID
      const videoId = 'new-video-' + Date.now();
      
      navigate(`/video/${videoId}`);
    } catch (err) {
      setError('An error occurred during upload. Please try again.');
      setIsUploading(false);
    }
  };

  // Handle cancel upload
  const handleCancel = () => {
    if (isUploading) {
      // In a real app, we would cancel the upload request
      setIsUploading(false);
    }
    
    // Reset form
    setTitle('');
    setDescription('');
    setCategory('');
    setPrivacy('private');
    setTags('');
    setVideoFile(null);
    setThumbnailFile(null);
    setThumbnailPreview(null);
    setUploadProgress(0);
    setUploadComplete(false);
    setError(null);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Upload Video</h1>
      
      {error && (
        <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400 rounded-lg flex items-start gap-3">
          <AlertCircle className="h-5 w-5 flex-shrink-0 mt-0.5" />
          <p>{error}</p>
        </div>
      )}
      
      {isUploading ? (
        <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
          <div className="space-y-4">
            <h2 className="text-lg font-medium">
              {uploadComplete ? 'Upload Complete!' : 'Uploading Video...'}
            </h2>
            
            <div className="flex items-center gap-3">
              {videoFile && (
                <div className="flex-shrink-0 h-16 w-24 bg-gray-200 dark:bg-gray-700 rounded flex items-center justify-center">
                  <UploadIcon className="h-8 w-8 text-gray-400 dark:text-gray-500" />
                </div>
              )}
              
              <div className="flex-1 min-w-0">
                <p className="font-medium truncate">{videoFile?.name}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {Math.round((videoFile?.size || 0) / 1024 / 1024 * 10) / 10} MB
                </p>
              </div>
              
              {uploadComplete ? (
                <Check className="h-6 w-6 text-green-500" />
              ) : (
                <button 
                  className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                  onClick={handleCancel}
                >
                  <X className="h-5 w-5" />
                </button>
              )}
            </div>
            
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
              <div 
                className="bg-indigo-600 h-2.5 rounded-full transition-all duration-300 ease-out"
                style={{ width: `${uploadProgress}%` }}
              ></div>
            </div>
            
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {uploadComplete 
                ? 'Processing your video...' 
                : `Uploading: ${uploadProgress}%`}
            </p>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Video uploader */}
          <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-sm border-2 border-dashed border-gray-300 dark:border-gray-700">
            {!videoFile ? (
              <div 
                className="text-center py-10 cursor-pointer"
                onClick={() => videoInputRef.current?.click()}
              >
                <UploadIcon className="mx-auto h-12 w-12 text-gray-400 dark:text-gray-500" />
                <p className="mt-2 text-lg font-medium text-gray-900 dark:text-gray-100">
                  Select a video to upload
                </p>
                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                  MP4, WebM, or MOV. Max 100MB.
                </p>
                <button 
                  type="button"
                  className="mt-4 btn btn-primary"
                >
                  Select File
                </button>
              </div>
            ) : (
              <div className="py-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-medium">Selected Video</h3>
                  <button 
                    type="button"
                    className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                    onClick={() => setVideoFile(null)}
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>
                
                <div className="flex items-center gap-3">
                  <div className="flex-shrink-0 h-20 w-32 bg-gray-200 dark:bg-gray-700 rounded flex items-center justify-center">
                    <UploadIcon className="h-8 w-8 text-gray-400 dark:text-gray-500" />
                  </div>
                  
                  <div>
                    <p className="font-medium">{videoFile.name}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {Math.round(videoFile.size / 1024 / 1024 * 10) / 10} MB • {videoFile.type}
                    </p>
                  </div>
                </div>
              </div>
            )}
            
            <input
              ref={videoInputRef}
              type="file"
              accept="video/*"
              onChange={handleVideoChange}
              className="hidden"
            />
          </div>
          
          {/* Video details */}
          <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-sm space-y-6">
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Title <span className="text-red-500">*</span>
              </label>
              <input
                id="title"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="input"
                placeholder="Add a title that describes your video"
                required
              />
            </div>
            
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Description
              </label>
              <textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="input min-h-[120px]"
                placeholder="Tell viewers about your video"
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="category" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Category
                </label>
                <select
                  id="category"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="input"
                >
                  <option value="">Select a category</option>
                  {categoryOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
              
              <div>
                <label htmlFor="privacy" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Privacy
                </label>
                <select
                  id="privacy"
                  value={privacy}
                  onChange={(e) => setPrivacy(e.target.value)}
                  className="input"
                >
                  {privacyOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            
            <div>
              <label htmlFor="tags" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Tags
              </label>
              <input
                id="tags"
                type="text"
                value={tags}
                onChange={(e) => setTags(e.target.value)}
                className="input"
                placeholder="Add tags separated by commas"
              />
              <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                Tags help viewers find your video
              </p>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Thumbnail
              </label>
              
              <div className="flex items-start gap-4 flex-wrap">
                {thumbnailPreview ? (
                  <div className="relative group">
                    <img
                      src={thumbnailPreview}
                      alt="Thumbnail preview"
                      className="h-24 object-cover rounded border border-gray-300 dark:border-gray-700"
                    />
                    <button
                      type="button"
                      className="absolute top-1 right-1 p-1 bg-white dark:bg-gray-800 rounded-full shadow opacity-0 group-hover:opacity-100 transition-opacity"
                      onClick={() => {
                        setThumbnailFile(null);
                        setThumbnailPreview(null);
                      }}
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                ) : (
                  <div 
                    className="h-24 w-40 bg-gray-100 dark:bg-gray-800 border-2 border-dashed border-gray-300 dark:border-gray-700 rounded flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-750 transition-colors"
                    onClick={() => thumbnailInputRef.current?.click()}
                  >
                    <Image className="h-6 w-6 text-gray-400 dark:text-gray-500" />
                    <span className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                      Custom thumbnail
                    </span>
                  </div>
                )}
                
                <input
                  ref={thumbnailInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleThumbnailChange}
                  className="hidden"
                />
                
                <p className="text-sm text-gray-500 dark:text-gray-400 flex-1">
                  Select a custom thumbnail for your video. A good thumbnail stands out and draws viewers' attention.
                </p>
              </div>
            </div>
          </div>
          
          {/* Form actions */}
          <div className="flex justify-end space-x-4">
            <button
              type="button"
              className="btn btn-outline"
              onClick={handleCancel}
            >
              Cancel
            </button>
            
            <button
              type="submit"
              className="btn btn-primary flex items-center gap-2"
              disabled={!videoFile}
            >
              <UploadIcon className="h-5 w-5" />
              Upload
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default Upload;