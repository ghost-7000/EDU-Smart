import type { ImagePlaceholder } from './placeholder-images';
import { PlaceHolderImages } from './placeholder-images';

export const placeholderImages: ImagePlaceholder[] = PlaceHolderImages;

export const branches = [
  'مسقط',
  'صلالة',
  'نزوى',
  'صحار',
  'عبري',
  'صور',
  'شناص',
  'المصنعة',
  'إبراء',
  'الرستاق',
  'بدية'
];

export const courses = [
  {
    id: 1,
    teacherId: 1,
    title: 'مقدمة في تطوير الويب',
    code: 'CS101',
    teacher: 'د. أحمد المحروقي',
    rating: 4.5,
    price: null,
    isFreeTrial: true,
    image: placeholderImages.find(p => p.id === 'course-1'),
    emoji: '💻',
    specialization: 'تكنولوجيا المعلومات',
    popularity: 'most_popular',
    newness: 'new'
  },
  {
    id: 2,
    teacherId: 1,
    title: 'أساسيات علم البيانات',
    code: 'DS202',
    teacher: 'أ. فاطمة الشيذانية',
    rating: 4.8,
    price: 20,
    isFreeTrial: false,
    image: placeholderImages.find(p => p.id === 'course-2'),
    emoji: '📊',
    specialization: 'تكنولوجيا المعلومات',
    popularity: 'most_popular',
    newness: 'old'
  },
  {
    id: 3,
    teacherId: 2,
    title: 'إدارة الأعمال الحديثة',
    code: 'BUS301',
    teacher: 'د. سالم الوهيبي',
    rating: 4.2,
    price: 15,
    isFreeTrial: false,
    image: placeholderImages.find(p => p.id === 'course-3'),
    emoji: '📈',
    specialization: 'إدارة الأعمال',
    popularity: 'standard',
    newness: 'old'
  },
  {
    id: 4,
    teacherId: 3,
    title: 'فن التصميم الجرافيكي',
    code: 'ART110',
    teacher: 'أ. مريم الحوسنية',
    rating: 4.9,
    price: 18,
    isFreeTrial: true,
    image: placeholderImages.find(p => p.id === 'course-4'),
    emoji: '🎨',
    specialization: 'الفنون والتصميم',
    popularity: 'standard',
    newness: 'new'
  },
  {
    id: 5,
    teacherId: 4,
    title: 'مبادئ الهندسة الكهربائية',
    code: 'EE250',
    teacher: 'د. يوسف العامري',
    rating: 4.6,
    price: 25,
    isFreeTrial: false,
    image: placeholderImages.find(p => p.id === 'course-5'),
    emoji: '⚡️',
    specialization: 'الهندسة',
    popularity: 'standard',
    newness: 'old'
  },
  {
    id: 6,
    teacherId: 1,
    title: 'تحليل النصوص الأدبية',
    code: 'LIT400',
    teacher: 'أ. عائشة البلوشية',
    rating: 4.7,
    price: null,
    isFreeTrial: true,
    image: placeholderImages.find(p => p.id === 'course-6'),
    emoji: '📜',
    specialization: 'الآداب والعلوم الإنسانية',
    popularity: 'standard',
    newness: 'new'
  },
];

export const studentData = {
  name: 'علي بن محمد',
  branch: 'مسقط',
  points: 1250,
  enrolledCourses: [
    { ...courses[0], status: 'active', progress: 75 },
    { ...courses[2], status: 'trial', progress: 20 },
    { ...courses[4], status: 'completed', progress: 100 },
  ],
};

export const teacherData = {
  id: 1,
  name: 'د. أحمد المحروقي',
  branch: 'مسقط',
  totalCourses: 3,
  courses: [
    { ...courses[0], enrolledStudents: 152, reviews: [ {rating: 4, comment: "شرح ممتاز!"}, {rating: 5, comment: "كورس رائع ومفيد جدا."} ] },
    { ...courses[1], enrolledStudents: 98, reviews: [ {rating: 5, comment: "محتوى قيم وأستاذ متمكن."} ] },
    { ...courses[5], enrolledStudents: 75, reviews: [ {rating: 4, comment: "أتمنى لو كان هناك المزيد من الأمثلة."} ] },
  ],
};
