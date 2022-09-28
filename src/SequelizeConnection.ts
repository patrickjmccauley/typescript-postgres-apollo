import { Sequelize } from "sequelize";

const connection = new Sequelize("typescript_dev", "testuser", "testpw", {
  host: "localhost",
  dialect: "postgres",
  port: +(process.env.POSTGRESQL_PORT || 5432),
  logging: console.log,
});

export default connection;
