import { Column, DataType, Model, Table } from "sequelize-typescript";

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
    type: DataType.STRING,
    allowNull: true,
  })
  declare rollNo: string;

  @Column({
    type: DataType.ENUM("present", "absent"),
    defaultValue: "present",
  })
  declare status: "present" | "absent";
}

export default Attendance;
