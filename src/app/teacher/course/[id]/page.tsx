
'use client';

import { useState } from 'react';
import { courses } from '@/lib/placeholder-data';
import { notFound, useRouter } from 'next/navigation';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { useToast } from '@/hooks/use-toast';
import { useLanguage } from '@/hooks/use-language';
import { ArrowLeft, BookOpen, Film, Pencil, PlusCircle, Puzzle, Users, BarChart, Settings, FileText } from 'lucide-react';
import { Course, Student } from '@/lib/types';
import { Progress } from '@/components/ui/progress';

// Mock function to get students for a course
const getStudentsForCourse = (courseId: number): Partial<Student>[] => {
  return [
    { name: 'علي بن محمد', email: 'ali.mohamed@email.com', enrolledCourses: [{ progress: 75 }] as any },
    { name: 'سارة بنت أحمد', email: 'sara.ahmed@email.com', enrolledCourses: [{ progress: 100 }] as any },
    { name: 'خالد العامري', email: 'khalid.amri@email.com', enrolledCourses: [{ progress: 45 }] as any },
  ].map(s => ({ ...s, progress: Math.floor(Math.random() * 101) }));
};

export default function ManageCoursePage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const { toast } = useToast();
  const { t } = useLanguage();

  const [course, setCourse] = useState<Course | undefined>(
    courses.find((c) => c.id.toString() === params.id)
  );

  if (!course) {
    notFound();
  }

  const students = getStudentsForCourse(course.id);

  const handleSaveChanges = () => {
    toast({
      title: "Changes Saved",
      description: `Your changes to "${course.title}" have been saved.`,
    });
  };

  const renderContentIcon = (type: string) => {
    switch (type) {
      case 'lesson': return <BookOpen className="w-4 h-4 text-primary" />;
      case 'quiz': return <Puzzle className="w-4 h-4 text-blue-500" />;
      case 'assignment': return <Pencil className="w-4 h-4 text-orange-500" />;
      case 'video': return <Film className="w-4 h-4 text-red-500" />;
      default: return <FileText className="w-4 h-4 text-gray-500" />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between">
        <div>
           <Button variant="ghost" size="sm" className="mb-2" onClick={() => router.back()}>
                <ArrowLeft className="mr-2 h-4 w-4" />
                {t.backToMyCourses}
            </Button>
          <h1 className="font-headline text-3xl font-bold">{course.title}</h1>
          <p className="text-muted-foreground">{course.code}</p>
        </div>
        <div className="flex items-center gap-2">
            {/* Quick stats could go here */}
        </div>
      </div>

      <Tabs defaultValue="content" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="content"><BookOpen className="ml-2"/>{t.courseContent}</TabsTrigger>
          <TabsTrigger value="students"><Users className="ml-2"/>{t.student}</TabsTrigger>
          <TabsTrigger value="analytics"><BarChart className="ml-2"/>{t.reports_sidebar}</TabsTrigger>
          <TabsTrigger value="settings"><Settings className="ml-2"/>{t.editProfile_sidebar}</TabsTrigger>
        </TabsList>
        
        <TabsContent value="content" className="mt-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>{t.courseContent}</CardTitle>
                <Button variant="outline" size="sm"><PlusCircle className="mr-2 h-4 w-4"/> إضافة وحدة</Button>
            </CardHeader>
            <CardContent>
               <Accordion type="single" collapsible className="w-full" defaultValue="item-1">
                {course.content.chapters.map((chapter) => (
                    <AccordionItem key={chapter.id} value={`item-${chapter.id}`}>
                    <AccordionTrigger className="text-lg font-semibold hover:no-underline">
                        <div className="flex items-center justify-between w-full pr-4">
                            <span>{chapter.title}</span>
                            <div className="flex items-center gap-2">
                                <Button variant="ghost" size="icon" className="h-8 w-8"><Pencil className="h-4 w-4"/></Button>
                            </div>
                        </div>
                    </AccordionTrigger>
                    <AccordionContent className="pl-4 pr-2 space-y-3">
                         <div className="border-l-2 border-primary/20 pl-4 space-y-3">
                            {chapter.lessons.map(item => (
                                <div key={`lesson-${item.id}`} className="flex items-center justify-between p-2 bg-background rounded-md border">
                                    <div className="flex items-center gap-3">
                                        {renderContentIcon('lesson')}
                                        <span>{item.title}</span>
                                    </div>
                                    <Button variant="ghost" size="icon" className="h-8 w-8"><Pencil className="h-4 w-4"/></Button>
                                </div>
                            ))}
                            {chapter.quizzes.map(item => (
                                <div key={`quiz-${item.id}`} className="flex items-center justify-between p-2 bg-background rounded-md border">
                                    <div className="flex items-center gap-3">
                                        {renderContentIcon('quiz')}
                                        <span>{item.title}</span>
                                    </div>
                                    <Button variant="ghost" size="icon" className="h-8 w-8"><Pencil className="h-4 w-4"/></Button>
                                </div>
                            ))}
                             {chapter.assignments.map(item => (
                                <div key={`assignment-${item.id}`} className="flex items-center justify-between p-2 bg-background rounded-md border">
                                    <div className="flex items-center gap-3">
                                        {renderContentIcon('assignment')}
                                        <span>{item.title}</span>
                                    </div>
                                    <Button variant="ghost" size="icon" className="h-8 w-8"><Pencil className="h-4 w-4"/></Button>
                                </div>
                            ))}
                             {chapter.additionalMaterials.map(item => (
                                <div key={`material-${item.id}`} className="flex items-center justify-between p-2 bg-background rounded-md border">
                                    <div className="flex items-center gap-3">
                                        {renderContentIcon(item.type)}
                                        <span>{item.title}</span>
                                    </div>
                                    <Button variant="ghost" size="icon" className="h-8 w-8"><Pencil className="h-4 w-4"/></Button>
                                </div>
                            ))}
                            <Button variant="outline" size="sm" className="w-full mt-2"><PlusCircle className="mr-2 h-4 w-4" /> إضافة درس أو نشاط</Button>
                         </div>
                    </AccordionContent>
                    </AccordionItem>
                ))}
                </Accordion>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="students" className="mt-6">
            <Card>
                <CardHeader>
                    <CardTitle>الطلاب المسجلين ({students.length})</CardTitle>
                    <CardDescription>قائمة الطلاب المسجلين في هذا الكورس وتقدمهم.</CardDescription>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>{t.fullName}</TableHead>
                                <TableHead>{t.email}</TableHead>
                                <TableHead className="text-right">{t.yourProgress}</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {students.map((student, index) => (
                                <TableRow key={index}>
                                    <TableCell className="font-medium">{student.name}</TableCell>
                                    <TableCell>{student.email}</TableCell>
                                    <TableCell className="text-right">
                                        <div className="flex items-center justify-end gap-2">
                                            <span>{student.enrolledCourses?.[0].progress}%</span>
                                            <Progress value={student.enrolledCourses?.[0].progress} className="w-24 h-2" />
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </TabsContent>
        
        <TabsContent value="analytics" className="mt-6">
            <Card>
                <CardHeader>
                    <CardTitle>تحليلات الأداء</CardTitle>
                    <CardDescription>قريباً! سيتم عرض تحليلات مفصلة لأداء الطلاب في هذا الكورس.</CardDescription>
                </CardHeader>
                <CardContent className="text-center text-muted-foreground py-12">
                     <BarChart className="mx-auto h-12 w-12 mb-4"/>
                    <p>ميزة التحليلات قيد التطوير.</p>
                </CardContent>
            </Card>
        </TabsContent>


        <TabsContent value="settings" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>إعدادات الكورس</CardTitle>
              <CardDescription>تعديل المعلومات الأساسية وخيارات الكورس.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                    <Label htmlFor="course-name">{t.courseName}</Label>
                    <Input id="course-name" value={course.title} onChange={(e) => setCourse({...course, title: e.target.value})} />
                    </div>
                    <div className="space-y-2">
                    <Label htmlFor="course-code">{t.courseCode}</Label>
                    <Input id="course-code" value={course.code} onChange={(e) => setCourse({...course, code: e.target.value})} />
                    </div>
                </div>
                 <div className="space-y-2">
                    <Label htmlFor="short-description">{t.shortDescription}</Label>
                    <Textarea id="short-description" value={course.description} onChange={(e) => setCourse({...course, description: e.target.value})} />
                </div>
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label htmlFor="price">{t.priceUSD}</Label>
                        <Input id="price" type="number" value={course.price ?? ''} onChange={(e) => setCourse({...course, price: e.target.value === '' ? null : Number(e.target.value)})} placeholder="اتركه فارغاً ليكون مجاني" />
                    </div>
                    <div className="flex items-center space-x-2 rtl:space-x-reverse rounded-md border p-4">
                        <Switch id="free-trial" checked={course.isFreeTrial} onCheckedChange={(checked) => setCourse({...course, isFreeTrial: checked})} />
                        <Label htmlFor="free-trial">{t.enableFreeTrial}</Label>
                    </div>
                </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleSaveChanges}>{t.saveChanges}</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
