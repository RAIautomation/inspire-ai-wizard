
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles, Code2Icon } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface HeroProps {
  onGetStarted: () => void;
}

export const Hero = ({ onGetStarted }: HeroProps) => {
  const navigate = useNavigate();
  
  return (
    <div className="relative min-h-[85vh] flex items-center justify-center overflow-hidden">
      {/* Abstract shapes */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-primary/30 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-1/4 right-1/3 w-96 h-96 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>
      
      <div className="section-container">
        <div className="mx-auto max-w-3xl text-center space-y-10">
          <div className="space-y-6 animate-in fade-in-50">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-primary/10 text-primary mb-6">
              <Sparkles className="h-4 w-4 mr-2" />
              <span className="text-sm font-medium">Advanced AI Prompt Engineering</span>
            </div>
            
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight">
              <span className="text-foreground">Craft Perfect</span>
              <br />
              <span className="text-gradient">AI Prompts</span>
            </h1>
            
            <p className="text-xl text-foreground/70 max-w-2xl mx-auto">
              Transform your ideas into powerful AI instructions with our intelligent prompt generator. Get better results from any AI model by starting with the perfect prompt.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-5 justify-center items-center animate-in fade-in-50 [--animation-delay:200ms]">
            <Button
              size="lg"
              onClick={onGetStarted}
              className="button-highlight px-8 py-6 text-lg rounded-xl"
            >
              Get Started
              <ArrowRight className="ml-2" />
            </Button>
            
            <Button
              size="lg"
              variant="outline"
              onClick={() => navigate('/pricing')}
              className="px-8 py-6 text-lg bg-secondary/50 border-primary/10 hover:bg-secondary text-foreground rounded-xl"
            >
              View Pricing
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
