
'use client';
import { useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from '@/components/ui/card';
import { allTeachers, branches, specializations, courses as allCourses } from '@/lib/placeholder-data';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Star, Users, BookCopy, MessageSquare, UserCircle } from 'lucide-react';
import { useLanguage } from '@/hooks/use-language';
import { useSearchParams, useRouter } from 'next/navigation';
import { CourseCard } from '@/components/course-card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Teacher, Course } from '@/lib/types';


const getTeacherById = (id: number): Teacher | undefined => {
    // This should ideally fetch from a DB, but we'll use placeholder data
    const teacherData = allTeachers.find(teacher => teacher.id === id);
    if (!teacherData) return undefined;

    const teacherCourses = allCourses.filter(course => course.teacherId === id);
    
    return {
        ...teacherData,
        courses: teacherCourses,
    };
}


export default function TeacherProfilePage() {
    const { t } = useLanguage();
    const router = useRouter();
    const { toast } = useToast();
    const searchParams = useSearchParams();
    const teacherIdParam = searchParams.get('id');
    const ownProfileId = 1; // Assuming teacher with ID 1 is the logged-in one for demo
    
    // Determine if the current view is for the teacher's own profile or a student viewing it.
    const isOwnProfile = !teacherIdParam || parseInt(teacherIdParam, 10) === ownProfileId;
    const teacherId = teacherIdParam ? parseInt(teacherIdParam, 10) : ownProfileId;

    const teacherToDisplay = getTeacherById(teacherId);
    
    const [profile, setProfile] = useState(teacherToDisplay);
    
    if (!profile) {
        return <div className="text-center py-10">{t.teacherNotFound}</div>
    }

    const handleContactTeacher = () => {
        toast({
            title: t.contactTeacher,
            description: t.contactTeacherDesc,
        });
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setProfile(prev => prev ? ({...prev, [name]: value}) : undefined);
    }

    const handleSelectChange = (name: string) => (value: string) => {
         setProfile(prev => prev ? ({...prev, [name]: value}) : undefined);
    }

    const handleSaveChanges = () => {
        toast({
            title: "Profile Updated",
            description: "Your profile has been saved successfully.",
        })
    }

  return (
    <div className="container mx-auto py-6">
        <div className="flex items-center gap-4 mb-6">
            {!isOwnProfile && (
                <Button variant="outline" size="icon" onClick={() => router.back()} aria-label="Go back">
                    <ArrowLeft />
                </Button>
            )}
            <h1 className="text-3xl font-bold font-headline">{isOwnProfile ? t.editProfile : t.teacherProfile}</h1>
        </div>
        
        {isOwnProfile ? (
            // VIEW FOR THE TEACHER (EDIT MODE)
            <Card className="max-w-4xl mx-auto">
                <CardHeader>
                    <CardTitle className="text-2xl">{t.editProfile}</CardTitle>
                    <CardDescription>{t.editProfile_sidebar}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="flex items-center gap-6">
                        <Avatar className="w-24 h-24">
                            <AvatarFallback className="text-4xl"><UserCircle/></AvatarFallback>
                        </Avatar>
                        <div className='flex-1'>
                            <Label htmlFor="picture">{t.uploadNewPhoto}</Label>
                            <Input id="picture" type="file" />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                         <div className="space-y-2">
                            <Label htmlFor="name">{t.fullName}</Label>
                            <Input id="name" name="name" value={profile.name} onChange={handleInputChange} />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="email">{t.email}</Label>
                            <Input id="email" name="email" type="email" value={profile.email} onChange={handleInputChange} />
                        </div>
                         <div className="space-y-2">
                            <Label htmlFor="branch">{t.selectBranch}</Label>
                            <Select value={profile.branch} onValueChange={handleSelectChange('branch')}>
                                <SelectTrigger id="branch">
                                    <SelectValue placeholder={t.selectYourBranch} />
                                </SelectTrigger>
                                <SelectContent>
                                    {branches.map(branch => (
                                        <SelectItem key={branch} value={branch}>{branch}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                         <div className="space-y-2">
                            <Label htmlFor="specialization">{t.specialization}</Label>
                            <Select value={profile.specialization} onValueChange={handleSelectChange('specialization')}>
                                <SelectTrigger id="specialization">
                                    <SelectValue placeholder={t.selectSpecialization} />
                                </SelectTrigger>
                                <SelectContent>
                                    {specializations.map(spec => (
                                        <SelectItem key={spec} value={spec}>{spec}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                     <div className="space-y-2">
                        <Label htmlFor="bio">{t.bio}</Label>
                        <Textarea id="bio" name="bio" placeholder="A brief bio about your expertise and teaching philosophy" value={profile.bio} onChange={handleInputChange} rows={4} />
                    </div>
                </CardContent>
                 <CardFooter className="border-t pt-6">
                    <Button onClick={handleSaveChanges}>{t.saveChanges}</Button>
                </CardFooter>
            </Card>
        ) : (
            // VIEW FOR THE STUDENT (READ-ONLY MODE)
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
                                <p className="text-xl font-bold">{profile.totalCourses}</p>
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
        )}
    </div>
  );
}

    