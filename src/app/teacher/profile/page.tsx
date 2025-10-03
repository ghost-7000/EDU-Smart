
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
import { allTeachers, branches, specializations } from '@/lib/placeholder-data';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Presentation, ArrowLeft, Star, Users, BookCopy, MessageSquare } from 'lucide-react';
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
    return allTeachers.find(teacher => teacher.id === id);
}


export default function TeacherProfilePage() {
    const { t } = useLanguage();
    const router = useRouter();
    const { toast } = useToast();
    const searchParams = useSearchParams();
    const teacherIdParam = searchParams.get('id');
    const ownProfileId = 1; // Assuming teacher with ID 1 is the logged-in one for demo
    const isOwnProfile = !teacherIdParam || parseInt(teacherIdParam, 10) === ownProfileId;

    const teacherToDisplay = getTeacherById(teacherIdParam ? parseInt(teacherIdParam, 10) : ownProfileId);
    
    const [profile, setProfile] = useState(teacherToDisplay);
    
    if (!profile) {
        return <div>{t.teacherNotFound}</div>
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
                            {profile.avatar && <AvatarImage src={profile.avatar} alt={profile.name} />}
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
                        <CardContent className="p-6">
                            <Avatar className="w-24 h-24 mb-4 mx-auto">
                                {profile.avatar && <AvatarImage src={profile.avatar} alt={profile.name} />}
                                <AvatarFallback className="text-4xl"><Presentation /></AvatarFallback>
                            </Avatar>
                            <h2 className="text-2xl font-bold font-headline">{profile.name}</h2>
                            <p className="text-muted-foreground">{profile.branch}</p>
                           <p className="text-sm text-muted-foreground mt-4">{profile.bio}</p>
                        </CardContent>
                    </Card>
                     <Card>
                        <CardContent className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1 p-4">
                            <div className="flex items-center gap-4 p-2">
                                <Users className="h-8 w-8 text-primary" />
                                <div>
                                    <p className="text-2xl font-bold">{profile.totalStudents}</p>
                                    <h3 className="text-muted-foreground text-sm">{t.totalStudents}</h3>
                                </div>
                            </div>
                            <div className="flex items-center gap-4 p-2">
                                <Star className="h-8 w-8 text-amber-500" />
                                <div>
                                    <p className="text-2xl font-bold">{profile.averageRating.toFixed(1)}</p>
                                    <h3 className="text-muted-foreground text-sm">{t.averageRating}</h3>
                                </div>
                            </div>
                            <div className="flex items-center gap-4 p-2">
                                <BookCopy className="h-8 w-8 text-green-500" />
                                <div>
                                    <p className="text-2xl font-bold">{profile.totalCourses}</p>
                                    <h3 className="text-muted-foreground text-sm">{t.publishedCourses}</h3>
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
                    <h2 className="text-2xl font-bold font-headline mb-4">{t.coursesBy} {profile.name}</h2>
                     <div className="grid gap-6 md:grid-cols-2">
                        {profile.courses.map((course: Course) => (
                            <CourseCard course={course as any} key={course.id} />
                        ))}
                    </div>
                </div>
            </div>
        )}

    </div>
  );
}
