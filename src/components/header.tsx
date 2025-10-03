
"use client"
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu } from 'lucide-react';
import { Logo } from './logo';
import { ThemeToggle } from './theme-toggle';
import { LanguageToggle } from './language-toggle';
import { useLanguage } from '@/hooks/use-language';
import { cn } from '@/lib/utils';

export function Header() {
  const { t, dir } = useLanguage();

  const navLinks = [
    { href: '/', label: t.home },
    { href: '/student/browse-courses', label: t.courses },
    { href: '#', label: t.aboutUs },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
        <div className="flex items-center gap-4">
          <Logo />
          <nav className="hidden items-center gap-6 text-sm font-medium md:flex">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="transition-colors hover:text-accent"
                prefetch={false}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="flex items-center gap-2">
          <div className="hidden md:flex items-center gap-2">
            <Link href="/login">
                <Button variant="ghost">{t.login}</Button>
            </Link>
            <LanguageToggle />
            <ThemeToggle />
          </div>
          
          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon">
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Toggle navigation menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side={dir === 'rtl' ? 'right' : 'left'}>
                <div className="flex flex-col gap-6 p-6">
                  <Logo />
                  <nav className="grid gap-4 text-lg font-medium">
                    {navLinks.map((link) => (
                      <Link
                        key={link.href}
                        href={link.href}
                        className="transition-colors hover:text-accent"
                        prefetch={false}
                      >
                        {link.label}
                      </Link>
                    ))}
                    <Link
                      href="/login"
                      className="transition-colors hover:text-accent"
                      prefetch={false}
                    >
                      {t.login}
                    </Link>
                  </nav>
                  <div className="flex items-center justify-center gap-4">
                    <LanguageToggle />
                    <ThemeToggle />
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
