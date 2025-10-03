
"use client";
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  BookCopy,
  LayoutDashboard,
  LogOut,
  PlusCircle,
  Presentation,
  UserCircle,
  BarChart,
  Settings,
} from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
  SidebarInset,
  SidebarTrigger,
} from '@/components/ui/sidebar';
import { teacherData, placeholderImages } from '@/lib/placeholder-data';
import { Logo } from '@/components/logo';

export default function TeacherDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const navItems = [
    { href: '/teacher/dashboard', label: 'لوحة التحكم', icon: LayoutDashboard },
    { href: '/teacher/add-course', label: 'إضافة كورس جديد', icon: PlusCircle },
    { href: '/teacher/my-courses', label: 'كورساتي', icon: BookCopy },
    { href: '#', label: 'تقارير الأداء', icon: BarChart },
    { href: '/teacher/profile', label: 'تعديل الملف الشخصي', icon: Settings },
  ];
  const avatarImage = placeholderImages.find(p => p.id === 'teacher-avatar');

  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader className="border-b">
          <Logo />
        </SidebarHeader>
        <SidebarContent className="p-2">
          <div className="flex flex-col items-center p-4 border-b mb-4">
              <Avatar className="h-20 w-20 mb-2">
                  {avatarImage && <AvatarImage src={avatarImage.imageUrl} alt="Teacher Avatar" />}
                  <AvatarFallback className="bg-primary text-primary-foreground">
                    <Presentation className="h-10 w-10" />
                  </AvatarFallback>
              </Avatar>
              <h3 className="font-semibold">{teacherData.name}</h3>
              <p className="text-sm text-muted-foreground">{teacherData.branch}</p>
              <p className="text-sm text-primary font-semibold mt-1">{teacherData.totalCourses} كورسات</p>
          </div>
          <SidebarMenu>
            {navItems.map((item) => (
              <SidebarMenuItem key={item.href}>
                <Link href={item.href}>
                  <SidebarMenuButton
                    isActive={pathname === item.href}
                    tooltip={item.label}
                  >
                    <item.icon />
                    <span>{item.label}</span>
                  </SidebarMenuButton>
                </Link>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarContent>
        <SidebarFooter>
          <SidebarMenu>
            <SidebarMenuItem>
                <Link href="/">
                    <SidebarMenuButton tooltip="تسجيل الخروج">
                        <LogOut />
                        <span>تسجيل الخروج</span>
                    </SidebarMenuButton>
                </Link>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
      </Sidebar>
      <SidebarInset>
        <header className="flex items-center justify-between p-4 border-b bg-card">
            <SidebarTrigger />
            <h1 className="text-xl font-semibold font-headline">لوحة تحكم المعلم</h1>
            <UserCircle className="h-6 w-6" />
        </header>
        <main className="p-4 md:p-6 bg-background/80 flex-1">{children}</main>
        <footer className="p-4 border-t text-center text-sm text-muted-foreground">
            © {new Date().getFullYear()} EduSmart.
        </footer>
      </SidebarInset>
    </SidebarProvider>
  );
}
