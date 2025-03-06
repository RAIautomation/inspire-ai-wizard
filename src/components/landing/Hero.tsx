
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface HeroProps {
  onGetStarted: () => void;
}

export const Hero = ({ onGetStarted }: HeroProps) => {
  const navigate = useNavigate();
  
  return (
    <div className="min-h-[85vh] flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-secondary/80 via-background to-secondary/50 z-0"></div>
      <div className="absolute top-20 left-10 w-72 h-72 bg-primary/5 rounded-full filter blur-3xl opacity-70"></div>
      <div className="absolute top-40 right-10 w-72 h-72 bg-secondary/40 rounded-full filter blur-3xl opacity-70"></div>
      
      <div className="max-w-4xl mx-auto text-center space-y-8 relative z-10">
        <div className="space-y-6 animate-in fade-in-50">
          <div className="inline-flex items-center px-3 py-1 rounded-full bg-primary/10 text-primary mb-4">
            <Sparkles className="h-4 w-4 mr-2" />
            <span className="text-sm font-medium">AI-Powered Prompt Engineering</span>
          </div>
          
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight">
            <span className="text-gradient">
              Create Perfect AI Prompts
            </span>
          </h1>
          
          <p className="text-xl text-foreground/80 max-w-2xl mx-auto">
            Transform your ideas into powerful AI prompts. Our advanced prompt generator helps you craft the perfect instructions for any AI model, ensuring better results every time.
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-5 justify-center items-center animate-in fade-in-50 [--animation-delay:200ms]">
          <Button
            size="lg"
            onClick={onGetStarted}
            className="bg-primary hover:bg-primary/90 text-white px-8 py-6 text-lg shadow-sm"
          >
            Get Started
            <ArrowRight className="ml-2" />
          </Button>
          
          <Button
            size="lg"
            variant="outline"
            onClick={() => navigate('/pricing')}
            className="px-8 py-6 text-lg hover:bg-primary/5 border-primary/20"
          >
            View Pricing
          </Button>
        </div>
      </div>
    </div>
  );
};
