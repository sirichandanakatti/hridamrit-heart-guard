import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Heart, Activity, Shield, AlertTriangle, Bell, TrendingUp } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();

  const stats = [
    {
      title: "Heart Rate",
      value: "72 bpm",
      icon: Heart,
      status: "normal",
      trend: "+2%"
    },
    {
      title: "Blood Pressure",
      value: "120/80",
      icon: Activity,
      status: "normal",
      trend: "stable"
    },
    {
      title: "Risk Level",
      value: "Low",
      icon: Shield,
      status: "good",
      trend: "-5%"
    },
    {
      title: "Alerts",
      value: "0",
      icon: Bell,
      status: "normal",
      trend: "none"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-medical-border bg-card">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
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
        {/* Welcome Section */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-2">Welcome back, John!</h2>
          <p className="text-muted-foreground">Here's your heart health overview</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <Card key={stat.title} className="shadow-medical border-medical-border hover:shadow-glow transition-smooth">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    {stat.title}
                  </CardTitle>
                  <Icon className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stat.value}</div>
                  <p className="text-xs text-muted-foreground flex items-center mt-1">
                    <TrendingUp className="w-3 h-3 mr-1 text-success" />
                    {stat.trend}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="shadow-medical border-medical-border hover:shadow-glow transition-smooth cursor-pointer" onClick={() => navigate("/precautions")}>
            <CardHeader>
              <Shield className="w-12 h-12 text-secondary mb-4" />
              <CardTitle>Precautions</CardTitle>
              <CardDescription>
                View personalized health precautions and preventive measures
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="secondary" className="w-full">
                View Precautions
              </Button>
            </CardContent>
          </Card>

          <Card className="shadow-medical border-medical-border hover:shadow-glow transition-smooth cursor-pointer" onClick={() => navigate("/recommendations")}>
            <CardHeader>
              <Heart className="w-12 h-12 text-primary mb-4" />
              <CardTitle>Recommendations</CardTitle>
              <CardDescription>
                Get AI-powered health recommendations based on your data
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="hero" className="w-full">
                View Recommendations
              </Button>
            </CardContent>
          </Card>

          <Card className="shadow-medical border-medical-border hover:shadow-glow transition-smooth cursor-pointer" onClick={() => navigate("/alerts")}>
            <CardHeader>
              <AlertTriangle className="w-12 h-12 text-warning mb-4" />
              <CardTitle>Alert System</CardTitle>
              <CardDescription>
                Configure SMS alerts for critical health conditions
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="outline" className="w-full">
                Manage Alerts
              </Button>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
