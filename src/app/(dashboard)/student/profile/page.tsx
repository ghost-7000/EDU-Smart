
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function StudentProfilePage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline text-2xl">ملفي الشخصي</CardTitle>
      </CardHeader>
      <CardContent>
        <p>هذه الصفحة قيد الإنشاء. سيتم عرض تفاصيل ملفك الشخصي هنا قريبًا.</p>
      </CardContent>
    </Card>
  );
}
