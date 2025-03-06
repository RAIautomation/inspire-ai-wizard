
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CopyIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import DOMPurify from "isomorphic-dompurify";

interface GeneratedPromptProps {
  prompt: string;
  onCopy: (text: string) => Promise<void>;
}

export const GeneratedPrompt = ({ prompt, onCopy }: GeneratedPromptProps) => {
  if (!prompt) return null;

  // Format the prompt: preserve paragraphs, handle numbering and formatting
  const formatPrompt = (text: string) => {
    // Remove markdown characters like * and # but keep proper formatting
    let formattedText = text
      // Replace markdown headers with HTML heading tags
      .replace(/^#{1,6}\s+(.+)$/gm, '<h3>$1</h3>')
      // Replace markdown bold with HTML strong tags
      .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
      .replace(/__(.+?)__/g, '<strong>$1</strong>')
      // Replace markdown italic with HTML em tags
      .replace(/\*(.+?)\*/g, '<em>$1</em>')
      .replace(/_(.+?)_/g, '<em>$1</em>')
      // Preserve numbered lists by replacing markdown with HTML ordered lists
      .replace(/^(\d+\.\s+.+)$/gm, '<li>$1</li>')
      // Preserve bullet lists
      .replace(/^[-*+]\s+(.+)$/gm, '<li>$1</li>')
      // Preserve paragraphs
      .replace(/\n{2,}/g, '</p><p>');
    
    // Wrap in paragraph tags if not already done
    if (!formattedText.startsWith('<')) {
      formattedText = `<p>${formattedText}</p>`;
    }
    
    // Wrap lists in proper ol/ul tags
    formattedText = formattedText
      .replace(/(<li>\d+\.\s+.+<\/li>)+/g, (match) => `<ol>${match}</ol>`)
      .replace(/(<li>[-*+]\s+.+<\/li>)+/g, (match) => `<ul>${match}</ul>`);
    
    return formattedText;
  };

  // Sanitize HTML content
  const formattedText = formatPrompt(prompt);
  const sanitizedHTML = DOMPurify.sanitize(formattedText, {
    ALLOWED_TAGS: ["b", "i", "em", "strong", "p", "br", "ul", "ol", "li", "h3"],
  });

  return (
    <Card className={cn(
      "p-6 glass",
      "animate-in fade-in-50 duration-500"
    )}>
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold text-gradient">
            Generated Prompt
          </h2>
          <Button
            variant="outline"
            size="icon"
            onClick={() => onCopy(prompt)}
            className="hover:bg-primary/10 border-primary/20 text-primary/90"
          >
            <CopyIcon className="h-4 w-4" />
          </Button>
        </div>
        <div 
          className="p-4 bg-muted/30 rounded-lg text-foreground/90 prose prose-sm max-w-none border border-border/40"
          dangerouslySetInnerHTML={{ __html: sanitizedHTML }}
        />
      </div>
    </Card>
  );
};
