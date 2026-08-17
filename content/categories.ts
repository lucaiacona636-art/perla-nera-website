import type { ProductCategory } from "@/lib/types";

// Documento 0 §1 e Documento 7 §1: le categorie sono il primo livello del
// sistema. Tavoli è oggi l'unica con schema di configurazione completo;
// le altre restano visibili ("in arrivo") — comunicano l'ampiezza dello
// studio senza promettere un catalogo che non esiste ancora.
export const categories: ProductCategory[] = [
  {
    id: "tavoli",
    label: "Tavoli",
    status: "available",
    schemaId: "schema-tavoli",
    shortDescription:
      "Essenza, forma, bordo, resina, finitura e base: la categoria più matura dello studio, oggi interamente configurabile.",
  },
  {
    id: "complementi-arredo",
    label: "Complementi d'arredo",
    status: "coming-soon",
    schemaId: "schema-free-brief",
    shortDescription: "Panche, consolle, credenze e specchi nello stesso linguaggio materico.",
  },
  {
    id: "oggetti-design",
    label: "Oggetti di design",
    status: "coming-soon",
    schemaId: "schema-free-brief",
    shortDescription: "Pezzi di piccolo formato, tra funzione e scultura.",
  },
  {
    id: "pezzi-scultorei",
    label: "Pezzi scultorei",
    status: "coming-soon",
    schemaId: "schema-free-brief",
    shortDescription: "Opere dove la materia è il soggetto, non il supporto.",
  },
  {
    id: "progetto-speciale",
    label: "Progetto speciale su misura",
    status: "bespoke-only",
    schemaId: "schema-free-brief",
    shortDescription: "Non rientra in nessuna categoria? Raccontacelo: è il punto di partenza più comune.",
  },
];

export function getCategory(id: string): ProductCategory | undefined {
  return categories.find((c) => c.id === id);
}
