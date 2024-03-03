import dotenv from "dotenv";
import path from "path";
import { Sequelize } from "sequelize";
import winston from "winston";

dotenv.config()

const db_user: string = process.env.db_user || ""
const db_pass: string = process.env.db_pass || ""
const db_postgresql: string = process.env.db_postgresql || ""
const db_port: string | 5432 = process.env.db_port || 5432
const host: string = process.env.host || "localhost"


const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(winston.format.timestamp(), winston.format.json()),
  transports: [
    new winston.transports.File({ filename: path.join('logs', 'error.log'), level: 'error' }),
    new winston.transports.File({ filename: path.join('logs', 'info.log'), level: 'info' }),
    new winston.transports.File({ filename: path.join('logs', 'combined.log') }),
  ],
});

export const sequelize = new Sequelize(db_postgresql, db_user, db_pass, {
    host: host,
    dialect: 'postgres',
    port: <number>db_port,
    logging: (msg) => logger.info(msg),
});

sequelize.sync({ force: false })
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

