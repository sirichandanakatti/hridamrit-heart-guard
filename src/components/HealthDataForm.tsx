import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Loader2, Activity } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

interface HealthDataFormProps {
  onPredictionComplete: (result: any) => void;
}

const HealthDataForm = ({ onPredictionComplete }: HealthDataFormProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    age: "",
    gender: "1",
    height: "",
    weight: "",
    systolic_bp: "",
    diastolic_bp: "",
    cholesterol: "1",
    glucose: "1",
    smoking: "0",
    alcohol: "0",
    physical_activity: "1"
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Prepare data for prediction
      const height_m = parseFloat(formData.height) / 100; // convert cm to meters
      const weight_kg = parseFloat(formData.weight);
      const bmi = weight_kg / (height_m * height_m);

      const predictionData = {
        age: parseInt(formData.age),
        gender: parseInt(formData.gender),
        height: height_m,
        weight: weight_kg,
        ap_hi: parseInt(formData.systolic_bp),
        ap_lo: parseInt(formData.diastolic_bp),
        cholesterol: parseInt(formData.cholesterol),
        gluc: parseInt(formData.glucose),
        smoke: parseInt(formData.smoking),
        alco: parseInt(formData.alcohol),
        active: parseInt(formData.physical_activity),
        bmi: bmi
      };

      // Call edge function to get prediction
      const { data: prediction, error } = await supabase.functions.invoke('predict-heart-risk', {
        body: predictionData
      });

      if (error) throw error;

      // Store prediction in database
      const { data: user } = await supabase.auth.getUser();
      if (user.user) {
        const { error: insertError } = await supabase
          .from('health_predictions')
          .insert({
            user_id: user.user.id,
            age: predictionData.age,
            gender: predictionData.gender,
            height: predictionData.height,
            weight: predictionData.weight,
            systolic_bp: predictionData.ap_hi,
            diastolic_bp: predictionData.ap_lo,
            cholesterol: predictionData.cholesterol,
            glucose: predictionData.gluc,
            smoking: predictionData.smoke,
            alcohol: predictionData.alco,
            physical_activity: predictionData.active,
            prediction_result: prediction.predicted_class === 1 ? "High Risk" : "Low Risk",
            risk_score: prediction.probability
          });

        if (insertError) throw insertError;
      }

      toast.success("Prediction completed successfully!");
      onPredictionComplete(prediction);
    } catch (error: any) {
      console.error("Prediction error:", error);
      toast.error(error.message || "Failed to get prediction. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="border-medical-border shadow-medical">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Activity className="w-6 h-6 text-primary" />
          Health Data Input
        </CardTitle>
        <CardDescription>
          Enter your health information for heart attack risk prediction
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="age">Age (years)</Label>
              <Input
                id="age"
                type="number"
                value={formData.age}
                onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                placeholder="30"
                required
                min="1"
                max="120"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="gender">Gender</Label>
              <Select value={formData.gender} onValueChange={(value) => setFormData({ ...formData, gender: value })}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">Male</SelectItem>
                  <SelectItem value="2">Female</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="height">Height (cm)</Label>
              <Input
                id="height"
                type="number"
                value={formData.height}
                onChange={(e) => setFormData({ ...formData, height: e.target.value })}
                placeholder="170"
                required
                min="50"
                max="250"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="weight">Weight (kg)</Label>
              <Input
                id="weight"
                type="number"
                value={formData.weight}
                onChange={(e) => setFormData({ ...formData, weight: e.target.value })}
                placeholder="70"
                required
                min="20"
                max="300"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="systolic_bp">Systolic BP (mmHg)</Label>
              <Input
                id="systolic_bp"
                type="number"
                value={formData.systolic_bp}
                onChange={(e) => setFormData({ ...formData, systolic_bp: e.target.value })}
                placeholder="120"
                required
                min="60"
                max="250"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="diastolic_bp">Diastolic BP (mmHg)</Label>
              <Input
                id="diastolic_bp"
                type="number"
                value={formData.diastolic_bp}
                onChange={(e) => setFormData({ ...formData, diastolic_bp: e.target.value })}
                placeholder="80"
                required
                min="40"
                max="150"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="cholesterol">Cholesterol Level</Label>
              <Select value={formData.cholesterol} onValueChange={(value) => setFormData({ ...formData, cholesterol: value })}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">Normal</SelectItem>
                  <SelectItem value="2">Above Normal</SelectItem>
                  <SelectItem value="3">Well Above Normal</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="glucose">Glucose Level</Label>
              <Select value={formData.glucose} onValueChange={(value) => setFormData({ ...formData, glucose: value })}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">Normal</SelectItem>
                  <SelectItem value="2">Above Normal</SelectItem>
                  <SelectItem value="3">Well Above Normal</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="smoking">Smoking Status</Label>
              <Select value={formData.smoking} onValueChange={(value) => setFormData({ ...formData, smoking: value })}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="0">No</SelectItem>
                  <SelectItem value="1">Yes</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="alcohol">Alcohol Consumption</Label>
              <Select value={formData.alcohol} onValueChange={(value) => setFormData({ ...formData, alcohol: value })}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="0">No</SelectItem>
                  <SelectItem value="1">Yes</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="physical_activity">Physical Activity</Label>
              <Select value={formData.physical_activity} onValueChange={(value) => setFormData({ ...formData, physical_activity: value })}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="0">No</SelectItem>
                  <SelectItem value="1">Yes</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <Button 
            type="submit" 
            className="w-full" 
            variant="hero"
            size="lg"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Analyzing...
              </>
            ) : (
              "Get Prediction"
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default HealthDataForm;
