import { MongoClient } from 'mongodb';

const connectionProtocol = process.env.MONGODB_CONNECTION_PROTOCOL;
const clusterAddress = process.env.MONGODB_CLUSTER_ADDRESS;
const dbUser = process.env.MONGODB_USERNAME;
const dbPassword = process.env.MONGODB_PASSWORD;
const dbName = process.env.MONGODB_DB_NAME;

// 🔥 Encode password (important for Atlas)
const encodedPassword = encodeURIComponent(dbPassword);

// ✅ Include DB name in URI
const uri = `${connectionProtocol}://${dbUser}:${encodedPassword}@${clusterAddress}/${dbName}?retryWrites=true&w=majority`;

const client = new MongoClient(uri);

let database;

console.log('🔄 Trying to connect to DB...');

try {
  await client.connect();
  await client.db(dbName).command({ ping: 1 });
  console.log('✅ Connected successfully to server');

  database = client.db(dbName);

} catch (error) {
  console.log('❌ Connection failed:');
  console.log(error);
  process.exit(1);
}

export default database;