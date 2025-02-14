import { create } from 'zustand';
import dayjs, { Dayjs } from 'dayjs';

interface CalendarState {
  currentMonth: Dayjs;
  startDate: Dayjs;
  endDate: Dayjs;
  setCurrentMonth: (month: Dayjs) => void;
  updateStartDate: () => void;
  updateEndDate: () => void;
}

export const useCalendarStore = create<CalendarState>((set) => ({
  currentMonth: dayjs(),
  startDate: dayjs().startOf('month').startOf('week'),  
  endDate: dayjs().endOf('month').endOf('week'),      
  setCurrentMonth: (month) => {
    const startDate = month.startOf('month').startOf('week');
    const endDate = month.endOf('month').endOf('week');
    set({ currentMonth: month, startDate, endDate });
  },
  updateStartDate: () => set((state) => ({ startDate: state.currentMonth.startOf('month').startOf('week') })),
  updateEndDate: () => set((state) => ({ endDate: state.currentMonth.endOf('month').endOf('week') })),
}));
