
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { teacherData } from '@/lib/placeholder-data';
import { Star, Users } from 'lucide-react';
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
        <CardContent className="grid gap-4 md:grid-cols-3">
            <div className="p-4 rounded-lg bg-card border flex items-center gap-4">
                <Users className="h-8 w-8 text-primary" />
                <div>
                    <h3 className="text-muted-foreground">إجمالي الطلاب</h3>
                    <p className="text-2xl font-bold">{totalStudents}</p>
                </div>
            </div>
            <div className="p-4 rounded-lg bg-card border flex items-center gap-4">
                <Star className="h-8 w-8 text-amber-500" />
                <div>
                    <h3 className="text-muted-foreground">متوسط التقييم</h3>
                    <p className="text-2xl font-bold">{averageRating.toFixed(1)}</p>
                </div>
            </div>
            <div className="p-4 rounded-lg bg-card border flex items-center gap-4">
                <div className="p-2 bg-primary rounded-md">
                    <BookCopy className="h-6 w-6 text-primary-foreground" />
                </div>
                <div>
                    <h3 className="text-muted-foreground">الكورسات المنشورة</h3>
                    <p className="text-2xl font-bold">{teacherData.totalCourses}</p>
                </div>
            </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>أحدث الكورسات</CardTitle>
            <Link href="/teacher/my-courses">
                <Button variant="outline">عرض الكل</Button>
            </Link>
        </CardHeader>
        <CardContent>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>اسم الكورس</TableHead>
                        <TableHead>الطلاب المسجلون</TableHead>
                        <TableHead>التقييم</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {teacherData.courses.slice(0, 3).map(course => (
                        <TableRow key={course.id}>
                            <TableCell className="font-medium">{course.title}</TableCell>
                            <TableCell>{course.enrolledStudents}</TableCell>
                            <TableCell className="flex items-center">
                                {course.rating.toFixed(1)} <Star className="w-4 h-4 ml-1 fill-amber-400 text-amber-500" />
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </CardContent>
      </Card>
    </div>
  );
}
import { BookCopy } from 'lucide-react';
