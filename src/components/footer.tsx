
"use client"
import { useLanguage } from '@/hooks/use-language';

export function Footer() {
  const { t } = useLanguage();
  return (
    <footer className="border-t bg-background">
      <div className="container mx-auto flex h-16 items-center justify-center px-4 md:px-6">
        <p className="text-sm text-foreground/60">
          © {new Date().getFullYear()} {t.appName}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
