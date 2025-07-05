import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { mockLessons, mockCategories } from '@/utils/mockData';
import { Search } from 'lucide-react';

const Learn = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState('all');

  const filteredLessons = mockLessons.filter(lesson => {
    const matchesSearch = lesson.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         lesson.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || lesson.category.id === selectedCategory;
    const matchesDifficulty = selectedDifficulty === 'all' || lesson.difficulty === selectedDifficulty;
    
    return matchesSearch && matchesCategory && matchesDifficulty;
  });

  const completedLessons = mockLessons.filter(lesson => lesson.completed).length;
  const totalLessons = mockLessons.length;
  const progressPercentage = Math.round((completedLessons / totalLessons) * 100);

  return (
    <div className="min-h-screen py-8">
      <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold tracking-tight mb-4">Learn to Drive Smart</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Master traffic rules, road signs, and safe driving techniques with our comprehensive lessons
          </p>
        </div>

        {/* Progress Overview */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Your Learning Progress</CardTitle>
            <CardDescription>Track your journey to becoming a confident driver</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm font-medium">Overall Progress</span>
              <span className="text-sm text-muted-foreground">
                {completedLessons} of {totalLessons} lessons completed
              </span>
            </div>
            <Progress value={progressPercentage} className="h-3" />
            <div className="text-center mt-2 text-sm text-muted-foreground">
              {progressPercentage}% Complete
            </div>
          </CardContent>
        </Card>

        {/* Categories Grid */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Learning Categories</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mockCategories.map((category) => (
              <Card key={category.id} className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardHeader className="text-center">
                  <div className="text-4xl mb-2">{category.icon}</div>
                  <CardTitle className="text-lg">{category.name}</CardTitle>
                  <CardDescription className="text-sm">{category.description}</CardDescription>
                </CardHeader>
                <CardContent className="text-center">
                  <div className="flex items-center justify-between">
                    <Badge variant="secondary">{category.lessonCount} lessons</Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Filters and Search */}
        <div className="mb-8 space-y-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search lessons..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="All Categories" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {mockCategories.map((category) => (
                  <SelectItem key={category.id} value={category.id}>
                    {category.icon} {category.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={selectedDifficulty} onValueChange={setSelectedDifficulty}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="All Levels" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Levels</SelectItem>
                <SelectItem value="beginner">Beginner</SelectItem>
                <SelectItem value="intermediate">Intermediate</SelectItem>
                <SelectItem value="advanced">Advanced</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Lessons Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredLessons.map((lesson) => (
            <Card key={lesson.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="aspect-video relative overflow-hidden">
                <img 
                  src={lesson.thumbnail} 
                  alt={lesson.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 left-4">
                  <Badge variant={
                    lesson.difficulty === 'beginner' ? 'secondary' : 
                    lesson.difficulty === 'intermediate' ? 'default' : 
                    'destructive'
                  }>
                    {lesson.difficulty}
                  </Badge>
                </div>
                <div className="absolute top-4 right-4">
                  <Badge variant="outline" className="bg-background/80">
                    {lesson.duration}min
                  </Badge>
                </div>
                {lesson.completed && (
                  <div className="absolute bottom-4 right-4">
                    <div className="w-8 h-8 bg-success rounded-full flex items-center justify-center">
                      <span className="text-white text-sm">✓</span>
                    </div>
                  </div>
                )}
              </div>
              <CardHeader>
                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                  <span>{lesson.category.icon}</span>
                  <span>{lesson.category.name}</span>
                </div>
                <CardTitle className="text-lg">{lesson.title}</CardTitle>
                <CardDescription className="line-clamp-3">
                  {lesson.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                {lesson.progress !== undefined && lesson.progress > 0 ? (
                  <div className="space-y-4">
                    <div className="flex justify-between text-sm">
                      <span>Progress</span>
                      <span>{lesson.progress}%</span>
                    </div>
                    <Progress value={lesson.progress} className="h-2" />
                    <Link to={`/learn/${lesson.id}`}>
                      <Button className="w-full">
                        {lesson.completed ? 'Review Lesson' : 'Continue'}
                      </Button>
                    </Link>
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

        {filteredLessons.length === 0 && (
          <div className="text-center py-12">
            <div className="text-4xl mb-4">🔍</div>
            <h3 className="text-lg font-semibold mb-2">No lessons found</h3>
            <p className="text-muted-foreground">
              Try adjusting your search terms or filters to find more lessons.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Learn;