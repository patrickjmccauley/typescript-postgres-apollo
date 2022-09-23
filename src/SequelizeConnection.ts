import { Sequelize } from "sequelize";

const connection = new Sequelize("typescript_dev", "testuser", "testpw", {
  host: "localhost",
  dialect: "postgres",
  port: 5432,
  logging: console.log,
});

export default connection;
