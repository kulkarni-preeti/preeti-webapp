import { Sequelize, DataTypes, Model } from 'sequelize';
import {sequelize, authPostgres} from '../authenticate/auth.js';

class User extends Model {}

User.init({
    id: {
        type: DataTypes.STRING,
        primaryKey: true,
        required: false
    },
    first_name: {
        type: DataTypes.STRING,
        required: true
    },
    last_name: {
        type: DataTypes.STRING,
        required: true
    },
    password: {
        type: DataTypes.STRING,
        required: true
    },
    username: {
        type: DataTypes.STRING,
        required: true
    }
}, {
  sequelize, // We need to pass the connection instance
//   modelName: 'User',
  underscored: true,
  createdAt: "account_created",
  updatedAt: "account_updated"
});

export { User };
