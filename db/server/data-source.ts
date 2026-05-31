import { DataSource } from "typeorm";

export const CivilDataSource = new DataSource({
  type: "postgres",
  host: GetConvar("db_host", "127.0.0.1"),
  port: GetConvarInt("db_port", 5432),
  username: GetConvar("db_user", ""),
  password: GetConvar("db_password", ""),
  database: GetConvar("db_name", ""),
  // host: "172.22.209.205",
  // port: 5432,
  // username: "civil",
  // password: "civil",
  // database: "civil",
  synchronize: true,
  logging: true,
  entities: ["entities/**/*.ts"],
  migrations: ["migrations/**/*.ts"],
  subscribers: ["subscribers/**/*.ts"],
});
