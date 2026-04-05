import Teacher from "../models/teacher.model";
import { CreateTeacher, UpdateTeacher } from "../types/teacher.type";

export class TeacherService {
    static async createTeacher(data: CreateTeacher) {
        try {
            const teacher = await Teacher.create(data);
            return teacher;
        } catch (error) {
            throw new Error(`Error creating teacher: ${error}`);
        }
    }

    static async getAllTeachers() {
        try {
            const teachers = await Teacher.findAll();
            return teachers;
        } catch (error) {
            throw new Error(`Error fetching teachers: ${error}`);
        }
    }

    static async getTeacherById(id: number) {
        try {
            const teacher = await Teacher.findByPk(id);
            if (!teacher) throw new Error("Teacher not found");
            return teacher;
        } catch (error) {
            throw new Error(`Error fetching teacher: ${error}`);
        }
    }

    static async getTeachersBySubject(subject: string) {
        try {
            const teachers = await Teacher.findAll({ where: { subject } });
            return teachers;
        } catch (error) {
            throw new Error(`Error fetching teachers by subject: ${error}`);
        }
    }

    static async updateTeacher(id: number, data: UpdateTeacher) {
        try {
            const teacher = await Teacher.findByPk(id);
            if (!teacher) throw new Error("Teacher not found");
            await teacher.update(data);
            return teacher;
        } catch (error) {
            throw new Error(`Error updating teacher: ${error}`);
        }
    }

    static async deleteTeacher(id: number) {
        try {
            const teacher = await Teacher.findByPk(id);
            if (!teacher) throw new Error("Teacher not found");
            await teacher.destroy();
            return { message: "Teacher deleted successfully" };
        } catch (error) {
            throw new Error(`Error deleting teacher: ${error}`);
        }
    }
}
