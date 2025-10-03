
import Link from 'next/link';
import { useLanguage } from '@/hooks/use-language';

export function Logo() {
  const { t } = useLanguage();
  return (
    <Link href="/" className="flex items-center gap-2" prefetch={false}>
      <span className="font-headline text-2xl font-bold text-primary">
        {t.appName}
      </span>
    </Link>
  );
}
