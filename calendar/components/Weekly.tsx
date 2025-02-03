import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import moment, { Moment } from 'moment';
import { getHolidayApi } from '../services/holiday';

const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

interface Holiday {
  date: string;  // YYYYMMDD 형식
  name: string;  // 공휴일 이름
}

const Weekly: React.FC = () => {
  const [currentDate, setCurrentDate] = useState<Moment>(moment());
  const [holidays, setHolidays] = useState<Holiday[]>([]);

  const goToPreviousWeek = () => {
    setCurrentDate(prev => prev.clone().subtract(1, 'week'));
  };

  const goToNextWeek = () => {
    setCurrentDate(prev => prev.clone().add(1, 'week'));
  };

  const startDay = currentDate.clone().startOf('week');
  const endDay = currentDate.clone().endOf('week');
  const day = startDay.clone().subtract(1, 'day');
  const calendar: Moment[][] = [];

  while (day.isBefore(endDay, 'day')) {
    calendar.push(
      Array(7)
        .fill(0)
        .map(() => day.add(1, 'day').clone())
    );
  }

  // 주차 계산: 1주차는 유지, 6주차는 다음 달 1주차로 변경
  const getCorrectWeekNumber = (date: Moment): number => {
    const firstDayOfMonth = date.clone().startOf('month');
    const weekOffset = firstDayOfMonth.weekday(); // 첫날의 요일 (0: 일요일, 6: 토요일)
    const calculatedWeek = Math.ceil((date.date() + weekOffset) / 7);

    // 6주차면 다음 달 1주차로 변경
    if (calculatedWeek >= 6) {
      const nextMonth = date.clone().add(1, 'week').month();
      if (nextMonth !== date.month()) {
        return 1;
      }
    }
    return calculatedWeek;
  };

  const weekNum = getCorrectWeekNumber(currentDate);

  const fetchHolidayData = async () => {
    try {
      const year = currentDate.format('YYYY');
      const month = currentDate.format('MM');
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
  }, [currentDate]);

  return (
    <>
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={goToPreviousWeek}>
          <Text style={styles.navButton}>◀️</Text>
        </TouchableOpacity>
        <Text style={styles.monthText}>
          {currentDate.format('MM')}월 {weekNum}주차
        </Text>
        <TouchableOpacity onPress={goToNextWeek}>
          <Text style={styles.navButton}>▶️</Text>
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
    margin: 30,
    alignItems: 'center',
    gap: 25,
    justifyContent: 'center',
  },
  navButton: {
    fontSize: 24,
    paddingHorizontal: 20,
  },
  monthText: {
    fontSize: 20,
    fontWeight: 'bold',
    paddingVertical: 15
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
    marginTop: 2,
    textAlign: 'center',
  }
});

export default Weekly;
