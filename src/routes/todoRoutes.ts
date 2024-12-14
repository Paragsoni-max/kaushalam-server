import { Router, Request } from "express";
import Todo from "../models/Todo";

const router = Router();

router.post("/add", async (req: Request, res: any) => {
  const { userId, title, description, priority } = req.body;

  if (!userId || !title || !description) {
    return res.status(400).json({ message: "Title and description are required" });
  }

  try {
    const todo = new Todo({
      userId,
      title,
      description,
      priority,
    });
    await todo.save();
    res.status(201).json({ message: "Todo added successfully", todo });
  } catch (error) {
    res.status(500).json({ message: "Error adding todo", error });
  }
});

router.get("/", async (req: Request, res: any) => {
  const { userId, priority, completed } = req.query;

  const filter: any = {};
  if (userId) filter.userId = userId;
  if (priority) filter.priority = priority; 
  if (completed !== undefined) filter.completed = completed === "true";

  try {
    const todos = await Todo.find(filter);
    res.status(200).json(todos);
  } catch (error) {
    res.status(500).json({ message: "Error fetching todos", error });
  }
});

router.put("/update/:id", async (req: Request, res: any) => {
  const { id } = req.params;
  const { title, description, priority, completed } = req.body;

  try {
    const todo = await Todo.findByIdAndUpdate(
      id,
      { title, description, priority, completed },
      { new: true }
    );

    if (!todo) {
      return res.status(404).json({ message: "Todo not found" });
    }

    res.status(200).json({ message: "Todo updated successfully", todo });
  } catch (error) {
    res.status(500).json({ message: "Error updating todo", error });
  }
});

router.delete("/delete/:id", async (req: Request, res: any) => {
  const { id } = req.params;

  try {
    const todo = await Todo.findByIdAndDelete(id);

    if (!todo) {
      return res.status(404).json({ message: "Todo not found" });
    }

    res.status(200).json({ message: "Todo deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting todo", error });
  }
});

router.patch("/mark-completed/:id", async (req: Request, res: any) => {
  const { id } = req.params;

  try {
    const todo = await Todo.findByIdAndUpdate(
      id,
      { completed: true },
      { new: true }
    );

    if (!todo) {
      return res.status(404).json({ message: "Todo not found" });
    }

    res.status(200).json({ message: "Todo marked as completed", todo });
  } catch (error) {
    res.status(500).json({ message: "Error marking todo as completed", error });
  }
});

router.patch("/mark-completed/:id", async (req: Request, res: any) => {
  const { id } = req.params;

  try {
    const todo = await Todo.findByIdAndUpdate(
      id,
      { completed: true },
      { new: true }
    );

    if (!todo) {
      return res.status(404).json({ message: "Todo not found" });
    }

    res.status(200).json({ message: "Todo marked as completed", todo });
  } catch (error) {
    res.status(500).json({ message: "Error marking todo as completed", error });
  }
});

router.patch("/add-priority/:id", async (req: Request, res: any) => {
  const { id } = req.params;
  const { priority } = req.body;
  try {
    const todo = await Todo.findByIdAndUpdate(
      id,
      { priority: priority },
      { new: true }
    );

    if (!todo) {
      return res.status(404).json({ message: "Todo not found" });
    }

    res.status(200).json({ message: "Changed priority", todo });
  } catch (error) {
    res.status(500).json({ message: "Error in changing priority", error });
  }
});

export default router;
