
'use client';
import {
  Card,
  CardContent,
  CardFooter,
} from '@/components/ui/card';
import { allTeachers, courses as allCourses } from '@/lib/placeholder-data';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Star, Users, BookCopy, MessageSquare, UserCircle } from 'lucide-react';
import { useLanguage } from '@/hooks/use-language';
import { useRouter } from 'next/navigation';
import { CourseCard } from '@/components/course-card';
import { useToast } from '@/hooks/use-toast';
import { Teacher, Course } from '@/lib/types';


const getTeacherById = (id: number): Teacher | undefined => {
    const teacherData = allTeachers.find(teacher => teacher.id === id);
    if (!teacherData) return undefined;

    const teacherCourses = allCourses.filter(course => course.teacherId === id);
    
    return {
        ...teacherData,
        courses: teacherCourses,
    };
}


export default function ViewTeacherProfilePage({ params }: { params: { id: string } }) {
    const { t } = useLanguage();
    const router = useRouter();
    const { toast } = useToast();
    const teacherId = parseInt(params.id, 10);
    
    const profile = getTeacherById(teacherId);
    
    if (!profile) {
        return <div className="text-center py-10">{t.teacherNotFound}</div>
    }

    const handleContactTeacher = () => {
        toast({
            title: t.contactTeacher,
            description: t.contactTeacherDesc,
        });
    }

  return (
    <div className="container mx-auto py-6">
        <div className="flex items-center gap-4 mb-6">
            <Button variant="outline" size="icon" onClick={() => router.back()} aria-label="Go back">
                <ArrowLeft />
            </Button>
            <h1 className="text-3xl font-bold font-headline">{t.teacherProfile}</h1>
        </div>
        
        <div className="space-y-8">
            <Card className="overflow-hidden">
                <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row items-center gap-6 text-center md:text-start">
                         <Avatar className="w-32 h-32 border-4 border-primary">
                            <AvatarFallback className="text-6xl bg-muted">
                                <UserCircle />
                            </AvatarFallback>
                        </Avatar>
                        <div className="flex-1 space-y-2">
                            <h2 className="text-3xl font-bold font-headline">{profile.name}</h2>
                            <p className="text-lg text-primary font-semibold">{profile.specialization}</p>
                            <p className="text-muted-foreground max-w-2xl mx-auto md:mx-0">{profile.bio}</p>
                            <Button onClick={handleContactTeacher} className="mt-2">
                                <MessageSquare className="mr-2 h-4 w-4" /> {t.contactTeacher}
                            </Button>
                        </div>
                    </div>
                </CardContent>
                <CardFooter className="bg-muted/50 p-4 grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
                    <div className="flex items-center justify-center gap-2">
                        <Users className="h-6 w-6 text-primary" />
                        <div>
                            <p className="text-xl font-bold">{profile.totalStudents}</p>
                            <h3 className="text-xs text-muted-foreground uppercase tracking-wider">{t.totalStudents}</h3>
                        </div>
                    </div>
                    <div className="flex items-center justify-center gap-2">
                        <Star className="h-6 w-6 text-amber-500" />
                        <div>
                            <p className="text-xl font-bold">{profile.averageRating.toFixed(1)}</p>
                            <h3 className="text-xs text-muted-foreground uppercase tracking-wider">{t.averageRating}</h3>
                        </div>
                    </div>
                    <div className="flex items-center justify-center gap-2">
                        <BookCopy className="h-6 w-6 text-green-500" />
                        <div>
                            <p className="text-xl font-bold">{profile.courses.length}</p>
                            <h3 className="text-xs text-muted-foreground uppercase tracking-wider">{t.publishedCourses}</h3>
                        </div>
                    </div>
                </CardFooter>
            </Card>

            <div>
                <h2 className="text-2xl font-bold font-headline mb-4">{t.coursesBy} {profile.name}</h2>
                 <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {profile.courses.map((course: Course) => (
                        <CourseCard course={course as any} key={course.id} />
                    ))}
                </div>
                 {profile.courses.length === 0 && (
                    <div className="text-center py-10 border rounded-lg bg-card">
                        <p className="text-muted-foreground">{t.noCoursesYet}</p>
                    </div>
                )}
            </div>
        </div>
    </div>
  );
}

    