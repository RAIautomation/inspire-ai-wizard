
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ClockIcon, CopyIcon } from "lucide-react";

interface Prompt {
  id: string;
  topic: string;
  generated_prompt: string;
  created_at: string;
}

interface PromptHistoryProps {
  prompts: Prompt[];
  isLoading: boolean;
  onCopy: (text: string) => Promise<void>;
  formatDate: (date: string) => string;
}

export const PromptHistory = ({ prompts, isLoading, onCopy, formatDate }: PromptHistoryProps) => {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <ClockIcon className="h-5 w-5 text-gray-600" />
        <h2 className="text-xl font-semibold text-gray-900">Your Prompt History</h2>
      </div>
      
      {isLoading ? (
        <div className="text-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-violet-500 mx-auto"></div>
        </div>
      ) : prompts.length === 0 ? (
        <Card className="p-6 text-center text-gray-500">
          No prompts generated yet. Try generating your first prompt above!
        </Card>
      ) : (
        <div className="space-y-4">
          {prompts.map((prompt) => (
            <Card key={prompt.id} className="p-4 hover:shadow-md transition-shadow">
              <div className="space-y-3">
                <div className="flex justify-between items-start">
                  <div className="space-y-1">
                    <h3 className="font-medium text-gray-900">{prompt.topic}</h3>
                    <p className="text-sm text-gray-500">{formatDate(prompt.created_at)}</p>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => onCopy(prompt.generated_prompt)}
                    className="hover:bg-gray-100"
                  >
                    <CopyIcon className="h-4 w-4" />
                  </Button>
                </div>
                <p className="text-gray-700 whitespace-pre-wrap">{prompt.generated_prompt}</p>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};
