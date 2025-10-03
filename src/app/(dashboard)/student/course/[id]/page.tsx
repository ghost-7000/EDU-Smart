
'use client';

import { courses, studentData } from '@/lib/placeholder-data';
import { notFound } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Star, BookOpen, Puzzle, Pencil, CheckCircle, FileText, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { useLanguage } from '@/hooks/use-language';
import Link from 'next/link';
import { Progress } from '@/components/ui/progress';
import { Label } from '@/components/ui/label';

export default function CourseDetailPage({ params }: { params: { id: string } }) {
  const { toast } = useToast();
  const { t } = useLanguage();
  
  const course = courses.find((c) => c.id.toString() === params.id);
  const enrollment = studentData.enrolledCourses.find(ec => ec.id === course?.id);


  if (!course) {
    notFound();
  }
  
  const isEnrolled = !!enrollment;

  const handleRegister = () => {
    toast({
        title: t.registeredSuccess,
        description: `${t.registeredCourse} "${course.title}".`,
    });
  }

  const renderContentIcon = (type: string) => {
    switch(type) {
        case 'lesson': return <BookOpen className="w-5 h-5 text-primary" />;
        case 'quiz': return <Puzzle className="w-5 h-5 text-primary" />;
        case 'assignment': return <Pencil className="w-5 h-5 text-primary" />;
        default: return <FileText className="w-5 h-5 text-primary" />;
    }
  }

  return (
    <div className="container mx-auto py-8">
      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
            <Card className="overflow-hidden">
                <CardHeader className="bg-muted/40 p-6">
                    <div className="flex items-start justify-between gap-4">
                        <div>
                             <h1 className="font-headline text-4xl font-bold mb-2">{course.title}</h1>
                            <div className="flex items-center gap-2 mb-4">
                                <Badge variant="secondary">{course.code}</Badge>
                                <Badge variant="outline">{course.specialization}</Badge>
                            </div>
                            <p className="text-muted-foreground max-w-2xl">{course.description}</p>
                        </div>
                        <div className="text-8xl hidden sm:block -mt-4">{course.emoji}</div>
                    </div>
                </CardHeader>
            </Card>
            
            {isEnrolled && (
              <>
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2"><BookOpen className="w-6 h-6 text-primary"/>{t.lessons}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {course.content.lessons.map(lesson => (
                        <div key={lesson.id} className="flex items-center justify-between p-3 bg-background rounded-md border hover:bg-muted/50 transition-colors">
                            <div className="flex items-center gap-3">
                            <CheckCircle className="w-5 h-5 text-green-500" />
                            <span className="font-medium">{lesson.title}</span>
                            </div>
                            <Button variant="ghost" size="icon"><Download className="w-5 h-5" /></Button>
                        </div>
                    ))}
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2"><Puzzle className="w-6 h-6 text-primary"/>{t.quizzes}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {course.content.quizzes.map(quiz => (
                        <div key={quiz.id} className="flex items-center justify-between p-3 bg-background rounded-md border hover:bg-muted/50 transition-colors">
                            <div className="flex items-center gap-3">
                                {renderContentIcon('quiz')}
                                <span className="font-medium">{quiz.title}</span>
                            </div>
                            <Button variant="outline" size="sm">{t.startQuiz}</Button>
                        </div>
                    ))}
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2"><Pencil className="w-6 h-6 text-primary"/>{t.activities}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                     {course.content.assignments.map(assignment => (
                        <div key={assignment.id} className="flex items-center justify-between p-3 bg-background rounded-md border hover:bg-muted/50 transition-colors">
                            <div className="flex items-center gap-3">
                            {renderContentIcon('assignment')}
                            <span className="font-medium">{assignment.title}</span>
                            </div>
                            <Button variant="outline" size="sm">{t.submitAssignment}</Button>
                        </div>
                    ))}
                  </CardContent>
                </Card>
              </>
            )}
        </div>
        <div className="space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle>{t.courseDetails}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    {isEnrolled && enrollment ? (
                      <div>
                        <Label>{t.yourProgress}</Label>
                        <Progress value={enrollment.progress} className="my-2" />
                        <p className="text-sm text-muted-foreground text-right">{enrollment.progress}% {t.completed}</p>
                      </div>
                    ) : (
                      <div className="flex justify-between items-center">
                          <span className="font-semibold">{t.price}</span>
                          <div>
                          {course.isFreeTrial ? (
                              <Badge variant="outline" className="border-green-500 text-green-600">{t.freeTrial}</Badge>
                          ) : course.price !== null ? (
                              <p className="font-bold text-lg text-primary">{course.price} {t.omr}</p>
                          ) : (
                              <Badge variant="secondary">{t.free}</Badge>
                          )}
                          </div>
                      </div>
                    )}
                    <div className="flex justify-between items-center">
                        <span className="font-semibold">{t.teacher}</span>
                        <Link href={`/teacher/profile?id=${course.teacherId}`} className="text-muted-foreground hover:underline">{course.teacher}</Link>
                    </div>
                     <div className="flex justify-between items-center">
                        <span className="font-semibold">{t.rating}</span>
                        <div className="flex items-center">
                            <span className="font-bold text-amber-500 mr-1">{course.rating.toFixed(1)}</span>
                            <Star className="w-4 h-4 fill-amber-400 text-amber-500" />
                        </div>
                    </div>
                </CardContent>
                <CardFooter>
                    {isEnrolled ? (
                      <Button className="w-full" variant="outline" asChild>
                        <Link href="/student/my-courses">{t.backToMyCourses}</Link>
                      </Button>
                    ) : (
                      <Button className="w-full" onClick={handleRegister}>{t.enrollNow}</Button>
                    )}
                </CardFooter>
            </Card>
        </div>
      </div>
    </div>
  );
}

    