import {DataTypes} from 'sequelize';
import {sequelize} from '../authenticate/auth.js';

const User = sequelize.define('User', {

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
},{
  underscored: true,
  createdAt: "account_created",
  updatedAt: "account_updated"
});

export default User;
