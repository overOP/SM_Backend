import {
  BelongsTo,
  Column,
  DataType,
  HasMany,
  Model,
  Table,
} from "sequelize-typescript";
import Attendance from "./attendance.models";

@Table({
  tableName: "subject",
  modelName: "Subject",
  timestamps: true,
})
class Subject extends Model {
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
  declare subjectName: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  declare subjectCode: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  declare fullMarks: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  declare passMarks: string;

  @HasMany(() => Attendance, { foreignKey: "subjectId" })
  declare attendance: Attendance[];
  @HasMany(() => Subject, { foreignKey: "subjectId" })
  declare subject: Subject[];
}

export default Subject;
