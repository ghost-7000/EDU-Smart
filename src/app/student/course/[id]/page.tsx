
'use client';

import { courses, studentData } from '@/lib/placeholder-data';
import { notFound } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Star, BookOpen, Puzzle, Pencil, CheckCircle, FileText, Download, Youtube, MessageSquare, Lock } from 'lucide-react';
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
} from "@/components/ui/accordion";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';

export default function CourseDetailPage({ params }: { params: { id: string } }) {
  const { toast } = useToast();
  const { t } = useLanguage();
  
  const course = courses.find((c) => c.id.toString() === params.id);
  const enrollment = studentData.enrolledCourses.find(ec => ec.id === course?.id);
  
  const [rating, setRating] = useState(0);
  const [showEnrollDialog, setShowEnrollDialog] = useState(false);

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

  const handleContentClick = (isPaid: boolean) => {
    if (isPaid && !isEnrolled) {
      setShowEnrollDialog(true);
    }
    // If free or enrolled, do nothing (or navigate to content page in a real app)
  };


  const renderContentIcon = (type: string) => {
    switch(type) {
        case 'lesson': return <BookOpen className="w-5 h-5 text-primary" />;
        case 'quiz': return <Puzzle className="w-5 h-5 text-primary" />;
        case 'assignment': return <Pencil className="w-5 h-5 text-primary" />;
        case 'video': return <Youtube className="w-5 h-5 text-primary" />;
        default: return <FileText className="w-5 h-5 text-primary" />;
    }
  }

  const renderLockedContent = (content: any, type: string, actionText: string) => {
    const isActionable = ['video', 'quiz', 'assignment'].includes(type);
    return (
        <div 
            key={content.id} 
            className="flex items-center justify-between p-3 bg-background rounded-md border hover:bg-muted/50 transition-colors cursor-pointer"
            onClick={() => handleContentClick(content.isPaid)}
        >
            <div className="flex items-center gap-3">
                {content.isPaid && !isEnrolled ? <Lock className="w-5 h-5 text-amber-500" /> : renderContentIcon(type)}
                <span className="font-medium">{content.title}</span>
            </div>
            {isActionable && <Button variant="outline" size="sm">{content.isPaid && !isEnrolled ? t.enrollToUnlock : actionText}</Button>}
        </div>
    );
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
            
            <Card>
            <CardHeader>
                <CardTitle>{t.courseContent}</CardTitle>
            </CardHeader>
            <CardContent>
                <Accordion type="single" collapsible className="w-full" defaultValue="item-1">
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
                                <div key={material.id} onClick={() => handleContentClick(material.isPaid)}>
                                    <div className="flex items-center gap-2 mb-2">
                                        {material.isPaid && !isEnrolled ? <Lock className="w-5 h-5 text-amber-500" /> : <Youtube className="w-5 h-5 text-primary" />}
                                        <h4 className="font-medium">{material.title}</h4>
                                    </div>
                                    <div className={`aspect-video relative ${material.isPaid && !isEnrolled ? 'cursor-pointer' : ''}`}>
                                        {material.isPaid && !isEnrolled && (
                                            <div className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center rounded-lg z-10">
                                                <Lock className="w-12 h-12 text-white/80 mb-4" />
                                                <Button>{t.enrollToUnlock}</Button>
                                            </div>
                                        )}
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
                                  renderLockedContent(material, material.type, t.open)
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
                                    <div key={lesson.id} onClick={() => handleContentClick(lesson.isPaid)} className="flex items-center justify-between p-3 bg-background rounded-md border hover:bg-muted/50 transition-colors cursor-pointer">
                                        <div className="flex items-center gap-3">
                                            {lesson.isPaid && !isEnrolled ? <Lock className="w-5 h-5 text-amber-500" /> : <BookOpen className="w-5 h-5 text-green-500" />}
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
                                    renderLockedContent(quiz, 'quiz', t.startQuiz)
                                ))}
                            </div>
                        </div>
                        )}

                        {chapter.assignments && chapter.assignments.length > 0 && (
                        <div>
                            <h3 className="font-bold mb-2 text-primary">{t.activities}</h3>
                            <div className="space-y-3">
                                {chapter.assignments.map(assignment => (
                                    renderLockedContent(assignment, 'assignment', t.submitAssignment)
                                ))}
                            </div>
                        </div>
                        )}

                        {!chapter.lessons?.length && !chapter.quizzes?.length && !chapter.assignments?.length && !chapter.additionalMaterials?.length && (
                        <p className="text-sm text-muted-foreground">{t.noContentYet}</p>
                        )}
                    </AccordionContent>
                    </AccordionItem>
                ))}
                </Accordion>
            </CardContent>
            </Card>
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
                        <Link href={`/student/teacher/${course.teacherId}`} className="text-muted-foreground hover:underline">{course.teacher}</Link>
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
      <AlertDialog open={showEnrollDialog} onOpenChange={setShowEnrollDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{t.paidContent}</AlertDialogTitle>
            <AlertDialogDescription>{t.enrollToAccess}</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>{t.cancel}</AlertDialogCancel>
            <AlertDialogAction onClick={handleRegister}>{t.enrollNow}</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
