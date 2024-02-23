import dotenv from "dotenv";
import { Sequelize } from "sequelize";

dotenv.config()

const db_user: string = process.env.db_user || ""
const db_pass: string = process.env.db_pass || ""
const db_postgresql: string = process.env.db_postgresql || ""
const db_port: string | 5432 = process.env.db_port || 5432

export const sequelize = new Sequelize(db_postgresql, db_user, db_pass, {
    host: 'localhost',
    dialect: 'postgres',
    port: <number>db_port,
});

sequelize.sync()
  .then(() => {
    console.log('Tables created successfully');
  })
  .catch(err => {
    console.error('Error creating tables:', err);
  });

export const dbAuthenticate = async () => {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
      } catch (error) {
        console.error('Unable to connect to the database:', error);
      }
}

