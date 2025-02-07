import { create } from "zustand";

interface InfoState {
    stampLang: string;
    stampFont: number;
    stampName: string;
   
    setStampLang: (lang: string) => void;
    setStampFont: (font: number) => void;
    setStampName: (name: string) => void;
}

export const useInfoStore = create<InfoState>((set) => ({
    stampLang: "●",
    stampFont: 0,
    stampName: "",
    setStampLang: (lang) => set({ stampLang: lang }),
    setStampFont: (font) => set({ stampFont: font }),
    setStampName: (name) => set({ stampName: name }),
}));
