
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { LogOutIcon, CreditCard, FileText, CreditCardIcon, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";

export const Navigation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();

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
  );
};
