export interface DocumentationSection {
  id: string;
  title: string;
  description: string;
  details: Array<{
    title: string;
    description: string;
  }>;
}

export interface UserGuide {
  id: string;
  title: string;
  summary: string;
  steps: string[];
  note?: string;
}
