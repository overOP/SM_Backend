import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from "sequelize-typescript";
import User from "./user.models";

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

  @ForeignKey(() => User)
  @Column({
    type: DataType.UUID,
    allowNull: true,
  })
  declare studentId: string;

  @BelongsTo(() => User)
  declare user: User;
}

export default Attendance;
