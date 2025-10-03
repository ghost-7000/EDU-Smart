
'use client';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { studentData, placeholderImages } from '@/lib/placeholder-data';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { GraduationCap, BookCopy, LogOut } from 'lucide-react';
import { useLanguage } from '@/hooks/use-language';

export default function StudentProfilePage() {
    const { t } = useLanguage();
    const avatarImage = placeholderImages.find(p => p.id === 'student-avatar');

    const getStatusText = (status: 'active' | 'trial' | 'completed') => {
        if (status === 'active') return t.statusActive;
        if (status === 'trial') return t.statusTrial;
        if (status === 'completed') return t.statusCompleted;
        return '';
    }

  return (
    <div>
        <h1 className="text-3xl font-bold font-headline mb-6">{t.myProfile}</h1>
        <Card className="max-w-2xl mx-auto">
            <CardHeader className="text-center items-center">
                <Avatar className="w-24 h-24 mb-4">
                    {avatarImage && <AvatarImage src={avatarImage.imageUrl} alt="Student Avatar" />}
                    <AvatarFallback className="text-4xl"><GraduationCap /></AvatarFallback>
                </Avatar>
                <CardTitle className="text-2xl">{studentData.name}</CardTitle>
                <CardDescription>{studentData.branch}</CardDescription>
                <p className="text-lg text-amber-500 font-semibold mt-2">{studentData.points} {t.pointsEarned.split(' ')[0]} 🏆</p>
            </CardHeader>
            <CardContent className="space-y-6">
                <div>
                    <h3 className="text-lg font-semibold mb-2">{t.enrolledCourses}</h3>
                    <div className="space-y-2">
                        {studentData.enrolledCourses.map(course => (
                            <div key={course.id} className="flex justify-between items-center p-3 rounded-md border">
                                <span>{course.title}</span>
                                 <Badge variant={course.status === 'completed' ? 'default' : 'secondary'}>
                                    {getStatusText(course.status as any)}
                                 </Badge>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="flex flex-col sm:flex-row gap-2">
                    <Button variant="outline" className="w-full">{t.editAccount}</Button>
                    <Link href="/student/browse-courses" className="w-full">
                        <Button className="w-full"><BookCopy className="ml-2 h-4 w-4" /> {t.browseCourses}</Button>
                    </Link>
                    <Link href="/" className="w-full">
                        <Button variant="destructive" className="w-full"><LogOut className="ml-2 h-4 w-4" /> {t.logout}</Button>
                    </Link>
                </div>
            </CardContent>
        </Card>
    </div>
  );
}
