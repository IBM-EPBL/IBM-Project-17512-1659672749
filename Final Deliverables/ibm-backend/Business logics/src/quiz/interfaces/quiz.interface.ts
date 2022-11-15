export interface QuizModel {
  type: string;
  topic: string;
  question: string;
  options: [];
  answer: string;
  language?: string;
}
