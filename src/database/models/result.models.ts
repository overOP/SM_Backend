import { Column, DataType, Model, Table } from "sequelize-typescript";

@Table({
  tableName: "results",
  modelName: "Result",
  timestamps: true,
})
class Result extends Model {
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
  declare class: string | null;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare subject: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare marks: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare grade: string;

  @Column({
    type: DataType.ENUM("pass", "NG"),
    defaultValue: "NG",
  })
  declare status: "pass" | "NG";
}

export default Result;
