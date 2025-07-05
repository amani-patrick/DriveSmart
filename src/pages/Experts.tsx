import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { mockExperts } from '@/utils/mockData';
import { Star, Play, MessageSquare, Calendar } from 'lucide-react';

const Experts = () => {
  return (
    <div className="min-h-screen py-8">
      <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold tracking-tight mb-4">Expert Hub</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Learn from certified driving instructors and traffic safety experts with years of real-world experience
          </p>
        </div>

        {/* Featured Expert */}
        <Card className="mb-12 overflow-hidden">
          <div className="bg-gradient-primary text-white p-8">
            <div className="flex flex-col md:flex-row items-center gap-6">
              <Avatar className="w-24 h-24 border-4 border-white">
                <AvatarImage src={mockExperts[0].avatar} alt={mockExperts[0].name} />
                <AvatarFallback className="text-2xl">{mockExperts[0].name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div className="text-center md:text-left">
                <Badge className="mb-2 bg-white/20 text-white border-white/30">Featured Expert</Badge>
                <h2 className="text-2xl font-bold mb-2">{mockExperts[0].name}</h2>
                <p className="text-lg mb-2">{mockExperts[0].title}</p>
                <div className="flex items-center justify-center md:justify-start gap-2 mb-4">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        className={`w-4 h-4 ${i < Math.floor(mockExperts[0].rating) ? 'fill-yellow-400 text-yellow-400' : 'text-white/50'}`} 
                      />
                    ))}
                  </div>
                  <span className="text-sm">({mockExperts[0].rating}/5.0)</span>
                </div>
                <p className="text-white/90 mb-4 max-w-2xl">{mockExperts[0].bio}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {mockExperts[0].specialties.map((specialty) => (
                    <Badge key={specialty} variant="outline" className="border-white/30 text-white">
                      {specialty}
                    </Badge>
                  ))}
                </div>
                <div className="flex flex-col sm:flex-row gap-3">
                  <Button className="bg-white text-primary hover:bg-white/90">
                    <Play className="w-4 h-4 mr-2" />
                    Watch Introduction
                  </Button>
                  <Button variant="outline" className="border-white text-white hover:bg-white/10">
                    <MessageSquare className="w-4 h-4 mr-2" />
                    Ask a Question
                  </Button>
                  <Button variant="outline" className="border-white text-white hover:bg-white/10">
                    <Calendar className="w-4 h-4 mr-2" />
                    Book Session
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* All Experts */}
        <div className="space-y-8">
          <h2 className="text-2xl font-bold">Meet Our Experts</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {mockExperts.map((expert) => (
              <Card key={expert.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start gap-4">
                    <Avatar className="w-16 h-16">
                      <AvatarImage src={expert.avatar} alt={expert.name} />
                      <AvatarFallback className="text-lg">{expert.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <CardTitle className="text-xl">{expert.name}</CardTitle>
                      <CardDescription className="text-base font-medium text-primary mb-2">
                        {expert.title}
                      </CardDescription>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                          <span>{expert.rating}</span>
                        </div>
                        <span>•</span>
                        <span>{expert.yearsExperience} years experience</span>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {expert.bio}
                  </p>
                  
                  <div>
                    <h4 className="font-semibold mb-2 text-sm">Specialties:</h4>
                    <div className="flex flex-wrap gap-2">
                      {expert.specialties.map((specialty) => (
                        <Badge key={specialty} variant="secondary" className="text-xs">
                          {specialty}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="flex gap-2 pt-2">
                    {expert.videoUrl && (
                      <Button size="sm" className="flex-1">
                        <Play className="w-3 h-3 mr-2" />
                        Watch Video
                      </Button>
                    )}
                    <Button size="sm" variant="outline" className="flex-1">
                      <MessageSquare className="w-3 h-3 mr-2" />
                      Contact
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Expert Features */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card className="text-center">
            <CardHeader>
              <div className="text-4xl mb-2">🎥</div>
              <CardTitle>Video Lessons</CardTitle>
              <CardDescription>
                Learn from expert-led video tutorials covering advanced driving techniques
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="outline" className="w-full">Browse Videos</Button>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardHeader>
              <div className="text-4xl mb-2">💬</div>
              <CardTitle>Q&A Sessions</CardTitle>
              <CardDescription>
                Get your driving questions answered by certified professionals
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="outline" className="w-full">Ask Questions</Button>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardHeader>
              <div className="text-4xl mb-2">📅</div>
              <CardTitle>1-on-1 Coaching</CardTitle>
              <CardDescription>
                Book personalized sessions with experts for tailored guidance
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="outline" className="w-full">Book Session</Button>
            </CardContent>
          </Card>
        </div>

        {/* Testimonials */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-center mb-8">What Students Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                name: "Alex Thompson",
                avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=faces",
                text: "Sarah's defensive driving course helped me become a much more confident driver. Her real-world examples were invaluable!",
                rating: 5
              },
              {
                name: "Maria Garcia",
                avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=faces",
                text: "Mike's expertise in traffic laws saved me from making costly mistakes. Highly recommend his Q&A sessions!",
                rating: 5
              },
              {
                name: "David Kim",
                avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=faces",
                text: "The 1-on-1 coaching session was exactly what I needed to improve my highway driving skills.",
                rating: 5
              }
            ].map((testimonial, index) => (
              <Card key={index}>
                <CardContent className="p-6">
                  <div className="flex mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-muted-foreground mb-4 italic">"{testimonial.text}"</p>
                  <div className="flex items-center gap-3">
                    <Avatar className="w-8 h-8">
                      <AvatarImage src={testimonial.avatar} alt={testimonial.name} />
                      <AvatarFallback>{testimonial.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-medium text-sm">{testimonial.name}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <Card className="mt-16 bg-gradient-primary text-white">
          <CardContent className="p-8 text-center">
            <h2 className="text-2xl font-bold mb-4">Ready to Learn from the Best?</h2>
            <p className="text-white/90 mb-6 max-w-2xl mx-auto">
              Join thousands of students who have improved their driving skills with guidance from our expert instructors.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="bg-white text-primary hover:bg-white/90">
                Start Learning Today
              </Button>
              <Button variant="outline" className="border-white text-white hover:bg-white/10">
                Schedule a Consultation
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Experts;