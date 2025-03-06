
import { Hero } from "@/components/landing/Hero";
import { Features } from "@/components/landing/Features";
import { useNavigate } from "react-router-dom";

const Landing = () => {
  const navigate = useNavigate();
  
  const handleGetStarted = () => {
    navigate('/auth');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-secondary/50 via-background to-secondary/30">
      <Hero onGetStarted={handleGetStarted} />
      <Features />
    </div>
  );
};

export default Landing;
