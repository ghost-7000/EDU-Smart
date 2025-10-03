import Link from 'next/link';
import Image from 'next/image';

export function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2" prefetch={false}>
      <Image src="https://i.ibb.co/PggVv4j/UTAS-logo.png" alt="EDU Smart Logo" width={120} height={40} />
    </Link>
  );
}
