import { create } from "zustand";
import { useState } from "react"; 

interface InfoState{
    stampType: number;
    stampLang: boolean;
    stampFont: number;
    stampName: string;
    setStampType: (type: number) => void;
    setStampLang: (lang: boolean) => void;
    setStampFont: (font: number) => void;
    setStampName: (name: string) => void;
}

export const useInfoStore = create<InfoState>((set)=>({
    stampType: 0,
    stampLang: true,
    stampFont: 0,
    stampName: "",
    setStampType: (type) => set({ stampType: type }),
    setStampLang: (lang) => set({ stampLang: lang }),
    setStampFont: (font) => set({ stampFont: font }),
    setStampName: (name) => set({ stampName: name }),
}));