import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { jwt } from "better-auth/plugins";
import { Db, MongoClient } from "mongodb";

const mongoUri = process.env.MONGO_DB_URI;
const databaseName = process.env.MONGO_DB_NAME;
const betterAuthURL = process.env.BETTER_AUTH_URL;
const betterAuthSecret = process.env.BETTER_AUTH_SECRET;
const googleClientId = process.env.GOOGLE_CLIENT_ID;
const googleClientSecret = process.env.GOOGLE_CLIENT_SECRET;

if (!mongoUri) {
  throw new Error("MONGO_DB_URI is not configured");
}

if (!databaseName) {
  throw new Error("MONGO_DB_NAME is not configured");
}

if (!betterAuthURL) {
  throw new Error("BETTER_AUTH_URL is not configured");
}

if (!betterAuthSecret) {
  throw new Error("BETTER_AUTH_SECRET is not configured");
}

if (!googleClientId) {
  throw new Error("GOOGLE_CLIENT_ID is not configured");
}

if (!googleClientSecret) {
  throw new Error("GOOGLE_CLIENT_SECRET is not configured");
}

const cleanBetterAuthURL = betterAuthURL.trim().replace(/\/+$/, "");

declare global {
  // eslint-disable-next-line no-var
  var _mongoClient: MongoClient | undefined;
}

let client: MongoClient;
if (process.env.NODE_ENV === "development") {
  if (!global._mongoClient) {
    global._mongoClient = new MongoClient(mongoUri);
  }
  client = global._mongoClient;
} else {
  client = new MongoClient(mongoUri);
}

const db: Db = client.db(databaseName);

const trustedOrigins = Array.from(
  new Set([
    "http://localhost:3000",
    "https://learnpilot-client.vercel.app",
    cleanBetterAuthURL,
  ])
);

export const auth = betterAuth({
  secret: betterAuthSecret,
  baseURL: cleanBetterAuthURL,

  trustedOrigins,

  database: mongodbAdapter(db, {
    client,
  }),

  plugins: [
    jwt({
      jwt: {
        expirationTime: "15m",
        issuer: process.env.AUTH_ISSUER?.trim().replace(/\/+$/, "") || cleanBetterAuthURL,
        audience: process.env.AUTH_AUDIENCE?.trim() || "learnpilot-server",
      },
    }),
  ],

  emailAndPassword: {
    enabled: true,
    minPasswordLength: 8,
  },

  socialProviders: {
    google: {
      clientId: googleClientId,
      clientSecret: googleClientSecret,
    },
  },

  user: {
    additionalFields: {
      role: {
        type: ["learner", "instructor"],
        required: false,
        defaultValue: "learner",
        input: true,
      },
    },
  },
});