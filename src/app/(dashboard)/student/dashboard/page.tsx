

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
    <div>
      <h2 className="text-xl font-bold mb-4">{title}</h2>
      {courses.length > 0 ? (
        <div className="space-y-4">
          {courses.map(course => (
            <Card key={course.id}>
              <CardContent className="p-4 flex items-center justify-between">
                <div>
                  <h4 className="font-semibold">{course.title}</h4>
                  <p className="text-sm text-muted-foreground">{course.teacher}</p>
                </div>
                <div className="w-1/3 text-right">
                   <div className="flex items-center justify-end gap-2">
                    <span className="text-xs text-muted-foreground">{course.progress}%</span>
                    <Progress value={course.progress} className="w-full h-2" />
                   </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <p className="text-muted-foreground text-sm">لا توجد كورسات في هذه الفئة حاليًا.</p>
      )}
    </div>
  );

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-headline text-3xl font-bold">مرحبًا بعودتك، {studentData.name}!</h1>
        <p className="text-muted-foreground">هذا هو ملخص نشاطك الأكاديمي.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">النقاط المكتسبة</CardTitle>
                <span className="text-amber-500">🏆</span>
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">{studentData.points}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">الكورسات النشطة</CardTitle>
                <span className="text-primary">📚</span>
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">{courseCategories.active.length + courseCategories.trial.length}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">الكورسات المكتملة</CardTitle>
                <span className="text-green-500">✅</span>
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">{courseCategories.completed.length}</div>
            </CardContent>
          </Card>
      </div>
      
      <div className="grid gap-8 lg:grid-cols-1">
          <CourseList title="كورسات نشطة وتحت التجربة" courses={[...courseCategories.active, ...courseCategories.trial]} status="active" />
          <CourseList title="كورسات مكتملة" courses={courseCategories.completed} status="completed" />
      </div>

      <div className="text-center">
        <Link href="/student/browse-courses">
            <Button>اكتشف المزيد من الكورسات</Button>
        </Link>
      </div>
    </div>
  );
}

    