import { User, Badge, Lesson, LessonCategory, Quiz, QuizQuestion, Simulation, Expert, LeaderboardEntry } from '@/types';

// Mock Badges
export const mockBadges: Badge[] = [
  {
    id: '1',
    name: 'First Steps',
    description: 'Complete your first lesson',
    icon: '🚗',
    unlockedAt: '2024-01-15'
  },
  {
    id: '2',
    name: 'Quiz Master',
    description: 'Score 100% on 5 quizzes',
    icon: '🏆',
    unlockedAt: '2024-01-20'
  },
  {
    id: '3',
    name: 'Road Sign Expert',
    description: 'Master all road sign lessons',
    icon: '🛑',
  },
  {
    id: '4',
    name: 'Streak Keeper',
    description: 'Maintain a 7-day learning streak',
    icon: '🔥',
    unlockedAt: '2024-01-25'
  }
];

// Mock User
export const mockUser: User = {
  id: '1',
  name: 'Alex Driver',
  email: 'alex@example.com',
  avatar: 'https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=150&h=150&fit=crop&crop=faces',
  level: 12,
  totalPoints: 2450,
  badges: mockBadges.filter(b => b.unlockedAt),
  streakDays: 15,
  lessonsCompleted: 28,
  quizzesCompleted: 15,
  joinedDate: '2024-01-01'
};

// Mock Lesson Categories
export const mockCategories: LessonCategory[] = [
  {
    id: '1',
    name: 'Traffic Rules',
    description: 'Learn fundamental traffic laws and regulations',
    icon: '🚦',
    color: 'text-primary',
    lessonCount: 12
  },
  {
    id: '2',
    name: 'Road Signs',
    description: 'Master all types of road signs and their meanings',
    icon: '🛑',
    color: 'text-destructive',
    lessonCount: 25
  },
  {
    id: '3',
    name: 'Safe Driving',
    description: 'Best practices for defensive and safe driving',
    icon: '🛡️',
    color: 'text-success',
    lessonCount: 18
  },
  {
    id: '4',
    name: 'Parking',
    description: 'Perfect your parking skills in various scenarios',
    icon: '🅿️',
    color: 'text-warning',
    lessonCount: 8
  },
  {
    id: '5',
    name: 'Weather Conditions',
    description: 'Drive safely in rain, snow, and adverse weather',
    icon: '🌧️',
    color: 'text-muted-foreground',
    lessonCount: 10
  },
  {
    id: '6',
    name: 'Highway Driving',
    description: 'Master freeway merging, lane changes, and exits',
    icon: '🛣️',
    color: 'text-primary',
    lessonCount: 15
  }
];

// Mock Lessons
export const mockLessons: Lesson[] = [
  {
    id: '1',
    title: 'Right of Way Basics',
    description: 'Understanding who goes first at intersections and crosswalks',
    category: mockCategories[0],
    difficulty: 'beginner',
    duration: 15,
    thumbnail: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=400&h=300&fit=crop',
    content: 'Learn the fundamental rules of right of way...',
    completed: true,
    progress: 100
  },
  {
    id: '2',
    title: 'Stop Signs and Traffic Lights',
    description: 'How to properly navigate controlled intersections',
    category: mockCategories[1],
    difficulty: 'beginner',
    duration: 20,
    thumbnail: 'https://images.unsplash.com/photo-1502134249126-9f3755a50d78?w=400&h=300&fit=crop',
    content: 'Understanding traffic control devices...',
    completed: true,
    progress: 100
  },
  {
    id: '3',
    title: 'Defensive Driving Techniques',
    description: 'Anticipate and avoid potential hazards on the road',
    category: mockCategories[2],
    difficulty: 'intermediate',
    duration: 25,
    thumbnail: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=400&h=300&fit=crop',
    content: 'Master defensive driving strategies...',
    completed: false,
    progress: 60
  },
  {
    id: '4',
    title: 'Parallel Parking Mastery',
    description: 'Step-by-step guide to perfect parallel parking',
    category: mockCategories[3],
    difficulty: 'advanced',
    duration: 30,
    thumbnail: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop',
    content: 'Learn the art of parallel parking...',
    completed: false,
    progress: 0
  }
];

// Mock Quiz Questions
const mockQuizQuestions: QuizQuestion[] = [
  {
    id: '1',
    question: 'What should you do when approaching a yellow traffic light?',
    options: [
      'Speed up to get through',
      'Stop if it is safe to do so',
      'Always stop immediately',
      'Ignore it and continue'
    ],
    correctAnswer: 1,
    explanation: 'Yellow light means caution - stop if you can do so safely, otherwise proceed with care.',
    image: 'https://images.unsplash.com/photo-1502134249126-9f3755a50d78?w=300&h=200&fit=crop'
  },
  {
    id: '2',
    question: 'What does this road sign mean?',
    options: [
      'No parking',
      'Yield right of way',
      'Stop completely',
      'Speed limit 50'
    ],
    correctAnswer: 2,
    explanation: 'A red octagonal sign always means you must come to a complete stop.',
    image: 'https://images.unsplash.com/photo-1544724569-5f546fd6f2b5?w=300&h=200&fit=crop'
  }
];

// Mock Quizzes
export const mockQuizzes: Quiz[] = [
  {
    id: '1',
    title: 'Traffic Rules Basics',
    description: 'Test your knowledge of fundamental traffic rules',
    category: 'Traffic Rules',
    questions: mockQuizQuestions,
    timeLimit: 300,
    passingScore: 80
  },
  {
    id: '2',
    title: 'Road Signs Recognition',
    description: 'Identify common road signs and their meanings',
    category: 'Road Signs',
    questions: mockQuizQuestions.slice(1),
    timeLimit: 180,
    passingScore: 85
  }
];

// Mock Simulations
export const mockSimulations: Simulation[] = [
  {
    id: '1',
    title: '4-Way Stop Intersection',
    description: 'Navigate a busy 4-way stop with multiple vehicles',
    scenario: 'You arrive at a 4-way stop intersection at the same time as three other vehicles. What do you do?',
    image: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=600&h=400&fit=crop',
    difficulty: 'medium',
    choices: [
      {
        id: '1',
        text: 'Go first since I got there first',
        isCorrect: false,
        feedback: 'All vehicles arrived simultaneously, so different rules apply.'
      },
      {
        id: '2',
        text: 'Yield to the vehicle on my right',
        isCorrect: true,
        feedback: 'Correct! When all vehicles arrive simultaneously, yield to the vehicle on your right.'
      },
      {
        id: '3',
        text: 'Wait for someone else to go first',
        isCorrect: false,
        feedback: 'While cautious, this can create confusion and gridlock.'
      }
    ]
  }
];

// Mock Experts
export const mockExperts: Expert[] = [
  {
    id: '1',
    name: 'Sarah Johnson',
    title: 'Certified Driving Instructor',
    bio: 'With over 15 years of experience teaching defensive driving, Sarah has helped thousands of students become safer drivers.',
    avatar: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=200&h=200&fit=crop&crop=faces',
    specialties: ['Defensive Driving', 'Highway Safety', 'New Driver Training'],
    yearsExperience: 15,
    rating: 4.9,
    videoUrl: 'https://example.com/sarah-intro'
  },
  {
    id: '2',
    name: 'Mike Chen',
    title: 'Traffic Safety Expert',
    bio: 'Former traffic police officer turned educator, Mike brings real-world experience to traffic rule education.',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=faces',
    specialties: ['Traffic Laws', 'Road Signs', 'Intersection Safety'],
    yearsExperience: 12,
    rating: 4.8
  }
];

// Mock Leaderboard
export const mockLeaderboard: LeaderboardEntry[] = [
  {
    rank: 1,
    user: { id: '2', name: 'Emma Wilson', avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b5bc?w=150&h=150&fit=crop&crop=faces' },
    points: 3200,
    level: 18
  },
  {
    rank: 2,
    user: mockUser,
    points: 2450,
    level: 12
  },
  {
    rank: 3,
    user: { id: '3', name: 'James Rodriguez', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=faces' },
    points: 2100,
    level: 11
  },
  {
    rank: 4,
    user: { id: '4', name: 'Lisa Park', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=faces' },
    points: 1950,
    level: 10
  },
  {
    rank: 5,
    user: { id: '5', name: 'David Kim', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=faces' },
    points: 1800,
    level: 9
  }
];