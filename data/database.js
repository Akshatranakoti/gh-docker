import { MongoClient } from 'mongodb';

const connectionProtocol = process.env.MONGODB_CONNECTION_PROTOCOL;
const clusterAddress = process.env.MONGODB_CLUSTER_ADDRESS;
const dbUser = process.env.MONGODB_USERNAME;
const dbPassword = process.env.MONGODB_PASSWORD;
const dbName = process.env.MONGODB_DB_NAME;

// ⚠️ Encode password (VERY IMPORTANT)
const encodedPassword = encodeURIComponent(dbPassword);

// ✅ Proper MongoDB Atlas URI
const uri = `${connectionProtocol}://${dbUser}:${encodedPassword}@${clusterAddress}/${dbName}?retryWrites=true&w=majority`;

const client = new MongoClient(uri);

console.log('🔄 Trying to connect to DB...');

let database;

export async function connectToDatabase() {
  try {
    await client.connect();
    await client.db(dbName).command({ ping: 1 });
    console.log('✅ Connected successfully to MongoDB Atlas');

    database = client.db(dbName);
    return database;

  } catch (error) {
    console.log('❌ Connection failed:');
    console.log(error); // 🔥 VERY IMPORTANT FOR DEBUGGING
    process.exit(1);
  }
}

export function getDb() {
  if (!database) {
    throw new Error('❌ Database not initialized!');
  }
  return database;
}