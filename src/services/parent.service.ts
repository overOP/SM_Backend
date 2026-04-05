import Parent from "../models/parent.model";
import Student from "../models/student.model";
import { CreateParent, UpdateParent } from "../types/parent.type";

export class ParentService {
    static async createParent(data: CreateParent) {
        try {
            const parent = await Parent.create(data);
            return parent;
        } catch (error) {
            throw new Error(`Error creating parent: ${error}`);
        }
    }

    static async getAllParents() {
        try {
            const parents = await Parent.findAll();
            return parents;
        } catch (error) {
            throw new Error(`Error fetching parents: ${error}`);
        }
    }

    static async getParentById(id: number) {
        try {
            const parent = await Parent.findByPk(id);
            if (!parent) throw new Error("Parent not found");
            return parent;
        } catch (error) {
            throw new Error(`Error fetching parent: ${error}`);
        }
    }

    static async getParentWithChildren(id: number) {
        try {
            const parent = await Parent.findByPk(id);
            if (!parent) throw new Error("Parent not found");
            const children = await Student.findAll({ where: { parentId: id } });
            return { parent, children };
        } catch (error) {
            throw new Error(`Error fetching parent with children: ${error}`);
        }
    }

    static async updateParent(id: number, data: UpdateParent) {
        try {
            const parent = await Parent.findByPk(id);
            if (!parent) throw new Error("Parent not found");
            await parent.update(data);
            return parent;
        } catch (error) {
            throw new Error(`Error updating parent: ${error}`);
        }
    }

    static async deleteParent(id: number) {
        try {
            const parent = await Parent.findByPk(id);
            if (!parent) throw new Error("Parent not found");
            await parent.destroy();
            return { message: "Parent deleted successfully" };
        } catch (error) {
            throw new Error(`Error deleting parent: ${error}`);
        }
    }
}
