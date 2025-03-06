
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ClockIcon, CopyIcon, TrashIcon } from "lucide-react";

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
  onDelete: (id: string) => Promise<void>;
  formatDate: (date: string) => string;
}

export const PromptHistory = ({ prompts, isLoading, onCopy, onDelete, formatDate }: PromptHistoryProps) => {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <ClockIcon className="h-5 w-5 text-violet-600" />
        <h2 className="text-xl font-semibold bg-gradient-to-r from-violet-700 to-purple-600 bg-clip-text text-transparent">Prompt History</h2>
      </div>
      
      {isLoading ? (
        <div className="text-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-violet-500 mx-auto"></div>
        </div>
      ) : prompts.length === 0 ? (
        <Card className="p-6 text-center text-gray-500 border border-violet-100 bg-white/80 backdrop-blur-sm">
          No prompts generated yet. Try generating your first prompt above!
        </Card>
      ) : (
        <ScrollArea className="h-[400px] rounded-lg border border-violet-100 bg-white/80 backdrop-blur-sm">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
            {prompts.map((prompt) => (
              <Card 
                key={prompt.id} 
                className="flex flex-col hover:shadow-md transition-shadow border border-violet-100 bg-gradient-to-br from-white to-violet-50"
              >
                <div className="p-4 space-y-3 flex-1">
                  <div className="flex justify-between items-start">
                    <div className="space-y-1 flex-1">
                      <h3 className="font-medium text-violet-900">Topic</h3>
                      <p className="text-sm text-gray-700">{prompt.topic}</p>
                    </div>
                    <div className="flex space-x-1">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => onCopy(prompt.generated_prompt)}
                        className="hover:bg-violet-100 text-violet-700"
                        title="Copy prompt"
                      >
                        <CopyIcon className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => onDelete(prompt.id)}
                        className="hover:bg-red-50 hover:text-red-500"
                        title="Delete prompt"
                      >
                        <TrashIcon className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  <div className="space-y-1">
                    <h3 className="font-medium text-violet-900">Generated Prompt</h3>
                    <p className="text-sm text-gray-700 whitespace-pre-wrap">{prompt.generated_prompt}</p>
                  </div>
                  <p className="text-xs text-gray-500 mt-2">{formatDate(prompt.created_at)}</p>
                </div>
              </Card>
            ))}
          </div>
        </ScrollArea>
      )}
    </div>
  );
};
