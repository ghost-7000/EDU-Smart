
"use client";
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Star } from 'lucide-react';
import { Badge } from './ui/badge';
import Link from 'next/link';
import { useToast } from '@/hooks/use-toast';
import { useLanguage } from '@/hooks/use-language';

type Course = {
  id: number;
  teacherId: number;
  title: string;
  code: string;
  teacher: string;
  rating: number;
  price: number | null;
  isFreeTrial: boolean;
  emoji: string;
  image?: {
    imageUrl: string;
    description: string;
    imageHint: string;
  };
};

export function CourseCard({ course }: { course: Course }) {
  const { toast } = useToast();
  const { t } = useLanguage();

  const handleRegister = () => {
    toast({
        title: t.registeredSuccess,
        description: `${t.registeredCourse} "${course.title}".`,
    });
  }

  return (
    <Card className="overflow-hidden transition-all hover:shadow-lg hover:-translate-y-1 flex flex-col">
      <Link href={`/student/course/${course.id}`} className="flex-1 flex flex-col">
        <CardHeader className="p-0">
          <div className="aspect-video bg-muted flex items-center justify-center">
            <span className="text-6xl">{course.emoji}</span>
          </div>
        </CardHeader>
        <CardContent className="p-4 flex-1">
          <div className="flex justify-between items-start mb-2">
            <h3 className="font-semibold text-lg truncate pr-2">{course.title}</h3>
            <Badge variant="outline">{course.code}</Badge>
          </div>
          <Link href={`/teacher/profile?id=${course.teacherId}`} className="text-sm text-muted-foreground hover:underline">{course.teacher}</Link>
          <div className="flex items-center mt-2">
            <span className="font-bold text-amber-500 mr-1">{course.rating.toFixed(1)}</span>
            <Star className="w-4 h-4 fill-amber-400 text-amber-500" />
          </div>
        </CardContent>
      </Link>
      <CardFooter className="p-4 flex justify-between items-center">
        <div>
          {course.isFreeTrial ? (
            <Badge variant="outline" className="border-green-500 text-green-600">{t.freeTrial}</Badge>
          ) : course.price !== null ? (
            <p className="font-bold text-lg text-primary">{course.price} {t.omr}</p>
          ) : (
            <Badge variant="secondary">{t.free}</Badge>
          )}
        </div>
        <Button onClick={handleRegister}>{t.registerNow}</Button>
      </CardFooter>
    </Card>
  );
}
