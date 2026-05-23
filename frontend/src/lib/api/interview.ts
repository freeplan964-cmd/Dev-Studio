import { apiFetch } from "./base";
import type { InterviewQuestion } from "../../types/skills";

export async function getInterviewQuestions(): Promise<InterviewQuestion[]> {
  try {
    return await apiFetch<InterviewQuestion[]>("/api/interview-questions");
  } catch {
    return [];
  }
}
export async function upsertInterviewQuestion(
  q: Partial<InterviewQuestion>,
): Promise<InterviewQuestion> {
  return apiFetch<InterviewQuestion>("/api/interview-questions", {
    method: "POST",
    body: JSON.stringify(q),
  });
}
export async function upsertInterviewQuestions(
  items: Partial<InterviewQuestion>[],
): Promise<InterviewQuestion[]> {
  try {
    return await apiFetch<InterviewQuestion[]>("/api/interview-questions/bulk", {
      method: "POST",
      body: JSON.stringify(items),
    });
  } catch {
    return items as InterviewQuestion[];
  }
}
export async function deleteInterviewQuestion(id: string): Promise<void> {
  await apiFetch<void>(`/api/interview-questions/${id}`, { method: "DELETE" });
}

export async function getUserProgress(): Promise<any[]> {
  try {
    return await apiFetch<any[]>("/api/progress");
  } catch {
    return [];
  }
}
export async function toggleProgress(
  itemId: string,
  areaId: string,
  completed: boolean,
): Promise<void> {
  await apiFetch<void>("/api/progress/toggle", {
    method: "POST",
    body: JSON.stringify({ itemId, areaId, completed }),
  });
}
