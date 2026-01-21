import { testConnection } from './config/database';
import { getAllStudents } from './data/student.data';

async function main() {
  await testConnection();
  const students = await getAllStudents();
  console.log(students);
}

main();