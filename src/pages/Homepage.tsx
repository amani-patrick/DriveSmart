import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { mockLessons, mockUser, mockCategories } from '@/utils/mockData';
import { useAuth } from '@/contexts/AuthContext';
import CarAnimation from '@/components/CarAnimation';

const Homepage = () => {
  const { user } = useAuth();
  const featuredLessons = mockLessons.slice(0, 3);
  const topCategories = mockCategories.slice(0, 3);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-primary py-20 sm:py-32">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48Y2lyY2xlIGN4PSIzMCIgY3k9IjMwIiByPSI0Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-20"></div>
        <CarAnimation />
        <div className="container relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">
              Master the Road with
              <span className="block text-primary-glow">DriveSmart Academy</span>
            </h1>
            <p className="mt-6 text-lg leading-8 text-white/90 max-w-2xl mx-auto">
              Learn traffic rules, road signs, and safe driving techniques through interactive lessons, 
              realistic simulations, and expert guidance. Start your journey to becoming a confident driver today.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Link to="/learn">
                <Button size="lg" className="bg-white text-primary hover:bg-white/90 shadow-lg">
                  Start Learning
                </Button>
              </Link>
              <Link to="/simulations">
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                  Try Simulations
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-muted/30">
        <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-primary">50,000+</div>
              <div className="text-muted-foreground">Students Trained</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary">200+</div>
              <div className="text-muted-foreground">Interactive Lessons</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary">95%</div>
              <div className="text-muted-foreground">Pass Rate</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary">24/7</div>
              <div className="text-muted-foreground">Expert Support</div>
            </div>
          </div>
        </div>
      </section>

      {/* User Progress (if logged in) */}
      {user && (
        <section className="py-16">
          <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tight">Welcome back, {user.name}!</h2>
              <p className="mt-4 text-lg text-muted-foreground">Continue your learning journey</p>
            </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">Learning Progress</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span>Overall Progress</span>
                      <span>68%</span>
                    </div>
                    <Progress value={68} className="h-2" />
                  </div>
                    <div className="flex justify-between text-sm text-muted-foreground">
                      <span>{user.lessonsCompleted} lessons completed</span>
                      <span>Level {user.level}</span>
                    </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">Current Streak</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary mb-2">🔥</div>
                  <div className="text-2xl font-bold">{user.streakDays} Days</div>
                  <div className="text-sm text-muted-foreground">Keep it up!</div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">Total Points</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary mb-2">⭐</div>
                  <div className="text-2xl font-bold">{user.totalPoints.toLocaleString()}</div>
                  <div className="text-sm text-muted-foreground">Points earned</div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
      )}

      {/* Featured Lessons */}
      <section className="py-16 bg-muted/30">
        <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight">Featured Lessons</h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Start with these popular lessons recommended by our experts
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredLessons.map((lesson) => (
              <Card key={lesson.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="aspect-video relative overflow-hidden">
                  <img 
                    src={lesson.thumbnail} 
                    alt={lesson.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-4 left-4">
                    <Badge variant={lesson.difficulty === 'beginner' ? 'secondary' : lesson.difficulty === 'intermediate' ? 'default' : 'destructive'}>
                      {lesson.difficulty}
                    </Badge>
                  </div>
                  <div className="absolute top-4 right-4">
                    <Badge variant="outline" className="bg-background/80">
                      {lesson.duration}min
                    </Badge>
                  </div>
                </div>
                <CardHeader>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                    <span>{lesson.category.icon}</span>
                    <span>{lesson.category.name}</span>
                  </div>
                  <CardTitle className="text-xl">{lesson.title}</CardTitle>
                  <CardDescription className="line-clamp-2">
                    {lesson.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {lesson.progress ? (
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Progress</span>
                        <span>{lesson.progress}%</span>
                      </div>
                      <Progress value={lesson.progress} className="h-2" />
                    </div>
                  ) : (
                    <Link to={`/learn/${lesson.id}`}>
                      <Button className="w-full">Start Lesson</Button>
                    </Link>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link to="/learn">
              <Button size="lg" variant="outline">
                View All Lessons
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Learning Categories */}
      <section className="py-16">
        <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight">Learning Categories</h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Explore different aspects of safe driving
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {topCategories.map((category) => (
              <Link key={category.id} to="/learn" className="group">
                <Card className="text-center p-8 hover:shadow-lg transition-all group-hover:scale-105">
                  <div className="text-4xl mb-4">{category.icon}</div>
                  <CardTitle className="text-xl mb-2">{category.name}</CardTitle>
                  <CardDescription className="mb-4">{category.description}</CardDescription>
                  <Badge variant="secondary">{category.lessonCount} lessons</Badge>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-primary">
        <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold tracking-tight text-white mb-6">
            Ready to Become a Confident Driver?
          </h2>
          <p className="text-lg text-white/90 mb-8 max-w-2xl mx-auto">
            Join thousands of successful students who have mastered safe driving with our comprehensive curriculum.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/learn">
              <Button size="lg" className="bg-white text-primary hover:bg-white/90">
                Start Your Journey
              </Button>
            </Link>
            <Link to="/experts">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                Meet Our Experts
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Homepage;