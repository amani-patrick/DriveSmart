import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { mockLeaderboard, mockUser } from '@/utils/mockData';
import { Trophy, Medal, Award, Crown } from 'lucide-react';

const Leaderboard = () => {
  const [timeFilter, setTimeFilter] = useState('all-time');

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Crown className="w-6 h-6 text-yellow-500" />;
      case 2:
        return <Medal className="w-6 h-6 text-gray-400" />;
      case 3:
        return <Award className="w-6 h-6 text-amber-600" />;
      default:
        return <span className="text-lg font-bold text-muted-foreground">#{rank}</span>;
    }
  };

  const getRankColor = (rank: number) => {
    switch (rank) {
      case 1:
        return 'border-yellow-500 bg-yellow-50 dark:bg-yellow-950/20';
      case 2:
        return 'border-gray-400 bg-gray-50 dark:bg-gray-950/20';
      case 3:
        return 'border-amber-600 bg-amber-50 dark:bg-amber-950/20';
      default:
        return '';
    }
  };

  const userRank = mockLeaderboard.find(entry => entry.user.id === mockUser.id)?.rank || 0;

  return (
    <div className="min-h-screen py-8">
      <div className="container max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold tracking-tight mb-4">Leaderboard</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            See how you rank against other learners in the DriveSmart Academy community
          </p>
        </div>

        {/* User's Current Rank */}
        <Card className="mb-8 bg-gradient-primary text-white">
          <CardHeader>
            <CardTitle className="text-xl text-white">Your Current Standing</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <Avatar className="w-12 h-12">
                  <AvatarImage src={mockUser.avatar} alt={mockUser.name} />
                  <AvatarFallback>{mockUser.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <div className="font-semibold text-white">{mockUser.name}</div>
                  <div className="text-sm text-white/80">Level {mockUser.level}</div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-white">#{userRank}</div>
                <div className="text-sm text-white/80">{mockUser.totalPoints.toLocaleString()} points</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Tabs defaultValue="overall" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="overall">Overall</TabsTrigger>
            <TabsTrigger value="weekly">This Week</TabsTrigger>
            <TabsTrigger value="monthly">This Month</TabsTrigger>
          </TabsList>

          <TabsContent value="overall" className="space-y-6">
            {/* Top 3 Podium */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              {mockLeaderboard.slice(0, 3).map((entry) => (
                <Card 
                  key={entry.user.id} 
                  className={`relative overflow-hidden ${getRankColor(entry.rank)}`}
                >
                  <div className="absolute top-4 right-4">
                    {getRankIcon(entry.rank)}
                  </div>
                  <CardHeader className="text-center pb-2">
                    <Avatar className="w-20 h-20 mx-auto mb-4">
                      <AvatarImage src={entry.user.avatar} alt={entry.user.name} />
                      <AvatarFallback className="text-lg">{entry.user.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <CardTitle className="text-lg">{entry.user.name}</CardTitle>
                    <CardDescription>Level {entry.level}</CardDescription>
                  </CardHeader>
                  <CardContent className="text-center">
                    <div className="text-2xl font-bold text-primary mb-2">
                      {entry.points.toLocaleString()}
                    </div>
                    <div className="text-sm text-muted-foreground">points</div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Full Leaderboard */}
            <Card>
              <CardHeader>
                <CardTitle>Full Rankings</CardTitle>
                <CardDescription>All-time leaderboard rankings</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockLeaderboard.map((entry) => (
                    <div 
                      key={entry.user.id}
                      className={`flex items-center justify-between p-4 rounded-lg border ${
                        entry.user.id === mockUser.id ? 'bg-primary/5 border-primary' : 'hover:bg-muted/50'
                      }`}
                    >
                      <div className="flex items-center space-x-4">
                        <div className="w-8 flex justify-center">
                          {entry.rank <= 3 ? (
                            getRankIcon(entry.rank)
                          ) : (
                            <span className="text-lg font-bold text-muted-foreground">
                              {entry.rank}
                            </span>
                          )}
                        </div>
                        <Avatar className="w-10 h-10">
                          <AvatarImage src={entry.user.avatar} alt={entry.user.name} />
                          <AvatarFallback>{entry.user.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium">{entry.user.name}</div>
                          <div className="text-sm text-muted-foreground">Level {entry.level}</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-bold">{entry.points.toLocaleString()}</div>
                        <div className="text-sm text-muted-foreground">points</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="weekly" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>This Week's Top Performers</CardTitle>
                <CardDescription>Weekly rankings based on recent activity</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8 text-muted-foreground">
                  <Trophy className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p>Weekly rankings will be available soon!</p>
                  <p className="text-sm">Complete more lessons and quizzes to see your weekly progress.</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="monthly" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>This Month's Champions</CardTitle>
                <CardDescription>Monthly rankings and achievements</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8 text-muted-foreground">
                  <Trophy className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p>Monthly rankings will be available soon!</p>
                  <p className="text-sm">Keep learning to climb the monthly leaderboard!</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Achievement Badges */}
        <Card className="mt-12">
          <CardHeader>
            <CardTitle>Community Achievements</CardTitle>
            <CardDescription>Special badges earned by top performers</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center p-4 rounded-lg bg-muted/50">
                <div className="text-2xl mb-2">🏆</div>
                <div className="font-medium text-sm">Speed Learner</div>
                <div className="text-xs text-muted-foreground">Complete 10 lessons in a day</div>
              </div>
              <div className="text-center p-4 rounded-lg bg-muted/50">
                <div className="text-2xl mb-2">🎯</div>
                <div className="font-medium text-sm">Perfect Score</div>
                <div className="text-xs text-muted-foreground">100% on 5 consecutive quizzes</div>
              </div>
              <div className="text-center p-4 rounded-lg bg-muted/50">
                <div className="text-2xl mb-2">🔥</div>
                <div className="font-medium text-sm">Streak Master</div>
                <div className="text-xs text-muted-foreground">30-day learning streak</div>
              </div>
              <div className="text-center p-4 rounded-lg bg-muted/50">
                <div className="text-2xl mb-2">👑</div>
                <div className="font-medium text-sm">Knowledge King</div>
                <div className="text-xs text-muted-foreground">Top 3 for 30 days</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Leaderboard;