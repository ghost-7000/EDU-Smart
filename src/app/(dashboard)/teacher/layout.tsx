
"use client";
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  BookCopy,
  LayoutDashboard,
  LogOut,
  PlusCircle,
  Presentation,
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
import { Header } from '@/components/header';
import { useLanguage } from '@/hooks/use-language';

export default function TeacherDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const { t } = useLanguage();
  const navItems = [
    { href: '/teacher/dashboard', label: t.dashboard, icon: LayoutDashboard },
    { href: '/teacher/add-course', label: t.addCourse_sidebar, icon: PlusCircle },
    { href: '/teacher/my-courses', label: t.myCourses_sidebar, icon: BookCopy },
    { href: '#', label: t.reports_sidebar, icon: BarChart },
    { href: '/teacher/profile', label: t.editProfile_sidebar, icon: Settings },
  ];
  const avatarImage = placeholderImages.find(p => p.id === 'teacher-avatar');

  return (
    <SidebarProvider>
      <Sidebar collapsible="offcanvas">
        <SidebarHeader className="border-b p-4">
          <Logo />
        </SidebarHeader>
        <SidebarContent className="p-4">
          <div className="flex flex-col items-center p-4 border-b mb-4">
              <Avatar className="h-24 w-24 mb-3 border-2 border-primary">
                  {avatarImage && <AvatarImage src={avatarImage.imageUrl} alt="Teacher Avatar" />}
                  <AvatarFallback className="bg-primary/20 text-primary">
                    <Presentation className="h-12 w-12" />
                  </AvatarFallback>
              </Avatar>
              <h3 className="font-semibold text-lg">{teacherData.name}</h3>
              <p className="text-sm text-muted-foreground">{teacherData.branch}</p>
              <p className="text-sm text-primary font-semibold mt-2">{teacherData.totalCourses} {t.courses}</p>
          </div>
          <SidebarMenu>
            {navItems.map((item) => (
              <SidebarMenuItem key={item.href}>
                <Link href={item.href}>
                  <SidebarMenuButton
                    isActive={pathname === item.href}
                    tooltip={item.label}
                    className="h-11"
                  >
                    <item.icon />
                    <span>{item.label}</span>
                  </SidebarMenuButton>
                </Link>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarContent>
        <SidebarFooter className="p-4">
          <SidebarMenu>
            <SidebarMenuItem>
                <Link href="/">
                    <SidebarMenuButton tooltip={t.logout} variant="outline" className="h-11">
                        <LogOut />
                        <span>{t.logout}</span>
                    </SidebarMenuButton>
                </Link>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
      </Sidebar>
      <SidebarInset>
        <Header loggedIn={true}>
            <SidebarTrigger />
        </Header>
        <main className="p-4 md:p-6 bg-background/80 flex-1">{children}</main>
        <footer className="p-4 border-t text-center text-sm text-muted-foreground">
            {t.copyright}
        </footer>
      </SidebarInset>
    </SidebarProvider>
  );
}
