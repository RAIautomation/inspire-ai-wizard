
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { CreditCard, Lock } from "lucide-react";

const BillingPage = () => {
  const [isProcessing, setIsProcessing] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    
    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      toast({
        title: "Payment processed successfully",
        description: "Your subscription has been updated.",
      });
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 p-6">
      <div className="max-w-3xl mx-auto space-y-8 py-4">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900">
            Payment Information
          </h1>
          <p className="text-lg text-gray-600">
            Securely process your payment to upgrade your account
          </p>
        </div>

        <Card className="p-6 space-y-6 bg-white/50 backdrop-blur-sm">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-900">
                  Card Number
                </label>
                <div className="relative">
                  <Input
                    type="text"
                    placeholder="4242 4242 4242 4242"
                    className="pl-10"
                  />
                  <CreditCard className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-900">
                    Expiry Date
                  </label>
                  <Input type="text" placeholder="MM/YY" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-900">
                    CVC
                  </label>
                  <Input type="text" placeholder="123" />
                </div>
              </div>
            </div>

            <div className="pt-4">
              <Button
                type="submit"
                className="w-full"
                disabled={isProcessing}
              >
                {isProcessing ? (
                  <span className="flex items-center gap-2">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    Processing...
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    <Lock className="h-4 w-4" />
                    Pay Securely
                  </span>
                )}
              </Button>
            </div>
          </form>

          <div className="text-center text-sm text-gray-500">
            <p className="flex items-center justify-center gap-2">
              <Lock className="h-4 w-4" />
              Your payment information is securely processed
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default BillingPage;
