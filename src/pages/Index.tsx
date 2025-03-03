
import { useState, useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { PromptInput } from "@/components/prompt/PromptInput";
import { GeneratedPrompt } from "@/components/prompt/GeneratedPrompt";
import { PromptHistory } from "@/components/prompt/PromptHistory";
import { Hero } from "@/components/landing/Hero";
import { Features } from "@/components/landing/Features";

const Index = () => {
  const [generatedPrompt, setGeneratedPrompt] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [promptHistory, setPromptHistory] = useState<any[]>([]);
  const [isLoadingHistory, setIsLoadingHistory] = useState(true);
  const { toast } = useToast();
  const [showPromptInterface, setShowPromptInterface] = useState(false);

  useEffect(() => {
    fetchPromptHistory();
  }, []);

  const fetchPromptHistory = async () => {
    try {
      // Fetch all prompts without filtering by user_id
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

    if (isLoading) {
      toast({
        title: "Please wait",
        description: "A prompt is already being generated",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("You must be logged in to generate prompts");

      const { data, error } = await supabase.functions.invoke('generate-prompt', {
        body: { topic },
      });

      if (error) throw error;
      if (!data.generatedPrompt) throw new Error("No prompt was generated");
      
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

  const deletePrompt = async (id: string) => {
    try {
      const { error } = await supabase
        .from('prompts')
        .delete()
        .eq('id', id);

      if (error) throw error;

      // Update the local state to remove the deleted prompt
      setPromptHistory(promptHistory.filter(prompt => prompt.id !== id));
      
      toast({
        title: "Prompt deleted",
        description: "Your prompt has been successfully deleted.",
      });
    } catch (error: any) {
      toast({
        title: "Error deleting prompt",
        description: error.message,
        variant: "destructive",
      });
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
    <div className="min-h-screen bg-gradient-to-br from-violet-50 via-white to-violet-50">
      {!showPromptInterface ? (
        <>
          <Hero onGetStarted={() => setShowPromptInterface(true)} />
          <Features />
        </>
      ) : (
        <div className="p-6 sm:p-12">
          <div className="max-w-5xl mx-auto space-y-12">
            <div className="text-center space-y-4 animate-in fade-in-50">
              <h2 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-violet-700 to-purple-600 bg-clip-text text-transparent sm:text-4xl">
                Generate Your Prompt
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Enter your topic below and let our AI create the perfect prompt for you
              </p>
            </div>

            <div className="animate-in fade-in-50 [--animation-delay:200ms]">
              <PromptInput 
                onGeneratePrompt={generatePrompt}
                isLoading={isLoading}
              />
            </div>

            <div className="animate-in fade-in-50 [--animation-delay:400ms]">
              <GeneratedPrompt 
                prompt={generatedPrompt}
                onCopy={copyToClipboard}
              />
            </div>

            <div className="animate-in fade-in-50 [--animation-delay:600ms]">
              <PromptHistory 
                prompts={promptHistory}
                isLoading={isLoadingHistory}
                onCopy={copyToClipboard}
                onDelete={deletePrompt}
                formatDate={formatDate}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Index;
