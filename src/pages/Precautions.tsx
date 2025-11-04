import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Heart, ArrowLeft, Shield, Activity, Coffee, Moon, Dumbbell, Salad } from "lucide-react";
import { useNavigate } from "react-router-dom";
import precautionsIcon from "@/assets/precautions-icon.jpg";

const Precautions = () => {
  const navigate = useNavigate();

  const precautions = [
    {
      icon: Activity,
      title: "Regular Exercise",
      description: "Engage in at least 30 minutes of moderate aerobic activity daily",
      details: [
        "Walking, jogging, or cycling",
        "Swimming or water aerobics",
        "Yoga or stretching exercises",
        "Strength training 2-3 times per week"
      ],
      priority: "high"
    },
    {
      icon: Salad,
      title: "Healthy Diet",
      description: "Follow a heart-healthy Mediterranean-style diet",
      details: [
        "Eat more fruits and vegetables",
        "Choose whole grains over refined",
        "Limit saturated fats and trans fats",
        "Reduce sodium intake to less than 2,300mg/day"
      ],
      priority: "high"
    },
    {
      icon: Coffee,
      title: "Limit Stimulants",
      description: "Moderate consumption of caffeine and avoid excessive alcohol",
      details: [
        "Limit coffee to 2-3 cups per day",
        "Avoid energy drinks",
        "Maximum 1 drink per day (women) or 2 (men)",
        "Stay hydrated with water"
      ],
      priority: "medium"
    },
    {
      icon: Moon,
      title: "Quality Sleep",
      description: "Aim for 7-9 hours of quality sleep each night",
      details: [
        "Maintain consistent sleep schedule",
        "Create a relaxing bedtime routine",
        "Keep bedroom cool and dark",
        "Avoid screens 1 hour before bed"
      ],
      priority: "high"
    },
    {
      icon: Shield,
      title: "Stress Management",
      description: "Practice stress-reduction techniques regularly",
      details: [
        "Deep breathing exercises",
        "Meditation or mindfulness",
        "Regular social connections",
        "Professional counseling if needed"
      ],
      priority: "high"
    },
    {
      icon: Dumbbell,
      title: "Weight Management",
      description: "Maintain a healthy BMI between 18.5-24.9",
      details: [
        "Track your weight weekly",
        "Set realistic weight loss goals",
        "Combine diet and exercise",
        "Consult healthcare provider for guidance"
      ],
      priority: "medium"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-medical-border bg-card">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" onClick={() => navigate("/dashboard")}>
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <Heart className="w-8 h-8 text-primary" />
            <h1 className="text-2xl font-bold">Hridamrit</h1>
          </div>
          <Button variant="ghost" onClick={() => navigate("/")}>
            Logout
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="mb-12 text-center">
          <img 
            src={precautionsIcon} 
            alt="Precautions" 
            className="w-32 h-32 mx-auto mb-6 rounded-2xl shadow-medical"
          />
          <h2 className="text-4xl font-bold mb-4">Heart Health Precautions</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Follow these evidence-based preventive measures to reduce your risk of heart disease
          </p>
        </div>

        {/* Precautions Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {precautions.map((precaution, index) => {
            const Icon = precaution.icon;
            return (
              <Card 
                key={index} 
                className={`shadow-medical border-medical-border hover:shadow-glow transition-smooth ${
                  precaution.priority === 'high' ? 'border-l-4 border-l-primary' : ''
                }`}
              >
                <CardHeader>
                  <div className="flex items-start justify-between mb-4">
                    <div className="p-3 bg-primary/10 rounded-lg">
                      <Icon className="w-6 h-6 text-primary" />
                    </div>
                    {precaution.priority === 'high' && (
                      <span className="text-xs font-semibold bg-primary/20 text-primary px-2 py-1 rounded-full">
                        High Priority
                      </span>
                    )}
                  </div>
                  <CardTitle className="text-xl">{precaution.title}</CardTitle>
                  <CardDescription className="text-sm">
                    {precaution.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {precaution.details.map((detail, idx) => (
                      <li key={idx} className="flex items-start text-sm">
                        <span className="text-primary mr-2">•</span>
                        <span className="text-muted-foreground">{detail}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Emergency Notice */}
        <Card className="mt-12 bg-destructive/10 border-destructive shadow-medical">
          <CardHeader>
            <CardTitle className="text-destructive flex items-center gap-2">
              <Shield className="w-6 h-6" />
              Emergency Warning Signs
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4 font-semibold">Call emergency services immediately if you experience:</p>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {[
                "Chest pain or discomfort",
                "Shortness of breath",
                "Pain in arms, back, neck, or jaw",
                "Cold sweat or nausea",
                "Lightheadedness or dizziness",
                "Unusual fatigue"
              ].map((symptom, idx) => (
                <li key={idx} className="flex items-center text-sm">
                  <span className="text-destructive mr-2 text-xl">⚠</span>
                  {symptom}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default Precautions;
