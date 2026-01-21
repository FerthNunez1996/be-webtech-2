import pool from '../config/database';
import { Student } from '../student/student.model';

// Get all students
export async function getAllStudents(): Promise<Student[]> {
  const [rows] = await pool.query('SELECT * FROM students');
  return rows as Student[];
}

// Get student by ID
export async function getStudentById(id: number): Promise<Student | null> {
  const [rows]: any = await pool.query(
    'SELECT * FROM students WHERE id = ?',
    [id]
  );
  return rows.length ? rows[0] : null;
}

// Create new student
export async function createStudent(student: Student): Promise<number> {
  const [result]: any = await pool.query(
    `INSERT INTO students
     (first_name, last_name, email, age, course, year_level, gpa, enrollment_status)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      student.first_name,
      student.last_name,
      student.email,
      student.age,
      student.course,
      student.year_level,
      student.gpa,
      student.enrollment_status ?? 'Active'
    ]
  );

  return result.insertId;
}