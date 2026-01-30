import express, { Request, Response } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import router from "./app/router";
import globalErrorHandler from "./app/middleware/globalErrorHandler";
import { connectDB } from "./app/db/connectDB";

const app = express();

// ✅ CORS
app.use(
  cors({
    origin: [
      "https://national-palace-admin-dashboard.vercel.app",
      "http://localhost:4000",
    ],
    credentials: true,
  })
);

// ✅ Parsers
app.use(express.json());
app.use(cookieParser());

// ✅ IMPORTANT: Ensure DB connected before any route
app.use(async (req, res, next) => {
  try {
    await connectDB();
    next();
  } catch (err) {
    next(err);
  }
});

// ✅ Routes
app.use("/api", router);

// ✅ Root test
app.get("/", (req: Request, res: Response) => {
  res.send("The server is connect successfully");
});

// ✅ Global error handler (always last)
app.use(globalErrorHandler);

export default app;
