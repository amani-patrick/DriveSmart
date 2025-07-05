import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { mockLessons, mockQuizzes, mockCategories } from '@/utils/mockData';
import { Plus, Edit, Trash2, Users, BookOpen, Target, TrendingUp, AlertCircle } from 'lucide-react';

const Admin = () => {
  const [selectedTab, setSelectedTab] = useState('dashboard');
  const [showAddLesson, setShowAddLesson] = useState(false);
  const [showAddQuiz, setShowAddQuiz] = useState(false);

  // Mock admin stats
  const adminStats = {
    totalUsers: 12567,
    totalLessons: mockLessons.length,
    totalQuizzes: mockQuizzes.length,
    avgCompletionRate: 73,
    activeUsers: 3245,
    newUsersThisWeek: 182
  };

  const recentActivity = [
    { action: 'New user registered', user: 'john.doe@example.com', time: '2 minutes ago' },
    { action: 'Lesson completed', user: 'sarah.wilson@example.com', time: '5 minutes ago' },
    { action: 'Quiz scored 100%', user: 'mike.chen@example.com', time: '12 minutes ago' },
    { action: 'New user registered', user: 'emma.brown@example.com', time: '18 minutes ago' },
    { action: 'Badge unlocked', user: 'alex.driver@example.com', time: '25 minutes ago' },
  ];

  return (
    <div className="min-h-screen py-8">
      <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold tracking-tight">Admin Panel</h1>
            <p className="text-muted-foreground">Manage lessons, quizzes, and monitor platform activity</p>
          </div>
          <Badge variant="outline" className="text-sm">
            🔒 Admin Access
          </Badge>
        </div>

        <Tabs value={selectedTab} onValueChange={setSelectedTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
            <TabsTrigger value="lessons">Lessons</TabsTrigger>
            <TabsTrigger value="quizzes">Quizzes</TabsTrigger>
            <TabsTrigger value="users">Users</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard" className="space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Users className="w-5 h-5 text-primary" />
                    Total Users
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-primary">{adminStats.totalUsers.toLocaleString()}</div>
                  <div className="text-sm text-muted-foreground">+{adminStats.newUsersThisWeek} this week</div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <BookOpen className="w-5 h-5 text-success" />
                    Total Lessons
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-success">{adminStats.totalLessons}</div>
                  <div className="text-sm text-muted-foreground">Across 6 categories</div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Target className="w-5 h-5 text-warning" />
                    Total Quizzes
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-warning">{adminStats.totalQuizzes}</div>
                  <div className="text-sm text-muted-foreground">Multiple difficulty levels</div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-destructive" />
                    Completion Rate
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-destructive">{adminStats.avgCompletionRate}%</div>
                  <div className="text-sm text-muted-foreground">Average across platform</div>
                </CardContent>
              </Card>
            </div>

            {/* Recent Activity */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                  <CardDescription>Latest user actions on the platform</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentActivity.map((activity, index) => (
                      <div key={index} className="flex items-center justify-between p-3 rounded-lg hover:bg-muted/50">
                        <div>
                          <div className="font-medium text-sm">{activity.action}</div>
                          <div className="text-xs text-muted-foreground">{activity.user}</div>
                        </div>
                        <div className="text-xs text-muted-foreground">{activity.time}</div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>System Health</CardTitle>
                  <CardDescription>Platform performance and alerts</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Server Status</span>
                    <Badge variant="secondary" className="text-success">Operational</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Database Performance</span>
                    <Badge variant="secondary" className="text-success">Good</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Active Users</span>
                    <span className="font-semibold">{adminStats.activeUsers.toLocaleString()}</span>
                  </div>
                  <Alert>
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>
                      All systems running normally. Last backup completed 2 hours ago.
                    </AlertDescription>
                  </Alert>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="lessons" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">Lesson Management</h2>
              <Button onClick={() => setShowAddLesson(true)}>
                <Plus className="w-4 h-4 mr-2" />
                Add New Lesson
              </Button>
            </div>

            {showAddLesson && (
              <Card>
                <CardHeader>
                  <CardTitle>Add New Lesson</CardTitle>
                  <CardDescription>Create a new lesson for students</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium mb-2 block">Lesson Title</label>
                      <Input placeholder="Enter lesson title..." />
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-2 block">Category</label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          {mockCategories.map((category) => (
                            <SelectItem key={category.id} value={category.id}>
                              {category.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-2 block">Difficulty</label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select difficulty" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="beginner">Beginner</SelectItem>
                          <SelectItem value="intermediate">Intermediate</SelectItem>
                          <SelectItem value="advanced">Advanced</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-2 block">Duration (minutes)</label>
                      <Input type="number" placeholder="15" />
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">Description</label>
                    <Textarea placeholder="Enter lesson description..." rows={3} />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">Content</label>
                    <Textarea placeholder="Enter lesson content..." rows={6} />
                  </div>
                  <div className="flex gap-3">
                    <Button>Create Lesson</Button>
                    <Button variant="outline" onClick={() => setShowAddLesson(false)}>Cancel</Button>
                  </div>
                </CardContent>
              </Card>
            )}

            <Card>
              <CardHeader>
                <CardTitle>Existing Lessons</CardTitle>
                <CardDescription>Manage your course content</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockLessons.map((lesson) => (
                    <div key={lesson.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <div className="font-medium">{lesson.title}</div>
                        <div className="text-sm text-muted-foreground">
                          {lesson.category.name} • {lesson.difficulty} • {lesson.duration}min
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant={lesson.completed ? "secondary" : "outline"}>
                          {lesson.completed ? "Published" : "Draft"}
                        </Badge>
                        <Button size="sm" variant="outline">
                          <Edit className="w-3 h-3" />
                        </Button>
                        <Button size="sm" variant="outline">
                          <Trash2 className="w-3 h-3" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="quizzes" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">Quiz Management</h2>
              <Button onClick={() => setShowAddQuiz(true)}>
                <Plus className="w-4 h-4 mr-2" />
                Add New Quiz
              </Button>
            </div>

            {showAddQuiz && (
              <Card>
                <CardHeader>
                  <CardTitle>Add New Quiz</CardTitle>
                  <CardDescription>Create a new quiz to test student knowledge</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium mb-2 block">Quiz Title</label>
                      <Input placeholder="Enter quiz title..." />
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-2 block">Category</label>
                      <Input placeholder="Traffic Rules, Road Signs, etc." />
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-2 block">Time Limit (seconds)</label>
                      <Input type="number" placeholder="300" />
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-2 block">Passing Score (%)</label>
                      <Input type="number" placeholder="80" />
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">Description</label>
                    <Textarea placeholder="Enter quiz description..." rows={3} />
                  </div>
                  <div className="flex gap-3">
                    <Button>Create Quiz</Button>
                    <Button variant="outline" onClick={() => setShowAddQuiz(false)}>Cancel</Button>
                  </div>
                </CardContent>
              </Card>
            )}

            <Card>
              <CardHeader>
                <CardTitle>Existing Quizzes</CardTitle>
                <CardDescription>Manage your quiz collection</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockQuizzes.map((quiz) => (
                    <div key={quiz.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <div className="font-medium">{quiz.title}</div>
                        <div className="text-sm text-muted-foreground">
                          {quiz.category} • {quiz.questions.length} questions • {quiz.passingScore}% to pass
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant="secondary">Active</Badge>
                        <Button size="sm" variant="outline">
                          <Edit className="w-3 h-3" />
                        </Button>
                        <Button size="sm" variant="outline">
                          <Trash2 className="w-3 h-3" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="users" className="space-y-6">
            <h2 className="text-2xl font-bold">User Management</h2>
            <Card>
              <CardHeader>
                <CardTitle>User Statistics</CardTitle>
                <CardDescription>Overview of platform users</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary">12,567</div>
                    <div className="text-sm text-muted-foreground">Total Users</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-success">3,245</div>
                    <div className="text-sm text-muted-foreground">Active This Month</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-warning">182</div>
                    <div className="text-sm text-muted-foreground">New This Week</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <h2 className="text-2xl font-bold">Analytics & Reports</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Learning Progress</CardTitle>
                  <CardDescription>Platform-wide completion rates</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-primary">73%</div>
                      <div className="text-sm text-muted-foreground">Average completion rate</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Popular Content</CardTitle>
                  <CardDescription>Most accessed lessons and quizzes</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {mockLessons.slice(0, 3).map((lesson, index) => (
                      <div key={lesson.id} className="flex justify-between items-center">
                        <span className="text-sm">{lesson.title}</span>
                        <Badge variant="outline">{1200 - (index * 200)} views</Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Admin;