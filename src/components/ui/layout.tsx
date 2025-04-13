
import React from "react";
import { cn } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";
import { ThemeToggle } from "@/components/theme/theme-toggle";

interface LayoutProps {
  children: React.ReactNode;
  className?: string;
}

export function Layout({ children, className }: LayoutProps) {
  return (
    <div className={cn("flex min-h-screen flex-col bg-background dark:bg-gray-900 transition-colors duration-200", className)}>
      {children}
    </div>
  );
}

interface LayoutHeaderProps {
  children: React.ReactNode;
  className?: string;
  showThemeToggle?: boolean;
}

export function LayoutHeader({ children, className, showThemeToggle = true }: LayoutHeaderProps) {
  return (
    <header className={cn("sticky top-0 z-30 flex h-16 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 dark:bg-gray-900/95 dark:border-gray-800", className)}>
      <div className="container flex items-center justify-between">
        {children}
        {showThemeToggle && <ThemeToggle />}
      </div>
      <Separator className="absolute bottom-0 left-0 w-full" />
    </header>
  );
}

interface LayoutContentProps {
  children: React.ReactNode;
  className?: string;
}

export function LayoutContent({ children, className }: LayoutContentProps) {
  return (
    <main className={cn("flex-1 overflow-auto px-4 py-6 md:px-6 lg:px-8", className)}>
      <div className="mx-auto max-w-7xl">
        {children}
      </div>
    </main>
  );
}

interface LayoutSidebarProps {
  children: React.ReactNode;
  className?: string;
}

export function LayoutSidebar({ children, className }: LayoutSidebarProps) {
  return (
    <aside className={cn("w-64 border-r border-border bg-background dark:bg-gray-900 dark:border-gray-800 hidden md:block", className)}>
      {children}
    </aside>
  );
}

interface LayoutFooterProps {
  children: React.ReactNode;
  className?: string;
}

export function LayoutFooter({ children, className }: LayoutFooterProps) {
  return (
    <footer className={cn("border-t border-border bg-background dark:bg-gray-900 dark:border-gray-800 py-6", className)}>
      <div className="container">
        {children}
      </div>
    </footer>
  );
}
