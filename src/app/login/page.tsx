
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { GraduationCap, Presentation } from 'lucide-react';
import { branches } from '@/lib/placeholder-data';
import { useLanguage } from '@/hooks/use-language';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';

export default function LoginPage() {
  const { t, dir } = useLanguage();

  const LoginForm = ({ userType }: { userType: string }) => (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor={`${userType}-email`}>{t.email}</Label>
        <Input id={`${userType}-email`} type="email" placeholder="m@example.com" required />
      </div>
      <div className="space-y-2">
        <Label htmlFor={`${userType}-password`}>{t.password}</Label>
        <Input id={`${userType}-password`} type="password" required />
      </div>
      <div className="space-y-2">
        <Label htmlFor={`${userType}-branch`}>{t.selectBranch}</Label>
        <Select dir={dir}>
          <SelectTrigger id={`${userType}-branch`}>
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
      <Link href={userType === 'student' ? '/student/dashboard' : '/teacher/dashboard'} className='w-full'>
        <Button type="submit" className="w-full">
            {t.login}
        </Button>
      </Link>
    </div>
  );

  return (
    <div className="flex min-h-screen flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center py-12 px-4">
            <Card className="mx-auto w-full max-w-md shadow-lg">
                <CardHeader>
                    <CardTitle className="text-2xl font-headline">{t.login}</CardTitle>
                    <CardDescription>
                    اختر دورك للوصول إلى لوحة التحكم الخاصة بك.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Tabs defaultValue="student" className="w-full">
                    <TabsList className="grid w-full grid-cols-2">
                        <TabsTrigger value="student">
                        <GraduationCap className="mr-2 h-4 w-4" />
                        {t.loginAsStudent}
                        </TabsTrigger>
                        <TabsTrigger value="teacher">
                        <Presentation className="mr-2 h-4 w-4" />
                        {t.loginAsTeacher}
                        </TabsTrigger>
                    </TabsList>
                    <TabsContent value="student">
                        <Card>
                        <CardHeader>
                            <CardTitle>👨‍🎓 {t.loginAsStudent}</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <LoginForm userType="student" />
                        </CardContent>
                        </Card>
                    </TabsContent>
                    <TabsContent value="teacher">
                        <Card>
                        <CardHeader>
                            <CardTitle>👨‍🏫 {t.loginAsTeacher}</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <LoginForm userType="teacher" />
                        </CardContent>
                        </Card>
                    </TabsContent>
                    </Tabs>
                    <div className="mt-4 text-center text-sm">
                        ليس لديك حساب؟{' '}
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
