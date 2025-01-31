import React, { useState, useCallback, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
import { getHolidayApi } from "../../services/holiday";

const Calendar = () => {
  const moment = require('moment');
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
    const year = currentMonth.format('YYYY'); // 현재 선택된 년도
    const month = currentMonth.format('MM'); 
    const holidays = await getHolidayApi(year, month); 
    console.log('Fetched Holidays:', holidays); 
    setHolidays(holidays);
  };

  useEffect(() => {
    fetchHolidayData(); // 컴포넌트가 마운트될 때 데이터 불러오기
  }, []);

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
        <View>
          {holidays.map((holiday, i) => {
            return (
              <Text>{holiday.dateName}</Text>
            )
          })}
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
    width: '100%',
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
    backgroundColor: "#ffef96", 
    borderRadius: 10,
    padding: 5
  }
});

export default Calendar;
