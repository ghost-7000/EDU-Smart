
"use client";
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Star } from 'lucide-react';
import { studentData } from '@/lib/placeholder-data';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { useLanguage } from '@/hooks/use-language';
import Link from 'next/link';
import Image from 'next/image';

export default function MyCoursesPage() {
    const { toast } = useToast();
    const { t } = useLanguage();

    const handleRateCourse = (title: string) => {
        toast({
            title: t.ratingSuccess,
            description: `${t.ratingThanks} "${title}".`,
        })
    }

    const getStatusText = (status: 'active' | 'trial' | 'completed') => {
        if (status === 'active') return t.statusActive;
        if (status === 'trial') return t.statusTrial;
        if (status === 'completed') return t.statusCompleted;
        return '';
    }

  return (
    <div>
      <h1 className="text-3xl font-bold font-headline mb-6">{t.myCourses}</h1>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {studentData.enrolledCourses.map((course) => (
          <Card key={course.id} className="flex flex-col">
              <Link href={`/student/course/${course.id}`} className="flex flex-col flex-1">
                <CardHeader className="p-0">
                    <div className="aspect-video bg-muted flex items-center justify-center rounded-t-lg">
                        <span className="text-6xl">{course.emoji}</span>
                    </div>
                </CardHeader>
                <CardContent className="p-4 flex-1">
                <div className="flex justify-between items-start mb-2">
                    <Badge className="" variant={course.status === 'completed' ? 'default' : 'secondary'}>
                        {getStatusText(course.status as any)}
                    </Badge>
                    <Badge variant="outline">{course.code}</Badge>
                </div>
                <h3 className="font-semibold text-lg">{course.title}</h3>
                <Link href={`/teacher/profile?id=${course.teacherId}`} className="text-sm text-muted-foreground hover:underline">{course.teacher}</Link>
                <div className="mt-4">
                    <Progress value={course.progress} />
                    <p className="text-xs text-muted-foreground mt-1 text-right">{course.progress}%</p>
                </div>
                </CardContent>
              </Link>
            <CardFooter className="p-4">
              {course.status === 'completed' ? (
                <Button variant="outline" className="w-full" onClick={() => handleRateCourse(course.title)}>
                  <Star className="ml-2 h-4 w-4" /> {t.rateCourse}
                </Button>
              ) : (
                <Link href={`/student/course/${course.id}`} className="w-full">
                    <Button className="w-full">
                    {t.continueCourse}
                    </Button>
                </Link>
              )}
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
