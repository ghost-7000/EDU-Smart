
export type Language = 'en' | 'ar';

export type Translation = {
  // Header
  home: string;
  courses: string;
  aboutUs: string;
  login: string;
  logout: string;
  
  // Auth
  loginAsStudent: string;
  loginAsTeacher: string;
  email: string;
  password: string;
  selectBranch: string;
  createNewAccount: string;
  signup: string;
  name: string;
  confirmPassword: string;
  
  // General
  startNow: string;
  appName: string;
};

const en: Translation = {
  home: 'Home',
  courses: 'Courses',
  aboutUs: 'About Us',
  login: 'Login',
  logout: 'Logout',
  loginAsStudent: 'Login as Student',
  loginAsTeacher: 'Login as Teacher',
  email: 'Email Address',
  password: 'Password',
  selectBranch: 'Select UTAS Branch',
  createNewAccount: 'Create new account',
  signup: 'Sign Up',
  name: 'Full Name',
  confirmPassword: 'Confirm Password',
  startNow: 'Start Now',
  appName: 'EduSmart',
};

const ar: Translation = {
  home: 'الرئيسية',
  courses: 'الباقات',
  aboutUs: 'من نحن',
  login: 'تسجيل الدخول',
  logout: 'تسجيل خروج',
  loginAsStudent: 'تسجيل كطالب',
  loginAsTeacher: 'تسجيل كمعلم',
  email: 'البريد الإلكتروني',
  password: 'كلمة المرور',
  selectBranch: 'اختر فرع جامعة UTAS',
  createNewAccount: 'إنشاء حساب جديد',
  signup: 'إنشاء حساب',
  name: 'الاسم الكامل',
  confirmPassword: 'تأكيد كلمة المرور',
  startNow: 'ابدأ الآن',
  appName: 'EduSmart',
};

export const translations: Record<Language, Translation> = {
  en,
  ar,
};
