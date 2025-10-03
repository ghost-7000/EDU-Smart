
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
import { GraduationCap, Presentation } from 'lucide-react';
import { useLanguage } from '@/hooks/use-language';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { branches } from '@/lib/placeholder-data';
import { useState } from 'react';

export default function LoginPage() {
  const { t } = useLanguage();
  const [role, setRole] = useState('student');

  return (
    <div className="flex min-h-screen flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center py-12 px-4">
            <Card className="mx-auto w-full max-w-md shadow-lg">
                <CardHeader>
                    <CardTitle className="text-2xl font-headline">{t.login}</CardTitle>
                    <CardDescription>
                    {t.loginDescription}
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-2">
                            <Button variant={role === 'student' ? 'default' : 'outline'} onClick={() => setRole('student')}>
                                <GraduationCap className="ml-2 h-4 w-4" />
                                {t.loginAsStudent}
                            </Button>
                             <Button variant={role === 'teacher' ? 'default' : 'outline'} onClick={() => setRole('teacher')}>
                                <Presentation className="ml-2 h-4 w-4" />
                                {t.loginAsTeacher}
                            </Button>
                        </div>
                        
                        <div className="space-y-2">
                            <Label htmlFor="email">{t.email}</Label>
                            <Input id="email" type="email" placeholder="email@example.com" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="password">{t.password}</Label>
                            <Input id="password" type="password" />
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
                        
                        <Link href={role === 'student' ? '/student/dashboard' : '/teacher/dashboard'}>
                            <Button className="w-full">
                                {t.login}
                            </Button>
                        </Link>
                    </div>
                    <div className="mt-4 text-center text-sm">
                        {t.noAccount}{' '}
                    <Link href="/signup" className="underline">
                        {t.createNewAccount}
                    </Link>
                    </div>
                </CardContent>
            </Card>
        </main>
        <Footer />
    </div>
  );
}
