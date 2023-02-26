import path from "path";
import { DataSource } from "typeorm";

export const dataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 35432,
  username: "postgres",
  password: "docker",
  database: "meumoneydb",
  entities: [
    path.resolve(__dirname, '..', 'entities', "*.{ts,js}")
  ],
  subscribers: [],
  migrations: [
    path.resolve(__dirname, 'migrations', "*.{ts,js}")
  ],
});

dataSource.initialize().then(() => { console.log(`.: DATABASE ONLINE :.`) });