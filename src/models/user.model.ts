import { Table,Column,Model,DataType, AllowNull } from "sequelize-typescript";
import type { InferAttributes, InferCreationAttributes, CreationOptional } from "sequelize";
import { Role,Gender } from "../enum/auth.enum";

@Table({
   tableName:"users",
   timestamps:true, 
})

 class User extends Model<InferAttributes<User>, InferCreationAttributes<User>>{
    @Column({
        type:DataType.STRING,
        allowNull:false,
    })
    name!:string;

    @Column({
        type:DataType.STRING,
        unique:true,
        allowNull:false

    })
    email!:string;

    @Column({
        type:DataType.ENUM(...Object.values(Role)),
        defaultValue:Role.User,
    })
    role!:CreationOptional<Role>;

    @Column({
        type:DataType.ENUM(...Object.values(Gender)),
        

    })
    gender!:Gender
}
export default User;