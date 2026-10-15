export interface LegalSection {
  title: string;
  paragraphs: string[];
  bullets?: string[];
}

export interface LegalDocument {
  title: string;
  summary: string;
  effectiveDate: string;
  sections: LegalSection[];
}
