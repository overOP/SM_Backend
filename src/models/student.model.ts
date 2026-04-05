import { Table, Column, Model, DataType, ForeignKey } from "sequelize-typescript";
import type { InferAttributes, InferCreationAttributes, CreationOptional } from "sequelize";
import { Gender } from "../enum/auth.enum";
import Parent from "./parent.model";

@Table({
    tableName: "students",
    timestamps: true,
})
class Student extends Model<InferAttributes<Student>, InferCreationAttributes<Student>> {
    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    name!: string;

    @Column({
        type: DataType.STRING,
        unique: true,
        allowNull: false,
    })
    email!: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    password!: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    rollNumber!: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    className!: string;

    @Column({
        type: DataType.ENUM(...Object.values(Gender)),
    })
    gender!: Gender;

    @Column({
        type: DataType.DATEONLY,
        allowNull: true,
    })
    dateOfBirth!: CreationOptional<string>;

    @Column({
        type: DataType.STRING,
        allowNull: true,
    })
    phone!: CreationOptional<string>;

    @Column({
        type: DataType.TEXT,
        allowNull: true,
    })
    address!: CreationOptional<string>;

    @ForeignKey(() => Parent)
    @Column({
        type: DataType.INTEGER,
        allowNull: true,
    })
    parentId!: CreationOptional<number>;

    @Column({
        type: DataType.STRING,
        allowNull: true,
    })
    profilePicture!: CreationOptional<string>;
}

export default Student;
