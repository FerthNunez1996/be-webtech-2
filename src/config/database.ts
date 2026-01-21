import mysql, { Pool } from 'mysql2/promise';

// Database configuration
const dbConfig = {
  host: "http://127.0.0.1",
  port: 3306,
  user: "root",
  password: "123456",
  database: "web-tech-2",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
};

// Create connection pool
const pool: Pool = mysql.createPool(dbConfig);

// Test database connection
export async function testConnection() {
  try {
    const connection = await pool.getConnection();
    console.log('✅ Database connected successfully');
    connection.release();
    return true;
  } catch (error) {
    console.error('❌ Database connection failed:', error);
    return false;
  }
}

export default pool;