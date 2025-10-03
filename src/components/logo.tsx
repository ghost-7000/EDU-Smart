import Link from 'next/link';
import { GraduationCap } from 'lucide-react';

export function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2" prefetch={false}>
      <GraduationCap className="h-8 w-8 text-primary" />
    </Link>
  );
}
