import { create } from "zustand";
import { persist } from "zustand/middleware";
import { shapes } from "@/content/configurator/shapes";

// Store del configuratore — Documento 7 §1/§4. Categoria in cima allo stato:
// determina quale flusso (schema-tavoli o free-brief) è attivo.
export type ConfiguratorPhase = "category" | "steps" | "summary";

interface ConfiguratorState {
  categoryId: string | null;
  screen: number; // 0 = selezione categoria; poi step della categoria; ultimo = riepilogo
  essenceId: string | null;
  shapeId: string | null;
  dimensions: { length: number; width: number; height: number } | null;
  edgeId: string | null;
  resinId: string | null;
  finishId: string | null;
  baseId: string | null;
  freeBrief: string;
  updatedAt: number | null;

  setCategory: (id: string) => void;
  goTo: (screen: number) => void;
  next: () => void;
  back: () => void;
  setEssence: (id: string) => void;
  setShape: (id: string) => void;
  setDimensions: (dims: { length: number; width: number; height: number }) => void;
  setEdge: (id: string) => void;
  setResin: (id: string) => void;
  setFinish: (id: string) => void;
  setBase: (id: string) => void;
  setFreeBrief: (text: string) => void;
  reset: () => void;
}

const initialState = {
  categoryId: null,
  screen: 0,
  essenceId: null,
  shapeId: null,
  dimensions: null,
  edgeId: null,
  resinId: null,
  finishId: null,
  baseId: null,
  freeBrief: "",
  updatedAt: null,
};

export const useConfiguratorStore = create<ConfiguratorState>()(
  persist(
    (set) => ({
      ...initialState,

      setCategory: (id) =>
        set((s) => {
          const defaultShape = shapes[0];
          const isTavoli = id === "tavoli";
          return {
            categoryId: id,
            screen: 1,
            shapeId: isTavoli ? s.shapeId ?? defaultShape?.id ?? null : s.shapeId,
            dimensions: isTavoli
              ? s.dimensions ??
                (defaultShape
                  ? {
                      length: defaultShape.dimensionRules.length.default,
                      width: defaultShape.dimensionRules.width.default,
                      height: defaultShape.dimensionRules.height?.default ?? 75,
                    }
                  : null)
              : s.dimensions,
            updatedAt: Date.now(),
          };
        }),
      goTo: (screen) => set({ screen, updatedAt: Date.now() }),
      next: () => set((s) => ({ screen: s.screen + 1, updatedAt: Date.now() })),
      back: () => set((s) => ({ screen: Math.max(0, s.screen - 1), updatedAt: Date.now() })),

      setEssence: (id) => set({ essenceId: id, updatedAt: Date.now() }),
      setShape: (id) =>
        set(() => {
          const shape = shapes.find((s) => s.id === id);
          return {
            shapeId: id,
            dimensions: shape
              ? {
                  length: shape.dimensionRules.length.default,
                  width: shape.dimensionRules.width.default,
                  height: shape.dimensionRules.height?.default ?? 75,
                }
              : null,
            updatedAt: Date.now(),
          };
        }),
      setDimensions: (dims) => set({ dimensions: dims, updatedAt: Date.now() }),
      setEdge: (id) => set({ edgeId: id, updatedAt: Date.now() }),
      setResin: (id) => set({ resinId: id, updatedAt: Date.now() }),
      setFinish: (id) => set({ finishId: id, updatedAt: Date.now() }),
      setBase: (id) => set({ baseId: id, updatedAt: Date.now() }),
      setFreeBrief: (text) => set({ freeBrief: text, updatedAt: Date.now() }),

      reset: () => set({ ...initialState }),
    }),
    { name: "perla-nera-configurator" }
  )
);
