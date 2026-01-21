CREATE DATABASE `web-tech-2`;

USE `web-tech-2`;

CREATE TABLE students (
    id INT AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    email VARCHAR(150) NOT NULL UNIQUE,
    age INT,
    course VARCHAR(100),
    year_level INT CHECK (year_level BETWEEN 1 AND 4),
    gpa DECIMAL(3,2),
    enrollment_status ENUM('Active', 'Inactive') DEFAULT 'Active',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);