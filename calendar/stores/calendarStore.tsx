import { create } from 'zustand';
import moment, { Moment } from 'moment';

interface Schedule {
    date: Moment;
    text: string;
  }
  
  interface CalendarState {
    startDate: Moment;
    endDate: Moment;
    selectedDate: Moment | null;
    schedules: Schedule[];
    goToPreviousWeek: () => void;
    goToNextWeek: () => void;
    setSelectedDate: (date: Moment) => void;
    addSchedule: (text: string, date: Moment) => void;
  }
  
  export const useCalendarStore = create<CalendarState>((set) => ({
    startDate: moment().startOf('week'),
    endDate: moment().endOf('week'),
    selectedDate: null,
    schedules: [],
  
    goToPreviousWeek: () => {
      set((state) => ({
        startDate: state.startDate.clone().subtract(1, 'week').startOf('week'),
        endDate: state.endDate.clone().subtract(1, 'week').endOf('week'),
        selectedDate: null,
      }));
    },
  
    goToNextWeek: () => {
      set((state) => ({
        startDate: state.startDate.clone().add(1, 'week').startOf('week'),
        endDate: state.endDate.clone().add(1, 'week').endOf('week'),
        selectedDate: null,
      }));
    },
  
    setSelectedDate: (date) => {
      set({ selectedDate: date });
    },
    addSchedule: (text, date) => {
      set((state) => ({
        schedules: [...state.schedules, { text, date }],
      }));
    },
  }));
  