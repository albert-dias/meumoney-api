import path from "path";
import { DataSource } from "typeorm";

export const dataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "postgres",
  password: "docker",
  database: "meumoneydb",
  entities: [
    path.resolve(__dirname, '..', 'entities')
  ],
  subscribers: [],
  migrations: [
    path.resolve(__dirname, 'migrations')
  ],
})