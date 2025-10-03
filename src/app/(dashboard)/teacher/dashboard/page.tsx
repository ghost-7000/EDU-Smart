

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { teacherData } from '@/lib/placeholder-data';
import { Star, Users, BookCopy, Edit, Trash2 } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function TeacherDashboardPage() {
    const totalStudents = teacherData.courses.reduce((sum, course) => sum + course.enrolledStudents, 0);
    const totalRatings = teacherData.courses.flatMap(c => c.reviews).length;
    const averageRating = totalRatings > 0 ? (teacherData.courses.flatMap(c => c.reviews).reduce((sum, review) => sum + review.rating, 0) / totalRatings) : 0;
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="font-headline text-2xl">مرحبًا بك، {teacherData.name}!</CardTitle>
          <CardDescription>إليك نظرة عامة على نشاطك التعليمي.</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <Card className="flex items-center p-4 gap-4">
                <Users className="h-8 w-8 text-primary" />
                <div>
                    <h3 className="text-muted-foreground">إجمالي الطلاب</h3>
                    <p className="text-2xl font-bold">{totalStudents}</p>
                </div>
            </Card>
            <Card className="flex items-center p-4 gap-4">
                <Star className="h-8 w-8 text-amber-500" />
                <div>
                    <h3 className="text-muted-foreground">متوسط التقييم</h3>
                    <p className="text-2xl font-bold">{averageRating.toFixed(1)}</p>
                </div>
            </Card>
            <Card className="flex items-center p-4 gap-4">
                <BookCopy className="h-8 w-8 text-green-500" />
                <div>
                    <h3 className="text-muted-foreground">الكورسات المنشورة</h3>
                    <p className="text-2xl font-bold">{teacherData.totalCourses}</p>
                </div>
            </Card>
        </CardContent>
      </Card>
      
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold font-headline">أحدث الكورسات</h2>
        <Link href="/teacher/my-courses">
            <Button variant="outline">عرض الكل</Button>
        </Link>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {teacherData.courses.slice(0, 3).map((course) => (
            <Card key={course.id}>
                <CardHeader>
                    <CardTitle className="truncate">{course.title}</CardTitle>
                    <CardDescription>{course.code}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="flex justify-around p-3 rounded-md bg-muted text-center">
                        <div>
                            <Users className="mx-auto h-6 w-6 text-primary" />
                            <p className="font-bold text-lg">{course.enrolledStudents}</p>
                            <p className="text-xs text-muted-foreground">طالب</p>
                        </div>
                        <div>
                            <Star className="mx-auto h-6 w-6 text-amber-500" />
                            <p className="font-bold text-lg">{course.rating.toFixed(1)}</p>
                            <p className="text-xs text-muted-foreground">تقييم</p>
                        </div>
                    </div>
                </CardContent>
                <CardFooter className="grid grid-cols-2 gap-2">
                    <Button variant="outline">
                        <Edit className="ml-2 h-4 w-4" /> تعديل
                    </Button>
                    <Button variant="destructive">
                        <Trash2 className="ml-2 h-4 w-4" /> حذف
                    </Button>
                </CardFooter>
            </Card>
        ))}
      </div>
    </div>
  );
}

    