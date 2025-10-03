
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { GraduationCap, Presentation } from 'lucide-react';
import { useLanguage } from '@/hooks/use-language';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';

export default function LoginPage() {
  const { t } = useLanguage();

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
                                <CardContent className="flex flex-col items-center justify-center space-y-4 text-center">
                                    <p className="text-muted-foreground">{t.loginStudentPrompt}</p>
                                    <Link href="/student/dashboard" className='w-full'>
                                        <Button className="w-full">{t.goToDashboard}</Button>
                                    </Link>
                                </CardContent>
                            </Card>
                        </TabsContent>
                        <TabsContent value="teacher">
                            <Card>
                                <CardHeader>
                                    <CardTitle>👨‍🏫 {t.loginAsTeacher}</CardTitle>
                                </CardHeader>
                                <CardContent className="flex flex-col items-center justify-center space-y-4 text-center">
                                    <p className="text-muted-foreground">{t.loginTeacherPrompt}</p>
                                    <Link href="/teacher/dashboard" className='w-full'>
                                        <Button className="w-full">{t.goToDashboard}</Button>
                                    </Link>
                                </CardContent>
                            </Card>
                        </TabsContent>
                    </Tabs>
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
