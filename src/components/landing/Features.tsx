
import { CircleCheckBig, HistoryIcon, Share2, Brain, Zap, ThumbsUp } from "lucide-react";

export const Features = () => {
  return (
    <div className="bg-white py-24">
      <div className="section-container">
        <div className="text-center mb-16 animate-in fade-in-50 [--animation-delay:300ms]">
          <h2 className="text-3xl font-bold text-foreground sm:text-4xl mb-4">
            Features that Elevate Your AI Experience
          </h2>
          <p className="text-xl text-foreground/70 max-w-3xl mx-auto">
            Our platform is designed to help you get the most out of AI through perfect prompt engineering.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
          <div className="flex flex-col p-8 rounded-2xl card-shadow transition-all duration-300 card-hover bg-card">
            <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center mb-6">
              <Brain className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-3 text-foreground">Intelligent Generation</h3>
            <p className="text-foreground/70 leading-relaxed">Advanced algorithms craft perfectly structured prompts that produce consistent, high-quality results from any AI model</p>
          </div>
          
          <div className="flex flex-col p-8 rounded-2xl card-shadow transition-all duration-300 card-hover bg-card">
            <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center mb-6">
              <Zap className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-3 text-foreground">Instant Results</h3>
            <p className="text-foreground/70 leading-relaxed">Get perfectly crafted prompts in seconds, saving hours of manual refinement and experimentation</p>
          </div>
          
          <div className="flex flex-col p-8 rounded-2xl card-shadow transition-all duration-300 card-hover bg-card">
            <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center mb-6">
              <HistoryIcon className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-3 text-foreground">Comprehensive History</h3>
            <p className="text-foreground/70 leading-relaxed">Every prompt you generate is automatically saved and organized for easy reference and reuse</p>
          </div>
          
          <div className="flex flex-col p-8 rounded-2xl card-shadow transition-all duration-300 card-hover bg-card">
            <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center mb-6">
              <ThumbsUp className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-3 text-foreground">Optimized Results</h3>
            <p className="text-foreground/70 leading-relaxed">Our prompts are designed to work across all major AI platforms, ensuring consistent quality no matter which model you use</p>
          </div>
          
          <div className="flex flex-col p-8 rounded-2xl card-shadow transition-all duration-300 card-hover bg-card">
            <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center mb-6">
              <CircleCheckBig className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-3 text-foreground">Context-Aware</h3>
            <p className="text-foreground/70 leading-relaxed">Our system understands the nuances of different use cases and tailors prompts to your specific needs</p>
          </div>
          
          <div className="flex flex-col p-8 rounded-2xl card-shadow transition-all duration-300 card-hover bg-card">
            <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center mb-6">
              <Share2 className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-3 text-foreground">Easy Sharing</h3>
            <p className="text-foreground/70 leading-relaxed">Copy and share your prompts with one click for seamless collaboration with your team</p>
          </div>
        </div>
      </div>
    </div>
  );
};
