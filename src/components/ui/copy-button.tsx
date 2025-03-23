
import { useState } from 'react';
import { Button } from './button';
import { Check, Copy } from 'lucide-react';
import { cn } from '@/lib/utils';

interface CopyButtonProps {
  value: string;
  className?: string;
}

export const CopyButton = ({ value, className }: CopyButtonProps) => {
  const [isCopied, setIsCopied] = useState(false);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(value);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch (error) {
      console.error('Failed to copy text: ', error);
    }
  };

  return (
    <div className={cn("flex items-center gap-2", className)}>
      <span className="truncate max-w-[200px]">{value}</span>
      <Button 
        variant="ghost" 
        size="icon" 
        onClick={copyToClipboard}
        className="h-8 w-8 transition-all"
      >
        {isCopied ? (
          <Check className="h-4 w-4 text-green-500 animate-in fade-in-0 duration-200" />
        ) : (
          <Copy className="h-4 w-4" />
        )}
        <span className="sr-only">Copy URL</span>
      </Button>
    </div>
  );
};
