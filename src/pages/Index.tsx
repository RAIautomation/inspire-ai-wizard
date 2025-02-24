
import { useState, useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { CopyIcon, LogOutIcon, Wand2Icon, ClockIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const [topic, setTopic] = useState("");
  const [generatedPrompt, setGeneratedPrompt] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [promptHistory, setPromptHistory] = useState<any[]>([]);
  const [isLoadingHistory, setIsLoadingHistory] = useState(true);
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    fetchPromptHistory();
  }, []);

  const fetchPromptHistory = async () => {
    try {
      const { data, error } = await supabase
        .from('prompts')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setPromptHistory(data || []);
    } catch (error: any) {
      toast({
        title: "Error fetching prompt history",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsLoadingHistory(false);
    }
  };

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

      // Store the prompt in the database
      const { error: insertError } = await supabase
        .from('prompts')
        .insert([
          {
            topic,
            generated_prompt: data.generatedPrompt,
          }
        ]);

      if (insertError) throw insertError;

      // Refresh the prompt history
      await fetchPromptHistory();
      
      toast({
        title: "Prompt generated successfully!",
        description: "Your AI prompt is ready to use.",
      });
    } catch (error: any) {
      toast({
        title: "Error generating prompt",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
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

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
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
                  onClick={() => copyToClipboard(generatedPrompt)}
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

        {/* Prompt History Section */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <ClockIcon className="h-5 w-5 text-gray-600" />
            <h2 className="text-xl font-semibold text-gray-900">Your Prompt History</h2>
          </div>
          
          {isLoadingHistory ? (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-violet-500 mx-auto"></div>
            </div>
          ) : promptHistory.length === 0 ? (
            <Card className="p-6 text-center text-gray-500">
              No prompts generated yet. Try generating your first prompt above!
            </Card>
          ) : (
            <div className="space-y-4">
              {promptHistory.map((prompt) => (
                <Card key={prompt.id} className="p-4 hover:shadow-md transition-shadow">
                  <div className="space-y-3">
                    <div className="flex justify-between items-start">
                      <div className="space-y-1">
                        <h3 className="font-medium text-gray-900">{prompt.topic}</h3>
                        <p className="text-sm text-gray-500">{formatDate(prompt.created_at)}</p>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => copyToClipboard(prompt.generated_prompt)}
                        className="hover:bg-gray-100"
                      >
                        <CopyIcon className="h-4 w-4" />
                      </Button>
                    </div>
                    <p className="text-gray-700 whitespace-pre-wrap">{prompt.generated_prompt}</p>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Index;

