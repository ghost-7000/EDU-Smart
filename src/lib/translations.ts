
export type Language = 'en' | 'ar';

export type Translation = {
  // Header
  home: string;
  courses: string;
  aboutUs: string;
  login: string;
  logout: string;
  
  // Auth
  loginDescription: string;
  loginAsStudent: string;
  loginAsTeacher: string;
  loginStudentPrompt: string;
  loginTeacherPrompt: string;
  goToDashboard: string;
  email: string;
  password: string;
  selectBranch: string;
  createNewAccount: string;
  signup: string;
  name: string;
  confirmPassword: string;
  noAccount: string;
  
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
  loginDescription: 'Choose your role to access your dashboard.',
  loginAsStudent: 'Login as Student',
  loginAsTeacher: 'Login as Teacher',
  loginStudentPrompt: 'Proceed to your student dashboard.',
  loginTeacherPrompt: 'Proceed to your teacher dashboard.',
  goToDashboard: 'Go to Dashboard',
  email: 'Email Address',
  password: 'Password',
  selectBranch: 'Select UTAS Branch',
  createNewAccount: 'Create new account',
  signup: 'Sign Up',
  name: 'Full Name',
  confirmPassword: 'Confirm Password',
  noAccount: 'Don\'t have an account?',
  startNow: 'Start Now',
  appName: 'EduSmart',
};

const ar: Translation = {
  home: 'الرئيسية',
  courses: 'الكورسات',
  aboutUs: 'من نحن',
  login: 'تسجيل الدخول',
  logout: 'تسجيل خروج',
  loginDescription: 'اختر دورك للوصول إلى لوحة التحكم الخاصة بك.',
  loginAsStudent: 'تسجيل كطالب',
  loginAsTeacher: 'تسجيل كمعلم',
  loginStudentPrompt: 'انتقل إلى لوحة تحكم الطالب.',
  loginTeacherPrompt: 'انتقل إلى لوحة تحكم المعلم.',
  goToDashboard: 'الانتقال إلى لوحة التحكم',
  email: 'البريد الإلكتروني',
  password: 'كلمة المرور',
  selectBranch: 'اختر فرع جامعة UTAS',
  createNewAccount: 'إنشاء حساب جديد',
  signup: 'إنشاء حساب',
  name: 'الاسم الكامل',
  confirmPassword: 'تأكيد كلمة المرور',
  noAccount: 'ليس لديك حساب؟',
  startNow: 'ابدأ الآن',
  appName: 'EduSmart',
};

export const translations: Record<Language, Translation> = {
  en,
  ar,
};
