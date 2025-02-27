
import { Hero } from "@/components/landing/Hero";
import { Features } from "@/components/landing/Features";
import { Navigation } from "@/components/nav/Navigation";
import { useNavigate } from "react-router-dom";

const Landing = () => {
  const navigate = useNavigate();
  
  const handleGetStarted = () => {
    navigate('/auth');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 via-white to-violet-50">
      <Navigation />
      <div className="pt-16">
        <Hero onGetStarted={handleGetStarted} />
        <Features />
      </div>
    </div>
  );
};

export default Landing;
