import type { Metadata } from "next";
import { Configurator } from "@/components/configurator/Configurator";

export const metadata: Metadata = {
  title: "Progetta il tuo pezzo",
  description:
    "Scegli una categoria — tavolo, complemento, progetto speciale — e guarda il tuo pezzo prendere forma prima di richiedere un progetto.",
  alternates: { canonical: "/progetta" },
};

export default function ProgettaPage() {
  return <Configurator />;
}
