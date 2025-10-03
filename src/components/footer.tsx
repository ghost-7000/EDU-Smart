
"use client"
import Link from "next/link";
import { Facebook, Twitter, Instagram, Linkedin } from "lucide-react";
import { Logo } from "./logo";

export function Footer() {
  return (
    <footer className="border-t bg-card text-card-foreground">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 px-4 py-12 md:px-6">
        <div className="flex flex-col gap-4">
          <Logo />
          <p className="text-sm text-muted-foreground">منصتك التعليمية الذكية لطلاب UTAS.</p>
        </div>
        <div className="grid gap-2">
            <h4 className="font-semibold">روابط مهمة</h4>
            <Link href="/" className="text-sm text-muted-foreground hover:text-primary">الرئيسية</Link>
            <Link href="/#plans" className="text-sm text-muted-foreground hover:text-primary">الباقات</Link>
            <Link href="#" className="text-sm text-muted-foreground hover:text-primary">سياسة الخصوصية</Link>
            <Link href="#" className="text-sm text-muted-foreground hover:text-primary">تواصل معنا</Link>
        </div>
        <div className="grid gap-2">
            <h4 className="font-semibold">تابعنا</h4>
            <div className="flex gap-4">
                <Link href="#" aria-label="Facebook"><Facebook className="h-6 w-6 text-muted-foreground hover:text-primary" /></Link>
                <Link href="#" aria-label="Twitter"><Twitter className="h-6 w-6 text-muted-foreground hover:text-primary" /></Link>
                <Link href="#" aria-label="Instagram"><Instagram className="h-6 w-6 text-muted-foreground hover:text-primary" /></Link>
                <Link href="#" aria-label="LinkedIn"><Linkedin className="h-6 w-6 text-muted-foreground hover:text-primary" /></Link>
            </div>
        </div>
        <div>
          <h4 className="font-semibold">النشرة الإخبارية</h4>
          <p className="text-sm text-muted-foreground mt-2">اشترك للحصول على آخر التحديثات والعروض.</p>
        </div>
      </div>
      <div className="border-t">
        <div className="container mx-auto flex h-16 items-center justify-center px-4 md:px-6">
            <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} EduSmart. جميع الحقوق محفوظة.
            </p>
        </div>
      </div>
    </footer>
  );
}
