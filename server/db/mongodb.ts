import { MongoClient } from "https://deno.land/x/mongo@v0.29.4/mod.ts";

import { config } from "./../config/config.ts";

const { MONGODB_URI, MONGODB_DB_NAME } = config;

const client = new MongoClient();

// Load envs from deployment or local env file
const dbUri = Deno.env.get("MONGODB_URI") || MONGODB_URI;
const dbName = Deno.env.get("MONGODB_DB_NAME") || MONGODB_DB_NAME;

await client.connect(dbUri);

const db = client.database(dbName);

console.log(`DB: ${dbName} connected.`);

export default db;
