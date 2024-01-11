import { Database } from "bun:sqlite";

const db = new Database("mydb.sqlite");
db.run("DROP TABLE IF EXISTS chats;");
db.close();
