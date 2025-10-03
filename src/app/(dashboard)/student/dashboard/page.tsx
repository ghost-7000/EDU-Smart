
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { studentData } from '@/lib/placeholder-data';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function StudentDashboardPage() {
  const courseCategories = {
    active: studentData.enrolledCourses.filter(c => c.status === 'active'),
    trial: studentData.enrolledCourses.filter(c => c.status === 'trial'),
    completed: studentData.enrolledCourses.filter(c => c.status === 'completed'),
  };

  const CourseList = ({ title, courses, status }: { title: string; courses: typeof studentData.enrolledCourses; status: 'active' | 'trial' | 'completed' }) => (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {courses.length > 0 ? courses.map(course => (
          <div key={course.id} className="p-3 rounded-lg border">
            <div className="flex justify-between items-center mb-2">
                <h4 className="font-semibold">{course.title}</h4>
                <Badge variant={status === 'completed' ? 'default' : 'secondary'} className={status === 'completed' ? 'bg-green-500' : ''}>{course.status}</Badge>
            </div>
            <p className="text-sm text-muted-foreground mb-2">{course.teacher}</p>
            <Progress value={course.progress} className="w-full" />
            <p className="text-xs text-muted-foreground mt-1">{course.progress}% مكتمل</p>
          </div>
        )) : (
            <p className="text-muted-foreground text-sm">لا توجد كورسات في هذه الفئة حاليًا.</p>
        )}
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="font-headline text-2xl">مرحبًا بعودتك، {studentData.name}!</CardTitle>
          <CardDescription>هذا هو ملخص نشاطك الأكاديمي.</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4 md:grid-cols-3">
            <div className="p-4 rounded-lg bg-card border">
                <h3 className="text-muted-foreground">النقاط المكتسبة</h3>
                <p className="text-2xl font-bold text-amber-500">{studentData.points}</p>
            </div>
            <div className="p-4 rounded-lg bg-card border">
                <h3 className="text-muted-foreground">الكورسات النشطة</h3>
                <p className="text-2xl font-bold">{courseCategories.active.length + courseCategories.trial.length}</p>
            </div>
            <div className="p-4 rounded-lg bg-card border">
                <h3 className="text-muted-foreground">الكورسات المكتملة</h3>
                <p className="text-2xl font-bold">{courseCategories.completed.length}</p>
            </div>
        </CardContent>
      </Card>
      
      <div className="grid gap-6 lg:grid-cols-2">
          <CourseList title="كورسات نشطة" courses={courseCategories.active} status="active" />
          <CourseList title="تحت التجربة" courses={courseCategories.trial} status="trial" />
      </div>
      
      <CourseList title="كورسات مكتملة" courses={courseCategories.completed} status="completed" />

      <div className="text-center">
        <Link href="/student/browse-courses">
            <Button>اكتشف المزيد من الكورسات</Button>
        </Link>
      </div>
    </div>
  );
}
