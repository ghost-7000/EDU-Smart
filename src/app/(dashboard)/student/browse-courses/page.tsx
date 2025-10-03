
'use client';

import { useState } from 'react';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { CourseCard } from '@/components/course-card';
import { courses as allCourses } from '@/lib/placeholder-data';
import { Search } from 'lucide-react';

export default function BrowseCoursesPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    popularity: 'all',
    newness: 'all',
    specialization: 'all',
  });

  const specializations = [...new Set(allCourses.map(c => c.specialization))];

  const handleFilterChange = (filterName: string) => (value: string) => {
    setFilters(prev => ({ ...prev, [filterName]: value }));
  };

  const filteredCourses = allCourses.filter(course => {
    const searchMatch = course.title.includes(searchTerm) || course.code.toLowerCase().includes(searchTerm.toLowerCase());
    const popularityMatch = filters.popularity === 'all' || course.popularity === filters.popularity;
    const newnessMatch = filters.newness === 'all' || course.newness === filters.newness;
    const specializationMatch = filters.specialization === 'all' || course.specialization === filters.specialization;
    return searchMatch && popularityMatch && newnessMatch && specializationMatch;
  });

  return (
    <div>
      <h1 className="text-3xl font-bold font-headline mb-6">اكتشف الكورسات</h1>
      <div className="mb-8 p-4 rounded-lg bg-card border">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              placeholder="البحث بالاسم أو الكود..."
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Select onValueChange={handleFilterChange('popularity')} defaultValue="all">
            <SelectTrigger>
              <SelectValue placeholder="حسب الشهرة" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">الكل</SelectItem>
              <SelectItem value="most_popular">الأكثر شيوعًا</SelectItem>
            </SelectContent>
          </Select>
          <Select onValueChange={handleFilterChange('newness')} defaultValue="all">
            <SelectTrigger>
              <SelectValue placeholder="حسب الحداثة" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">الكل</SelectItem>
              <SelectItem value="new">الجديد</SelectItem>
            </SelectContent>
          </Select>
          <Select onValueChange={handleFilterChange('specialization')} defaultValue="all">
            <SelectTrigger>
              <SelectValue placeholder="حسب التخصص" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">كل التخصصات</SelectItem>
              {specializations.map(spec => (
                <SelectItem key={spec} value={spec}>{spec}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {filteredCourses.length > 0 ? (
            filteredCourses.map((course) => (
                <CourseCard key={course.id} course={course} />
            ))
        ) : (
            <p className="col-span-full text-center text-muted-foreground">لا توجد نتائج تطابق بحثك.</p>
        )}
      </div>
    </div>
  );
}
