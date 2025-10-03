
import { GraduationCap } from 'lucide-react';
import Link from 'next/link';
import { useLanguage } from '@/hooks/use-language';

export function Logo() {
  const { t } = useLanguage();
  return (
    <Link href="/" className="flex items-center gap-2" prefetch={false}>
      <div className="bg-primary rounded-md p-2 flex items-center justify-center">
        <GraduationCap className="h-6 w-6 text-primary-foreground" />
      </div>
      <span className="font-headline text-2xl font-bold text-primary">
        {t.appName}
      </span>
    </Link>
  );
}
