import pubs from "@/data/publications.json";

export type Publication = {
  title: string;
  authors?: string[];
  venue?: string;
  journal?: string;
  year: number;
  url?: string;
  doi?: string;
  citations?: number;
  badges?: string[];
};

export function getPublications(): Publication[] {
  return pubs as Publication[];
}
