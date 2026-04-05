import { Column, DataType, Model, Table } from "sequelize-typescript";

@Table({
  tableName: "fees",
  modelName: "Fee",
  timestamps: true,
})
class Fee extends Model {
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
  declare totalAmount: string;

  @Column({
    type: DataType.ENUM("Paid", "Due"),
    defaultValue: "Due",
  })
  declare status: "Paid" | "Due";
}

export default Fee;
