
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Wand2Icon } from "lucide-react";

interface PromptInputProps {
  onGeneratePrompt: (topic: string) => Promise<void>;
  isLoading: boolean;
}

export const PromptInput = ({ onGeneratePrompt, isLoading }: PromptInputProps) => {
  const [topic, setTopic] = useState("");

  const handleSubmit = () => {
    onGeneratePrompt(topic);
  };

  return (
    <Card className="p-6 rounded-xl card-shadow">
      <div className="space-y-4">
        <Textarea
          placeholder="Enter your topic or idea (e.g., 'Create a business plan for a coffee shop')"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          className="min-h-[100px] resize-none text-lg rounded-xl input-field"
        />
        <Button
          onClick={handleSubmit}
          disabled={isLoading}
          className="w-full button-highlight rounded-xl py-6"
        >
          {isLoading ? (
            <div className="flex items-center space-x-2">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
              <span>Generating...</span>
            </div>
          ) : (
            <div className="flex items-center space-x-2">
              <Wand2Icon className="h-5 w-5" />
              <span>Generate Prompt</span>
            </div>
          )}
        </Button>
      </div>
    </Card>
  );
};
