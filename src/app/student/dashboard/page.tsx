
'use client';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { studentData } from '@/lib/placeholder-data';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/hooks/use-language';

export default function StudentDashboardPage() {
  const { t } = useLanguage();
  const courseCategories = {
    active: studentData.enrolledCourses.filter(c => c.status === 'active'),
    trial: studentData.enrolledCourses.filter(c => c.status === 'trial'),
    completed: studentData.enrolledCourses.filter(c => c.status === 'completed'),
  };

  const CourseList = ({ title, courses }: { title: string; courses: typeof studentData.enrolledCourses; }) => (
    <Card>
        <CardHeader>
            <CardTitle>{title}</CardTitle>
        </CardHeader>
      <CardContent>
      {courses.length > 0 ? (
        <div className="space-y-4">
          {courses.map(course => (
            <Card key={course.id}>
              <CardContent className="p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className='flex-grow'>
                  <h4 className="font-semibold">{course.title}</h4>
                  <p className="text-sm text-muted-foreground">{course.teacher}</p>
                </div>
                <div className="w-full sm:w-1/3 text-right">
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
        <p className="text-muted-foreground text-sm">{t.noCoursesInCategory}</p>
      )}
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-headline text-3xl font-bold">{t.welcomeStudent} {studentData.name}!</h1>
        <p className="text-muted-foreground">{t.academicSummary}</p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{t.pointsEarned}</CardTitle>
                <span className="text-amber-500">🏆</span>
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">{studentData.points}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{t.activeCourses}</CardTitle>
                <span className="text-primary">📚</span>
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">{courseCategories.active.length + courseCategories.trial.length}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{t.completedCourses}</CardTitle>
                <span className="text-green-500">✅</span>
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">{courseCategories.completed.length}</div>
            </CardContent>
          </Card>
      </div>
      
      <div className="grid gap-8 lg:grid-cols-1">
          <CourseList title={t.activeAndTrialCourses} courses={[...courseCategories.active, ...courseCategories.trial]} />
          <CourseList title={t.completedCourses} courses={courseCategories.completed} />
      </div>

      <div className="text-center">
        <Link href="/student/browse-courses">
            <Button>{t.discoverMoreCourses}</Button>
        </Link>
      </div>
    </div>
  );
}
