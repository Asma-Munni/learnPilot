import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { jwt } from "better-auth/plugins";
import { Db, MongoClient } from "mongodb";

function getRequiredEnv(name: string): string {
  const value = process.env[name]?.trim();

  if (!value) {
    throw new Error(
      `[AUTH_CONFIG] ${name} is not configured`,
    );
  }

  return value;
}

const mongoUri = getRequiredEnv("MONGO_DB_URI");
const databaseName = getRequiredEnv("MONGO_DB_NAME");

const betterAuthURL = getRequiredEnv(
  "BETTER_AUTH_URL",
).replace(/\/+$/, "");

const betterAuthSecret = getRequiredEnv(
  "BETTER_AUTH_SECRET",
);

const cleanBetterAuthURL = betterAuthURL;

const googleClientId = getRequiredEnv(
  "GOOGLE_CLIENT_ID",
);

const googleClientSecret = getRequiredEnv(
  "GOOGLE_CLIENT_SECRET",
);

if (betterAuthSecret.length < 32) {
  throw new Error(
    "[AUTH_CONFIG] BETTER_AUTH_SECRET must contain at least 32 characters",
  );
}

declare global {
  // eslint-disable-next-line no-var
  var __learnPilotMongoClient: MongoClient | undefined;
}

const client =
  globalThis.__learnPilotMongoClient ??
  new MongoClient(mongoUri, {
    maxPoolSize: 10,
    minPoolSize: 0,
    maxIdleTimeMS: 30000,
    serverSelectionTimeoutMS: 10000,
    connectTimeoutMS: 10000,
  });

globalThis.__learnPilotMongoClient = client;

const db: Db = client.db(databaseName);

const trustedOrigins = Array.from(
  new Set([
    "http://localhost:3000",
    "https://learnpilot-client.vercel.app",
    cleanBetterAuthURL,
  ])
);

export const auth = betterAuth({
  appName: "LearnPilot AI",

  secret: betterAuthSecret,
  baseURL: cleanBetterAuthURL,

  trustedOrigins,

  database: mongodbAdapter(db, {
    client,
  }),

  onAPIError: {
    throw: true,
    onError: (error, ctx) => {
      console.error("❌ [Better Auth API Error]:", error);
    },
  },

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

  plugins: [
    jwt({
      jwt: {
        expirationTime: "15m",
        issuer: process.env.AUTH_ISSUER?.trim().replace(/\/+$/, "") || cleanBetterAuthURL,
        audience:
          process.env.AUTH_AUDIENCE?.trim() ||
          "learnpilot-server",
      },
    }),
  ],

  user: {
    additionalFields: {
      role: {
        type: ["learner", "instructor"],

        // Keep this false so older Google users
        // without a stored role do not break get-session.
        required: false,

        defaultValue: "learner",
        input: true,
      },
    },
  },

  
});