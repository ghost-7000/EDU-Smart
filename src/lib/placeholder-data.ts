
import type { ImagePlaceholder } from './placeholder-images';
import { PlaceHolderImages } from './placeholder-images';
import { Course, Teacher, Student } from './types';

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


export const courses: Course[] = [
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
    enrolledStudents: 152,
    reviews: [ {rating: 4, comment: "شرح ممتاز!"}, {rating: 5, comment: "كورس رائع ومفيد جدا."} ],
    content: {
      chapters: [
        {
          id: 1,
          title: 'الشابتر الأول: مقدمة إلى الويب',
          lessons: [{ id: 1, title: 'مقدمة إلى HTML', isPaid: false }],
          quizzes: [{ id: 1, title: 'اختبار أساسيات HTML', isPaid: true }],
          assignments: [{ id: 1, title: 'نشاط: إعداد بيئة العمل', isPaid: false }],
          additionalMaterials: [{ id: 1, title: 'فيديو: شرح بيئة العمل', type: 'video', url: 'https://www.youtube.com/embed/watch?v=Q8g9-dY2b-E', isPaid: true }]
        },
        {
          id: 2,
          title: 'الشابتر الثاني: أساسيات CSS',
          lessons: [{ id: 1, title: 'درس: أساسيات CSS', isPaid: false }, { id: 2, title: 'درس: Flexbox and Grid', isPaid: true }],
          quizzes: [{ id: 1, title: 'اختبار مفاهيم CSS', isPaid: true }],
          assignments: [],
          additionalMaterials: [{ id: 1, title: 'ملخص: أهم خصائص CSS', type: 'summary', isPaid: false }]
        },
        {
          id: 3,
          title: 'الشابتر الثالث: مقدمة في JavaScript',
          lessons: [{ id: 1, title: 'درس: مقدمة في JavaScript', isPaid: false }, { id: 2, title: 'شرح: المتغيرات وأنواع البيانات', isPaid: true }],
          quizzes: [],
          assignments: [{ id: 1, title: 'مشروع: بناء صفحة شخصية', isPaid: false }],
          additionalMaterials: []
        },
        {
          id: 4,
          title: 'الشابتر الرابع: التفاعل مع DOM',
          lessons: [{ id: 1, title: 'شرح: الوصول إلى عناصر DOM', isPaid: true }],
          quizzes: [{ id: 1, title: 'أسئلة: التفاعل مع DOM', isPaid: true }],
          assignments: [],
          additionalMaterials: []
        },
        {
          id: 5,
          title: 'الشابتر الخامس: مفاهيم متقدمة',
          lessons: [{ id: 1, title: 'شرح: البرمجة غير المتزامنة (Async)', isPaid: true }],
          quizzes: [],
          assignments: [],
          additionalMaterials: [{id: 1, title: 'فيديو: Promises و Async/Await', type: 'video', url: 'https://www.youtube.com/embed/watch?v=something-else', isPaid: true}]
        },
        {
          id: 6,
          title: 'الشابتر السادس: المشروع النهائي',
          lessons: [],
          quizzes: [],
          assignments: [{ id: 1, title: 'تسليم: بناء موقع ويب كامل', isPaid: false }],
          additionalMaterials: []
        }
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
    enrolledStudents: 98,
    reviews: [ {rating: 5, comment: "محتوى قيم وأستاذ متمكن."} ],
    content: {
      chapters: [
        {
          id: 1,
          title: 'مقدمة',
          lessons: [{ id: 1, title: 'مقدمة إلى Python', isPaid: false }],
          quizzes: [{ id: 1, title: 'اختبار أساسيات Python', isPaid: true }],
          assignments: [],
          additionalMaterials: []
        }
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
    enrolledStudents: 110,
    reviews: [],
    content: {
      chapters: [
        {
          id: 1,
          title: 'مقدمة',
          lessons: [
            { id: 1, title: 'مبادئ الإدارة', isPaid: false },
            { id: 2, title: 'استراتيجيات التسويق', isPaid: true },
          ],
          quizzes: [{ id: 1, title: 'اختبار مبادئ الإدارة', isPaid: true }],
          assignments: [{ id: 1, title: 'دراسة حالة: شركة ناشئة', isPaid: false }],
          additionalMaterials: []
        }
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
    enrolledStudents: 250,
    reviews: [],
    content: {
      chapters: [
        {
          id: 1,
          title: 'مقدمة',
          lessons: [
            { id: 1, title: 'مقدمة في نظرية الألوان', isPaid: false },
            { id: 2, title: 'أساسيات الطباعة', isPaid: true },
          ],
          quizzes: [
            { id: 1, title: 'اختبار نظرية الألوان', isPaid: true },
          ],
          assignments: [
            { id: 1, title: 'تصميم هوية بصرية بسيطة', isPaid: false },
          ],
          additionalMaterials: []
        }
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
    enrolledStudents: 80,
    reviews: [],
     content: {
        chapters: [
            {
                id: 1,
                title: 'مقدمة',
                lessons: [
                    { id: 1, title: 'قانون أوم', isPaid: false },
                    { id: 2, title: 'تحليل الدوائر', isPaid: true },
                ],
                quizzes: [
                    { id: 1, title: 'اختبار قانون أوم', isPaid: true },
                ],
                assignments: [
                    { id: 1, title: 'تصميم دائرة بسيطة', isPaid: false },
                ],
                additionalMaterials: []
            }
        ]
    }
  },
  {
    id: 6,
    teacherId: 5,
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
    enrolledStudents: 75,
    reviews: [ {rating: 4, comment: "أتمنى لو كان هناك المزيد من الأمثلة."} ],
     content: {
        chapters: [
            {
                id: 1,
                title: 'مقدمة',
                lessons: [
                    { id: 1, title: 'مدارس النقد الأدبي', isPaid: false },
                    { id: 2, title: 'تحليل الشخصيات', isPaid: true },
                ],
                quizzes: [
                    { id: 1, title: 'اختبار مدارس النقد', isPaid: true },
                ],
                assignments: [
                    { id: 1, title: 'تحليل قصيدة مختارة', isPaid: false },
                ],
                additionalMaterials: []
            }
        ]
    }
  },
];

export const studentData: Student = {
  name: 'علي بن محمد',
  email: 'ali.mohamed@email.com',
  branch: 'مسقط',
  specialization: 'تكنولوجيا المعلومات',
  academicYear: 'السنة الثالثة',
  bio: 'طالب شغوف بتعلم تقنيات الويب الجديدة وتطوير التطبيقات.',
  points: 1250,
  subscription: {
    planName: 'باقة 3 أشهر',
    endDate: '2025-10-11',
    selectedCourses: 3,
    totalCourses: 5,
  },
  enrolledCourses: [
    { ...courses[0], status: 'active', progress: 75 },
    { ...courses[2], status: 'trial', progress: 20 },
    { ...courses[4], status: 'completed', progress: 100 },
    { ...courses[3], status: 'active', progress: 40 },
    { ...courses[5], status: 'trial', progress: 10 },
  ],
};

const teacher1Courses = courses.filter(c => c.teacherId === 1);
const teacher1TotalStudents = teacher1Courses.reduce((sum, course) => sum + course.enrolledStudents, 0);
const teacher1TotalRatingsCount = teacher1Courses.flatMap(c => c.reviews).length;
const teacher1TotalRatingsSum = teacher1Courses.flatMap(c => c.reviews).reduce((sum, review) => sum + review.rating, 0);


export const teacherData: Teacher = {
  id: 1,
  name: 'د. أحمد المحروقي',
  email: 'ahmed.mahrouqi@email.com',
  branch: 'مسقط',
  specialization: 'تكنولوجيا المعلومات',
  bio: 'أستاذ جامعي متخصص في علوم الحاسب وتطوير الويب، أؤمن بأهمية التعليم التفاعلي والمشاريع العملية.',
  avatar: placeholderImages.find(p => p.id === 'teacher-avatar')?.imageUrl,
  totalCourses: teacher1Courses.length,
  totalStudents: teacher1TotalStudents,
  averageRating: teacher1TotalRatingsCount > 0 ? (teacher1TotalRatingsSum / teacher1TotalRatingsCount) : 0,
  courses: teacher1Courses,
};

const allTeachersData = [
  {
    id: 1,
    name: 'د. أحمد المحروقي',
    email: 'ahmed.mahrouqi@email.com',
    branch: 'مسقط',
    specialization: 'تكنولوجيا المعلومات',
    bio: 'أستاذ جامعي متخصص في علوم الحاسب وتطوير الويب، أؤمن بأهمية التعليم التفاعلي والمشاريع العملية.',
    avatar: 'https://i.ibb.co/CVDp04L/teacher-male.png',
  },
  {
    id: 2,
    name: 'أ. فاطمة الشيذانية',
    email: 'fatima.shidhani@email.com',
    branch: 'صحار',
    specialization: 'إدارة الأعمال',
    bio: 'خبيرة في ريادة الأعمال واستراتيجيات التسويق الحديثة.',
    avatar: 'https://i.ibb.co/3sS5Xw4/teacher-female.png',
  },
  {
    id: 3,
    name: 'د. سالم الوهيبي',
    email: 'salim.wuhaibi@email.com',
    branch: 'نزوى',
    specialization: 'الفنون والتصميم',
    bio: 'مصمم جرافيك عالمي بخبرة تمتد لعقدين في مجال الهوية البصرية.',
    avatar: "https://i.ibb.co/CVDp04L/teacher-male.png",
  },
  {
    id: 4,
    name: 'أ. مريم الحوسنية',
    email: 'maryam.housni@email.com',
    branch: 'صلالة',
    specialization: 'الهندسة',
    bio: 'مهندسة كهربائية متخصصة في أنظمة الطاقة المتجددة.',
    avatar: "https://i.ibb.co/3sS5Xw4/teacher-female.png",
  },
  {
    id: 5,
    name: 'د. يوسف العامري',
    email: 'yousuf.amri@email.com',
    branch: 'مسقط',
    specialization: 'الآداب والعلوم الإنسانية',
    bio: 'باحث وناقد أدبي، متخصص في الأدب العربي المعاصر.',
     avatar: "https://i.ibb.co/CVDp04L/teacher-male.png",
  }
];

export const allTeachers: Teacher[] = allTeachersData.map(teacher => {
    const teacherCourses = courses.filter(c => c.teacherId === teacher.id);
    const totalStudents = teacherCourses.reduce((sum, course) => sum + course.enrolledStudents, 0);
    const allReviews = teacherCourses.flatMap(c => c.reviews);
    const averageRating = allReviews.length > 0
        ? allReviews.reduce((sum, review) => sum + review.rating, 0) / allReviews.length
        : 0;

    return {
        ...teacher,
        totalCourses: teacherCourses.length,
        totalStudents,
        averageRating,
        courses: teacherCourses,
    };
});
