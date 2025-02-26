
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface HeroProps {
  onGetStarted: () => void;
}

export const Hero = ({ onGetStarted }: HeroProps) => {
  const navigate = useNavigate();
  
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto text-center space-y-8">
        <div className="space-y-4 animate-in fade-in-50">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight bg-gradient-to-r from-violet-700 to-violet-400 bg-clip-text text-transparent">
            Create Perfect AI Prompts
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Transform your ideas into powerful AI prompts. Our advanced prompt generator helps you craft the perfect instructions for any AI model, ensuring better results every time.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-in fade-in-50 [--animation-delay:200ms]">
          <Button
            size="lg"
            onClick={onGetStarted}
            className="bg-violet-600 hover:bg-violet-700 text-white px-8 py-6 text-lg"
          >
            Get Started
            <ArrowRight className="ml-2" />
          </Button>
          <Button
            size="lg"
            variant="outline"
            onClick={() => navigate('/pricing')}
            className="px-8 py-6 text-lg"
          >
            View Pricing
          </Button>
        </div>
      </div>
    </div>
  );
};
