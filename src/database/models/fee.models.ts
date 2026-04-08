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
    type: DataType.INTEGER,
    allowNull: true,
  })
  declare totalAmount: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: true,
  })
  declare paidAmount: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: true,
  })
  declare dueAmount: number;

  @Column({
    type: DataType.ENUM("Paid", "Due"),
    defaultValue: "Due",
  })
  declare AmountStatus: "Paid" | "Due";

  @ForeignKey(() => User)
  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
  declare studentId: string;

  @BelongsTo(() => User)
  declare user: string;
}

export default Fee;

// fee download
