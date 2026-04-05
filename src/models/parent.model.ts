import { Table, Column, Model, DataType, HasMany } from "sequelize-typescript";
import type { InferAttributes, InferCreationAttributes, CreationOptional } from "sequelize";
import { Gender } from "../enum/auth.enum";

@Table({
    tableName: "parents",
    timestamps: true,
})
class Parent extends Model<InferAttributes<Parent>, InferCreationAttributes<Parent>> {
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
    phone!: string;

    @Column({
        type: DataType.TEXT,
        allowNull: true,
    })
    address!: CreationOptional<string>;

    @Column({
        type: DataType.ENUM(...Object.values(Gender)),
    })
    gender!: Gender;

    @Column({
        type: DataType.STRING,
        allowNull: true,
    })
    occupation!: CreationOptional<string>;

    @Column({
        type: DataType.STRING,
        allowNull: true,
    })
    profilePicture!: CreationOptional<string>;
}

export default Parent;
