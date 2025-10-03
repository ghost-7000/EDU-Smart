
'use client';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { allTeachers, courses as allCourses } from '@/lib/placeholder-data';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Star, Users, BookCopy, MessageSquare, UserCircle, Briefcase, GraduationCap } from 'lucide-react';
import { useLanguage } from '@/hooks/use-language';
import { useRouter } from 'next/navigation';
import { CourseCard } from '@/components/course-card';
import { useToast } from '@/hooks/use-toast';
import { Teacher, Course, Review } from '@/lib/types';
import Link from 'next/link';

const getTeacherById = (id: number): Teacher | undefined => {
    const teacherData = allTeachers.find(teacher => teacher.id === id);
    if (!teacherData) return undefined;

    const teacherCourses = allCourses.filter(course => course.teacherId === id);
    
    // Get all reviews for this teacher's courses
    const allTeacherReviews = teacherCourses.flatMap(course => 
      course.reviews.map(review => ({ ...review, courseTitle: course.title }))
    );

    return {
        ...teacherData,
        courses: teacherCourses,
        reviews: allTeacherReviews, // Add aggregated reviews to the teacher object
    };
}


export default function ViewTeacherProfilePage({ params }: { params: { id: string } }) {
    const { t } = useLanguage();
    const router = useRouter();
    const { toast } = useToast();
    const teacherId = parseInt(params.id, 10);
    
    const profile = getTeacherById(teacherId);
    
    if (!profile) {
        return (
          <div className="container mx-auto py-6 text-center">
            <h1 className="text-2xl font-bold mb-4">{t.teacherNotFound}</h1>
            <Button onClick={() => router.back()}>{t.backToMyCourses}</Button>
          </div>
        );
    }
    
    const StarRating = ({ rating }: { rating: number }) => (
      <div className="flex items-center gap-1" dir="ltr">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={`h-5 w-5 ${i < Math.floor(rating) ? 'text-amber-400 fill-amber-400' : 'text-gray-300'}`}
          />
        ))}
      </div>
    );

    return (
    <div className="container mx-auto py-8 space-y-8">
        <Button variant="outline" onClick={() => router.back()} className="mb-4">
            <ArrowLeft className="mr-2 h-4 w-4" /> {t.backToMyCourses}
        </Button>
      
        <Card className="overflow-hidden">
            <CardContent className="p-6 md:p-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="flex flex-col items-center text-center md:col-span-1">
                        <Avatar className="w-32 h-32 mb-4 border-4 border-primary">
                            <AvatarFallback className="text-6xl bg-muted"><UserCircle /></AvatarFallback>
                        </Avatar>
                        <h1 className="text-3xl font-bold font-headline">{profile.name}</h1>
                        <p className="text-md text-muted-foreground">{profile.specialization} - {profile.branch}</p>
                        <div className="flex items-center gap-4 mt-4 text-sm text-muted-foreground">
                            <div className="flex items-center gap-1">
                                <Star className="h-4 w-4 text-amber-400" />
                                <span>{profile.averageRating.toFixed(1)}</span>
                            </div>
                            <div className="flex items-center gap-1">
                                <Users className="h-4 w-4" />
                                <span>{profile.totalStudents} {t.student}</span>
                            </div>
                            <div className="flex items-center gap-1">
                                <BookCopy className="h-4 w-4" />
                                <span>{profile.courses.length} {t.courses}</span>
                            </div>
                        </div>
                        <Button asChild className="mt-6 w-full">
                           <Link href="#teacher-courses">{t.subscribeNow}</Link>
                        </Button>
                    </div>

                    <div className="md:col-span-2 space-y-6">
                        <div>
                            <h2 className="text-xl font-bold font-headline mb-2">{t.aboutTeacher}</h2>
                            <p className="text-muted-foreground">{profile.bio}</p>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="flex items-start gap-3">
                                <GraduationCap className="h-6 w-6 text-primary mt-1" />
                                <div>
                                    <h3 className="font-semibold">{t.qualifications}</h3>
                                    <p className="text-sm text-muted-foreground">{t.qualificationsDesc}</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-3">
                                <Briefcase className="h-6 w-6 text-primary mt-1" />
                                <div>
                                    <h3 className="font-semibold">{t.experience}</h3>
                                    <p className="text-sm text-muted-foreground">{t.experienceDesc}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>

        <div id="teacher-courses">
            <h2 className="text-2xl font-bold font-headline mb-4">{t.coursesBy} {profile.name}</h2>
            {profile.courses.length > 0 ? (
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {profile.courses.map((course: Course) => (
                        <CourseCard course={course as any} key={course.id} />
                    ))}
                </div>
            ) : (
                <div className="text-center py-10 border rounded-lg bg-card">
                    <p className="text-muted-foreground">{t.noCoursesYet}</p>
                </div>
            )}
        </div>

        <div>
            <h2 className="text-2xl font-bold font-headline mb-4">{t.studentReviews}</h2>
            {profile.reviews && profile.reviews.length > 0 ? (
                <div className="space-y-4">
                {profile.reviews.slice(0, 3).map((review, index) => (
                    <Card key={index}>
                        <CardContent className="p-4">
                            <div className="flex items-start gap-4">
                                <Avatar className="w-10 h-10 border">
                                    <AvatarFallback><UserCircle/></AvatarFallback>
                                </Avatar>
                                <div>
                                    <div className="flex items-center justify-between">
                                        <p className="font-semibold">{review.courseTitle}</p>
                                        <StarRating rating={review.rating} />
                                    </div>
                                    <p className="text-muted-foreground italic">"{review.comment}"</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                ))}
                </div>
            ) : (
                <div className="text-center py-10 border rounded-lg bg-card">
                    <p className="text-muted-foreground">{t.noReviewsYet}</p>
                </div>
            )}
        </div>
    </div>
  );
}

    