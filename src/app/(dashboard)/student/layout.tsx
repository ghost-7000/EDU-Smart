
"use client";
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  BookCopy,
  GraduationCap,
  LayoutDashboard,
  LogOut,
  Search,
  UserCircle,
} from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
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
import { studentData } from '@/lib/placeholder-data';
import { Logo } from '@/components/logo';

export default function StudentDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const navItems = [
    { href: '/student/dashboard', label: 'لوحة التحكم', icon: LayoutDashboard },
    { href: '/student/my-courses', label: 'كورساتي', icon: BookCopy },
    { href: '/student/browse-courses', label: 'اكتشف الكورسات', icon: Search },
    { href: '/student/profile', label: 'ملفي الشخصي', icon: UserCircle },
  ];

  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader className="border-b">
          <Logo />
        </SidebarHeader>
        <SidebarContent className="p-2">
          <div className="flex flex-col items-center p-4 border-b mb-4">
              <Avatar className="h-20 w-20 mb-2">
                  <AvatarFallback className="bg-primary text-primary-foreground">
                    <GraduationCap className="h-10 w-10" />
                  </AvatarFallback>
              </Avatar>
              <h3 className="font-semibold">{studentData.name}</h3>
              <p className="text-sm text-muted-foreground">{studentData.branch}</p>
              <p className="text-sm text-amber-500 font-semibold mt-1">{studentData.points} نقطة</p>
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
            <h1 className="text-xl font-semibold font-headline">لوحة تحكم الطالب</h1>
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
