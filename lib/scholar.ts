import pubs from "@/data/publications.json";

export type Publication = {
  title: string;
  authors: string[];
  venue: string;
  year: number;
  doi?: string;
  citations?: number;
  badges?: string[];
};

export function getPublications(): Publication[] {
  return pubs as Publication[];
}
