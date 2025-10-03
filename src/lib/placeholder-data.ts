
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

export const specializations = [
    'تكنولوجيا المعلومات',
    'إدارة الأعمال',
    'الهندسة',
    'الفنون والتصميم',
    'الآداب والعلوم الإنسانية',
    'العلوم التطبيقية'
];

export const academicYears = [
    'السنة الأولى',
    'السنة الثانية',
    'السنة الثالثة',
    'السنة الرابعة',
    'دراسات عليا'
];


export const courses = [
  {
    id: 1,
    teacherId: 1,
    title: 'مقدمة في تطوير الويب',
    code: 'CS101',
    description: 'تعلم أساسيات HTML, CSS, و JavaScript لبناء مواقع ويب تفاعلية. هذا الكورس مثالي للمبتدئين الذين يرغبون في دخول عالم تطوير الواجهات الأمامية.',
    teacher: 'د. أحمد المحروقي',
    rating: 4.5,
    price: null,
    isFreeTrial: true,
    image: placeholderImages.find(p => p.id === 'course-1'),
    emoji: '💻',
    specialization: 'تكنولوجيا المعلومات',
    popularity: 'most_popular',
    newness: 'new',
    content: {
      lessons: [
        { id: 1, title: 'مقدمة إلى HTML' },
        { id: 2, title: 'أساسيات CSS' },
        { id: 3, title: 'مقدمة في JavaScript' },
      ],
      quizzes: [
        { id: 1, title: 'اختبار أساسيات HTML' },
        { id: 2, title: 'اختبار مفاهيم CSS' },
      ],
      assignments: [
        { id: 1, title: 'مشروع: بناء صفحة شخصية' },
      ]
    }
  },
  {
    id: 2,
    teacherId: 1,
    title: 'أساسيات علم البيانات',
    code: 'DS202',
    description: 'استكشف عالم البيانات وتعلم كيفية تحليلها وتصورها باستخدام Python. ستبدأ رحلتك لتصبح عالم بيانات محترف.',
    teacher: 'د. أحمد المحروقي',
    rating: 4.8,
    price: 20,
    isFreeTrial: false,
    image: placeholderImages.find(p => p.id === 'course-2'),
    emoji: '📊',
    specialization: 'تكنولوجيا المعلومات',
    popularity: 'most_popular',
    newness: 'old',
    content: {
      lessons: [
        { id: 1, title: 'مقدمة إلى Python' },
        { id: 2, title: 'التعامل مع مكتبة Pandas' },
        { id: 3, title: 'تصور البيانات باسنخدام Matplotlib' },
      ],
      quizzes: [
        { id: 1, title: 'اختبار أساسيات Python' },
      ],
      assignments: [
        { id: 1, title: 'تحليل مجموعة بيانات حقيقية' },
      ]
    }
  },
  {
    id: 3,
    teacherId: 2,
    title: 'إدارة الأعمال الحديثة',
    code: 'BUS301',
    description: 'اكتسب المهارات اللازمة لإدارة الشركات والمشاريع بفعالية في بيئة الأعمال المعاصرة.',
    teacher: 'أ. فاطمة الشيذانية',
    rating: 4.2,
    price: 15,
    isFreeTrial: false,
    image: placeholderImages.find(p => p.id === 'course-3'),
    emoji: '📈',
    specialization: 'إدارة الأعمال',
    popularity: 'standard',
    newness: 'old',
    content: {
      lessons: [
        { id: 1, title: 'مبادئ الإدارة' },
        { id: 2, title: 'استراتيجيات التسويق' },
      ],
      quizzes: [
        { id: 1, title: 'اختبار مبادئ الإدارة' },
      ],
      assignments: [
        { id: 1, title: 'دراسة حالة: شركة ناشئة' },
      ]
    }
  },
  {
    id: 4,
    teacherId: 3,
    title: 'فن التصميم الجرافيكي',
    code: 'ART110',
    description: 'أطلق العنان لإبداعك وتعلم أساسيات التصميم الجرافيكي باستخدام أدوات مثل Adobe Photoshop و Illustrator.',
    teacher: 'د. سالم الوهيبي',
    rating: 4.9,
    price: 18,
    isFreeTrial: true,
    image: placeholderImages.find(p => p.id === 'course-4'),
    emoji: '🎨',
    specialization: 'الفنون والتصميم',
    popularity: 'standard',
    newness: 'new',
    content: {
      lessons: [
        { id: 1, title: 'مقدمة في نظرية الألوان' },
        { id: 2, title: 'أساسيات الطباعة' },
      ],
      quizzes: [
        { id: 1, title: 'اختبار نظرية الألوان' },
      ],
      assignments: [
        { id: 1, title: 'تصميم هوية بصرية بسيطة' },
      ]
    }
  },
  {
    id: 5,
    teacherId: 4,
    title: 'مبادئ الهندسة الكهربائية',
    code: 'EE250',
    description: 'فهم الدوائر الكهربائية والمكونات الإلكترونية الأساسية التي تشكل أساس التكنولوجيا الحديثة.',
    teacher: 'أ. مريم الحوسنية',
    rating: 4.6,
    price: 25,
    isFreeTrial: false,
    image: placeholderImages.find(p => p.id === 'course-5'),
    emoji: '⚡️',
    specialization: 'الهندسة',
    popularity: 'standard',
    newness: 'old',
     content: {
      lessons: [
        { id: 1, title: 'قانون أوم' },
        { id: 2, title: 'تحليل الدوائر' },
      ],
      quizzes: [
        { id: 1, title: 'اختبار قانون أوم' },
      ],
      assignments: [
        { id: 1, title: 'تصميم دائرة بسيطة' },
      ]
    }
  },
  {
    id: 6,
    teacherId: 1,
    title: 'تحليل النصوص الأدبية',
    code: 'LIT400',
    description: 'تعمق في فهم النصوص الأدبية وتعلم كيفية تحليلها ونقدها بأسلوب منهجي.',
    teacher: 'د. يوسف العامري',
    rating: 4.7,
    price: null,
    isFreeTrial: true,
    image: placeholderImages.find(p => p.id === 'course-6'),
    emoji: '📜',
    specialization: 'الآداب والعلوم الإنسانية',
    popularity: 'standard',
    newness: 'new',
     content: {
      lessons: [
        { id: 1, title: 'مدارس النقد الأدبي' },
        { id: 2, title: 'تحليل الشخصيات' },
      ],
      quizzes: [
        { id: 1, title: 'اختبار مدارس النقد' },
      ],
      assignments: [
        { id: 1, title: 'تحليل قصيدة مختارة' },
      ]
    }
  },
];

export const studentData = {
  name: 'علي بن محمد',
  email: 'ali.mohamed@email.com',
  branch: 'مسقط',
  specialization: 'تكنولوجيا المعلومات',
  academicYear: 'السنة الثالثة',
  bio: 'طالب شغوف بتعلم تقنيات الويب الجديدة وتطوير التطبيقات.',
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
  email: 'ahmed.mahrouqi@email.com',
  branch: 'مسقط',
  specialization: 'تكنولوجيا المعلومات',
  bio: 'أستاذ جامعي متخصص في علوم الحاسب وتطوير الويب، أؤمن بأهمية التعليم التفاعلي والمشاريع العملية.',
  totalCourses: 3,
  courses: [
    { ...courses[0], enrolledStudents: 152, reviews: [ {rating: 4, comment: "شرح ممتاز!"}, {rating: 5, comment: "كورس رائع ومفيد جدا."} ] },
    { ...courses[1], enrolledStudents: 98, reviews: [ {rating: 5, comment: "محتوى قيم وأستاذ متمكن."} ] },
    { ...courses[5], enrolledStudents: 75, reviews: [ {rating: 4, comment: "أتمنى لو كان هناك المزيد من الأمثلة."} ] },
  ],
};
