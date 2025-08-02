// src/models/Player.ts
import { 
  Model, InferAttributes, InferCreationAttributes, 
  CreationOptional, DataTypes 
} from 'sequelize';
import { sequelize } from '../config/databases' 


class Player extends Model<
  InferAttributes<Player>,
  InferCreationAttributes<Player>
> {
  declare player_id: CreationOptional<number>;
  declare user_id: string;
  declare username: string;
  declare level: CreationOptional<number>;
  declare exp: CreationOptional<number>;
  declare hp: CreationOptional<number>;
  declare mp: CreationOptional<number>;
  declare lp: CreationOptional<number>;
  declare kp: CreationOptional<number>;
  declare gold: CreationOptional<number>;
  declare created_at: CreationOptional<Date>;
  declare updated_at: CreationOptional<Date>;
}

Player.init(
  {
    player_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    user_id: {
      type: DataTypes.STRING(32),
      allowNull: false,
      unique: true
    },
    username: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: true
    },
    level: {
      type: DataTypes.INTEGER,
      defaultValue: 1,
      allowNull:true
    },
    exp: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      allowNull:true
    },
    hp: {
      type: DataTypes.INTEGER,
      defaultValue: 50,
      allowNull:true
    },
    mp: {
      type: DataTypes.INTEGER,
      defaultValue: 25,
      allowNull:true
    },
    lp: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      allowNull:true
    },
    kp: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      allowNull:true
    },
    gold: {
      type: DataTypes.INTEGER,
      defaultValue: 100,
      allowNull:true
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    },
    updated_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      onUpdate: DataTypes.NOW.toString()  // Untuk auto-update
    }
  },
  {
    sequelize,
    modelName: 'Player',
    tableName: 'players',
    timestamps: false,  // Nonaktifkan timestamps bawaan karena pakai manual
    underscored: true   // Konversi camelCase ke snake_case
  }
);

export default Player;