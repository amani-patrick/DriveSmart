import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { mockUser, mockLessons } from '@/utils/mockData';
import { Calendar, Trophy, BookOpen, Target, Flame, Edit } from 'lucide-react';

const Profile = () => {
  const completedLessons = mockLessons.filter(lesson => lesson.completed);
  const inProgressLessons = mockLessons.filter(lesson => lesson.progress && lesson.progress > 0 && !lesson.completed);
  
  const recentActivity = [
    { type: 'lesson', title: 'Completed "Right of Way Basics"', date: '2 hours ago', points: 50 },
    { type: 'quiz', title: 'Scored 95% on Traffic Rules Quiz', date: '1 day ago', points: 100 },
    { type: 'badge', title: 'Earned "Quiz Master" badge', date: '3 days ago', points: 25 },
    { type: 'simulation', title: 'Mastered 4-Way Stop scenario', date: '5 days ago', points: 75 },
  ];

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'lesson': return <BookOpen className="w-4 h-4 text-primary" />;
      case 'quiz': return <Target className="w-4 h-4 text-success" />;
      case 'badge': return <Trophy className="w-4 h-4 text-warning" />;
      case 'simulation': return <Calendar className="w-4 h-4 text-destructive" />;
      default: return <BookOpen className="w-4 h-4" />;
    }
  };

  return (
    <div className="min-h-screen py-8">
      <div className="container max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Profile Header */}
        <div className="mb-8">
          <Card>
            <CardContent className="p-8">
              <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
                <div className="relative">
                  <Avatar className="w-24 h-24">
                    <AvatarImage src={mockUser.avatar} alt={mockUser.name} />
                    <AvatarFallback className="text-2xl">{mockUser.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <Button size="sm" variant="outline" className="absolute -bottom-2 -right-2 rounded-full w-8 h-8 p-0">
                    <Edit className="w-3 h-3" />
                  </Button>
                </div>
                
                <div className="text-center md:text-left flex-1">
                  <h1 className="text-3xl font-bold mb-2">{mockUser.name}</h1>
                  <p className="text-muted-foreground mb-4">{mockUser.email}</p>
                  
                  <div className="flex flex-wrap gap-4 justify-center md:justify-start">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-primary">Level {mockUser.level}</div>
                      <div className="text-sm text-muted-foreground">Current Level</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-success">{mockUser.totalPoints.toLocaleString()}</div>
                      <div className="text-sm text-muted-foreground">Total Points</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-warning flex items-center justify-center gap-1">
                        <Flame className="w-5 h-5" />
                        {mockUser.streakDays}
                      </div>
                      <div className="text-sm text-muted-foreground">Day Streak</div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="progress">Progress</TabsTrigger>
            <TabsTrigger value="badges">Badges</TabsTrigger>
            <TabsTrigger value="activity">Activity</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Learning Stats */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Learning Stats</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-sm">Lessons Completed</span>
                    <span className="font-semibold">{mockUser.lessonsCompleted}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Quizzes Completed</span>
                    <span className="font-semibold">{mockUser.quizzesCompleted}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Simulations Passed</span>
                    <span className="font-semibold">12</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Average Quiz Score</span>
                    <span className="font-semibold">87%</span>
                  </div>
                </CardContent>
              </Card>

              {/* Next Level Progress */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Level Progress</CardTitle>
                  <CardDescription>Progress to Level {mockUser.level + 1}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-primary mb-2">750</div>
                      <div className="text-sm text-muted-foreground">points needed</div>
                    </div>
                    <Progress value={72} className="h-3" />
                    <div className="text-center text-sm text-muted-foreground">
                      72% to next level
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Member Since */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Member Since</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary mb-2">
                      {new Date(mockUser.joinedDate).toLocaleDateString('en-US', { 
                        month: 'long', 
                        year: 'numeric' 
                      })}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {Math.floor((Date.now() - new Date(mockUser.joinedDate).getTime()) / (1000 * 60 * 60 * 24))} days ago
                    </div>
                  </div>
                  <div className="text-center">
                    <Badge variant="secondary">Dedicated Learner</Badge>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>Your latest learning achievements</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentActivity.map((activity, index) => (
                    <div key={index} className="flex items-center gap-4 p-3 rounded-lg hover:bg-muted/50">
                      {getActivityIcon(activity.type)}
                      <div className="flex-1">
                        <div className="font-medium text-sm">{activity.title}</div>
                        <div className="text-xs text-muted-foreground">{activity.date}</div>
                      </div>
                      <Badge variant="outline">+{activity.points} pts</Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="progress" className="space-y-6">
            {/* Overall Progress */}
            <Card>
              <CardHeader>
                <CardTitle>Learning Progress</CardTitle>
                <CardDescription>Track your completion across all categories</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="font-medium">Overall Completion</span>
                      <span className="text-sm text-muted-foreground">
                        {completedLessons.length} of {mockLessons.length} lessons
                      </span>
                    </div>
                    <Progress value={(completedLessons.length / mockLessons.length) * 100} className="h-3" />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <div className="flex justify-between mb-2">
                        <span className="text-sm">Traffic Rules</span>
                        <span className="text-sm text-muted-foreground">8/12</span>
                      </div>
                      <Progress value={67} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between mb-2">
                        <span className="text-sm">Road Signs</span>
                        <span className="text-sm text-muted-foreground">15/25</span>
                      </div>
                      <Progress value={60} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between mb-2">
                        <span className="text-sm">Safe Driving</span>
                        <span className="text-sm text-muted-foreground">12/18</span>
                      </div>
                      <Progress value={67} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between mb-2">
                        <span className="text-sm">Parking</span>
                        <span className="text-sm text-muted-foreground">3/8</span>
                      </div>
                      <Progress value={38} className="h-2" />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Current Lessons */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>In Progress</CardTitle>
                  <CardDescription>Lessons you're currently working on</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {inProgressLessons.map((lesson) => (
                      <div key={lesson.id} className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="font-medium">{lesson.title}</span>
                          <span className="text-muted-foreground">{lesson.progress}%</span>
                        </div>
                        <Progress value={lesson.progress || 0} className="h-2" />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Recently Completed</CardTitle>
                  <CardDescription>Your latest achievements</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {completedLessons.slice(0, 4).map((lesson) => (
                      <div key={lesson.id} className="flex items-center gap-3">
                        <div className="w-6 h-6 bg-success rounded-full flex items-center justify-center flex-shrink-0">
                          <span className="text-white text-xs">✓</span>
                        </div>
                        <div className="flex-1">
                          <div className="text-sm font-medium">{lesson.title}</div>
                          <div className="text-xs text-muted-foreground">{lesson.category.name}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="badges" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {mockUser.badges.map((badge) => (
                <Card key={badge.id} className="text-center">
                  <CardHeader>
                    <div className="text-4xl mb-2">{badge.icon}</div>
                    <CardTitle className="text-lg">{badge.name}</CardTitle>
                    <CardDescription>{badge.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Badge variant="secondary">
                      Earned {new Date(badge.unlockedAt || '').toLocaleDateString()}
                    </Badge>
                  </CardContent>
                </Card>
              ))}
              
              {/* Locked badges */}
              <Card className="text-center opacity-50">
                <CardHeader>
                  <div className="text-4xl mb-2 grayscale">🛑</div>
                  <CardTitle className="text-lg">Road Sign Expert</CardTitle>
                  <CardDescription>Master all road sign lessons</CardDescription>
                </CardHeader>
                <CardContent>
                  <Badge variant="outline">15/25 lessons</Badge>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="activity" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Activity Timeline</CardTitle>
                <CardDescription>Your complete learning history</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {recentActivity.concat([
                    { type: 'lesson', title: 'Started "Highway Driving Basics"', date: '1 week ago', points: 0 },
                    { type: 'quiz', title: 'Completed Road Signs Quiz', date: '1 week ago', points: 85 },
                    { type: 'badge', title: 'Earned "First Steps" badge', date: '2 weeks ago', points: 25 },
                  ]).map((activity, index) => (
                    <div key={index} className="flex items-start gap-4 p-4 rounded-lg border">
                      <div className="flex-shrink-0 mt-1">
                        {getActivityIcon(activity.type)}
                      </div>
                      <div className="flex-1">
                        <div className="font-medium">{activity.title}</div>
                        <div className="text-sm text-muted-foreground mt-1">{activity.date}</div>
                      </div>
                      {activity.points > 0 && (
                        <Badge variant="outline">+{activity.points} pts</Badge>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Profile;