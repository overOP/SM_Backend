import { Table, Column, Model, DataType } from "sequelize-typescript";
import type { InferAttributes, InferCreationAttributes, CreationOptional } from "sequelize";
import { Gender } from "../enum/auth.enum";

@Table({
    tableName: "teachers",
    timestamps: true,
})
class Teacher extends Model<InferAttributes<Teacher>, InferCreationAttributes<Teacher>> {
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
        unique: true,
        allowNull: false,
    })
    employeeId!: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    subject!: string;

    @Column({
        type: DataType.ENUM(...Object.values(Gender)),
    })
    gender!: Gender;

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

    @Column({
        type: DataType.DATEONLY,
        allowNull: true,
    })
    dateJoined!: CreationOptional<string>;

    @Column({
        type: DataType.STRING,
        allowNull: true,
    })
    profilePicture!: CreationOptional<string>;
}

export default Teacher;
