
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CheckIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAuth } from "@/components/AuthProvider";

interface PricingPlan {
  name: string;
  price: string;
  currency: string;
  features: string[];
  cta: string;
  highlighted: boolean;
}

const PricingPage = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [userCurrency, setUserCurrency] = useState("USD");
  const [exchangeRates, setExchangeRates] = useState<Record<string, number>>({
    USD: 1,
    EUR: 0.92,
    GBP: 0.79,
    JPY: 152.54,
    CAD: 1.37,
    AUD: 1.53
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const detectUserCurrency = async () => {
      try {
        // Try to get user's country from IP geolocation
        const response = await fetch("https://ipapi.co/json/");
        const data = await response.json();
        
        // Map country to common currencies
        const countryCurrencyMap: Record<string, string> = {
          US: "USD",
          CA: "CAD",
          GB: "GBP",
          JP: "JPY",
          AU: "AUD",
          // EU countries
          DE: "EUR", FR: "EUR", IT: "EUR", ES: "EUR", NL: "EUR",
          BE: "EUR", AT: "EUR", IE: "EUR", FI: "EUR", PT: "EUR",
          GR: "EUR", LU: "EUR", SK: "EUR", SI: "EUR", CY: "EUR",
          EE: "EUR", LV: "EUR", LT: "EUR", MT: "EUR"
        };
        
        const currency = countryCurrencyMap[data.country_code] || "USD";
        setUserCurrency(currency);
      } catch (error) {
        // Fallback to USD if there's an error
        console.error("Error detecting user currency:", error);
        setUserCurrency("USD");
      } finally {
        setIsLoading(false);
      }
    };

    detectUserCurrency();
  }, []);

  const formatPrice = (basePrice: number): string => {
    const rate = exchangeRates[userCurrency] || 1;
    const convertedPrice = (basePrice * rate).toFixed(2);
    
    const currencySymbols: Record<string, string> = {
      USD: "$",
      EUR: "€",
      GBP: "£",
      JPY: "¥",
      CAD: "C$",
      AUD: "A$"
    };
    
    return `${currencySymbols[userCurrency] || "$"}${convertedPrice}`;
  };

  const getPricingPlans = (): PricingPlan[] => [
    {
      name: "Free",
      price: "0",
      currency: userCurrency,
      features: [
        "5 free prompts per month",
        "Basic prompt templates",
        "Community support",
      ],
      cta: "Get Started",
      highlighted: false
    },
    {
      name: "Bronze",
      price: formatPrice(5),
      currency: userCurrency,
      features: [
        "50 prompts per month",
        "Advanced prompt templates",
        "Priority support",
        "Custom prompt styles",
      ],
      cta: "Upgrade to Bronze",
      highlighted: true
    },
    {
      name: "Silver",
      price: formatPrice(15),
      currency: userCurrency,
      features: [
        "150 prompts per month",
        "Premium prompt templates",
        "24/7 Priority support",
        "API access",
        "Team collaboration",
      ],
      cta: "Upgrade to Silver",
      highlighted: false
    },
    {
      name: "Gold",
      price: formatPrice(35),
      currency: userCurrency,
      features: [
        "Unlimited prompts",
        "Custom AI models",
        "Dedicated account manager",
        "Advanced API access",
        "Enterprise collaboration",
        "Custom integrations"
      ],
      cta: "Upgrade to Gold",
      highlighted: false
    }
  ];

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-background to-secondary/30 p-6 flex items-center justify-center">
        <div className="animate-pulse flex space-x-4">
          <div className="rounded-full bg-muted h-12 w-12"></div>
          <div className="flex-1 space-y-4 py-1">
            <div className="h-4 bg-muted rounded w-3/4"></div>
            <div className="space-y-2">
              <div className="h-4 bg-muted rounded"></div>
              <div className="h-4 bg-muted rounded w-5/6"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const plans = getPricingPlans();

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/30 p-6">
      <div className="max-w-7xl mx-auto space-y-8 py-4">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold tracking-tight text-foreground">
            Choose Your Plan
          </h1>
          <p className="text-lg text-foreground/80 max-w-2xl mx-auto">
            Start with 5 free prompts! Upgrade anytime to unlock more features and
            increased prompt generation capacity.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-16">
          {plans.map((plan) => (
            <Card
              key={plan.name}
              className={`p-6 space-y-6 relative overflow-hidden ${
                plan.highlighted
                  ? "ring-2 ring-primary shadow-sm scale-105"
                  : "glass"
              }`}
            >
              {plan.highlighted && (
                <div className="absolute top-0 right-0 bg-primary text-white px-4 py-1 rounded-bl-lg text-sm">
                  Most Popular
                </div>
              )}
              <div className="space-y-2">
                <h3 className="text-2xl font-bold text-foreground">{plan.name}</h3>
                <p className="text-4xl font-bold text-foreground">{plan.price}</p>
                <p className="text-muted-foreground">per month</p>
              </div>
              <ul className="space-y-4">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-2">
                    <CheckIcon className="h-5 w-5 text-primary/80" />
                    <span className="text-foreground/80">{feature}</span>
                  </li>
                ))}
              </ul>
              <Button
                className={`w-full ${
                  plan.highlighted ? "bg-primary hover:bg-primary/90" : ""
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
