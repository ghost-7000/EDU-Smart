
"use client";
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Star } from 'lucide-react';
import { studentData } from '@/lib/placeholder-data';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { useLanguage } from '@/hooks/use-language';
import Link from 'next/link';

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
                    {course.image && (
                        <Image
                        src={course.image.imageUrl}
                        alt={course.title}
                        data-ai-hint={course.image.imageHint}
                        width={400}
                        height={225}
                        className="rounded-t-lg object-cover"
                    />
                    )}
                </CardHeader>
                <CardContent className="p-4 flex-1">
                <Badge className="mb-2" variant={course.status === 'completed' ? 'default' : 'secondary'}>
                    {getStatusText(course.status as any)}
                </Badge>
                <h3 className="font-semibold text-lg">{course.title}</h3>
                <p className="text-sm text-muted-foreground">{course.teacher}</p>
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
