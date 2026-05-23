import { Request, Response } from "express";
import { requireUser } from "../middleware/auth.js";
import { cvService } from "../../infrastructure/di/container.js";

export const getAll = async (req: Request, res: Response) => {
  const uid = requireUser(req, res);
  if (!uid) return;
  try {
    const data = await cvService.getAll(uid);
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch CVs" });
  }
};

export const create = async (req: Request, res: Response) => {
  const uid = requireUser(req, res);
  if (!uid) return;
  try {
    const data = await cvService.create(uid, req.body);
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: "Failed to create CV" });
  }
};

export const deleteById = async (req: Request, res: Response) => {
  const uid = requireUser(req, res);
  if (!uid) return;
  try {
    const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
    await cvService.deleteById(uid, id);
    res.json({ ok: true });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete CV" });
  }
};

export const postAtsCheck = async (req: Request, res: Response) => {
  const uid = requireUser(req, res);
  if (!uid) return;
  const { cvProfile, jobDescription } = req.body;
  try {
    const result = await cvService.atsCheck(cvProfile, jobDescription);
    res.json(result);
  } catch (error) {
    const msg = error instanceof Error ? error.message : "AI analysis failed";
    res
      .status(error instanceof Error && msg.includes("required") ? 400 : 500)
      .json({ error: msg });
  }
};

export const postParsePdf = async (req: Request, res: Response) => {
  const uid = requireUser(req, res);
  if (!uid) return;
  try {
    const text = cvService.parsePdf(req.body.fileBase64);
    res.json({ text });
  } catch (error) {
    const msg = error instanceof Error ? error.message : "Failed to parse PDF";
    res
      .status(error instanceof Error && msg.includes("required") ? 400 : 500)
      .json({ error: msg });
  }
};
