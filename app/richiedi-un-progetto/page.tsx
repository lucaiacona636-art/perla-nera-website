import type { Metadata } from "next";
import { RichiediProgettoForm } from "@/components/forms/RichiediProgettoForm";

export const metadata: Metadata = {
  title: "Richiedi un progetto",
  description:
    "Raccontaci il tuo spazio o la tua idea: rispondiamo entro 48 ore con i prossimi passi per il tuo progetto su misura.",
  alternates: { canonical: "/richiedi-un-progetto" },
};

export default function RichiediUnProgettoPage() {
  return <RichiediProgettoForm />;
}
