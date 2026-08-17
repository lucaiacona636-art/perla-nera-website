import type { SiteMedia } from "./media";

// Struttura per vere pagine progetto (Documento 1, "case study") — vuota di
// proposito: NON contiene progetti o clienti inventati. Quando un progetto
// reale è pronto da pubblicare, si aggiunge un oggetto a `caseStudies` con
// questa forma e la pagina /collezione/[slug] lo serve automaticamente,
// senza toccare app/collezione/[slug]/page.tsx.

export interface CaseStudy {
  slug: string;
  nome: string;
  categoria: string;
  concept: string;
  essenza?: string;
  dimensioni?: string;
  resina?: string;
  finitura?: string;
  processo?: string[];
  fotografie: SiteMedia[];
  video?: SiteMedia;
  installazione?: string;
  risultato?: string;
}

export const caseStudies: CaseStudy[] = [];

export function getCaseStudy(slug: string): CaseStudy | undefined {
  return caseStudies.find((c) => c.slug === slug);
}
