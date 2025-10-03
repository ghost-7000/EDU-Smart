import { BookOpenCheck } from 'lucide-react';
import Link from 'next/link';

export function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2" prefetch={false}>
      <BookOpenCheck className="h-7 w-7 text-accent" />
    </Link>
  );
}
