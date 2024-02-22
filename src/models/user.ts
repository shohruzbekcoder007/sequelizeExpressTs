import Sequelize from 'sequelize';
import { sequelize } from '../startup/db';

const User = sequelize.define('user', {
    id: {
        type: Sequelize.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: 'id'
    },
    firstName: {
        type: Sequelize.STRING
    },
    lastName: {
        type: Sequelize.STRING
    },
    middleName: {
        type: Sequelize.STRING
    },
    email: {
        type: Sequelize.STRING,
        validate: {
            isEmail: true
        }
    },
    address: {
        type: Sequelize.STRING
    },
    password: {
        type: Sequelize.STRING
    }
});

export default User