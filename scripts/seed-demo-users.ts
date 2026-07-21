import fs from "fs";
import path from "path";

// Parse .env.local natively BEFORE importing auth module
const envPath = path.resolve(process.cwd(), ".env.local");
if (fs.existsSync(envPath)) {
  const envConfig = fs.readFileSync(envPath, "utf-8");
  for (const line of envConfig.split("\n")) {
    const trimmed = line.trim();
    if (trimmed && !trimmed.startsWith("#")) {
      const [key, ...valueParts] = trimmed.split("=");
      if (key && valueParts.length > 0) {
        process.env[key.trim()] = valueParts.join("=").trim();
      }
    }
  }
}

async function seed() {
  console.log("🌱 Seeding demo accounts...");

  const { auth } = await import("../src/lib/auth.js");
  const { MongoClient } = await import("mongodb");

  const demoUsers = [
    {
      name: "Demo Learner",
      email: "learner.demo@learnpilot.com",
      password: "Demo@12345",
      role: "learner" as const,
    },
    {
      name: "Demo Instructor",
      email: "instructor.demo@learnpilot.com",
      password: "Demo@12345",
      role: "instructor" as const,
    },
  ];

  const mongoUri = process.env.MONGO_DB_URI;
  const dbName = process.env.MONGO_DB_NAME || "Learn-Pilot";

  if (!mongoUri) {
    console.error("❌ MONGO_DB_URI is missing in environment variables.");
    process.exit(1);
  }

  const client = new MongoClient(mongoUri);
  await client.connect();
  const db = client.db(dbName);

  for (const user of demoUsers) {
    try {
      const existingUser = await db.collection("user").findOne({ email: user.email });

      if (existingUser) {
        const existingAccount = await db
          .collection("account")
          .findOne({ userId: existingUser._id.toString() });

        if (!existingAccount) {
          console.log(`🧹 Cleaning stale user record for ${user.email}...`);
          await db.collection("user").deleteOne({ _id: existingUser._id });
        } else {
          console.log(`✔ Demo account verified: ${user.email} (${user.role})`);
          continue;
        }
      }

      await auth.api.signUpEmail({
        body: {
          name: user.name,
          email: user.email,
          password: user.password,
          role: user.role,
        },
      });

      console.log(`✅ Successfully created demo account: ${user.email} (${user.role})`);
    } catch (error) {
      console.error(
        `⚠️ Error processing ${user.email}:`,
        error instanceof Error ? error.message : error
      );
    }
  }

  await client.close();
  console.log("🎉 Seeding complete.");
  process.exit(0);
}

seed();
