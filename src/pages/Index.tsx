
import { useState, useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { LogOutIcon, CreditCard, FileText, CreditCardIcon, Sparkles, ArrowRight } from "lucide-react";
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
  const [showPromptInterface, setShowPromptInterface] = useState(false);

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
    <div className="min-h-screen bg-gradient-to-br from-violet-50 via-white to-violet-50">
      {/* Navigation Bar */}
      <nav className="bg-white/80 backdrop-blur-md border-b border-violet-100 fixed w-full z-10 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <div className="flex-shrink-0 flex items-center">
                <Link to="/" className="text-xl font-bold text-violet-900 flex items-center gap-2 hover:opacity-80 transition-opacity">
                  <Sparkles className="h-6 w-6 text-violet-600" />
                  AI Prompt Generator
                </Link>
              </div>
              <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                <Link
                  to="/"
                  className={`${
                    location.pathname === '/'
                      ? 'border-violet-600 text-violet-900'
                      : 'border-transparent text-gray-500 hover:text-violet-700 hover:border-violet-300'
                  } inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium transition-colors`}
                >
                  <FileText className="h-4 w-4 mr-2" />
                  Prompts
                </Link>
                <Link
                  to="/pricing"
                  className={`${
                    location.pathname === '/pricing'
                      ? 'border-violet-600 text-violet-900'
                      : 'border-transparent text-gray-500 hover:text-violet-700 hover:border-violet-300'
                  } inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium transition-colors`}
                >
                  <CreditCardIcon className="h-4 w-4 mr-2" />
                  Pricing
                </Link>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Button
                variant="outline"
                className="flex items-center gap-2 bg-violet-50 hover:bg-violet-100 border-violet-200"
                onClick={() => navigate('/pricing')}
              >
                <CreditCard className="h-4 w-4" />
                Upgrade Plan
              </Button>
              <Button
                onClick={handleLogout}
                variant="outline"
                className="flex items-center gap-2 hover:bg-red-50 hover:text-red-600 hover:border-red-200"
              >
                <LogOutIcon className="h-4 w-4" />
                Sign Out
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="pt-16">
        {!showPromptInterface ? (
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
                  onClick={() => setShowPromptInterface(true)}
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
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16 animate-in fade-in-50 [--animation-delay:400ms]">
                <div className="p-6 rounded-xl bg-white shadow-sm border border-violet-100">
                  <h3 className="text-lg font-semibold text-violet-900 mb-2">Smart Generation</h3>
                  <p className="text-gray-600">Advanced AI algorithms create optimized prompts tailored to your needs</p>
                </div>
                <div className="p-6 rounded-xl bg-white shadow-sm border border-violet-100">
                  <h3 className="text-lg font-semibold text-violet-900 mb-2">History Tracking</h3>
                  <p className="text-gray-600">Keep track of all your generated prompts and reuse them anytime</p>
                </div>
                <div className="p-6 rounded-xl bg-white shadow-sm border border-violet-100">
                  <h3 className="text-lg font-semibold text-violet-900 mb-2">Easy Sharing</h3>
                  <p className="text-gray-600">Copy and share your prompts with one click</p>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="p-6 sm:p-12">
            <div className="max-w-5xl mx-auto space-y-12">
              <div className="text-center space-y-4 animate-in fade-in-50">
                <h2 className="text-3xl font-bold tracking-tight text-violet-900 sm:text-4xl">
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
                  formatDate={formatDate}
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;
