
import { Hero } from "@/components/landing/Hero";
import { Features } from "@/components/landing/Features";
import { useNavigate } from "react-router-dom";

const Landing = () => {
  const navigate = useNavigate();
  
  const handleGetStarted = () => {
    navigate('/auth');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary">
      <Hero onGetStarted={handleGetStarted} />
      <Features />
    </div>
  );
};

export default Landing;
