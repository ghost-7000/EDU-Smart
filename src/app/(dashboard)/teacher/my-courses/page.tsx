
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
import { Badge } from '@/components/ui/badge';

export default function MyCoursesPage() {
    const { toast } = useToast();

    const handleDelete = (title: string) => {
        toast({
            title: "تم الحذف بنجاح",
            description: `تم حذف كورس "${title}".`,
            variant: "destructive"
        })
    }

  return (
    <div>
      <h1 className="text-3xl font-bold font-headline mb-6">كورساتي</h1>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {teacherData.courses.map((course) => (
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
                  <p className="text-xs text-muted-foreground">طالب</p>
                </div>
                <div className="text-center">
                  <Star className="mx-auto h-6 w-6 text-amber-500" />
                  <p className="font-bold text-lg">{course.rating.toFixed(1)}</p>
                  <p className="text-xs text-muted-foreground">تقييم</p>
                </div>
              </div>
              <div>
                <h4 className="font-semibold mb-2">أحدث التقييمات:</h4>
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
                 {course.reviews.length === 0 && <p className="text-sm text-muted-foreground">لا توجد تقييمات بعد.</p>}
              </div>
            </CardContent>
            <CardFooter className="grid grid-cols-2 gap-2">
              <Button variant="outline">
                <Edit className="ml-2 h-4 w-4" /> تعديل
              </Button>
              <AlertDialog>
                <AlertDialogTrigger asChild>
                    <Button variant="destructive">
                        <Trash2 className="ml-2 h-4 w-4" /> حذف
                    </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                    <AlertDialogHeader>
                    <AlertDialogTitle>هل أنت متأكد تمامًا؟</AlertDialogTitle>
                    <AlertDialogDescription>
                        هذا الإجراء لا يمكن التراجع عنه. سيؤدي هذا إلى حذف الكورس وجميع بياناته بشكل دائم.
                    </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                    <AlertDialogCancel>إلغاء</AlertDialogCancel>
                    <AlertDialogAction onClick={() => handleDelete(course.title)}>متابعة</AlertDialogAction>
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
