export interface Student {
  id: number;
  name?: string;
  email?: string;
  grade?: string;
  enrollmentDate?: Date;
  status?: 'active' | 'inactive';
}