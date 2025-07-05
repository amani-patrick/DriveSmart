import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { mockSimulations } from '@/utils/mockData';

const Simulations = () => {
  const [selectedSimulation, setSelectedSimulation] = useState<string | null>(null);
  const [selectedChoice, setSelectedChoice] = useState<string | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [completedSimulations, setCompletedSimulations] = useState<string[]>([]);

  const handleChoiceSelect = (choiceId: string) => {
    setSelectedChoice(choiceId);
    setShowFeedback(true);
    
    // TODO: API call to save simulation result
    console.log('Save simulation result API call:', {
      simulationId: selectedSimulation,
      choiceId,
      timestamp: new Date().toISOString()
    });
    
    // Mark simulation as completed after showing feedback
    setTimeout(() => {
      if (selectedSimulation && !completedSimulations.includes(selectedSimulation)) {
        setCompletedSimulations([...completedSimulations, selectedSimulation]);
      }
    }, 2000);
  };

  const resetSimulation = () => {
    setSelectedChoice(null);
    setShowFeedback(false);
  };

  const currentSimulation = selectedSimulation 
    ? mockSimulations.find(s => s.id === selectedSimulation)
    : null;

  const selectedChoiceData = currentSimulation && selectedChoice
    ? currentSimulation.choices.find(c => c.id === selectedChoice)
    : null;

  return (
    <div className="min-h-screen py-8">
      <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold tracking-tight mb-4">Driving Simulations</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Practice real-world driving scenarios in a safe, interactive environment
          </p>
        </div>

        {/* Progress Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">Simulations Completed</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-primary mb-2">
                {completedSimulations.length}
              </div>
              <div className="text-sm text-muted-foreground">
                of {mockSimulations.length} total
              </div>
              <Progress 
                value={(completedSimulations.length / mockSimulations.length) * 100} 
                className="mt-2 h-2" 
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">Success Rate</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-success mb-2">95%</div>
              <div className="text-sm text-muted-foreground">
                Average correct choices
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">Scenarios Mastered</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-warning mb-2">8</div>
              <div className="text-sm text-muted-foreground">
                Different traffic situations
              </div>
            </CardContent>
          </Card>
        </div>

        {!selectedSimulation ? (
          /* Simulation Selection */
          <div className="space-y-8">
            <h2 className="text-2xl font-bold">Choose a Simulation</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {mockSimulations.map((simulation) => (
                <Card 
                  key={simulation.id} 
                  className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
                  onClick={() => setSelectedSimulation(simulation.id)}
                >
                  <div className="aspect-video relative overflow-hidden">
                    <img 
                      src={simulation.image} 
                      alt={simulation.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-4 left-4">
                      <Badge variant={
                        simulation.difficulty === 'easy' ? 'secondary' : 
                        simulation.difficulty === 'medium' ? 'default' : 
                        'destructive'
                      }>
                        {simulation.difficulty}
                      </Badge>
                    </div>
                    {completedSimulations.includes(simulation.id) && (
                      <div className="absolute top-4 right-4">
                        <div className="w-8 h-8 bg-success rounded-full flex items-center justify-center">
                          <span className="text-white text-sm">✓</span>
                        </div>
                      </div>
                    )}
                  </div>
                  <CardHeader>
                    <CardTitle className="text-lg">{simulation.title}</CardTitle>
                    <CardDescription>{simulation.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button className="w-full">
                      {completedSimulations.includes(simulation.id) ? 'Practice Again' : 'Start Simulation'}
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        ) : (
          /* Active Simulation */
          <div className="space-y-8">
            <div className="flex items-center gap-4">
              <Button 
                variant="outline" 
                onClick={() => {
                  setSelectedSimulation(null);
                  resetSimulation();
                }}
              >
                ← Back to Simulations
              </Button>
              <Badge variant={
                currentSimulation?.difficulty === 'easy' ? 'secondary' : 
                currentSimulation?.difficulty === 'medium' ? 'default' : 
                'destructive'
              }>
                {currentSimulation?.difficulty}
              </Badge>
            </div>

            <Card className="overflow-hidden">
              <div className="aspect-video relative overflow-hidden">
                <img 
                  src={currentSimulation?.image} 
                  alt={currentSimulation?.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                  <div className="bg-white/90 backdrop-blur-sm rounded-lg p-6 max-w-md text-center">
                    <h3 className="text-lg font-semibold mb-2">Scenario</h3>
                    <p className="text-sm text-muted-foreground">
                      {currentSimulation?.scenario}
                    </p>
                  </div>
                </div>
              </div>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>{currentSimulation?.title}</CardTitle>
                <CardDescription>{currentSimulation?.description}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h4 className="font-semibold mb-4">What would you do in this situation?</h4>
                  <div className="space-y-3">
                    {currentSimulation?.choices.map((choice) => (
                      <Button
                        key={choice.id}
                        variant={
                          selectedChoice === choice.id 
                            ? (choice.isCorrect ? "default" : "destructive")
                            : "outline"
                        }
                        className="w-full justify-start text-left h-auto py-4 px-6"
                        onClick={() => !showFeedback && handleChoiceSelect(choice.id)}
                        disabled={showFeedback}
                      >
                        <div className="flex items-start space-x-3">
                          <div className="flex-shrink-0 w-6 h-6 rounded-full border border-current flex items-center justify-center text-xs font-bold">
                            {String.fromCharCode(65 + currentSimulation.choices.indexOf(choice))}
                          </div>
                          <div className="text-sm">{choice.text}</div>
                        </div>
                      </Button>
                    ))}
                  </div>
                </div>

                {showFeedback && selectedChoiceData && (
                  <Alert className={selectedChoiceData.isCorrect ? 'border-success' : 'border-destructive'}>
                    <AlertDescription>
                      <div className="font-medium mb-2">
                        {selectedChoiceData.isCorrect ? '✅ Correct!' : '❌ Incorrect'}
                      </div>
                      <div className="text-sm">
                        {selectedChoiceData.feedback}
                      </div>
                    </AlertDescription>
                  </Alert>
                )}

                {showFeedback && (
                  <div className="flex gap-4">
                    <Button onClick={resetSimulation} className="flex-1">
                      Try Again
                    </Button>
                    <Button 
                      variant="outline" 
                      onClick={() => {
                        setSelectedSimulation(null);
                        resetSimulation();
                      }}
                      className="flex-1"
                    >
                      Next Simulation
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        )}

        {/* Learning Tips */}
        <div className="mt-16">
          <Card>
            <CardHeader>
              <CardTitle>💡 Simulation Tips</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
                <div>
                  <h4 className="font-semibold mb-2">Before You Start:</h4>
                  <ul className="space-y-1 text-muted-foreground">
                    <li>• Take your time to analyze each scenario</li>
                    <li>• Consider all road users and conditions</li>
                    <li>• Think about traffic laws and safety first</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Learning from Mistakes:</h4>
                  <ul className="space-y-1 text-muted-foreground">
                    <li>• Read the feedback carefully</li>
                    <li>• Understand why certain choices are incorrect</li>
                    <li>• Practice similar scenarios multiple times</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Simulations;