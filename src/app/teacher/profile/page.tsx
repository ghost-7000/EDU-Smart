
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
import { teacherData, placeholderImages, courses, branches, specializations } from '@/lib/placeholder-data';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Presentation, ArrowLeft, Star, Users, BookCopy, MessageSquare } from 'lucide-react';
import Link from 'next/link';
import { useLanguage } from '@/hooks/use-language';
import { useSearchParams, useRouter } from 'next/navigation';
import { CourseCard } from '@/components/course-card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';

const getTeacherById = (id: number) => {
    // This is a mock function. In a real app, you'd fetch this from a database.
    if (id === 1) return teacherData;
    
    const teacherCourses = courses.filter(c => c.teacherId === id);
    const totalRatingsCount = teacherCourses.flatMap(c => (c as any).reviews || []).length;
    const totalRatingsSum = teacherCourses.flatMap(c => (c as any).reviews || []).reduce((sum: number, review: any) => sum + review.rating, 0);

    return {
        id,
        name: `المعلم رقم ${id}`,
        branch: 'فرع غير معروف',
        email: `teacher${id}@example.com`,
        specialization: 'تكنولوجيا المعلومات',
        bio: 'معلم شغوف بالتعليم.',
        totalCourses: teacherCourses.length,
        totalStudents: teacherCourses.reduce((sum, course) => sum + (course as any).enrolledStudents, 0),
        averageRating: totalRatingsCount > 0 ? (totalRatingsSum / totalRatingsCount) : 0,
        courses: teacherCourses.map(course => ({
            ...course,
            enrolledStudents: Math.floor(Math.random() * 200),
            reviews: []
        }))
    };
}


export default function TeacherProfilePage() {
    const { t } = useLanguage();
    const router = useRouter();
    const { toast } = useToast();
    const searchParams = useSearchParams();
    const teacherIdParam = searchParams.get('id');
    const isOwnProfile = !teacherIdParam || parseInt(teacherIdParam, 10) === teacherData.id;

    const aTeacher = getTeacherById(teacherIdParam ? parseInt(teacherIdParam, 10) : teacherData.id);
    const [profile, setProfile] = useState(aTeacher);

    const avatarImage = placeholderImages.find(p => p.id === 'teacher-avatar');
    
    const handleContactTeacher = () => {
        toast({
            title: t.contactTeacher,
            description: t.contactTeacherDesc,
        });
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setProfile(prev => ({...prev, [name]: value}));
    }

    const handleSelectChange = (name: string) => (value: string) => {
         setProfile(prev => ({...prev, [name]: value}));
    }

    const handleSaveChanges = () => {
        toast({
            title: "Profile Updated",
            description: "Your profile has been saved successfully.",
        })
    }

  return (
    <div>
        <div className="flex items-center gap-4 mb-6">
            {!isOwnProfile && (
                <Button variant="outline" size="icon" onClick={() => router.back()}>
                    <ArrowLeft />
                </Button>
            )}
            <h1 className="text-3xl font-bold font-headline">{isOwnProfile ? t.myProfile : t.teacherProfile}</h1>
        </div>
        
        {isOwnProfile ? (
            <Card>
                <CardHeader>
                    <CardTitle className="text-2xl">{t.editProfile}</CardTitle>
                    <CardDescription>{t.editProfile_sidebar}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="flex items-center gap-6">
                        <Avatar className="w-24 h-24">
                            {avatarImage && <AvatarImage src={avatarImage.imageUrl} alt={profile.name} />}
                            <AvatarFallback className="text-4xl"><Presentation /></AvatarFallback>
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
             <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-1 space-y-6">
                    <Card className="text-center">
                        <CardHeader className="items-center">
                            <Avatar className="w-24 h-24 mb-4">
                                {avatarImage && <AvatarImage src={avatarImage.imageUrl} alt={aTeacher.name} />}
                                <AvatarFallback className="text-4xl"><Presentation /></AvatarFallback>
                            </Avatar>
                            <CardTitle className="text-2xl">{aTeacher.name}</CardTitle>
                            <CardDescription>{aTeacher.branch}</CardDescription>
                        </CardHeader>
                        <CardContent>
                           <p className="text-sm text-muted-foreground">{aTeacher.bio}</p>
                        </CardContent>
                    </Card>
                     <Card>
                        <CardContent className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1 p-4">
                            <div className="flex items-center gap-4">
                                <Users className="h-8 w-8 text-primary" />
                                <div>
                                    <h3 className="text-muted-foreground">{t.totalStudents}</h3>
                                    <p className="text-2xl font-bold">{aTeacher.totalStudents}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-4">
                                <Star className="h-8 w-8 text-amber-500" />
                                <div>
                                    <h3 className="text-muted-foreground">{t.averageRating}</h3>
                                    <p className="text-2xl font-bold">{aTeacher.averageRating.toFixed(1)}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-4">
                                <BookCopy className="h-8 w-8 text-green-500" />
                                <div>
                                    <h3 className="text-muted-foreground">{t.publishedCourses}</h3>
                                    <p className="text-2xl font-bold">{aTeacher.totalCourses}</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                     <Card>
                        <CardHeader>
                            <CardTitle>{t.contactTeacher}</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <Button className="w-full" onClick={handleContactTeacher}>
                                <MessageSquare className="mr-2 h-4 w-4" /> {t.contact}
                            </Button>
                        </CardContent>
                    </Card>
                </div>
                <div className="lg:col-span-2">
                    <h2 className="text-2xl font-bold font-headline mb-4">{t.coursesBy} {aTeacher.name}</h2>
                     <div className="grid gap-6 md:grid-cols-2">
                        {aTeacher.courses.map((course) => (
                            <CourseCard course={course as any} key={course.id} />
                        ))}
                    </div>
                </div>
            </div>
        )}

    </div>
  );
}


    