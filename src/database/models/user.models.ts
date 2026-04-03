import { Column, DataType, Model, Table } from "sequelize-typescript";

@Table({
  tableName: "users",
  modelName: "User",
  timestamps: true,
})
class User extends Model {
  @Column({
    primaryKey: true,
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
  })
  declare id: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  declare profileImage: string | null;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare name: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare email: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare password: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  declare phoneNumber: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  declare guardianName: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  declare subject: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  declare classAssigned: string;

  @Column({
    type: DataType.ENUM("active", "onLeave", "inActive"),
    defaultValue: "active",
  })
  declare status: "active" | "onLeave" | "inActive";

  @Column({
    type: DataType.ENUM(
      "student",
      "teacher",
      "principal",
      "parent",
      "superAdmin",
    ),

    defaultValue: "student",
  })
  declare role: "student" | "teacher" | "principal" | "parent" | "superadmin";
}

export default User;
