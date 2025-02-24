
import { useState, useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { LogOutIcon } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { PromptInput } from "@/components/prompt/PromptInput";
import { GeneratedPrompt } from "@/components/prompt/GeneratedPrompt";
import { PromptHistory } from "@/components/prompt/PromptHistory";

const Index = () => {
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

  const generatePrompt = async (topic: string) => {
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
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("You must be logged in to generate prompts");

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

      const { error: insertError } = await supabase
        .from('prompts')
        .insert({
          topic,
          generated_prompt: data.generatedPrompt,
          user_id: user.id
        });

      if (insertError) throw insertError;

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

        <PromptInput 
          onGeneratePrompt={generatePrompt}
          isLoading={isLoading}
        />

        <GeneratedPrompt 
          prompt={generatedPrompt}
          onCopy={copyToClipboard}
        />

        <PromptHistory 
          prompts={promptHistory}
          isLoading={isLoadingHistory}
          onCopy={copyToClipboard}
          formatDate={formatDate}
        />
      </div>
    </div>
  );
};

export default Index;
