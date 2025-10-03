
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
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useLanguage } from '@/hooks/use-language';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { useState } from 'react';
import { branches } from '@/lib/placeholder-data';
import { GraduationCap, Presentation } from 'lucide-react';

export default function SignupPage() {
  const { t } = useLanguage();
  const [role, setRole] = useState('student');

  return (
    <div className="flex min-h-screen flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center py-12 px-4">
            <Card className="mx-auto w-full max-w-md shadow-lg">
                <CardHeader>
                <CardTitle className="text-2xl font-headline">{t.createNewAccount}</CardTitle>
                <CardDescription>اختر دورك واملأ التفاصيل للانضمام.</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        <div className="space-y-2">
                            <Label>أنا:</Label>
                            <RadioGroup defaultValue="student" onValueChange={setRole}>
                                <div className="flex items-center space-x-2 rtl:space-x-reverse">
                                    <RadioGroupItem value="student" id="r1" />
                                    <Label htmlFor="r1" className="flex items-center gap-2"><GraduationCap className="h-4 w-4" />طالب</Label>
                                </div>
                                <div className="flex items-center space-x-2 rtl:space-x-reverse">
                                    <RadioGroupItem value="teacher" id="r2" />
                                    <Label htmlFor="r2" className="flex items-center gap-2"><Presentation className="h-4 w-4" />معلم</Label>
                                </div>
                            </RadioGroup>
                        </div>
                        
                        <div className="space-y-2">
                            <Label htmlFor="name">الاسم الكامل</Label>
                            <Input id="name" placeholder="مثال: أحمد الفارسي" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="email">البريد الإلكتروني</Label>
                            <Input id="email" type="email" placeholder="email@example.com" />
                        </div>
                         <div className="space-y-2">
                            <Label htmlFor="password">كلمة المرور</Label>
                            <Input id="password" type="password" />
                        </div>
                         <div className="space-y-2">
                            <Label htmlFor="confirm-password">تأكيد كلمة المرور</Label>
                            <Input id="confirm-password" type="password" />
                        </div>
                         <div className="space-y-2">
                            <Label htmlFor="branch">فرع UTAS</Label>
                            <Select>
                                <SelectTrigger id="branch">
                                    <SelectValue placeholder="اختر الفرع" />
                                </SelectTrigger>
                                <SelectContent>
                                    {branches.map(branch => (
                                        <SelectItem key={branch} value={branch}>{branch}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                        
                        <Link href={role === 'student' ? '/student/dashboard' : '/teacher/dashboard'} className='w-full'>
                            <Button type="submit" className="w-full">
                                {t.signup}
                            </Button>
                        </Link>
                    </div>
                    <div className="mt-4 text-center text-sm">
                        لديك حساب بالفعل؟{' '}
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

