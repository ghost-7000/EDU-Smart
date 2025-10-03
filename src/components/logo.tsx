import { BookOpenCheck } from 'lucide-react';
import Link from 'next/link';

export function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2" prefetch={false}>
      <BookOpenCheck className="h-7 w-7 text-accent" />
      <span className="font-headline text-2xl font-bold text-primary">EduSmart</span>
    </Link>
  );
}
