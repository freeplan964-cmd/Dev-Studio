import { Request, Response } from "express";
import { requireUser } from "../middleware/auth.js";
import { skillsService } from "../../infrastructure/di/container.js";

// ── Tasks ──────────────────────────────────────────────────────────────────

export const getTasks = async (req: Request, res: Response) => {
  const uid = requireUser(req, res);
  if (!uid) return;
  const { areaId } = req.query as { areaId: string };
  try {
    const data = await skillsService.getTasks(uid, areaId);
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch skill tasks" });
  }
};

export const createTask = async (req: Request, res: Response) => {
  const uid = requireUser(req, res);
  if (!uid) return;
  try {
    const data = await skillsService.createTask(uid, req.body);
    res.json(data);
  } catch (err) {
    const msg = err instanceof Error ? err.message : "Failed to create task";
    res.status(400).json({ error: msg });
  }
};

export const toggleTask = async (req: Request, res: Response) => {
  const uid = requireUser(req, res);
  if (!uid) return;
  const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
  try {
    const data = await skillsService.toggleTask(uid, id, req.body.done);
    res.json(data);
  } catch (err) {
    const msg = err instanceof Error ? err.message : "Failed to toggle task";
    res.status(400).json({ error: msg });
  }
};

export const deleteTask = async (req: Request, res: Response) => {
  const uid = requireUser(req, res);
  if (!uid) return;
  const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
  try {
    await skillsService.deleteTask(uid, id);
    res.json({ ok: true });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete task" });
  }
};

// ── Projects ───────────────────────────────────────────────────────────────

export const getProjects = async (req: Request, res: Response) => {
  const uid = requireUser(req, res);
  if (!uid) return;
  const { areaId } = req.query as { areaId: string };
  try {
    const data = await skillsService.getProjects(uid, areaId);
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch skill projects" });
  }
};

export const upsertProject = async (req: Request, res: Response) => {
  const uid = requireUser(req, res);
  if (!uid) return;
  try {
    const data = await skillsService.upsertProject(uid, req.body);
    res.json(data);
  } catch (err) {
    const msg = err instanceof Error ? err.message : "Failed to save project";
    res.status(400).json({ error: msg });
  }
};

export const deleteProject = async (req: Request, res: Response) => {
  const uid = requireUser(req, res);
  if (!uid) return;
  const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
  try {
    await skillsService.deleteProject(uid, id);
    res.json({ ok: true });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete project" });
  }
};
