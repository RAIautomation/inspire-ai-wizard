
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CopyIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface GeneratedPromptProps {
  prompt: string;
  onCopy: (text: string) => Promise<void>;
}

export const GeneratedPrompt = ({ prompt, onCopy }: GeneratedPromptProps) => {
  if (!prompt) return null;

  return (
    <Card className={cn(
      "p-6 backdrop-blur-sm bg-white/80 border border-gray-200",
      "animate-in fade-in-50 duration-500"
    )}>
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold text-gray-900">
            Generated Prompt
          </h2>
          <Button
            variant="outline"
            size="icon"
            onClick={() => onCopy(prompt)}
            className="hover:bg-gray-100"
          >
            <CopyIcon className="h-4 w-4" />
          </Button>
        </div>
        <div className="p-4 bg-gray-50 rounded-lg text-gray-800 whitespace-pre-wrap">
          {prompt}
        </div>
      </div>
    </Card>
  );
};
