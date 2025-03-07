
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
        <ClockIcon className="h-5 w-5 text-primary" />
        <h2 className="text-xl font-semibold text-gradient">Prompt History</h2>
      </div>
      
      {isLoading ? (
        <div className="text-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
        </div>
      ) : prompts.length === 0 ? (
        <Card className="p-6 text-center text-muted-foreground glass">
          No prompts generated yet. Try generating your first prompt above!
        </Card>
      ) : (
        <ScrollArea className="h-[400px] rounded-lg border border-border glass">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
            {prompts.map((prompt) => (
              <Card 
                key={prompt.id} 
                className="flex flex-col card-hover"
              >
                <div className="p-4 space-y-3 flex-1">
                  <div className="flex justify-between items-start">
                    <div className="space-y-1 flex-1">
                      <h3 className="font-medium text-primary/90">Topic</h3>
                      <p className="text-sm text-foreground/80">{prompt.topic}</p>
                    </div>
                    <div className="flex space-x-1">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => onCopy(prompt.generated_prompt)}
                        className="hover:bg-primary/10 text-primary/90"
                        title="Copy prompt"
                      >
                        <CopyIcon className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => onDelete(prompt.id)}
                        className="hover:bg-destructive/10 hover:text-destructive"
                        title="Delete prompt"
                      >
                        <TrashIcon className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  <div className="space-y-1">
                    <h3 className="font-medium text-primary/90">Generated Prompt</h3>
                    <ScrollArea className="h-[120px] w-full rounded border border-border bg-muted/20">
                      <div className="p-2">
                        <p className="text-sm text-foreground/80 whitespace-pre-wrap">{prompt.generated_prompt}</p>
                      </div>
                    </ScrollArea>
                  </div>
                  <p className="text-xs text-muted-foreground mt-2">{formatDate(prompt.created_at)}</p>
                </div>
              </Card>
            ))}
          </div>
        </ScrollArea>
      )}
    </div>
  );
};
