import React, { useState, useCallback, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
import { getHolidayApi } from "../services/holiday";
import moment from 'moment';

const Monthly = () => {
  const [currentMonth, setCurrentMonth] = useState<moment.Moment>(moment());
  const [holidays, setHolidays] = useState<string[]>([]);
  const goToPreviousMonth = () => {
    setCurrentMonth(currentMonth.clone().subtract(1, 'month'));
  };

  const goToNextMonth = () => {
    setCurrentMonth(currentMonth.clone().add(1, 'month'));
  };

  const startDay = currentMonth.clone().startOf('month').startOf('week');
  const endDay = currentMonth.clone().endOf('month').endOf('week');
  const day = startDay.clone().subtract(1, 'day');
  const calendar = [];


  while (day.isBefore(endDay, 'day')) {
    calendar.push(
      Array(7)
        .fill(0)
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

      console.log('Fetched Holidays:', holidaysData);

      const holidayDates = holidaysData.map(holiday => holiday.locdate.toString()); // 'YYYYMMDD' 형식으로 변환
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
      <View style={{ display: 'flex', flexDirection: 'row', margin: 30, alignItems: 'center', gap: 25, justifyContent: 'center' }}>
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
                const isSunday = date.day() === 0;
                const isSaturday = date.day() === 6;
                const isCurrentMonth = date.month() === currentMonth.month();
                const isHoliday = holidays.includes(date.format("YYYYMMDD"));

                return (
                  <View key={dayIndex} style={styles.date}>
                    <Text
                      style={[
                        styles.dateText,
                        isSunday && styles.red,
                        isSaturday && styles.blue,
                        !isCurrentMonth && styles.gray,
                        isHoliday && styles.holiday
                      ]}
                    >
                      {date.format('D')}

                    </Text>
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
  monthText: {
    fontSize: 24,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  calendarContainer: {
    width: '90%',
    marginHorizontal: '5%',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
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
    color: '#333',
    height: 60
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
    borderRadius: 10,
  }
});

export default Monthly;
