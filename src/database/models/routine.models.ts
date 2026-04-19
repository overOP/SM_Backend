import { Column, DataType, Model, Table } from "sequelize-typescript";

@Table({
  tableName: "routines",
  modelName: "Routine",
  timestamps: true,
})
class Routine extends Model {
  @Column({
    primaryKey: true,
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
  })
  declare id: string;

  @Column({
    type: DataType.STRING,
  })
  declare classId: string;
}

export default Routine;
