import { DataSource } from "typeorm";
import {
  Character,
  ComponentVariations,
  Connection,
  FaceFeatures,
  HeadBlends,
  HeadOverlays,
  Player,
  Skills,
} from "./entities";

export const CivilDataSource = new DataSource({
  type: "postgres",
  host: GetConvar("db_host", "127.0.0.1"),
  port: GetConvarInt("db_port", 5432),
  username: GetConvar("db_user", ""),
  password: GetConvar("db_password", ""),
  database: GetConvar("db_name", ""),
  synchronize: true,
  logging: false,
  entities: [Character, ComponentVariations, Connection, FaceFeatures, HeadBlends, HeadOverlays, Player, Skills],
  migrations: [],
  subscribers: [],
});
