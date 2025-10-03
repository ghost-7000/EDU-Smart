import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle2 } from 'lucide-react';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { placeholderImages } from '@/lib/placeholder-data';
import Link from 'next/link';

export default function Home() {
  const heroImage = placeholderImages.find(p => p.id === 'hero');

  const features = [
    {
      title: 'دورات معتمدة',
      description: 'يقدمها معلمون معتمدون من جامعة UTAS لضمان أعلى جودة تعليمية.',
      icon: <CheckCircle2 className="h-8 w-8 text-accent" />,
    },
    {
      title: 'تجربة مجانية',
      description: 'استكشف منصتنا مع تجربة مجانية لمدة 7 أيام لجميع الكورسات.',
      icon: <CheckCircle2 className="h-8 w-8 text-accent" />,
    },
    {
      title: 'نظام تقييم ذكي',
      description: 'احصل على تقييمات فورية وتوصيات مخصصة لتحسين مسارك التعليمي.',
      icon: <CheckCircle2 className="h-8 w-8 text-accent" />,
    },
    {
      title: 'نقاط ومكافآت',
      description: 'اكتسب نقاطًا عند إكمال الدورات واستبدلها بمكافآت حصرية.',
      icon: <CheckCircle2 className="h-8 w-8 text-accent" />,
    },
  ];

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <section className="relative w-full py-20 md:py-32 lg:py-40">
          <div className="container mx-auto px-4 md:px-6">
            <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
              <div className="flex flex-col items-start justify-center space-y-6">
                <h1 className="font-headline text-4xl font-bold tracking-tight text-primary sm:text-5xl md:text-6xl">
                  منصة تعليمية مبتكرة لطلاب جامعة UTAS
                </h1>
                <p className="max-w-xl text-lg text-foreground/80 md:text-xl">
                  مرحبًا بك في EduSmart، بوابتك لتجربة تعليمية فريدة ومصممة خصيصًا لتلبية احتياجاتك الأكاديمية.
                </p>
                <Link href="/signup">
                  <Button size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground">
                    ابدأ الآن
                  </Button>
                </Link>
              </div>
              <div className="flex items-center justify-center">
                {heroImage && (
                    <Image
                    src={heroImage.imageUrl}
                    width={600}
                    height={400}
                    alt={heroImage.description}
                    data-ai-hint={heroImage.imageHint}
                    className="overflow-hidden rounded-xl object-cover shadow-2xl"
                    />
                )}
              </div>
            </div>
          </div>
        </section>

        <section id="features" className="w-full bg-background py-12 md:py-24 lg:py-32">
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="font-headline text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-primary">
                  مميزات تغير تجربتك التعليمية
                </h2>
                <p className="max-w-[900px] text-foreground/80 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  اكتشف كيف تجعل منصتنا رحلتك الأكاديمية أكثر سهولة وفعالية.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-start gap-8 sm:grid-cols-2 md:gap-12 lg:grid-cols-2 mt-12">
              {features.map((feature, index) => (
                <Card key={index} className="transition-transform duration-300 hover:scale-105 hover:shadow-xl">
                  <CardHeader className="flex flex-row items-center gap-4">
                    {feature.icon}
                    <CardTitle className="font-headline text-xl">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-foreground/80">{feature.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
