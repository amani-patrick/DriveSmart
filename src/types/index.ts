// DriveSmart Academy Types

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  level: number;
  totalPoints: number;
  badges: Badge[];
  streakDays: number;
  lessonsCompleted: number;
  quizzesCompleted: number;
  joinedDate: string;
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  unlockedAt?: string;
}

export interface Lesson {
  id: string;
  title: string;
  description: string;
  category: LessonCategory;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  duration: number; // in minutes
  thumbnail: string;
  content: string;
  completed?: boolean;
  progress?: number;
}

export interface LessonCategory {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
  lessonCount: number;
}

export interface Quiz {
  id: string;
  title: string;
  description: string;
  category: string;
  questions: QuizQuestion[];
  timeLimit?: number; // in seconds
  passingScore: number;
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  image?: string;
}

export interface QuizResult {
  quizId: string;
  score: number;
  totalQuestions: number;
  timeSpent: number;
  completedAt: string;
  answers: number[];
}

export interface Simulation {
  id: string;
  title: string;
  description: string;
  scenario: string;
  image: string;
  choices: SimulationChoice[];
  difficulty: 'easy' | 'medium' | 'hard';
}

export interface SimulationChoice {
  id: string;
  text: string;
  isCorrect: boolean;
  feedback: string;
}

export interface Expert {
  id: string;
  name: string;
  title: string;
  bio: string;
  avatar: string;
  specialties: string[];
  yearsExperience: number;
  rating: number;
  videoUrl?: string;
}

export interface LeaderboardEntry {
  rank: number;
  user: Pick<User, 'id' | 'name' | 'avatar'>;
  points: number;
  level: number;
}

export interface AdminStats {
  totalUsers: number;
  totalLessons: number;
  totalQuizzes: number;
  avgCompletionRate: number;
  popularLessons: Array<{
    lesson: Lesson;
    completions: number;
  }>;
}