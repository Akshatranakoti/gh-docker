import { MongoClient } from 'mongodb';

const connectionProtocol = process.env.MONGODB_CONNECTION_PROTOCOL;
const clusterAddress = process.env.MONGODB_CLUSTER_ADDRESS;
const dbUser = process.env.MONGODB_USERNAME;
const dbPassword = process.env.MONGODB_PASSWORD;
const dbName = process.env.MONGODB_DB_NAME;

const encodedPassword = encodeURIComponent(dbPassword);

const uri = `${connectionProtocol}://${dbUser}:${encodedPassword}@${clusterAddress}/${dbName}?retryWrites=true&w=majority`;

const client = new MongoClient(uri);

let database;

export async function connectToDatabase() {
  try {
    await client.connect();
    console.log('✅ DB Connected');
    database = client.db(dbName);
  } catch (error) {
    console.log('❌ DB Error:', error);
    process.exit(1);
  }
}

export function getDb() {
  if (!database) {
    throw new Error('Database not initialized!');
  }
  return database;
}