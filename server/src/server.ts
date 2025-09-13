import express from "express";
import dotenv from "dotenv";
import authRoutes from "./routes/auth";
import taskRoutes from "./routes/tasks";
import prisma from "./prisma";
import cors from "cors";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 4000;

// Fix: Set allowed origin explicitly and add optionsSuccessStatus for CORS preflight
app.use(
  cors({
    origin: "https://task-manager-frontend-steel-phi.vercel.app", // your frontend URL
    credentials: true,
    optionsSuccessStatus: 200,
  })
);

app.use(express.json());

// Routes
app.use("/auth", authRoutes);
app.use("/tasks", taskRoutes);

// basic health
app.get("/", (req, res) => res.send("Task Manager API running"));

// graceful shutdown
process.on("SIGINT", async () => {
  console.log("Shutting down...");
  await prisma.$disconnect();
  process.exit(0);
});

app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});

