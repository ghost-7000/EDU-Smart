
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { CheckCircle2 } from 'lucide-react';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { placeholderImages } from '@/lib/placeholder-data';
import Link from 'next/link';

export default function Home() {
  const heroImage = placeholderImages.find(p => p.id === 'hero');

  const features = [
    {
      title: 'تجربة مجانية',
      description: 'استكشف منصتنا مع تجربة مجانية لمدة 7 أيام لجميع الكورسات.',
      icon: <CheckCircle2 className="h-8 w-8 text-accent" />,
    },
    {
        title: 'تقييمات ذكية',
        description: 'احصل على تقييمات فورية وتوصيات مخصصة لتحسين مسارك التعليمي.',
        icon: <CheckCircle2 className="h-8 w-8 text-accent" />,
    },
    {
      title: 'الوضع الغامق/الفاتح',
      description: 'اختر المظهر الذي يناسبك لتجربة قراءة مريحة.',
      icon: <CheckCircle2 className="h-8 w-8 text-accent" />,
    },
    {
        title: 'دعم متعدد اللغات',
        description: 'تنقل بسهولة بين اللغتين العربية والإنجليزية.',
        icon: <CheckCircle2 className="h-8 w-8 text-accent" />,
    },
    {
      title: 'نقاط ومكافآت',
      description: 'اكتسب نقاطًا عند إكمال الدورات واستبدلها بمكافآت حصرية.',
      icon: <CheckCircle2 className="h-8 w-8 text-accent" />,
    },
    {
        title: 'صفحات مخصصة',
        description: 'لوحات تحكم خاصة بالطلاب والمعلمين لتجربة فريدة.',
        icon: <CheckCircle2 className="h-8 w-8 text-accent" />,
    }
  ];

  const howItWorks = [
    {
      title: '1. تسجيل الدخول',
      description: 'أنشئ حسابك كطالب أو معلم في خطوات بسيطة.',
      icon: '👤'
    },
    {
        title: '2. اختيار الكورس',
        description: 'تصفح مكتبة الكورسات واختر ما يناسب اهتماماتك.',
        icon: '📚'
    },
    {
        title: '3. ابدأ التعلم',
        description: 'ابدأ رحلتك التعليمية أو قم بإضافة كورساتك الخاصة كمعلم.',
        icon: '🚀'
    }
  ];

  const plans = [
    {
      name: 'الأساسية',
      price: '3',
      features: ['وصول لـ 5 كورسات شهريًا', 'دعم عبر البريد الإلكتروني']
    },
    {
      name: 'الاحترافية',
      price: '7',
      features: ['وصول غير محدود للكورسات', 'دعم ذو أولوية', 'شهادات إتمام']
    },
    {
      name: 'المميزة',
      price: '12',
      features: ['كل مزايا الاحترافية', 'مساعد AI شخصي', 'جلسات شهرية مع المعلمين']
    }
  ]

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <section className="relative w-full py-20 md:py-32 lg:py-40 bg-card">
          <div className="container mx-auto px-4 md:px-6">
            <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
              <div className="flex flex-col items-start justify-center space-y-6">
                <h1 className="font-headline text-4xl font-bold tracking-tight text-primary sm:text-5xl md:text-6xl">
                  EduSmart – منصتك التعليمية الذكية لطلاب UTAS
                </h1>
                <p className="max-w-xl text-lg text-foreground/80 md:text-xl">
                  تعلم من أفضل المعلمين مع تجربة مجانية 7 أيام.
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

        <section id="how-it-works" className="w-full py-12 md:py-24 lg:py-32">
            <div className="container mx-auto px-4 md:px-6">
                <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
                    <h2 className="font-headline text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-primary">
                        كيف تعمل المنصة
                    </h2>
                </div>
                <div className="grid gap-8 md:grid-cols-3">
                    {howItWorks.map((step) => (
                        <div key={step.title} className="flex flex-col items-center text-center">
                            <div className="flex items-center justify-center w-16 h-16 rounded-full bg-primary text-primary-foreground font-bold text-2xl mb-4">{step.icon}</div>
                            <h3 className="text-xl font-bold">{step.title}</h3>
                            <p className="text-muted-foreground">{step.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>

        <section id="features" className="w-full bg-card py-12 md:py-24 lg:py-32">
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
            <div className="mx-auto grid max-w-5xl items-start gap-6 sm:grid-cols-2 lg:grid-cols-3 mt-12">
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

        <section id="plans" className="w-full py-12 md:py-24 lg:py-32">
            <div className="container mx-auto px-4 md:px-6">
                <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
                    <h2 className="font-headline text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-primary">
                        اختر الباقة التي تناسبك
                    </h2>
                </div>
                <div className="grid gap-8 md:grid-cols-3">
                    {plans.map((plan) => (
                        <Card key={plan.name} className="flex flex-col">
                            <CardHeader className="items-center">
                                <CardTitle className="font-headline text-2xl">{plan.name}</CardTitle>
                            </CardHeader>
                            <CardContent className="flex-1 flex flex-col items-center text-center">
                                <p className="text-4xl font-bold mb-2">{plan.price} <span className="text-lg font-normal text-muted-foreground">ريال/شهر</span></p>
                                <ul className="space-y-2 text-muted-foreground">
                                    {plan.features.map(feat => <li key={feat} className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-green-500" /> {feat}</li>)}
                                </ul>
                            </CardContent>
                            <CardFooter>
                                <Button className="w-full">اشترك الآن</Button>
                            </CardFooter>
                        </Card>
                    ))}
                </div>
            </div>
        </section>

        <section id="cta" className="w-full py-12 md:py-24 lg:py-32">
            <div className="container mx-auto px-4 md:px-6">
                <div className="flex flex-col items-center justify-center space-y-4 text-center bg-primary text-primary-foreground p-12 rounded-lg">
                    <h2 className="font-headline text-3xl font-bold">ابدأ رحلتك التعليمية الآن!</h2>
                    <Link href="/signup">
                        <Button size="lg" variant="secondary" className="bg-accent hover:bg-accent/90 text-accent-foreground">إنشاء حساب</Button>
                    </Link>
                </div>
            </div>
        </section>

      </main>
      <Footer />
    </div>
  );
}
