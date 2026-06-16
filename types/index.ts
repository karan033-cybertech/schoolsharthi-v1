export type ClassName = "6" | "7" | "8" | "9" | "10" | "11" | "12";

export type OpportunityType =
  | "scholarship"
  | "olympiad"
  | "competition"
  | "government";

export type ChatRole = "user" | "assistant";

export type Note = {
  id: string;
  title: string;
  subject: string;
  class_name: ClassName;
  content: string;
  pdf_url?: string;
  created_at: string;
};

export type Career = {
  id: string;
  slug: string;
  name: string;
  overview: string;
  skills: string[];
  roadmap: string[];
  exams: string[];
  future_scope: string;
  image_url?: string;
};

export type Opportunity = {
  id: string;
  title: string;
  type: OpportunityType;
  deadline: string;
  description: string;
  apply_url: string;
  class_range?: string;
  created_at: string;
};

export type Profile = {
  id: string;
  user_id: string;
  full_name: string;
  class_name: ClassName;
  school?: string;
  interests: string[];
};

export type ChatMessage = {
  role: ChatRole;
  content: string;
};
