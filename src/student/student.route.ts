import { Hono } from "hono";
import { pool } from "../models/db.js";
import { studentSchema } from "../utils/validation.js";

const studentRouter = new Hono();

// GET all students
studentRouter.get("/", async (c) => {
  const [rows] = await pool.query("SELECT * FROM students");
  return c.json(rows);
});

// GET student by ID
studentRouter.get("/:id", async (c) => {
  const { id } = c.req.param();
  const [rows] = await pool.query("SELECT * FROM students WHERE id = ?", [id]);
  if ((rows as any[]).length === 0) return c.json({ error: "Student not found" }, 404);
  return c.json(rows[0]);
});

// POST create student
studentRouter.post("/", async (c) => {
  try {
    const body = await c.req.json();
    const data = studentSchema.parse(body);

    const [result] = await pool.query(
      `INSERT INTO students (first_name, last_name, email, age, course, year_level, gpa, enrollment_status, created_at)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, NOW())`,
      [
        data.first_name,
        data.last_name,
        data.email,
        data.age,
        data.course,
        data.year_level,
        data.gpa,
        data.enrollment_status,
      ]
    );

    return c.json({ id: (result as any).insertId, ...data }, 201);
  } catch (err: any) {
    return c.json({ error: err.message }, 400);
  }
});

// PUT update student
studentRouter.put("/:id", async (c) => {
  try {
    const { id } = c.req.param();
    const body = await c.req.json();
    const data = studentSchema.parse(body);

    const [result] = await pool.query(
      UPDATE students SET first_name=?, last_name=?, email=?, age=?, course=?, year_level=?, gpa=?, enrollment_status=? WHERE id=?,
      [
        data.first_name,
        data.last_name,
        data.email,
        data.age,
        data.course,
        data.year_level,
        data.gpa,
        data.enrollment_status,
        id,
      ]
    );

    return c.json({ id, ...data });
  } catch (err: any) {
    return c.json({ error: err.message }, 400);
  }
});

// DELETE student
studentRouter.delete("/:id", async (c) => {
  const { id } = c.req.param();
  await pool.query("DELETE FROM students WHERE id=?", [id]);
  return c.json({ message: "Deleted successfully" });
});

export default studentRouter;