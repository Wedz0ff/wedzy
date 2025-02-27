import { MongoClient, ServerApiVersion } from 'mongodb';

if (!process.env.MONGODB_URI) {
  throw new Error('Invalid/Missing environment variable: "MONGODB_URI"');
}

const uri = process.env.MONGODB_URI;
const options = {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
};

let client: MongoClient;

if (process.env.NODE_ENV === 'development') {
  // This block is for development to avoid reusing the client during hot reloads
  let globalWithMongo = global as typeof globalThis & {
    _mongoClient?: MongoClient;
  };

  if (!globalWithMongo._mongoClient) {
    globalWithMongo._mongoClient = new MongoClient(uri, options);
  }
  client = globalWithMongo._mongoClient;
} else {
  // In production, create a new client every time
  client = new MongoClient(uri, options);
}

const connectToDatabase = async () => {
  try {
    // Try to get a database connection and check if it's available
    await client.connect();
    const db = client.db(process.env.MONGODB_DB_NAME);
    return db;
  } catch (error) {
    throw new Error('Failed to connect to the database');
  }
};

export { connectToDatabase };
