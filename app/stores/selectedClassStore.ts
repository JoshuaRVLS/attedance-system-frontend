import { create } from "zustand";

interface SelectedClassState {
  selectedClass: string;
  setSelectedClass: (selectedClass: string) => void;
}

export const useSelectedClassStore = create<SelectedClassState>((set) => ({
  selectedClass: "",
  setSelectedClass: (selectedClass: string) => set({ selectedClass }),
}));
