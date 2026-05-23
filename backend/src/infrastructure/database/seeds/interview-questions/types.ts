export interface InterviewQuestionSeed {
  id: string;
  area: string;
  difficulty: "junior" | "mid" | "senior";
  category?: string;
  question: string;
  answer: string;
  tags: string[];
  favorite?: boolean;
  createdAt: number;
}
