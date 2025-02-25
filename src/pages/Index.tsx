
import { useState, useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { LogOutIcon, CreditCard, Home, FileText, CreditCardIcon } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate, Link, useLocation } from "react-router-dom";
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
  const location = useLocation();

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
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      {/* Navigation Bar */}
      <nav className="bg-white border-b border-gray-200 fixed w-full z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <div className="flex-shrink-0 flex items-center">
                <Link to="/" className="text-xl font-bold text-gray-900 flex items-center gap-2">
                  <Home className="h-6 w-6" />
                  AI Prompt Generator
                </Link>
              </div>
              <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                <Link
                  to="/"
                  className={`${
                    location.pathname === '/'
                      ? 'border-primary text-gray-900'
                      : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                  } inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium`}
                >
                  <FileText className="h-4 w-4 mr-2" />
                  Prompts
                </Link>
                <Link
                  to="/pricing"
                  className={`${
                    location.pathname === '/pricing'
                      ? 'border-primary text-gray-900'
                      : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                  } inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium`}
                >
                  <CreditCardIcon className="h-4 w-4 mr-2" />
                  Pricing
                </Link>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Button
                variant="outline"
                className="flex items-center gap-2"
                onClick={() => navigate('/pricing')}
              >
                <CreditCard className="h-4 w-4" />
                Upgrade Plan
              </Button>
              <Button
                onClick={handleLogout}
                variant="outline"
                className="flex items-center gap-2"
              >
                <LogOutIcon className="h-4 w-4" />
                Sign Out
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="pt-16 p-6 sm:p-12">
        <div className="max-w-5xl mx-auto space-y-8">
          <div className="text-center space-y-4">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900">
              Transform Your Ideas
            </h1>
            <p className="text-lg text-gray-600">
              Generate powerful AI prompts tailored to your needs
            </p>
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
    </div>
  );
};

export default Index;
