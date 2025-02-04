import { create } from 'zustand';
import moment, { Moment } from 'moment';

interface CalendarState {
  startDate: Moment;
  endDate: Moment;
  selectedDate: Moment | null;
  todate: Moment;
  
  goToPreviousWeek: () => void;
  goToNextWeek: () => void;
  setSelectedDate: (date: Moment) => void;
}

export const useCalendarStore = create<CalendarState>((set) => ({
  startDate: moment().startOf('week'),
  endDate: moment().endOf('week'),
  selectedDate: null,
  todate: moment(),

  goToPreviousWeek: () => {
    set((state) => ({
      startDate: state.startDate.clone().subtract(1, 'week').startOf('week'),
      endDate: state.endDate.clone().subtract(1, 'week').endOf('week'),
      selectedDate: null, // 주차 이동 시 선택된 날짜 초기화
    }));
  },

  goToNextWeek: () => {
    set((state) => ({
      startDate: state.startDate.clone().add(1, 'week').startOf('week'),
      endDate: state.endDate.clone().add(1, 'week').endOf('week'),
      selectedDate: null, // 주차 이동 시 선택된 날짜 초기화
    }));
  },

  setSelectedDate: (date) => {
    set({ selectedDate: date });
  },
}));
