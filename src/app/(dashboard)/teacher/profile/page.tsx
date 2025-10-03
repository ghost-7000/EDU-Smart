
'use client';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter
} from '@/components/ui/card';
import { teacherData, placeholderImages } from '@/lib/placeholder-data';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Presentation, Edit, Trash2, Star, Users } from 'lucide-react';
import Link from 'next/link';
import { useLanguage } from '@/hooks/use-language';

export default function TeacherProfilePage() {
    const { t } = useLanguage();
    const avatarImage = placeholderImages.find(p => p.id === 'teacher-avatar');

  return (
    <div>
      <h1 className="text-3xl font-bold font-headline mb-6">{t.myProfile}</h1>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-1">
                <Card className="text-center">
                    <CardHeader className="items-center">
                        <Avatar className="w-24 h-24 mb-4">
                            {avatarImage && <AvatarImage src={avatarImage.imageUrl} alt="Teacher Avatar" />}
                            <AvatarFallback className="text-4xl"><Presentation /></AvatarFallback>
                        </Avatar>
                        <CardTitle className="text-2xl">{teacherData.name}</CardTitle>
                        <CardDescription>{teacherData.branch}</CardDescription>
                         <p className="text-lg text-primary font-semibold mt-2">{teacherData.totalCourses} {t.publishedCourses}</p>
                    </CardHeader>
                    <CardContent>
                        <Button className="w-full">{t.editProfile_sidebar}</Button>
                    </CardContent>
                </Card>
            </div>
            <div className="lg:col-span-2">
                <h2 className="text-2xl font-bold font-headline mb-4">{t.myCourses_teacher}</h2>
                 <div className="grid gap-6 md:grid-cols-1">
                    {teacherData.courses.map((course) => (
                    <Card key={course.id}>
                        <CardHeader>
                        <CardTitle className="truncate">{course.title}</CardTitle>
                        <CardDescription>{course.code}</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                        <div className="flex justify-around p-3 rounded-md bg-muted">
                            <div className="text-center">
                            <Users className="mx-auto h-6 w-6 text-primary" />
                            <p className="font-bold text-lg">{course.enrolledStudents}</p>
                            <p className="text-xs text-muted-foreground">{t.student}</p>
                            </div>
                            <div className="text-center">
                            <Star className="mx-auto h-6 w-6 text-amber-500" />
                            <p className="font-bold text-lg">{course.rating.toFixed(1)}</p>
                            <p className="text-xs text-muted-foreground">{t.rating}</p>
                            </div>
                        </div>
                        </CardContent>
                        <CardFooter className="grid grid-cols-2 gap-2">
                        <Button variant="outline">
                            <Edit className="ml-2 h-4 w-4" /> {t.edit}
                        </Button>
                        <Button variant="destructive">
                            <Trash2 className="ml-2 h-4 w-4" /> {t.delete}
                        </Button>
                        </CardFooter>
                    </Card>
                    ))}
                </div>
                <Link href="/teacher/add-course" className="mt-4 inline-block">
                    <Button>{t.addCourse_teacher}</Button>
                </Link>
            </div>
        </div>
    </div>
  );
}
