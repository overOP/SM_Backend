import { Column, DataType, Model, Table } from "sequelize-typescript";

@Table({
  tableName: "events",
  modelName: "Event",
  timestamps: true,
})
class Event extends Model {
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
  declare eventTitle: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  declare category: string;

  @Column({
    type: DataType.TEXT,
    allowNull: true,
  })
  declare description: string;

  @Column({
    type: DataType.DATEONLY,
    allowNull: true,
  })
  declare eventDate: string;

  @Column({
    type: DataType.TIME,
    allowNull: true,
  })
  declare eventTime: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  declare location: string;

  @Column({
    type: DataType.STRING,
  })
  declare targetAudience: string;
}

export default Event;
