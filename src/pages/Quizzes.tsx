import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { mockQuizzes } from '@/utils/mockData';
import { useToast } from '@/hooks/use-toast';
import { Clock, Trophy, CheckCircle } from 'lucide-react';

const Quizzes = () => {
  const [selectedQuiz, setSelectedQuiz] = useState<string | null>(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([]);
  const [timeLeft, setTimeLeft] = useState<number | null>(null);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const { toast } = useToast();

  const currentQuizData = selectedQuiz 
    ? mockQuizzes.find(q => q.id === selectedQuiz)
    : null;

  const score = selectedAnswers.reduce((acc, answer, index) => {
    if (currentQuizData?.questions[index] && answer === currentQuizData.questions[index].correctAnswer) {
      return acc + 1;
    }
    return acc;
  }, 0);

  const scorePercentage = currentQuizData 
    ? Math.round((score / currentQuizData.questions.length) * 100)
    : 0;

  // Timer effect
  useEffect(() => {
    if (timeLeft === null || timeLeft <= 0 || quizCompleted) return;

    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev === null || prev <= 1) {
          setQuizCompleted(true);
          setShowResults(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, quizCompleted]);

  const startQuiz = (quizId: string) => {
    const quiz = mockQuizzes.find(q => q.id === quizId);
    setSelectedQuiz(quizId);
    setCurrentQuestion(0);
    setSelectedAnswers([]);
    setTimeLeft(quiz?.timeLimit || null);
    setQuizCompleted(false);
    setShowResults(false);
    
    // TODO: API call to start quiz
    console.log('Start quiz API call:', { quizId });
  };

  const selectAnswer = (answerIndex: number) => {
    if (quizCompleted) return;
    
    const newAnswers = [...selectedAnswers];
    newAnswers[currentQuestion] = answerIndex;
    setSelectedAnswers(newAnswers);
    
    // TODO: API call to save answer
    console.log('Save answer API call:', {
      quizId: selectedQuiz,
      questionIndex: currentQuestion,
      answer: answerIndex
    });
  };

  const nextQuestion = () => {
    if (!currentQuizData) return;
    
    if (currentQuestion < currentQuizData.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setQuizCompleted(true);
      setShowResults(true);
      
      // TODO: API call to save final result
      console.log('Save quiz result API call:', {
        quizId: selectedQuiz,
        score,
        totalQuestions: currentQuizData.questions.length,
        answers: selectedAnswers
      });
    }
  };

  const resetQuiz = () => {
    setSelectedQuiz(null);
    setCurrentQuestion(0);
    setSelectedAnswers([]);
    setTimeLeft(null);
    setQuizCompleted(false);
    setShowResults(false);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  if (!selectedQuiz) {
    return (
      <div className="min-h-screen py-8">
        <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold tracking-tight mb-4">Knowledge Quizzes</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Test your understanding of traffic rules and road safety with our interactive quizzes
            </p>
          </div>

          {/* Quiz Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">Quizzes Completed</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-primary mb-2">12</div>
                <div className="text-sm text-muted-foreground">Total attempts</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">Average Score</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-success mb-2">87%</div>
                <div className="text-sm text-muted-foreground">Keep improving!</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">Best Streak</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-warning mb-2">5</div>
                <div className="text-sm text-muted-foreground">Perfect scores in a row</div>
              </CardContent>
            </Card>
          </div>

          {/* Available Quizzes */}
          <div className="space-y-6">
            <h2 className="text-2xl font-bold">Available Quizzes</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {mockQuizzes.map((quiz) => (
                <Card key={quiz.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-xl">{quiz.title}</CardTitle>
                      <Badge variant="outline">{quiz.category}</Badge>
                    </div>
                    <CardDescription>{quiz.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between text-sm text-muted-foreground">
                        <div className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4" />
                          <span>{quiz.questions.length} questions</span>
                        </div>
                        {quiz.timeLimit && (
                          <div className="flex items-center gap-2">
                            <Clock className="w-4 h-4" />
                            <span>{Math.floor(quiz.timeLimit / 60)} minutes</span>
                          </div>
                        )}
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span>Passing Score:</span>
                        <Badge variant="secondary">{quiz.passingScore}%</Badge>
                      </div>
                      <Button 
                        className="w-full" 
                        onClick={() => startQuiz(quiz.id)}
                      >
                        Start Quiz
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (showResults) {
    const passed = scorePercentage >= (currentQuizData?.passingScore || 80);
    
    return (
      <div className="min-h-screen py-8">
        <div className="container max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="text-center">
            <CardHeader>
              <div className="text-6xl mb-4">
                {passed ? '🎉' : '📚'}
              </div>
              <CardTitle className="text-2xl">
                {passed ? 'Congratulations!' : 'Keep Learning!'}
              </CardTitle>
              <CardDescription>
                You've completed the {currentQuizData?.title} quiz
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="text-center">
                <div className="text-4xl font-bold text-primary mb-2">
                  {scorePercentage}%
                </div>
                <div className="text-muted-foreground">
                  {score} out of {currentQuizData?.questions.length} correct
                </div>
              </div>

              <div className="flex justify-center">
                <Progress value={scorePercentage} className="w-64 h-3" />
              </div>

              <Alert className={passed ? 'border-success' : 'border-warning'}>
                <Trophy className="h-4 w-4" />
                <AlertDescription>
                  {passed 
                    ? `Excellent work! You passed with ${scorePercentage}% (required: ${currentQuizData?.passingScore}%)`
                    : `You need ${currentQuizData?.passingScore}% to pass. Review the material and try again!`
                  }
                </AlertDescription>
              </Alert>

              <div className="flex gap-4 justify-center">
                <Button onClick={resetQuiz} variant="outline">
                  Back to Quizzes
                </Button>
                <Button onClick={() => startQuiz(selectedQuiz)}>
                  Retake Quiz
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  const currentQuestionData = currentQuizData?.questions[currentQuestion];

  return (
    <div className="min-h-screen py-8">
      <div className="container max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Quiz Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold">{currentQuizData?.title}</h1>
            <p className="text-muted-foreground">
              Question {currentQuestion + 1} of {currentQuizData?.questions.length}
            </p>
          </div>
          <div className="flex items-center gap-4">
            {timeLeft !== null && (
              <div className="flex items-center gap-2 text-sm">
                <Clock className="w-4 h-4" />
                <span className={timeLeft < 60 ? 'text-destructive font-bold' : ''}>
                  {formatTime(timeLeft)}
                </span>
              </div>
            )}
            <Button variant="outline" onClick={resetQuiz}>
              Exit Quiz
            </Button>
          </div>
        </div>

        {/* Progress */}
        <div className="mb-8">
          <Progress 
            value={((currentQuestion + 1) / (currentQuizData?.questions.length || 1)) * 100} 
            className="h-2"
          />
        </div>

        {/* Question */}
        <Card>
          <CardHeader>
            <CardTitle className="text-xl">{currentQuestionData?.question}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {currentQuestionData?.image && (
              <div className="aspect-video rounded-lg overflow-hidden">
                <img 
                  src={currentQuestionData.image} 
                  alt="Question context"
                  className="w-full h-full object-cover"
                />
              </div>
            )}

            <RadioGroup 
              value={selectedAnswers[currentQuestion]?.toString() || ''} 
              onValueChange={(value) => selectAnswer(parseInt(value))}
            >
              <div className="space-y-3">
                {currentQuestionData?.options.map((option, index) => (
                  <div key={index} className="flex items-center space-x-3 p-4 rounded-lg border hover:bg-muted/50">
                    <RadioGroupItem value={index.toString()} id={`option-${index}`} />
                    <Label 
                      htmlFor={`option-${index}`} 
                      className="flex-1 cursor-pointer flex items-start space-x-3"
                    >
                      <div className="flex-shrink-0 w-6 h-6 rounded-full border border-current flex items-center justify-center text-xs font-bold">
                        {String.fromCharCode(65 + index)}
                      </div>
                      <div className="text-sm">{option}</div>
                    </Label>
                  </div>
                ))}
              </div>
            </RadioGroup>

            <div className="flex justify-between">
              <Button 
                variant="outline"
                disabled={currentQuestion === 0}
                onClick={() => setCurrentQuestion(currentQuestion - 1)}
              >
                Previous
              </Button>
              <Button 
                onClick={nextQuestion}
                disabled={selectedAnswers[currentQuestion] === undefined}
              >
                {currentQuestion === (currentQuizData?.questions.length || 1) - 1 ? 'Finish Quiz' : 'Next Question'}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Quizzes;