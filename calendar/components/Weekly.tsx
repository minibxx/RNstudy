import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import moment, { Moment } from 'moment';
import { getHolidayApi } from '../services/holiday';
import { useCalendarStore } from '../stores/calendarStore';

const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

interface Holiday {
  date: string;  // YYYYMMDD 형식
  name: string;  // 공휴일 이름
}

const Weekly: React.FC = () => {
  const { startDate, endDate, goToPreviousWeek, goToNextWeek, selectedDate, setSelectedDate, schedules } = useCalendarStore();
  const [holidays, setHolidays] = useState<Holiday[]>([]);

  const day = startDate.clone().subtract(1, 'day');
  const calendar: Moment[][] = [];

  while (day.isBefore(endDate, 'day')) {
    calendar.push(
      Array(7)
        .fill(0)
        .map(() => day.add(1, 'day').clone())
    );
  }

  const fetchHolidayData = async () => {
    try {
      const year = startDate.format('YYYY');
      const month = startDate.format('MM');
      console.log(`Fetching holidays for: ${year}-${month}`);
      
      const holidaysData = await getHolidayApi(year, month);

      if (!holidaysData || !Array.isArray(holidaysData)) {
        console.warn(`No holidays found for ${year}-${month}`);
        setHolidays([]);
        return;
      }

      console.log('Fetched Holidays:', holidaysData);

      const holidayDates: Holiday[] = holidaysData.map(holiday => ({
        date: holiday.locdate.toString(),  // 'YYYYMMDD' 형식
        name: holiday.dateName  // 공휴일 이름
      }));

      setHolidays(holidayDates);
    } catch (error) {
      console.error('Error fetching holidays:', error);
      setHolidays([]);
    }
  };

  useEffect(() => {
    fetchHolidayData();
  }, [startDate]);

  const weekNum = startDate.isoWeek() - startDate.clone().startOf('month').isoWeek() + 2;

  return (
    <>
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={goToPreviousWeek}>
          <Text>◀️</Text>
        </TouchableOpacity>
        <Text style={styles.monthText}>
          {startDate.format('MM')}월 {weekNum}주차
        </Text>
        <TouchableOpacity onPress={goToNextWeek}>
          <Text >▶️</Text>
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

                // 공휴일 정보 가져오기
                const holiday = holidays.find(holiday => holiday.date === formattedDate);
                const isHoliday = !!holiday;
                const holidayName = holiday?.name;

                // 해당 날짜의 스케줄 가져오기
                const scheduleForDate = schedules.filter(schedule => 
                    moment(schedule.date).format("YYYYMMDD") === formattedDate
                );

                return (
                  <View key={dayIndex} style={styles.date}>
                    <Text
                      style={[
                        styles.dateText,
                        isSunday && styles.red,
                        isSaturday && styles.blue,
                        isHoliday && styles.holiday
                      ]}
                    >
                      {date.format('D')}
                    </Text>
                    {isHoliday && (
                      <Text style={styles.holidayText}>{holidayName}</Text>
                    )}
                    {scheduleForDate.length > 0 && (
                      <View style={styles.scheduleContainer}>
                        {scheduleForDate.map((schedule, index) => (
                          <Text key={index} style={styles.scheduleText}>{schedule.text}</Text>
                        ))}
                      </View>
                    )}
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
    paddingLeft: 25,
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
    paddingTop: 10,
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
    paddingVertical: 10,
    height: 120,
  },
  dateText: {
    fontSize: 16,
    color: '#333',
  },
  red: {
    color: 'red',
  },
  blue: {
    color: 'blue',
  },
  holiday: {
    color: 'red',
  },
  holidayText: {
    fontSize: 12,
    color: 'red',
    marginTop: 3,
  },
  scheduleContainer: {
    marginTop: 5,
  },
  scheduleText: {
    fontSize: 12,
    color: '#333',
  }
});

export default Weekly;
