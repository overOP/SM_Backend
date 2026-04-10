import {
  AllowNull,
  Column,
  DataType,
  Default,
  ForeignKey,
  HasOne,
  Model,
  Table,
} from "sequelize-typescript";
import Attendance from "./attendance.models";
import Result from "./result.models";

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

  // student
  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  declare guardianName: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  declare classGrade: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  declare rollNumber: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  declare section: string;

  // teacher
  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  declare classAssigned: string;
  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  declare subject: string;

  @Column({
    type: DataType.ENUM("active", "onLeave", "inActive"),
    defaultValue: "active",
  })
  declare status: "active" | "onLeave" | "inActive";

  // user
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

  @Column({
    type: DataType.STRING(125),
    allowNull: true,
  })
  declare passwordOtp?: string | null;

  @Column({
    type: DataType.DATE,
    allowNull: true,
  })
  declare passwordOtpExpiresAt?: Date | null;

  @Column({
    type: DataType.DATE,
    allowNull: true,
  })
  declare otpLastSentAt?: Date | null;

  @Default(0)
  @Column({
    type: DataType.INTEGER,
    allowNull: true,
  })
  declare otpResendCount: number;

  @Default(0)
  @Column({
    type: DataType.INTEGER,
    allowNull: true,
  })
  declare otpAttempts: number;

  @Default(false)
  @Column({
    type: DataType.BOOLEAN,
    allowNull: true,
  })
  declare isOtPVerified: boolean;

  @HasOne(() => Attendance, { foreignKey: "" })
  declare attendance: Attendance[];

  @HasOne(() => Result, { foreignKey: "" })
  declare result: Result[];
}

export default User;
