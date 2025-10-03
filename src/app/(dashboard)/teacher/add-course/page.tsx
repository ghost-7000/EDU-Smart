
'use client';

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
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/hooks/use-toast';

export default function AddCoursePage() {
    const { toast } = useToast();

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const courseName = formData.get('course-name');
        toast({
            title: "تم نشر الكورس!",
            description: `تم نشر كورس "${courseName}" بنجاح.`,
        });
    }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline text-2xl">إضافة كورس جديد</CardTitle>
        <CardDescription>املأ التفاصيل التالية لنشر الكورس الخاص بك.</CardDescription>
      </CardHeader>
      <CardContent>
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="course-name">اسم الكورس</Label>
              <Input id="course-name" name="course-name" placeholder="مثال: مقدمة في الذكاء الاصطناعي" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="course-code">كود الكورس</Label>
              <Input id="course-code" placeholder="مثال: AI101 (يُولد تلقائيًا إذا ترك فارغًا)" />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="short-description">وصف مختصر</Label>
            <Textarea id="short-description" placeholder="وصف موجز وجذاب للكورس" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="full-details">تفاصيل شاملة</Label>
            <Textarea id="full-details" rows={6} placeholder="اشرح أهداف الكورس، المحتوى، والجمهور المستهدف." />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
                <Label htmlFor="price">السعر ($)</Label>
                <Input id="price" type="number" placeholder="مثال: 49.99 (اتركه فارغًا إذا كان مجانيًا)" />
            </div>
            <div className="flex items-center space-x-2 rtl:space-x-reverse rounded-md border p-4">
                <Switch id="free-trial" />
                <Label htmlFor="free-trial">تفعيل التجربة المجانية (7 أيام)</Label>
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="cover-media">صورة أو فيديو تعريفي</Label>
            <Input id="cover-media" type="file" />
          </div>

          <div className="flex justify-end">
            <Button type="submit">نشر الكورس</Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
