import { Column, DataType, Model, Table } from "sequelize-typescript";

@Table({
  tableName: "announcements",
  modelName: "Announcement ",
  timestamps: true,
})
class Announcement extends Model {
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
  declare announcementTitle: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  declare author: string;

  @Column({
    type: DataType.TEXT,
    allowNull: true,
  })
  declare details: string;

  @Column({
    type: DataType.DATEONLY,
    allowNull: true,
  })
  declare announcementDate: string;

  @Column({
    type: DataType.TIME,
    allowNull: true,
  })
  declare priority: string;

  @Column({
    type: DataType.STRING,
  })
  declare targetAudience: string;
}

export default Announcement;
