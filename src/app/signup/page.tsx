
"use client";
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useLanguage } from '@/hooks/use-language';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { useState } from 'react';
import { branches } from '@/lib/placeholder-data';
import { GraduationCap, Presentation } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function SignupPage() {
  const { t } = useLanguage();
  const [role, setRole] = useState('student');
  const router = useRouter();

  const handleSignup = () => {
    const path = role === 'student' ? '/student/dashboard' : '/teacher/dashboard';
    router.push(path);
  };

  return (
    <div className="flex min-h-screen flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center py-12 px-4">
            <Card className="mx-auto w-full max-w-md shadow-lg">
                <CardHeader>
                <CardTitle className="text-2xl font-headline">{t.createNewAccount}</CardTitle>
                <CardDescription>{t.signupDescription}</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        <div className="space-y-2">
                            <Label>{t.iAmA}</Label>
                             <div className="grid grid-cols-2 gap-2">
                                <Button variant={role === 'student' ? 'default' : 'outline'} onClick={() => setRole('student')}>
                                    <GraduationCap className="ml-2 h-4 w-4" />
                                    {t.student}
                                </Button>
                                    <Button variant={role === 'teacher' ? 'default' : 'outline'} onClick={() => setRole('teacher')}>
                                    <Presentation className="ml-2 h-4 w-4" />
                                    {t.teacher}
                                </Button>
                            </div>
                        </div>
                        
                        <div className="space-y-2">
                            <Label htmlFor="name">{t.fullName}</Label>
                            <Input id="name" placeholder="e.g., Ahmed Al Farsi" />
                        </div>
                        
                         <div className="space-y-2">
                            <Label htmlFor="branch">{t.selectBranch}</Label>
                            <Select>
                                <SelectTrigger id="branch">
                                    <SelectValue placeholder={t.selectBranch} />
                                </SelectTrigger>
                                <SelectContent>
                                    {branches.map(branch => (
                                        <SelectItem key={branch} value={branch}>{branch}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                        
                        <Button onClick={handleSignup} type="submit" className="w-full">
                            {t.signup}
                        </Button>
                    </div>
                    <div className="mt-4 text-center text-sm">
                        {t.alreadyHaveAccount}{' '}
                    <Link href="/login" className="underline">
                        {t.login}
                    </Link>
                    </div>
                </CardContent>
            </Card>
        </main>
        <Footer />
    </div>
  );
}
