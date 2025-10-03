
'use client';

import { courses } from '@/lib/placeholder-data';
import { notFound } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { useLanguage } from '@/hooks/use-language';
import Link from 'next/link';

export default function CourseDetailPage({ params }: { params: { id: string } }) {
  const { toast } = useToast();
  const { t } = useLanguage();
  const course = courses.find((c) => c.id.toString() === params.id);

  if (!course) {
    notFound();
  }

  const handleRegister = () => {
    toast({
        title: t.registeredSuccess,
        description: `${t.registeredCourse} "${course.title}".`,
    });
  }

  return (
    <div className="container mx-auto py-8">
      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
            <div className="aspect-video bg-muted flex items-center justify-center rounded-lg mb-6 shadow-lg">
                <span className="text-8xl">{course.emoji}</span>
            </div>
            <h1 className="font-headline text-4xl font-bold mb-2">{course.title}</h1>
            <Badge variant="secondary" className="mb-4">{course.code}</Badge>
            <p className="text-lg text-muted-foreground mb-6">A detailed and lengthy description of the course, its objectives, content, and target audience will be here. This text is just an example.</p>
        </div>
        <div>
            <Card>
                <CardHeader>
                    <CardTitle>{t.courseDetails}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="flex justify-between items-center">
                        <span className="font-semibold">{t.price}</span>
                        <div>
                        {course.isFreeTrial ? (
                            <Badge variant="outline" className="border-green-500 text-green-600">{t.freeTrial}</Badge>
                        ) : course.price !== null ? (
                            <p className="font-bold text-lg text-primary">{course.price} {t.omr}</p>
                        ) : (
                            <Badge variant="secondary">{t.free}</Badge>
                        )}
                        </div>
                    </div>
                    <div className="flex justify-between items-center">
                        <span className="font-semibold">{t.teacher}</span>
                        <Link href={`/teacher/profile?id=${course.teacherId}`} className="text-muted-foreground hover:underline">{course.teacher}</Link>
                    </div>
                     <div className="flex justify-between items-center">
                        <span className="font-semibold">{t.rating}</span>
                        <div className="flex items-center">
                            <span className="font-bold text-amber-500 mr-1">{course.rating.toFixed(1)}</span>
                            <Star className="w-4 h-4 fill-amber-400 text-amber-500" />
                        </div>
                    </div>
                    <div className="flex justify-between items-center">
                        <span className="font-semibold">{t.filterBySpecialization}</span>
                        <span className="text-muted-foreground">{course.specialization}</span>
                    </div>

                    <Button className="w-full" onClick={handleRegister}>{t.enrollNow}</Button>
                </CardContent>
            </Card>
        </div>
      </div>
    </div>
  );
}
