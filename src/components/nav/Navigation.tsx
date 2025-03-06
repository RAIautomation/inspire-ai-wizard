
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
    setIsMenuOpen(false);
  };

  return (
    <header className="fixed w-full bg-background/80 backdrop-blur-md border-b border-border z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <Sparkles className="h-8 w-8 text-primary" />
              <span className="ml-2 text-xl font-bold text-gradient">
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
                  className="px-3 py-2 text-foreground hover:text-primary hover:bg-primary/5 font-medium"
                >
                  Prompts
                </Button>
                <Link
                  to="/pricing"
                  className="px-3 py-2 text-foreground hover:text-primary hover:bg-primary/5 font-medium"
                >
                  Pricing
                </Link>
                <Button
                  variant="outline"
                  onClick={handleLogout}
                  className="ml-4 border-primary/20 hover:bg-primary/5"
                >
                  Sign Out
                </Button>
              </>
            ) : (
              <>
                <Link
                  to="/pricing"
                  className="px-3 py-2 text-foreground hover:text-primary hover:bg-primary/5 font-medium"
                >
                  Pricing
                </Link>
                <Link
                  to="/auth"
                  className="px-3 py-2 text-foreground hover:text-primary hover:bg-primary/5 font-medium"
                >
                  Sign In
                </Link>
                <Button
                  onClick={() => navigate("/auth")}
                  className="bg-primary hover:bg-primary/90 text-white shadow-sm"
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
              className="inline-flex items-center justify-center p-2 rounded-md text-foreground hover:text-primary hover:bg-primary/5 focus:outline-none"
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
        <div className="md:hidden bg-background/95 shadow-lg rounded-b-lg">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {user ? (
              <>
                <Button
                  variant="ghost"
                  onClick={navigateToPrompts}
                  className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-foreground hover:bg-primary/5"
                >
                  Prompts
                </Button>
                <Link
                  to="/pricing"
                  className="block px-3 py-2 rounded-md text-base font-medium text-foreground hover:bg-primary/5"
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
                  className="w-full justify-center mt-3 border-primary/20"
                >
                  Sign Out
                </Button>
              </>
            ) : (
              <>
                <Link
                  to="/pricing"
                  className="block px-3 py-2 rounded-md text-base font-medium text-foreground hover:bg-primary/5"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Pricing
                </Link>
                <Link
                  to="/auth"
                  className="block px-3 py-2 rounded-md text-base font-medium text-foreground hover:bg-primary/5"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Sign In
                </Link>
                <Button
                  onClick={() => {
                    navigate("/auth");
                    setIsMenuOpen(false);
                  }}
                  className="w-full justify-center mt-3 bg-primary hover:bg-primary/90 text-white"
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
