
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CheckIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";

const PricingPage = () => {
  const navigate = useNavigate();

  const plans = [
    {
      name: "Free",
      price: "$0",
      features: [
        "10 free prompts per month",
        "Basic prompt templates",
        "Community support",
      ],
      cta: "Get Started",
      highlighted: false
    },
    {
      name: "Pro",
      price: "$9.99",
      features: [
        "100 prompts per month",
        "Advanced prompt templates",
        "Priority support",
        "Custom prompt styles",
      ],
      cta: "Upgrade to Pro",
      highlighted: true
    },
    {
      name: "Enterprise",
      price: "$29.99",
      features: [
        "Unlimited prompts",
        "Custom AI models",
        "24/7 Priority support",
        "API access",
        "Team collaboration",
      ],
      cta: "Contact Sales",
      highlighted: false
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 p-6">
      <div className="max-w-7xl mx-auto space-y-8 py-12">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900">
            Choose Your Plan
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Start with 10 free prompts! Upgrade anytime to unlock more features and
            increased prompt generation capacity.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
          {plans.map((plan) => (
            <Card
              key={plan.name}
              className={`p-6 space-y-6 relative overflow-hidden ${
                plan.highlighted
                  ? "ring-2 ring-purple-500 shadow-lg scale-105"
                  : "bg-white/50 backdrop-blur-sm"
              }`}
            >
              {plan.highlighted && (
                <div className="absolute top-0 right-0 bg-purple-500 text-white px-4 py-1 rounded-bl-lg text-sm">
                  Most Popular
                </div>
              )}
              <div className="space-y-2">
                <h3 className="text-2xl font-bold text-gray-900">{plan.name}</h3>
                <p className="text-4xl font-bold text-gray-900">{plan.price}</p>
                <p className="text-gray-500">per month</p>
              </div>
              <ul className="space-y-4">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-2">
                    <CheckIcon className="h-5 w-5 text-green-500" />
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>
              <Button
                className={`w-full ${
                  plan.highlighted ? "bg-purple-500 hover:bg-purple-600" : ""
                }`}
                onClick={() => navigate("/billing")}
              >
                {plan.cta}
              </Button>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PricingPage;
