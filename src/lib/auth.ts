import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { MongoClient } from "mongodb";

const mongoUri = process.env.MONGO_DB_URI;
const databaseName = process.env.MONGO_DB_NAME;

if (!mongoUri) {
  throw new Error("MONGO_DB_URI is missing from .env.local");
}

if (!databaseName) {
  throw new Error("MONGO_DB_NAME is missing from .env.local");
}

const client = new MongoClient(mongoUri);
const db = client.db(databaseName);

export const auth = betterAuth({
  database: mongodbAdapter(db, {
    client,
  }),

  baseURL: process.env.BETTER_AUTH_URL,

  trustedOrigins: ["http://localhost:3000"],

  emailAndPassword: {
    enabled: true,
    minPasswordLength: 8,
  },

  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    },
  },

  user: {
    additionalFields: {
      role: {
        type: ["learner", "instructor"],
        required: true,
        defaultValue: "learner",
        input: true,
      },
    },
  },
});