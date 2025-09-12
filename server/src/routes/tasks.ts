import express from "express";
import prisma from "../prisma";
import { authMiddleware } from "../middlewares/auth";

const router = express.Router();

// All routes protected
router.use(authMiddleware);

// Create task
router.post("/", async (req, res) => {
  const user = req.user!;
  const { title, description } = req.body;
  if (!title) return res.status(400).json({ error: "Title required" });

  try {
    const task = await prisma.task.create({
      data: {
        title,
        description: description || null,
        user: { connect: { id: user.id } }
      }
    });
    res.status(201).json(task);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

// Get all user's tasks
router.get("/", async (req, res) => {
  try {
    const tasks = await prisma.task.findMany({
      where: { userId: req.user!.id },
      orderBy: { createdAt: "desc" }
    });
    res.json(tasks);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

// Get single task (owned)
router.get("/:id", async (req, res) => {
  const id = Number(req.params.id);
  try {
    const task = await prisma.task.findUnique({ where: { id } });
    if (!task || task.userId !== req.user!.id) return res.status(404).json({ error: "Not found" });
    res.json(task);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

// Update task
router.put("/:id", async (req, res) => {
  const id = Number(req.params.id);
  const { title, description, status } = req.body;

  try {
    const existing = await prisma.task.findUnique({ where: { id } });
    if (!existing || existing.userId !== req.user!.id) return res.status(404).json({ error: "Not found" });

    const updated = await prisma.task.update({
      where: { id },
      data: {
        title: title ?? existing.title,
        description: description === undefined ? existing.description : description,
        status: status ?? existing.status
      }
    });
    res.json(updated);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

// Delete
router.delete("/:id", async (req, res) => {
  const id = Number(req.params.id);
  try {
    const existing = await prisma.task.findUnique({ where: { id } });
    if (!existing || existing.userId !== req.user!.id) return res.status(404).json({ error: "Not found" });

    await prisma.task.delete({ where: { id } });
    res.status(204).send();
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

// Toggle status endpoint
router.patch("/:id/toggle", async (req, res) => {
  const id = Number(req.params.id);
  try {
    const task = await prisma.task.findUnique({ where: { id } });
    if (!task || task.userId !== req.user!.id) return res.status(404).json({ error: "Not found" });

    const newStatus = task.status === "PENDING" ? "COMPLETED" : "PENDING";
    const updated = await prisma.task.update({
      where: { id },
      data: { status: newStatus }
    });
    res.json(updated);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

export default router;
