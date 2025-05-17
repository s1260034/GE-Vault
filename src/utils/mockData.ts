import { Video } from '../types/Video';

// Mock creator data
const creator = {
  id: '1',
  name: 'Video Creator',
  avatar: 'https://i.pravatar.cc/150?img=11',
  subscribers: 1240,
};

// Mock videos data
const videos: Video[] = [
  {
    id: '1',
    title: 'Introduction to Web Development',
    description: 'Learn the basics of HTML, CSS, and JavaScript to start building websites. This comprehensive tutorial covers everything you need to know to get started with web development.\n\nTopics covered:\n- HTML structure\n- CSS styling\n- Basic JavaScript',
    thumbnailUrl: 'https://images.pexels.com/photos/270348/pexels-photo-270348.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    videoUrl: 'https://example.com/video1.mp4',
    duration: 560, // in seconds
    views: 15420,
    likes: 1250,
    uploadedAt: '2024-05-15T14:32:00Z',
    creator,
    category: 'education',
    tags: ['web development', 'programming', 'html', 'css', 'javascript'],
  },
  {
    id: '2',
    title: 'Advanced React Hooks Tutorial',
    description: 'Deep dive into React Hooks. Learn about useState, useEffect, useContext, and custom hooks to improve your React applications.',
    thumbnailUrl: 'https://images.pexels.com/photos/577585/pexels-photo-577585.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    videoUrl: 'https://example.com/video2.mp4',
    duration: 1240, // in seconds
    views: 8750,
    likes: 945,
    uploadedAt: '2024-05-10T09:15:00Z',
    creator,
    category: 'education',
    tags: ['react', 'javascript', 'programming', 'frontend'],
  },
  {
    id: '3',
    title: 'Building a Netflix Clone',
    description: 'Follow along as we build a Netflix clone using React, Firebase, and Tailwind CSS. Learn how to implement authentication, data fetching, and responsive design.',
    thumbnailUrl: 'https://images.pexels.com/photos/7587807/pexels-photo-7587807.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    videoUrl: 'https://example.com/video3.mp4',
    duration: 3600, // in seconds
    views: 24600,
    likes: 2100,
    uploadedAt: '2024-05-05T16:45:00Z',
    creator,
    category: 'technology',
    tags: ['react', 'firebase', 'tailwind', 'clone', 'project'],
  },
  {
    id: '4',
    title: 'Flutter vs React Native: 2023 Comparison',
    description: 'A detailed comparison between Flutter and React Native for mobile app development in 2023. Which one should you choose for your next project?',
    thumbnailUrl: 'https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    videoUrl: 'https://example.com/video4.mp4',
    duration: 1020, // in seconds
    views: 18300,
    likes: 1560,
    uploadedAt: '2024-04-28T11:20:00Z',
    creator,
    category: 'technology',
    tags: ['flutter', 'react native', 'mobile development', 'comparison'],
  },
  {
    id: '5',
    title: 'Machine Learning for Beginners',
    description: 'An introduction to machine learning concepts and algorithms. Learn about supervised and unsupervised learning, neural networks, and how to apply ML to real-world problems.',
    thumbnailUrl: 'https://images.pexels.com/photos/8438923/pexels-photo-8438923.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    videoUrl: 'https://example.com/video5.mp4',
    duration: 2400, // in seconds
    views: 32100,
    likes: 2800,
    uploadedAt: '2024-04-20T08:30:00Z',
    creator,
    category: 'education',
    tags: ['machine learning', 'AI', 'programming', 'data science'],
  },
  {
    id: '6',
    title: 'How to Build a Personal Brand as a Developer',
    description: 'Tips and strategies for building your personal brand as a software developer. Learn how to create content, network effectively, and stand out in the job market.',
    thumbnailUrl: 'https://images.pexels.com/photos/3861958/pexels-photo-3861958.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    videoUrl: 'https://example.com/video6.mp4',
    duration: 840, // in seconds
    views: 9500,
    likes: 1120,
    uploadedAt: '2024-04-15T15:10:00Z',
    creator,
    category: 'career',
    tags: ['personal brand', 'career', 'software development'],
  },
  {
    id: '7',
    title: 'Building a Full-Stack App with Node.js and React',
    description: 'Learn how to build a complete web application using Node.js for the backend and React for the frontend. We\'ll cover everything from setting up the project to deployment.',
    thumbnailUrl: 'https://images.pexels.com/photos/1181675/pexels-photo-1181675.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    videoUrl: 'https://example.com/video7.mp4',
    duration: 4800, // in seconds
    views: 27800,
    likes: 2350,
    uploadedAt: '2024-04-10T10:05:00Z',
    creator,
    category: 'technology',
    tags: ['node.js', 'react', 'full-stack', 'web development'],
  },
  {
    id: '8',
    title: 'CSS Grid and Flexbox Masterclass',
    description: 'Master modern CSS layout techniques with this comprehensive guide to CSS Grid and Flexbox. Learn how to create responsive layouts with ease.',
    thumbnailUrl: 'https://images.pexels.com/photos/270408/pexels-photo-270408.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    videoUrl: 'https://example.com/video8.mp4',
    duration: 1800, // in seconds
    views: 14200,
    likes: 1680,
    uploadedAt: '2024-04-05T14:40:00Z',
    creator,
    category: 'education',
    tags: ['css', 'web design', 'responsive', 'frontend'],
  },
];

// Function to get all mock videos
export const getMockVideos = (): Video[] => {
  return videos;
};

// Function to get a specific video by ID
export const getMockVideoById = (id?: string): Video | Video[] => {
  if (!id) {
    return videos;
  }
  
  const video = videos.find(v => v.id === id);
  return video || videos[0]; // Return first video as fallback
};