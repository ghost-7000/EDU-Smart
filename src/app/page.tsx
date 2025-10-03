
'use client';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { CheckCircle2 } from 'lucide-react';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { placeholderImages, courses } from '@/lib/placeholder-data';
import Link from 'next/link';
import { useLanguage } from '@/hooks/use-language';
import { CourseCard } from '@/components/course-card';

export default function Home() {
  const { t } = useLanguage();
  const heroImage = placeholderImages.find(p => p.id === 'hero');

  const features = [
    {
      title: t.featureTrial,
      description: t.featureTrialDesc,
      icon: <CheckCircle2 className="h-8 w-8 text-accent" />,
    },
    {
        title: t.featureAssessments,
        description: t.featureAssessmentsDesc,
        icon: <CheckCircle2 className="h-8 w-8 text-accent" />,
    },
    {
      title: t.featureTheme,
      description: t.featureThemeDesc,
      icon: <CheckCircle2 className="h-8 w-8 text-accent" />,
    },
    {
        title: t.featureMultiLanguage,
        description: t.featureMultiLanguageDesc,
        icon: <CheckCircle2 className="h-8 w-8 text-accent" />,
    },
    {
      title: t.featurePoints,
      description: t.featurePointsDesc,
      icon: <CheckCircle2 className="h-8 w-8 text-accent" />,
    },
    {
        title: t.featureDashboards,
        description: t.featureDashboardsDesc,
        icon: <CheckCircle2 className="h-8 w-8 text-accent" />,
    }
  ];

  const howItWorks = [
    {
      title: t.step1Title,
      description: t.step1Desc,
      icon: '👤'
    },
    {
        title: t.step2Title,
        description: t.step2Desc,
        icon: '📚'
    },
    {
        title: t.step3Title,
        description: t.step3Desc,
        icon: '🚀'
    }
  ];

  const plans = [
    {
      name: t.planBasic,
      price: '3',
      features: [t.planFeature5Courses, t.planFeatureEmailSupport]
    },
    {
      name: t.planPro,
      price: '7',
      features: [t.planFeatureUnlimitedCourses, t.planFeaturePrioritySupport, t.planFeatureCertificates]
    },
    {
      name: t.planPremium,
      price: '12',
      features: [t.planFeatureAllPro, t.planFeatureAIAssistant, t.planFeatureSessions]
    }
  ]
  const latestCourses = courses.slice(0, 4);

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <section className="relative w-full py-20 md:py-32 lg:py-40 bg-card">
          <div className="container mx-auto px-4 md:px-6">
            <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
              <div className="flex flex-col items-start justify-center space-y-6">
                <h1 className="font-headline text-4xl font-bold tracking-tight text-primary sm:text-5xl md:text-6xl">
                  {t.heroTitle}
                </h1>
                <p className="max-w-xl text-lg text-foreground/80 md:text-xl">
                  {t.heroSubtitle}
                </p>
                <Link href="/signup">
                  <Button size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground">
                    {t.startNow}
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

        <section id="latest-courses" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
                <h2 className="font-headline text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-primary">
                    {t.latestCourses}
                </h2>
                <p className="max-w-[900px] text-foreground/80 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                    {t.featuresSubtitle}
                </p>
            </div>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                {latestCourses.map((course) => (
                    <CourseCard key={course.id} course={course} />
                ))}
            </div>
             <div className="text-center mt-12">
                <Link href="/student/browse-courses">
                    <Button variant="outline">{t.viewAll}</Button>
                </Link>
            </div>
          </div>
        </section>

        <section id="how-it-works" className="w-full py-12 md:py-24 lg:py-32 bg-card">
            <div className="container mx-auto px-4 md:px-6">
                <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
                    <h2 className="font-headline text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-primary">
                        {t.howItWorksTitle}
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

        <section id="features" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="font-headline text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-primary">
                  {t.featuresTitle}
                </h2>
                <p className="max-w-[900px] text-foreground/80 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  {t.featuresSubtitle}
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

        <section id="plans" className="w-full bg-card py-12 md:py-24 lg:py-32">
            <div className="container mx-auto px-4 md:px-6">
                <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
                    <h2 className="font-headline text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-primary">
                        {t.plansTitle}
                    </h2>
                </div>
                <div className="grid gap-8 md:grid-cols-3">
                    {plans.map((plan) => (
                        <Card key={plan.name} className="flex flex-col">
                            <CardHeader className="items-center">
                                <CardTitle className="font-headline text-2xl">{plan.name}</CardTitle>
                            </CardHeader>
                            <CardContent className="flex-1 flex flex-col items-center text-center">
                                <p className="text-4xl font-bold mb-2">{plan.price} <span className="text-lg font-normal text-muted-foreground">{t.planPriceSuffix}</span></p>
                                <ul className="space-y-2 text-muted-foreground">
                                    {plan.features.map(feat => <li key={feat} className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-green-500" /> {feat}</li>)}
                                </ul>
                            </CardContent>
                            <CardFooter>
                                <Button className="w-full">{t.subscribeNow}</Button>
                            </CardFooter>
                        </Card>
                    ))}
                </div>
            </div>
        </section>

        <section id="cta" className="w-full py-12 md:py-24 lg:py-32">
            <div className="container mx-auto px-4 md:px-6">
                <div className="flex flex-col items-center justify-center space-y-4 text-center bg-primary text-primary-foreground p-12 rounded-lg">
                    <h2 className="font-headline text-3xl font-bold">{t.ctaTitle}</h2>
                    <Link href="/signup">
                        <Button size="lg" variant="secondary" className="bg-accent hover:bg-accent/90 text-accent-foreground">{t.createNewAccount}</Button>
                    </Link>
                </div>
            </div>
        </section>

      </main>
      <Footer />
    </div>
  );
}
