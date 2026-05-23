import { Request, Response } from "express";
import { requireUser } from "../middleware/auth.js";
import { promptsService } from "../../infrastructure/di/container.js";

export const getAll = async (req: Request, res: Response) => {
  const uid = requireUser(req, res);
  if (!uid) return;
  try {
    const data = await promptsService.getAll(uid);
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch prompts" });
  }
};

export const create = async (req: Request, res: Response) => {
  const uid = requireUser(req, res);
  if (!uid) return;
  try {
    const result = await promptsService.upsert(uid, req.body);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: "Failed to create prompt" });
  }
};

export const createBulk = async (req: Request, res: Response) => {
  const uid = requireUser(req, res);
  if (!uid) return;
  try {
    const items = Array.isArray(req.body) ? req.body : [];
    const result = await promptsService.upsertBulk(uid, items);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: "Failed to create bulk prompts" });
  }
};

export const deleteById = async (req: Request, res: Response) => {
  const uid = requireUser(req, res);
  if (!uid) return;
  try {
    const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
    await promptsService.deleteById(uid, id);
    res.json({ ok: true });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete prompt" });
  }
};
