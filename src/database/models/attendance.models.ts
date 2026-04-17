import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from "sequelize-typescript";
import User from "./user.models";
import Subject from "./subject.models";

@Table({
  tableName: "attendances",
  modelName: "Attendance",
  timestamps: true,
})
class Attendance extends Model {
  @Column({
    primaryKey: true,
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
  })
  declare id: string;

  @Column({
    type: DataType.ENUM("present", "absent"),
    defaultValue: "present",
  })
  declare status: "present" | "absent";
  @Column({
    type: DataType.DATEONLY,
    allowNull: true,
    defaultValue: DataType.NOW,
  })
  declare date: Date;

  @ForeignKey(() => User)
  @Column({
    type: DataType.UUID,
    allowNull: true,
  })
  declare studentId: string;

  @BelongsTo(() => User)
  declare user: User;

  @ForeignKey(() => Subject)
  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
  declare subjectId: string;

  @BelongsTo(() => Subject)
  declare subject: Subject;
}

export default Attendance;
