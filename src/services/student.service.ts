import Student from "../models/student.model";
import { CreateStudent, UpdateStudent } from "../types/student.type";

export class StudentService {
    static async createStudent(data: CreateStudent) {
        try {
            const student = await Student.create(data);
            return student;
        } catch (error) {
            throw new Error(`Error creating student: ${error}`);
        }
    }

    static async getAllStudents() {
        try {
            const students = await Student.findAll();
            return students;
        } catch (error) {
            throw new Error(`Error fetching students: ${error}`);
        }
    }

    static async getStudentById(id: number) {
        try {
            const student = await Student.findByPk(id);
            if (!student) throw new Error("Student not found");
            return student;
        } catch (error) {
            throw new Error(`Error fetching student: ${error}`);
        }
    }

    static async getStudentsByClass(className: string) {
        try {
            const students = await Student.findAll({ where: { className } });
            return students;
        } catch (error) {
            throw new Error(`Error fetching students by class: ${error}`);
        }
    }

    static async getStudentsByParentId(parentId: number) {
        try {
            const students = await Student.findAll({ where: { parentId } });
            return students;
        } catch (error) {
            throw new Error(`Error fetching students by parent: ${error}`);
        }
    }

    static async updateStudent(id: number, data: UpdateStudent) {
        try {
            const student = await Student.findByPk(id);
            if (!student) throw new Error("Student not found");
            await student.update(data);
            return student;
        } catch (error) {
            throw new Error(`Error updating student: ${error}`);
        }
    }

    static async deleteStudent(id: number) {
        try {
            const student = await Student.findByPk(id);
            if (!student) throw new Error("Student not found");
            await student.destroy();
            return { message: "Student deleted successfully" };
        } catch (error) {
            throw new Error(`Error deleting student: ${error}`);
        }
    }
}
