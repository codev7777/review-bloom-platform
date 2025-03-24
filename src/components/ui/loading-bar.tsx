
import React, { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';
import { Progress } from '@/components/ui/progress';

interface LoadingBarProps {
  className?: string;
  duration?: number;
  autoStart?: boolean;
  showLogo?: boolean;
  onComplete?: () => void;
}

export const LoadingBar = ({
  className,
  duration = 2000,
  autoStart = true,
  showLogo = true,
  onComplete,
}: LoadingBarProps) => {
  const [progress, setProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    let startTime: number;
    let animationFrame: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const nextProgress = Math.min(100, (elapsed / duration) * 100);
      
      setProgress(nextProgress);
      
      if (nextProgress < 100) {
        animationFrame = requestAnimationFrame(animate);
      } else {
        setTimeout(() => {
          setIsVisible(false);
          if (onComplete) onComplete();
        }, 300);
      }
    };

    if (autoStart) {
      timer = setTimeout(() => {
        animationFrame = requestAnimationFrame(animate);
      }, 100);
    }

    return () => {
      clearTimeout(timer);
      cancelAnimationFrame(animationFrame);
    };
  }, [autoStart, duration, onComplete]);

  if (!isVisible) return null;

  return (
    <div
      className={cn(
        'fixed inset-0 flex flex-col items-center justify-center bg-background z-50 transition-opacity duration-300',
        progress === 100 ? 'opacity-0' : 'opacity-100',
        className
      )}
    >
      {showLogo && (
        <div className="mb-8 animate-pulse">
          <span className="text-3xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-[#FF9900] to-orange-400">
            ReviewBrothers
          </span>
        </div>
      )}
      <div className="w-64 mb-4">
        <Progress value={progress} className="h-2" />
      </div>
      <div className="text-sm text-muted-foreground">
        {progress.toFixed(0)}% Loading...
      </div>
    </div>
  );
};
