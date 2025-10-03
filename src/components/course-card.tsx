
"use client";
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Star } from 'lucide-react';
import { Badge } from './ui/badge';
import Link from 'next/link';
import { useToast } from '@/hooks/use-toast';

type Course = {
  id: number;
  title: string;
  teacher: string;
  rating: number;
  price: number | null;
  isFreeTrial: boolean;
  image?: {
    imageUrl: string;
    description: string;
    imageHint: string;
  };
};

export function CourseCard({ course }: { course: Course }) {
  const { toast } = useToast();

  const handleRegister = () => {
    toast({
        title: "تم التسجيل بنجاح!",
        description: `لقد تم تسجيلك في كورس "${course.title}".`,
    });
  }

  return (
    <Card className="overflow-hidden transition-all hover:shadow-lg hover:-translate-y-1">
      <Link href={`/student/course/${course.id}`}>
        <CardHeader className="p-0">
          {course.image && (
            <Image
              src={course.image.imageUrl}
              alt={course.image.description}
              data-ai-hint={course.image.imageHint}
              width={400}
              height={225}
              className="object-cover"
            />
          )}
        </CardHeader>
        <CardContent className="p-4">
          <h3 className="font-semibold text-lg truncate">{course.title}</h3>
          <p className="text-sm text-muted-foreground">{course.teacher}</p>
          <div className="flex items-center mt-2">
            <span className="font-bold text-amber-500 mr-1">{course.rating.toFixed(1)}</span>
            <Star className="w-4 h-4 fill-amber-400 text-amber-500" />
          </div>
        </CardContent>
      </Link>
      <CardFooter className="p-4 flex justify-between items-center">
        <div>
          {course.isFreeTrial ? (
            <Badge variant="outline" className="border-green-500 text-green-600">تجربة مجانية</Badge>
          ) : course.price !== null ? (
            <p className="font-bold text-lg text-primary">${course.price}</p>
          ) : (
            <Badge variant="secondary">مجاني</Badge>
          )}
        </div>
        <Button onClick={handleRegister}>سجل الآن</Button>
      </CardFooter>
    </Card>
  );
}
