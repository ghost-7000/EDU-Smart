
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
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { branches } from '@/lib/placeholder-data';
import { useLanguage } from '@/hooks/use-language';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { useState } from 'react';

export default function SignupPage() {
  const { t, dir } = useLanguage();
  const [role, setRole] = useState('student');

  return (
    <div className="flex min-h-screen flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center py-12 px-4">
            <Card className="mx-auto w-full max-w-md shadow-lg">
                <CardHeader>
                <CardTitle className="text-2xl font-headline">{t.createNewAccount}</CardTitle>
                <CardDescription>أدخل بياناتك للانضمام إلى منصتنا التعليمية.</CardDescription>
                </CardHeader>
                <CardContent>
                <form className="space-y-4">
                    <div className="space-y-2">
                        <Label>أنا:</Label>
                        <RadioGroup defaultValue="student" className="flex gap-4" onValueChange={setRole}>
                            <div className="flex items-center space-x-2 rtl:space-x-reverse">
                                <RadioGroupItem value="student" id="r1" />
                                <Label htmlFor="r1">طالب 👨‍🎓</Label>
                            </div>
                            <div className="flex items-center space-x-2 rtl:space-x-reverse">
                                <RadioGroupItem value="teacher" id="r2" />
                                <Label htmlFor="r2">معلم 👨‍🏫</Label>
                            </div>
                        </RadioGroup>
                    </div>
                    <div className="space-y-2">
                    <Label htmlFor="name">{t.name}</Label>
                    <Input id="name" required />
                    </div>
                    <div className="space-y-2">
                    <Label htmlFor="email">{t.email}</Label>
                    <Input id="email" type="email" placeholder="m@example.com" required />
                    </div>
                    <div className="space-y-2">
                    <Label htmlFor="password">{t.password}</Label>
                    <Input id="password" type="password" required />
                    </div>
                    <div className="space-y-2">
                    <Label htmlFor="confirm-password">{t.confirmPassword}</Label>
                    <Input id="confirm-password" type="password" required />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="branch">{t.selectBranch}</Label>
                        <Select dir={dir}>
                        <SelectTrigger id="branch">
                            <SelectValue placeholder={t.selectBranch} />
                        </SelectTrigger>
                        <SelectContent>
                            {branches.map((branch) => (
                            <SelectItem key={branch} value={branch}>
                                {branch}
                            </SelectItem>
                            ))}
                        </SelectContent>
                        </Select>
                    </div>
                    <Link href={role === 'student' ? '/student/dashboard' : '/teacher/dashboard'} className='w-full'>
                        <Button type="submit" className="w-full">
                            {t.signup}
                        </Button>
                    </Link>
                </form>
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
