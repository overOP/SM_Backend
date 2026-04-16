import { Column, DataType, Model, Table } from "sequelize-typescript";

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
}

export default Subject;
