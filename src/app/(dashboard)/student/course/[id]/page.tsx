
'use client';

import { courses } from '@/lib/placeholder-data';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Star, Clock, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

export default function CourseDetailPage({ params }: { params: { id: string } }) {
  const { toast } = useToast();
  const course = courses.find((c) => c.id.toString() === params.id);

  if (!course) {
    notFound();
  }

  const handleRegister = () => {
    toast({
        title: "تم التسجيل بنجاح!",
        description: `لقد تم تسجيلك في كورس "${course.title}".`,
    });
  }

  return (
    <div className="container mx-auto py-8">
      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
            {course.image && (
                <Image
                src={course.image.imageUrl}
                alt={course.title}
                data-ai-hint={course.image.imageHint}
                width={800}
                height={450}
                className="rounded-lg object-cover w-full mb-6 shadow-lg"
                />
            )}
            <h1 className="font-headline text-4xl font-bold mb-4">{course.title}</h1>
            <p className="text-lg text-muted-foreground mb-6">هنا سيكون وصف مفصل ومطول عن الكورس، أهدافه، ومحتواه، والجمهور المستهدف. هذا النص هو مجرد مثال.</p>
        </div>
        <div>
            <Card>
                <CardHeader>
                    <CardTitle>عن الكورس</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="flex justify-between items-center">
                        <span className="font-semibold">السعر</span>
                        <div>
                        {course.isFreeTrial ? (
                            <Badge variant="outline" className="border-green-500 text-green-600">تجربة مجانية</Badge>
                        ) : course.price !== null ? (
                            <p className="font-bold text-lg text-primary">${course.price}</p>
                        ) : (
                            <Badge variant="secondary">مجاني</Badge>
                        )}
                        </div>
                    </div>
                    <div className="flex justify-between items-center">
                        <span className="font-semibold">المعلم</span>
                        <span className="text-muted-foreground">{course.teacher}</span>
                    </div>
                     <div className="flex justify-between items-center">
                        <span className="font-semibold">التقييم</span>
                        <div className="flex items-center">
                            <span className="font-bold text-amber-500 mr-1">{course.rating.toFixed(1)}</span>
                            <Star className="w-4 h-4 fill-amber-400 text-amber-500" />
                        </div>
                    </div>
                    <div className="flex justify-between items-center">
                        <span className="font-semibold">التخصص</span>
                        <span className="text-muted-foreground">{course.specialization}</span>
                    </div>

                    <Button className="w-full" onClick={handleRegister}>سجل الآن</Button>
                </CardContent>
            </Card>
        </div>
      </div>
    </div>
  );
}
