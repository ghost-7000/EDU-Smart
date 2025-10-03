
'use client';

import { courses, studentData } from '@/lib/placeholder-data';
import { notFound } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Star, BookOpen, Puzzle, Pencil, CheckCircle, RadioButton, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { useLanguage } from '@/hooks/use-language';
import Link from 'next/link';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Progress } from '@/components/ui/progress';

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
        case 'lesson': return <BookOpen className="w-4 h-4 text-primary" />;
        case 'quiz': return <Puzzle className="w-4 h-4 text-primary" />;
        case 'assignment': return <Pencil className="w-4 h-4 text-primary" />;
        default: return <FileText className="w-4 h-4 text-primary" />;
    }
  }

  return (
    <div className="container mx-auto py-8">
      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
            <div className="aspect-video bg-muted flex items-center justify-center rounded-lg mb-6 shadow-lg overflow-hidden">
                <span className="text-8xl">{course.emoji}</span>
            </div>
            <h1 className="font-headline text-4xl font-bold mb-2">{course.title}</h1>
            <div className="flex items-center gap-2 mb-4">
              <Badge variant="secondary">{course.code}</Badge>
              <Badge variant="outline">{course.specialization}</Badge>
            </div>
            <p className="text-lg text-muted-foreground mb-6">{course.description}</p>
            
            {isEnrolled && (
              <Card className="mb-6">
                <CardHeader>
                  <CardTitle>{t.courseContent}</CardTitle>
                </CardHeader>
                <CardContent>
                  <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="item-1">
                      <AccordionTrigger className="font-semibold text-lg">{t.lessons}</AccordionTrigger>
                      <AccordionContent>
                        <div className="space-y-3 pt-2">
                          {course.content.lessons.map(lesson => (
                            <div key={lesson.id} className="flex items-center justify-between p-3 bg-background rounded-md">
                              <div className="flex items-center gap-3">
                                {renderContentIcon('lesson')}
                                <span>{lesson.title}</span>
                              </div>
                              <Button variant="ghost" size="sm"><CheckCircle className="w-4 h-4 text-green-500" /></Button>
                            </div>
                          ))}
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-2">
                      <AccordionTrigger className="font-semibold text-lg">{t.quizzes}</AccordionTrigger>
                      <AccordionContent>
                         <div className="space-y-3 pt-2">
                          {course.content.quizzes.map(quiz => (
                            <div key={quiz.id} className="flex items-center justify-between p-3 bg-background rounded-md">
                              <div className="flex items-center gap-3">
                                 {renderContentIcon('quiz')}
                                <span>{quiz.title}</span>
                              </div>
                              <Button variant="outline" size="sm">{t.startQuiz}</Button>
                            </div>
                          ))}
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-3">
                      <AccordionTrigger className="font-semibold text-lg">{t.activities}</AccordionTrigger>
                      <AccordionContent>
                         <div className="space-y-3 pt-2">
                          {course.content.assignments.map(assignment => (
                            <div key={assignment.id} className="flex items-center justify-between p-3 bg-background rounded-md">
                               <div className="flex items-center gap-3">
                                {renderContentIcon('assignment')}
                                <span>{assignment.title}</span>
                              </div>
                              <Button variant="outline" size="sm">{t.submitAssignment}</Button>
                            </div>
                          ))}
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </CardContent>
              </Card>
            )}
        </div>
        <div>
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
