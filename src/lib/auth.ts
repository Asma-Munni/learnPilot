import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { jwt } from "better-auth/plugins";
import { MongoClient, Db } from "mongodb";

const mongoUri = process.env.MONGO_DB_URI;
const databaseName = process.env.MONGO_DB_NAME || "Learn-Pilot";

if (!mongoUri) {
  console.warn("⚠️ MONGO_DB_URI is missing from environment variables.");
}

declare global {
  // eslint-disable-next-line no-var
  var _mongoClient: MongoClient | undefined;
}

let client: MongoClient;

if (mongoUri) {
  if (process.env.NODE_ENV === "development") {
    if (!global._mongoClient) {
      global._mongoClient = new MongoClient(mongoUri);
    }
    client = global._mongoClient;
  } else {
    client = new MongoClient(mongoUri);
  }
} else {
  client = new MongoClient("mongodb://localhost:27017/dummy");
}

const db: Db = client.db(databaseName);

const allowedTrustedOrigins = Array.from(
  new Set([
    "http://localhost:3000",
    "https://learnpilot-client.vercel.app",
    ...(process.env.BETTER_AUTH_URL
      ? [process.env.BETTER_AUTH_URL.trim().replace(/\/$/, "")]
      : []),
  ])
);

const authIssuer =
  process.env.AUTH_ISSUER ||
  process.env.BETTER_AUTH_URL ||
  "http://localhost:3000";
const authAudience = process.env.AUTH_AUDIENCE || "learnpilot-server";

export const auth = betterAuth({
  database: mongodbAdapter(db, {
    client,
  }),
  baseURL: process.env.BETTER_AUTH_URL || "http://localhost:3000",
  secret: process.env.BETTER_AUTH_SECRET,
  trustedOrigins: allowedTrustedOrigins,
  plugins: [
    jwt({
      jwt: {
        expirationTime: "15m",
        issuer: authIssuer,
        audience: authAudience,
      },
    }),
  ],
  emailAndPassword: {
    enabled: true,
    minPasswordLength: 8,
  },
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
      enabled: Boolean(
        process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET
      ),
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