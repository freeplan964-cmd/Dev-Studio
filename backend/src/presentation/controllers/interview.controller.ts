import { Request, Response } from "express";
import { requireUser } from "../middleware/auth.js";
import { interviewService } from "../../infrastructure/di/container.js";

export const getQuestions = async (req: Request, res: Response) => {
  const uid = requireUser(req, res);
  if (!uid) return;
  try {
    const data = await interviewService.getQuestions(uid);
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch interview questions" });
  }
};

export const postQuestions = async (req: Request, res: Response) => {
  const uid = requireUser(req, res);
  if (!uid) return;
  try {
    const result = await interviewService.createQuestion(uid, req.body);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: "Failed to create interview question" });
  }
};

export const postQuestionsBulk = async (req: Request, res: Response) => {
  const uid = requireUser(req, res);
  if (!uid) return;
  try {
    const items = Array.isArray(req.body) ? req.body : [];
    const result = await interviewService.createQuestionsBulk(uid, items);
    res.json(result);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Failed to create bulk interview questions" });
  }
};

export const deleteQuestionsById = async (req: Request, res: Response) => {
  const uid = requireUser(req, res);
  if (!uid) return;
  try {
    const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
    await interviewService.deleteQuestionById(uid, id);
    res.json({ ok: true });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete interview question" });
  }
};

export const getProgress = async (req: Request, res: Response) => {
  const uid = requireUser(req, res);
  if (!uid) return;
  try {
    const data = await interviewService.getProgress(uid);
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch progress" });
  }
};

export const postProgressToggle = async (req: Request, res: Response) => {
  const uid = requireUser(req, res);
  if (!uid) return;
  const { itemId, areaId, completed } = req.body;
  try {
    const result = await interviewService.toggleProgress(
      uid,
      itemId,
      areaId,
      completed,
    );
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: "Failed to toggle progress" });
  }
};
