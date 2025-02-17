import { create } from 'zustand';
import dayjs, { Dayjs } from 'dayjs';

interface CalendarState {
  currentMonth: Dayjs;
  startDate: Dayjs;
  endDate: Dayjs;
  selectedDate: Dayjs; // 선택된 날짜
  setCurrentDate: (month: Dayjs) => void;
  setCurrentMonth: (month: Dayjs) => void;
  updateStartDate: () => void;
  updateEndDate: () => void;
  selectDate: (date: Dayjs) => void; // 날짜 선택 함수 
}

export const useCalendarStore = create<CalendarState>((set) => ({
  currentMonth: dayjs(),
  startDate: dayjs().startOf('month').startOf('week'),
  endDate: dayjs().endOf('month').endOf('week'),
  selectedDate: dayjs(), // 초기 선택된 날짜는 null
  setCurrentDate: (month) => {
    const startDate = month.startOf('month').startOf('week');
    const endDate = month.endOf('month').endOf('week');
    set({ currentMonth: month, startDate, endDate });
  },
  setCurrentMonth: (month) => {
    const startDate = month.startOf('month');
    const endDate = month.endOf('month');
    set({ currentMonth: month, startDate, endDate });
  },
  updateStartDate: () => set((state) => ({ startDate: state.currentMonth.startOf('month').startOf('week') })),
  updateEndDate: () => set((state) => ({ endDate: state.currentMonth.endOf('month').endOf('week') })),
  selectDate: (date) => set({ selectedDate: date }), // 날짜를 선택하는 함수
}));

