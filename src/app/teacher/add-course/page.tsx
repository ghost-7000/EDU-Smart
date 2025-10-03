
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
import { useLanguage } from '@/hooks/use-language';

export default function AddCoursePage() {
    const { toast } = useToast();
    const { t } = useLanguage();

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const courseName = formData.get('course-name');
        toast({
            title: t.coursePublished,
            description: `${t.coursePublished} "${courseName}"`,
        });
    }

  return (
    <form className="space-y-6" onSubmit={handleSubmit}>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-headline text-2xl">{t.addCourse}</h1>
          <p className="text-muted-foreground">{t.fillDetailsToPublish}</p>
        </div>
        <Button type="submit">{t.publishCourse}</Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
                <CardTitle>Course Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="course-name">{t.courseName}</Label>
                  <Input id="course-name" name="course-name" placeholder="e.g. Introduction to AI" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="course-code">{t.courseCode}</Label>
                  <Input id="course-code" placeholder="e.g. AI101" />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="short-description">{t.shortDescription}</Label>
                <Textarea id="short-description" placeholder="A brief and engaging description of the course" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="full-details">{t.fullDetails}</Label>
                <Textarea id="full-details" rows={6} placeholder="Explain the course objectives, content, and target audience." />
              </div>
            </CardContent>
          </Card>
        </div>
        <div className="space-y-6">
          <Card>
             <CardHeader>
                <CardTitle>Pricing & Options</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                  <Label htmlFor="price">{t.priceUSD}</Label>
                  <Input id="price" type="number" placeholder="Leave blank for free" />
              </div>
              <div className="flex items-center space-x-2 rtl:space-x-reverse rounded-md border p-4">
                  <Switch id="free-trial" />
                  <Label htmlFor="free-trial">{t.enableFreeTrial}</Label>
              </div>
            </CardContent>
          </Card>
           <Card>
             <CardHeader>
                <CardTitle>Media</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Label htmlFor="cover-media">{t.coverMedia}</Label>
              <Input id="cover-media" type="file" />
            </CardContent>
          </Card>
        </div>
      </div>
    </form>
  );
}
