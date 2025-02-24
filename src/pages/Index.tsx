
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { CopyIcon, LogOutIcon, Wand2Icon } from "lucide-react";
import { cn } from "@/lib/utils";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const [topic, setTopic] = useState("");
  const [generatedPrompt, setGeneratedPrompt] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const generatePrompt = async () => {
    if (!topic.trim()) {
      toast({
        title: "Please enter a topic",
        description: "The topic field cannot be empty",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch("https://lovable.dev/functions/v1/generate-prompt", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ topic }),
      });

      const data = await response.json();
      if (data.error) throw new Error(data.error);
      
      setGeneratedPrompt(data.generatedPrompt);
      toast({
        title: "Prompt generated successfully!",
        description: "Your AI prompt is ready to use.",
      });
    } catch (error) {
      toast({
        title: "Error generating prompt",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(generatedPrompt);
      toast({
        title: "Copied to clipboard",
        description: "Your prompt has been copied successfully!",
      });
    } catch (error) {
      toast({
        title: "Failed to copy",
        description: "Please try copying manually",
        variant: "destructive",
      });
    }
  };

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      navigate("/auth");
    } catch (error: any) {
      toast({
        title: "Error signing out",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 p-6 sm:p-12">
      <div className="max-w-3xl mx-auto space-y-8">
        <div className="flex justify-between items-center">
          <div className="text-center space-y-4">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900">
              AI Prompt Generator
            </h1>
            <p className="text-lg text-gray-600">
              Transform your ideas into powerful AI prompts
            </p>
          </div>
          <Button
            onClick={handleLogout}
            variant="outline"
            className="flex items-center gap-2"
          >
            <LogOutIcon className="h-4 w-4" />
            Sign Out
          </Button>
        </div>

        <Card className="p-6 backdrop-blur-sm bg-white/80 border border-gray-200">
          <div className="space-y-4">
            <Textarea
              placeholder="Enter your topic or idea (e.g., 'Create a business plan for a coffee shop')"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              className="min-h-[100px] resize-none text-lg"
            />
            <Button
              onClick={generatePrompt}
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-violet-500 to-violet-600 hover:from-violet-600 hover:to-violet-700 text-white transition-all duration-300"
            >
              {isLoading ? (
                <div className="flex items-center space-x-2">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  <span>Generating...</span>
                </div>
              ) : (
                <div className="flex items-center space-x-2">
                  <Wand2Icon className="h-5 w-5" />
                  <span>Generate Prompt</span>
                </div>
              )}
            </Button>
          </div>
        </Card>

        {generatedPrompt && (
          <Card className={cn(
            "p-6 backdrop-blur-sm bg-white/80 border border-gray-200",
            "animate-in fade-in-50 duration-500"
          )}>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold text-gray-900">
                  Generated Prompt
                </h2>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={copyToClipboard}
                  className="hover:bg-gray-100"
                >
                  <CopyIcon className="h-4 w-4" />
                </Button>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg text-gray-800 whitespace-pre-wrap">
                {generatedPrompt}
              </div>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
};

export default Index;
