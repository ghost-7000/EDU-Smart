
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

export default function MyCoursesPage() {
    const { toast } = useToast();

    const handleRateCourse = (title: string) => {
        toast({
            title: "تم التقييم بنجاح!",
            description: `شكرًا لتقييمك كورس "${title}".`,
        })
    }
  return (
    <div>
      <h1 className="text-3xl font-bold font-headline mb-6">كورساتي</h1>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {studentData.enrolledCourses.map((course) => (
          <Card key={course.id} className="flex flex-col">
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
                {course.status === 'active' ? 'نشط' : course.status === 'trial' ? 'تحت التجربة' : 'مكتمل'}
              </Badge>
              <h3 className="font-semibold text-lg">{course.title}</h3>
              <p className="text-sm text-muted-foreground">{course.teacher}</p>
              <div className="mt-4">
                <Progress value={course.progress} />
                <p className="text-xs text-muted-foreground mt-1 text-right">{course.progress}%</p>
              </div>
            </CardContent>
            <CardFooter className="p-4">
              {course.status === 'completed' ? (
                <Button variant="outline" className="w-full" onClick={() => handleRateCourse(course.title)}>
                  <Star className="ml-2 h-4 w-4" /> تقييم الكورس
                </Button>
              ) : (
                <Button className="w-full" disabled>
                  متابعة الكورس
                </Button>
              )}
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
