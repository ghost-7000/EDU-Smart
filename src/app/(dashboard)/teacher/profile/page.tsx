
'use client';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter
} from '@/components/ui/card';
import { teacherData, placeholderImages, courses } from '@/lib/placeholder-data';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Presentation, Edit, Trash2, Star, Users, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { useLanguage } from '@/hooks/use-language';
import { useSearchParams, useRouter } from 'next/navigation';
import { CourseCard } from '@/components/course-card';

// A placeholder for fetching teacher data by ID
const getTeacherById = (id: number) => {
    // In a real app, you would fetch this from a database
    if (id === 1) return teacherData;
    return {
        id,
        name: `المعلم رقم ${id}`,
        branch: 'فرع غير معروف',
        totalCourses: courses.filter(c => c.teacherId === id).length,
        courses: courses.filter(c => c.teacherId === id).map(course => ({
            ...course,
            enrolledStudents: Math.floor(Math.random() * 200),
            reviews: []
        }))
    };
}


export default function TeacherProfilePage() {
    const { t } = useLanguage();
    const router = useRouter();
    const searchParams = useSearchParams();
    const teacherId = searchParams.get('id');

    // For this prototype, we'll use a simple lookup.
    // In a real app, you would fetch this data from your backend.
    const aTeacher = getTeacherById(teacherId ? parseInt(teacherId, 10) : teacherData.id);
    
    const avatarImage = placeholderImages.find(p => p.id === 'teacher-avatar');

  return (
    <div>
        <div className="flex items-center gap-4 mb-6">
            <Button variant="outline" size="icon" onClick={() => router.back()}>
                <ArrowLeft />
            </Button>
            <h1 className="text-3xl font-bold font-headline">{t.teacherProfile}</h1>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-1">
                <Card className="text-center">
                    <CardHeader className="items-center">
                        <Avatar className="w-24 h-24 mb-4">
                            {avatarImage && <AvatarImage src={avatarImage.imageUrl} alt={aTeacher.name} />}
                            <AvatarFallback className="text-4xl"><Presentation /></AvatarFallback>
                        </Avatar>
                        <CardTitle className="text-2xl">{aTeacher.name}</CardTitle>
                        <CardDescription>{aTeacher.branch}</CardDescription>
                         <p className="text-lg text-primary font-semibold mt-2">{aTeacher.totalCourses} {t.publishedCourses}</p>
                    </CardHeader>
                    <CardContent>
                        {/* This button would link to an edit page if it's the logged-in teacher's profile */}
                        <Button className="w-full" disabled={!teacherId || parseInt(teacherId, 10) !== teacherData.id}>{t.editProfile_sidebar}</Button>
                    </CardContent>
                </Card>
            </div>
            <div className="lg:col-span-2">
                <h2 className="text-2xl font-bold font-headline mb-4">{t.myCourses_teacher}</h2>
                 <div className="grid gap-6 md:grid-cols-2">
                    {aTeacher.courses.map((course) => (
                        <CourseCard course={course as any} key={course.id} />
                    ))}
                </div>
                 {aTeacher.courses.length > 0 && teacherId && parseInt(teacherId, 10) === teacherData.id && (
                    <Link href="/teacher/add-course" className="mt-4 inline-block">
                        <Button>{t.addCourse_teacher}</Button>
                    </Link>
                 )}
            </div>
        </div>
    </div>
  );
}
