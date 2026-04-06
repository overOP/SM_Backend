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

  // @Column({
  //   type: DataType.STRING,
  //   allowNull: true,
  // })
  // declare class: string | null;

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

  @ForeignKey(() => User)
  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
  declare studentId: string;

  @BelongsTo(() => User)
  declare user: User;
}

export default Result;
