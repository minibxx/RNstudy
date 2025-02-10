import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextStyle } from 'react-native';
import { getHolidayApi } from "../services/holiday";
import moment, { Moment } from 'moment';
import { useCalendarStore } from '@/stores/calendarStore';

const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

interface Holiday {
  date: string; // YYYYMMDD 형식
  name: string; // 공휴일 이름
}

const Monthly: React.FC = () => {
  const {schedules, types} = useCalendarStore();
  const [currentMonth, setCurrentMonth] = useState<Moment>(moment());
  const [holidays, setHolidays] = useState<Holiday[]>([]);

  const goToPreviousMonth = () => {
    setCurrentMonth(prev => prev.clone().subtract(1, 'month'));
  };

  const goToNextMonth = () => {
    setCurrentMonth(prev => prev.clone().add(1, 'month'));
  };

  const startDay = currentMonth.clone().startOf('month').startOf('week');
  const endDay = currentMonth.clone().endOf('month').endOf('week');
  const day = startDay.clone().subtract(1, 'day');
  const calendar: Moment[][] = [];

  while (day.isBefore(endDay, 'day')) {
    calendar.push(
      Array(7)
        .fill(null)
        .map(() => day.add(1, 'day').clone())
    );
  }

  const fetchHolidayData = async () => {
    try {
      const year = currentMonth.format('YYYY');
      const month = currentMonth.format('MM');
      console.log(`Fetching holidays for: ${year}-${month}`);
      const holidaysData = await getHolidayApi(year, month);

      if (!holidaysData || !Array.isArray(holidaysData)) {
        console.warn(`No holidays found for ${year}-${month}`);
        setHolidays([]);
        return;
      }

      const holidayDates: Holiday[] = holidaysData.map((holiday: any) => ({
        date: holiday.locdate.toString(), // 'YYYYMMDD' 형식
        name: holiday.dateName, // 공휴일 이름
      }));

      setHolidays(holidayDates);
    } catch (error) {
      console.error('Error fetching holidays:', error);
      setHolidays([]);
    }
  };

  useEffect(() => {
    fetchHolidayData();
  }, [currentMonth]);

  return (
    <>
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={goToPreviousMonth}>
          <Text>◀️</Text>
        </TouchableOpacity>
        <Text style={styles.monthText}>
          {currentMonth.format('MMMM YYYY')}
        </Text>
        <TouchableOpacity onPress={goToNextMonth}>
          <Text>▶️</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.calendarContainer}>
        <View style={styles.header}>
          {daysOfWeek.map((day, index) => (
            <View key={index} style={styles.day}>
              <Text
                style={[
                  styles.dayText,
                  index === 0 && styles.red,
                  index === 6 && styles.blue,
                ]}
              >
                {day}
              </Text>
            </View>
          ))}
        </View>

        <View style={styles.grid}>
          {calendar.map((week, weekIndex) => (
            <View key={weekIndex} style={styles.week}>
              {week.map((date, dayIndex) => {
                const formattedDate = date.format("YYYYMMDD");
                const isSunday = date.day() === 0;
                const isSaturday = date.day() === 6;
                const isCurrentMonth = date.month() === currentMonth.month();
                const holiday = holidays.find(h => h.date === formattedDate);
                const scheduleForDate = schedules.filter(schedule => moment(schedule.date).format("YYYYMMDD") === formattedDate);
                const workTypeForDate = types.filter(type => moment(type.date).format("YYYYMMDD") === formattedDate);
                return (
                  <View key={dayIndex} style={styles.date}>
                    <Text
                      style={[
                        styles.dateText,
                        isSunday && styles.red,
                        isSaturday && styles.blue,
                        !isCurrentMonth && styles.gray,
                        holiday && styles.holiday
                      ]}
                    >
                      {date.format('D')}
                    </Text>
                    {holiday && (
                      <Text style={styles.holidayText}>{holiday.name}</Text>
                    )}
                    <View style={styles.grid}>
                      {scheduleForDate.map((schedule, index) => (
                          <Text style={styles.scheduleText}>{schedule.text}</Text>
                      ))}

                    {workTypeForDate.map((work, i) => (
                      <Text style={[workTypeStyles[work.type], styles.workTypeText] }>{work.type}</Text>
                    ))}
                    </View>
                  </View>
                );
              })}
            </View>
          ))}
        </View>
      </View>
    </>
  );
};
const workTypeStyles: Record<string, TextStyle> = {
  "연장": { color: "#ffb61e", backgroundColor: "#ffb61e" },
  "파견": { color: "#ffa400", backgroundColor: "#ffa400" },
  "외근": { color: "#fa8c35", backgroundColor: "#fa8c35" },
  "출장": { color: "#ff7500", backgroundColor: "#ff7500" },
};
const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    margin: 20,
    alignItems: 'center',
    gap: 25,
    justifyContent: 'center',
  },
  monthText: {
    fontSize: 20,
    fontWeight: 'bold',
    paddingVertical: 10
  },
  calendarContainer: {
    width: '90%',
    marginHorizontal: '5%',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  day: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 10,
  },
  dayText: {
    fontWeight: 'bold',
    color: '#333',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 10,
  },
  week: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
  },
  date: {
    width: '14.2%',
    alignItems: 'center',
    paddingVertical: 10,
    height: 70,
  },
  dateText: {
    color: '#333',
  },
  holidayText: {
    fontSize: 12,
    color: 'red',
    textAlign: 'center',
    marginTop: 3,
  },
  red: {
    color: 'red',
  },
  blue: {
    color: 'blue',
  },
  gray: {
    color: '#d5d5d5',
  },
  holiday: {
    color: 'red',
  },
  scheduleText:{
    backgroundColor: '#44cef6',
    color: '#44cef6',
    width: 8,
    height: 8,
    margin: 2,
    borderRadius: 50,
    fontSize: 0.1
  },
  workTypeText: {
    width: 8,
    height: 8,
    margin: 2,
    borderRadius: 50,
    fontSize: 0.1
  }
});

export default Monthly;
