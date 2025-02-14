import { create } from "zustand";

interface DatePickState {
  startDatePick: string;
  setStartDatePick: (date: string) => void;
  endDatePick: string;
  setEndDatePick: (date: string) => void;
}

export const useDatePickStore = create<DatePickState>((set) => ({
  startDatePick: "", 
  setStartDatePick: (date) => set({ startDatePick: date }),
  endDatePick: "", 
  setEndDatePick: (date) => set({ startDatePick: date }),
}));
