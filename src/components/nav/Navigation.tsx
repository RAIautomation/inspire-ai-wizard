
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import { useAuth } from "@/components/AuthProvider";

export const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user } = useAuth();

  const handleLogout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      toast({
        title: "Signed out successfully",
      });
      navigate("/");
    } catch (error: any) {
      toast({
        title: "Error signing out",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const navigateToPrompts = () => {
    navigate("/app");
  };

  return (
    <header className="fixed w-full bg-white/90 backdrop-blur-md border-b border-violet-100 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <Sparkles className="h-8 w-8 text-violet-600" />
              <span className="ml-2 text-xl font-bold bg-gradient-to-r from-violet-700 to-purple-600 bg-clip-text text-transparent">
                PromptWiz
              </span>
            </Link>
          </div>

          {/* Desktop navigation */}
          <nav className="hidden md:flex items-center space-x-4">
            {user ? (
              <>
                <Button
                  variant="ghost"
                  onClick={navigateToPrompts}
                  className="px-3 py-2 text-violet-900 hover:text-violet-700 hover:bg-violet-50 font-medium"
                >
                  Prompts
                </Button>
                <Link
                  to="/pricing"
                  className="px-3 py-2 text-violet-900 hover:text-violet-700 hover:bg-violet-50 font-medium"
                >
                  Pricing
                </Link>
                <Button
                  variant="outline"
                  onClick={handleLogout}
                  className="ml-4 border-violet-200 hover:bg-violet-50"
                >
                  Sign Out
                </Button>
              </>
            ) : (
              <>
                <Link
                  to="/pricing"
                  className="px-3 py-2 text-violet-900 hover:text-violet-700 hover:bg-violet-50 font-medium"
                >
                  Pricing
                </Link>
                <Link
                  to="/auth"
                  className="px-3 py-2 text-violet-900 hover:text-violet-700 hover:bg-violet-50 font-medium"
                >
                  Sign In
                </Link>
                <Button
                  onClick={() => navigate("/auth")}
                  className="bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700 text-white shadow-md hover:shadow-lg transition-all"
                >
                  Get Started
                </Button>
              </>
            )}
          </nav>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-violet-900 hover:text-violet-700 focus:outline-none"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white/95 shadow-lg rounded-b-lg">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {user ? (
              <>
                <Button
                  variant="ghost"
                  onClick={() => {
                    setIsMenuOpen(false);
                    navigateToPrompts();
                  }}
                  className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-violet-900 hover:bg-violet-50"
                >
                  Prompts
                </Button>
                <Link
                  to="/pricing"
                  className="block px-3 py-2 rounded-md text-base font-medium text-violet-900 hover:bg-violet-50"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Pricing
                </Link>
                <Button
                  variant="outline"
                  onClick={() => {
                    handleLogout();
                    setIsMenuOpen(false);
                  }}
                  className="w-full justify-center mt-3 border-violet-200"
                >
                  Sign Out
                </Button>
              </>
            ) : (
              <>
                <Link
                  to="/pricing"
                  className="block px-3 py-2 rounded-md text-base font-medium text-violet-900 hover:bg-violet-50"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Pricing
                </Link>
                <Link
                  to="/auth"
                  className="block px-3 py-2 rounded-md text-base font-medium text-violet-900 hover:bg-violet-50"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Sign In
                </Link>
                <Button
                  onClick={() => {
                    navigate("/auth");
                    setIsMenuOpen(false);
                  }}
                  className="w-full justify-center mt-3 bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700 text-white shadow-md"
                >
                  Get Started
                </Button>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
