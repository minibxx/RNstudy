import { create } from 'zustand';
import moment, { Moment } from 'moment';

interface Schedule {
    date: Moment;
    text: string;
}

interface WorkType {
    date: Moment;
    type: string;
  }

interface CalendarState {
    startDate: Moment;
    endDate: Moment;
    selectedDate: Moment;
    selectedType: Moment | null;
    schedules: Schedule[];
    types: WorkType[];
    
    goToPreviousWeek: () => void;
    goToNextWeek: () => void;
    
    setSelectedDate: (date: Moment) => void;
    addSchedule: (text: string, date: Moment) => void;
    addWorkType: (type: string, date: Moment) => void;
    removeSchedule: (date: Moment, text: string) => void;
    removeWorkType: (date: Moment, type: string) => void;
}

export const useCalendarStore = create<CalendarState>((set) => ({
    startDate: moment().startOf('week'),
    endDate: moment().endOf('week'),
    selectedDate: moment(), 
    selectedType: null,
    schedules: [],
    types: [],

    goToPreviousWeek: () => {
        set((state) => ({
            startDate: state.startDate.clone().subtract(1, 'week').startOf('week'),
            endDate: state.endDate.clone().subtract(1, 'week').endOf('week'),
            selectedDate: state.selectedDate.clone().subtract(1, 'week'),
        }));
    },

    goToNextWeek: () => {
        set((state) => ({
            startDate: state.startDate.clone().add(1, 'week').startOf('week'),
            endDate: state.endDate.clone().add(1, 'week').endOf('week'),
            selectedDate: state.selectedDate.clone().add(1, 'week'),
        }));
    },

    setSelectedDate: (date) => {
        set({ selectedDate: date.clone() });
    },
    
    addSchedule: (text, date) => {
        set((state) => {
            const newScheduleType = { text, date: date.clone() }; // 새로운 객체 생성
            return {
                schedules: [...state.schedules, newScheduleType] // 새로운 배열 생성
            };
        });
    },
    
    removeSchedule: (date, text) => 
        set((state) => ({
            schedules: state.schedules.filter(schedule => 
                !(
                    schedule.date.format('YYYYMMDD') === date.format('YYYYMMDD') && 
                    schedule.text === text
                )
            )
        })),
        addWorkType: (type, date) => {
            set((state) => {
                const newWorkType = { type, date: date.clone() }; // 새로운 객체 생성
                return {
                    types: [...state.types, newWorkType] // 새로운 배열 생성
                };
            });
        },
        
        
        
        
    removeWorkType: (date, type) => 
        set((state) => ({
            types: state.types.filter(types => 
                !(
                    types.date.format('YYYYMMDD') === date.format('YYYYMMDD') && 
                    types.type === type
                )
            )
        })),
}));