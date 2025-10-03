
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
import { ArrowLeft, BookOpen, Film, Pencil, PlusCircle, Puzzle, Users, BarChart as BarChartIcon, Settings, FileText, Lightbulb, TrendingUp, UserCheck, AlertCircle } from 'lucide-react';
import { Course, Student } from '@/lib/types';
import { Progress } from '@/components/ui/progress';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { BarChart, CartesianGrid, XAxis, YAxis, PieChart, Pie, Cell, LineChart, Line } from "recharts"

// Mock function to get students for a course
const getStudentsForCourse = (courseId: number): Partial<Student>[] => {
  return [
    { name: 'علي بن محمد', email: 'ali.mohamed@email.com', enrolledCourses: [{ progress: 75 }] as any },
    { name: 'سارة بنت أحمد', email: 'sara.ahmed@email.com', enrolledCourses: [{ progress: 100 }] as any },
    { name: 'خالد العامري', email: 'khalid.amri@email.com', enrolledCourses: [{ progress: 45 }] as any },
    { name: 'مريم الشيدية', email: 'maryam.shaidi@email.com', enrolledCourses: [{ progress: 90 }] as any },
    { name: 'ناصر البلوشي', email: 'nasser.balushi@email.com', enrolledCourses: [{ progress: 30 }] as any },
  ].map(s => ({ ...s, progress: Math.floor(Math.random() * 101) }));
};

const analyticsData = {
    completionRate: 68,
    averageGrade: 75,
    performanceDistribution: [
        { level: 'ممتاز', value: 25, fill: 'var(--color-excellent)' },
        { level: 'جيد', value: 45, fill: 'var(--color-good)' },
        { level: 'ضعيف', value: 30, fill: 'var(--color-weak)' },
    ],
    performanceByUnit: [
        { unit: 'الوحدة 1', grade: 85 },
        { unit: 'الوحدة 2', grade: 60 },
        { unit: 'الوحدة 3', grade: 75 },
        { unit: 'الوحدة 4', grade: 80 },
        { unit: 'الوحدة 5', grade: 72 },
    ]
};

const chartConfig = {
    excellent: { label: 'ممتاز', color: 'hsl(var(--chart-2))' },
    good: { label: 'جيد', color: 'hsl(var(--chart-1))' },
    weak: { label: 'ضعيف', color: 'hsl(var(--chart-5))' },
    grade: { label: 'الدرجة', color: 'hsl(var(--primary))' },
};


export default function ManageCoursePage({ params }: { params: { id:string } }) {
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
          <TabsTrigger value="analytics"><BarChartIcon className="ml-2"/>{t.reports_sidebar}</TabsTrigger>
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
            <div className="space-y-6">
                <Card>
                    <CardHeader>
                        <CardTitle>رؤى ذكية (AI Insights)</CardTitle>
                        <CardDescription>تحليلات يقدمها الذكاء الاصطناعي لتحسين جودة الكورس.</CardDescription>
                    </CardHeader>
                    <CardContent className="grid gap-4 md:grid-cols-3">
                         <div className="flex items-start gap-4 p-4 border rounded-lg bg-red-50 dark:bg-red-900/20">
                            <AlertCircle className="h-6 w-6 text-red-600 dark:text-red-400 mt-1" />
                            <div>
                                <h4 className="font-semibold text-red-800 dark:text-red-300">أداء ضعيف في الوحدة 2</h4>
                                <p className="text-sm text-red-700 dark:text-red-400/80">30% من الطلاب يواجهون صعوبة في هذه الوحدة. متوسط الدرجات أقل من 60%.</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-4 p-4 border rounded-lg bg-blue-50 dark:bg-blue-900/20">
                            <Lightbulb className="h-6 w-6 text-blue-600 dark:text-blue-400 mt-1" />
                            <div>
                                <h4 className="font-semibold text-blue-800 dark:text-blue-300">اقتراح تحسين</h4>
                                <p className="text-sm text-blue-700 dark:text-blue-400/80">ينصح بإضافة فيديو شرح للجزء العملي في الوحدة 2 لتعزيز الفهم.</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-4 p-4 border rounded-lg bg-amber-50 dark:bg-amber-900/20">
                            <UserCheck className="h-6 w-6 text-amber-600 dark:text-amber-400 mt-1" />
                            <div>
                                <h4 className="font-semibold text-amber-800 dark:text-amber-300">طالب بحاجة لمتابعة</h4>
                                <p className="text-sm text-amber-700 dark:text-amber-400/80">الطالب "ناصر البلوشي" لم يكمل أي نشاط في آخر أسبوعين. قد يحتاج لمتابعة.</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                    <Card>
                        <CardHeader className="pb-2">
                            <CardTitle className="text-base">متوسط نسبة الإكمال</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-4xl font-bold">{analyticsData.completionRate}%</p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="pb-2">
                            <CardTitle className="text-base">متوسط الدرجات</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-4xl font-bold">{analyticsData.averageGrade}%</p>
                        </CardContent>
                    </Card>
                     <Card className="lg:col-span-2">
                        <CardHeader>
                            <CardTitle>توزيع مستويات الطلاب</CardTitle>
                        </CardHeader>
                        <CardContent className="h-40">
                             <ChartContainer config={chartConfig} className="w-full h-full">
                                <PieChart>
                                    <ChartTooltip content={<ChartTooltipContent hideLabel />} />
                                    <Pie data={analyticsData.performanceDistribution} dataKey="value" nameKey="level" innerRadius={30} strokeWidth={5}>
                                        {analyticsData.performanceDistribution.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={entry.fill} />
                                        ))}
                                    </Pie>
                                </PieChart>
                            </ChartContainer>
                        </CardContent>
                    </Card>
                </div>
                <Card>
                     <CardHeader>
                        <CardTitle>متوسط الأداء عبر الوحدات</CardTitle>
                    </CardHeader>
                    <CardContent className="h-80">
                        <ChartContainer config={chartConfig} className="w-full h-full">
                            <LineChart data={analyticsData.performanceByUnit} margin={{ top: 5, right: 20, left: -10, bottom: 0 }}>
                                <CartesianGrid vertical={false} />
                                <XAxis dataKey="unit" tickLine={false} axisLine={false} tickMargin={8} />
                                <YAxis tickLine={false} axisLine={false} tickMargin={8} />
                                <ChartTooltip cursor={false} content={<ChartTooltipContent indicator="line" />} />
                                <Line dataKey="grade" type="monotone" stroke="var(--color-grade)" strokeWidth={2} dot={false} />
                            </LineChart>
                        </ChartContainer>
                    </CardContent>
                </Card>
            </div>
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
