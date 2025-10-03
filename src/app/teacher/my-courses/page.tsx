
'use client';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';

import { Edit, Star, Trash2, Users } from 'lucide-react';
import { teacherData } from '@/lib/placeholder-data';
import { useToast } from '@/hooks/use-toast';
import Link from 'next/link';
import { useLanguage } from '@/hooks/use-language';
import { Course } from '@/lib/types';

export default function MyCoursesPage() {
    const { toast } = useToast();
    const { t } = useLanguage();

    const handleDelete = (title: string) => {
        toast({
            title: t.courseDeleted,
            description: `"${title}" has been deleted.`,
            variant: "destructive"
        })
    }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold font-headline">{t.myCourses_teacher}</h1>
        <Link href="/teacher/add-course">
            <Button>{t.addCourse_teacher}</Button>
        </Link>
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {teacherData.courses.map((course: Course) => (
          <Card key={course.id}>
            <CardHeader>
              <CardTitle className="truncate">{course.title}</CardTitle>
              <CardDescription>{course.code}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-around p-3 rounded-md bg-muted">
                <div className="text-center">
                  <Users className="mx-auto h-6 w-6 text-primary" />
                  <p className="font-bold text-lg">{course.enrolledStudents}</p>
                  <p className="text-xs text-muted-foreground">{t.student}</p>
                </div>
                <div className="text-center">
                  <Star className="mx-auto h-6 w-6 text-amber-500" />
                  <p className="font-bold text-lg">{course.rating.toFixed(1)}</p>
                  <p className="text-xs text-muted-foreground">{t.rating}</p>
                </div>
              </div>
              <div>
                <h4 className="font-semibold mb-2">{t.latestReviews}</h4>
                {course.reviews.slice(0, 2).map((review, i) => (
                    <div key={i} className="text-sm p-2 border-b">
                        <div className="flex items-center">
                            {Array.from({ length: 5 }, (_, starIndex) => (
                                <Star key={starIndex} className={`w-3 h-3 ${starIndex < review.rating ? 'text-amber-500 fill-amber-400' : 'text-muted-foreground'}`} />
                            ))}
                        </div>
                        <p className="text-muted-foreground italic">"{review.comment}"</p>
                    </div>
                ))}
                 {course.reviews.length === 0 && <p className="text-sm text-muted-foreground">{t.noReviewsYet}</p>}
              </div>
            </CardContent>
            <CardFooter className="grid grid-cols-2 gap-2">
              <Button variant="outline" asChild>
                <Link href={`/teacher/course/${course.id}`}>
                    <Edit className="mr-2 h-4 w-4" /> {t.edit}
                </Link>
              </Button>
              <AlertDialog>
                <AlertDialogTrigger asChild>
                    <Button variant="destructive">
                        <Trash2 className="mr-2 h-4 w-4" /> {t.delete}
                    </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                    <AlertDialogHeader>
                    <AlertDialogTitle>{t.confirmDelete}</AlertDialogTitle>
                    <AlertDialogDescription>
                        {t.confirmDeleteDesc}
                    </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                    <AlertDialogCancel>{t.cancel}</AlertDialogCancel>
                    <AlertDialogAction onClick={() => handleDelete(course.title)}>{t.continue}</AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
