import mongoose from "mongoose";
import { config } from "../config";

type TMongooseCache = {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
let cached: TMongooseCache = (global as any).mongoose;

if (!cached) {
  cached = { conn: null, promise: null };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (global as any).mongoose = cached;
}

export const connectDB = async () => {
  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    if (!config.db_url) {
      throw new Error("DB_URL missing in environment variables");
    }

    cached.promise = mongoose
      .connect(config.db_url, {
        serverSelectionTimeoutMS: 20000, 
      })
      .then((m) => m);
  }

  cached.conn = await cached.promise;
  return cached.conn;
};
