
'use client';

import { courses, studentData } from '@/lib/placeholder-data';
import { notFound } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Star, BookOpen, Puzzle, Pencil, CheckCircle, FileText, Download, Youtube, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { useLanguage } from '@/hooks/use-language';
import Link from 'next/link';
import { Progress } from '@/components/ui/progress';
import { Label } from '@/components/ui/label';
import { useState } from 'react';
import { Textarea } from '@/components/ui/textarea';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

export default function CourseDetailPage({ params }: { params: { id: string } }) {
  const { toast } = useToast();
  const { t } = useLanguage();
  
  const course = courses.find((c) => c.id.toString() === params.id);
  const enrollment = studentData.enrolledCourses.find(ec => ec.id === course?.id);
  
  const [rating, setRating] = useState(0);

  if (!course) {
    notFound();
  }
  
  const isEnrolled = !!enrollment;
  const isCompleted = enrollment?.status === 'completed';

  const handleRegister = () => {
    toast({
        title: t.registeredSuccess,
        description: `${t.registeredCourse} "${course.title}".`,
    });
  }

  const handleSendMessage = () => {
    toast({
        title: t.messageSent,
        description: t.messageSentDesc,
    });
  }
  
  const handleRateCourse = () => {
    if(rating > 0){
        toast({
            title: t.ratingSuccess,
            description: `${t.ratingThanks} "${course.title}".`,
        })
    }
  }


  const renderContentIcon = (type: string) => {
    switch(type) {
        case 'lesson': return <BookOpen className="w-5 h-5 text-primary" />;
        case 'quiz': return <Puzzle className="w-5 h-5 text-primary" />;
        case 'assignment': return <Pencil className="w-5 h-5 text-primary" />;
        case 'video': return <Youtube className="w-5 h-5 text-primary" />;
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
              <Card>
                <CardHeader>
                  <CardTitle>{t.courseContent}</CardTitle>
                </CardHeader>
                <CardContent>
                  <Accordion type="single" collapsible className="w-full">
                    {course.content.chapters.map((chapter) => (
                      <AccordionItem key={chapter.id} value={`item-${chapter.id}`}>
                        <AccordionTrigger className="font-semibold text-lg">{chapter.title}</AccordionTrigger>
                        <AccordionContent className="space-y-4 pt-2">
                          {chapter.additionalMaterials && chapter.additionalMaterials.length > 0 && (
                            <div>
                                <h3 className="font-bold mb-2 text-primary">{t.additionalMaterials}</h3>
                                <div className="space-y-3">
                                {chapter.additionalMaterials.map(material => (
                                    material.type === 'video' && material.url ? (
                                    <div key={material.id}>
                                        <h4 className="font-medium mb-2">{material.title}</h4>
                                        <div className="aspect-video">
                                            <iframe 
                                                className="w-full h-full rounded-lg"
                                                src={material.url} 
                                                title={material.title} 
                                                frameBorder="0" 
                                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                                                allowFullScreen>
                                            </iframe>
                                        </div>
                                    </div>
                                    ) : (
                                    <div key={material.id} className="flex items-center justify-between p-3 bg-background rounded-md border hover:bg-muted/50 transition-colors">
                                        <div className="flex items-center gap-3">
                                            {renderContentIcon(material.type)}
                                            <span className="font-medium">{material.title}</span>
                                        </div>
                                        <Button variant="outline" size="sm">{t.open}</Button>
                                    </div>
                                    )
                                ))}
                                </div>
                            </div>
                          )}

                          {chapter.lessons && chapter.lessons.length > 0 && (
                            <div>
                                <h3 className="font-bold mb-2 text-primary">{t.lessons}</h3>
                                <div className="space-y-3">
                                    {chapter.lessons.map(lesson => (
                                        <div key={lesson.id} className="flex items-center justify-between p-3 bg-background rounded-md border hover:bg-muted/50 transition-colors">
                                            <div className="flex items-center gap-3">
                                                <CheckCircle className="w-5 h-5 text-green-500" />
                                                <span className="font-medium">{lesson.title}</span>
                                            </div>
                                            <Button variant="ghost" size="icon"><Download className="w-5 h-5" /></Button>
                                        </div>
                                    ))}
                                </div>
                            </div>
                          )}

                          {chapter.quizzes && chapter.quizzes.length > 0 && (
                            <div>
                                <h3 className="font-bold mb-2 text-primary">{t.quizzes}</h3>
                                <div className="space-y-3">
                                    {chapter.quizzes.map(quiz => (
                                        <div key={quiz.id} className="flex items-center justify-between p-3 bg-background rounded-md border hover:bg-muted/50 transition-colors">
                                            <div className="flex items-center gap-3">
                                                {renderContentIcon('quiz')}
                                                <span className="font-medium">{quiz.title}</span>
                                            </div>
                                            <Button variant="outline" size="sm">{t.startQuiz}</Button>
                                        </div>
                                    ))}
                                </div>
                            </div>
                          )}

                          {chapter.assignments && chapter.assignments.length > 0 && (
                            <div>
                                <h3 className="font-bold mb-2 text-primary">{t.activities}</h3>
                                <div className="space-y-3">
                                    {chapter.assignments.map(assignment => (
                                        <div key={assignment.id} className="flex items-center justify-between p-3 bg-background rounded-md border hover:bg-muted/50 transition-colors">
                                            <div className="flex items-center gap-3">
                                            {renderContentIcon('assignment')}
                                            <span className="font-medium">{assignment.title}</span>
                                            </div>
                                            <Button variant="outline" size="sm">{t.submitAssignment}</Button>
                                        </div>
                                    ))}
                                </div>
                            </div>
                          )}

                          {chapter.lessons.length === 0 && chapter.quizzes.length === 0 && chapter.assignments.length === 0 && chapter.additionalMaterials.length === 0 && (
                            <p className="text-sm text-muted-foreground">{t.noContentYet}</p>
                          )}
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </CardContent>
              </Card>
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
                      isCompleted ? (
                        <div className="w-full">
                            <h3 className="text-center font-semibold mb-2">{t.rateTheCourse}</h3>
                             <div className="flex justify-center gap-1 mb-4" dir="ltr">
                                {[1, 2, 3, 4, 5].map((star) => (
                                <Star
                                    key={star}
                                    className={`w-8 h-8 cursor-pointer transition-colors ${
                                    rating >= star ? 'text-amber-500 fill-amber-400' : 'text-muted-foreground'
                                    }`}
                                    onClick={() => setRating(star)}
                                />
                                ))}
                            </div>
                            <Button className="w-full" onClick={handleRateCourse}>{t.submitRating}</Button>
                        </div>
                      ) : (
                        <Button className="w-full" variant="outline" asChild>
                           <Link href="/student/my-courses">{t.backToMyCourses}</Link>
                        </Button>
                      )
                    ) : (
                      <Button className="w-full" onClick={handleRegister}>{t.enrollNow}</Button>
                    )}
                </CardFooter>
            </Card>

            {isEnrolled && !isCompleted && (
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                           <MessageSquare className="w-6 h-6 text-primary" /> {t.askTheTeacher}
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            <Textarea placeholder={t.askTheTeacherPlaceholder} />
                            <Button className="w-full" onClick={handleSendMessage}>{t.sendMessage}</Button>
                        </div>
                    </CardContent>
                </Card>
            )}
        </div>
      </div>
    </div>
  );
}
