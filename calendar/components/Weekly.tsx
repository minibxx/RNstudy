import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextStyle, Alert } from 'react-native';
import moment, { Moment } from 'moment';
import { getHolidayApi } from '../services/holiday';
import { useCalendarStore } from '../stores/calendarStore';

const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

interface Holiday {
  date: string;  // YYYYMMDD 형식
  name: string;  // 공휴일 이름
}

const Weekly: React.FC = () => {
  const { startDate, endDate, goToPreviousWeek, goToNextWeek, schedules, types, removeSchedule, removeWorkType } = useCalendarStore();
  const [holidays, setHolidays] = useState<Holiday[]>([]);

  useEffect(() => {
    const fetchHolidayData = async () => {
      try {
        const year = startDate.format('YYYY');
        const month = startDate.format('MM');

        const holidaysData = await getHolidayApi(year, month);

        if (!holidaysData || !Array.isArray(holidaysData)) {
          setHolidays([]);
          return;
        }

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

    fetchHolidayData();
  }, [startDate]);

  const weekNum = startDate.isoWeek() - startDate.clone().startOf('month').isoWeek() + 2;

  const handleLongPressDelete = (date: Moment, text: string) => {
    Alert.alert("일정 삭제", `"${text}" 일정을 삭제하시겠습니까?`, [
      { text: "취소", style: "cancel" },
      { text: "삭제", style: "destructive", onPress: () => removeSchedule(date, text) }
    ]);
  };

  const handleLongPressDelete2 = (date: Moment, type: string) => {
    Alert.alert("일정 삭제", `"${type}" 일정을 삭제하시겠습니까?`, [
      { text: "취소", style: "cancel" },
      { text: "삭제", style: "destructive", onPress: () => removeWorkType(date, type) }
    ]);
  };

  return (
    <>
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={goToPreviousWeek}>
          <Text>◀️</Text>
        </TouchableOpacity>
        <Text style={styles.monthText}>{startDate.format('MM')}월 {weekNum}주차</Text>
        <TouchableOpacity onPress={goToNextWeek}>
          <Text>▶️</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.calendarContainer}>
        <View style={styles.header}>
          {daysOfWeek.map((day, index) => (
            <View key={index} style={styles.day}>
              <Text style={[styles.dayText, index === 0 && styles.red, index === 6 && styles.blue]}>{day}</Text>
            </View>
          ))}
        </View>

        <View style={styles.grid}>
          {[...Array(7)].map((_, dayIndex) => {
            const date = startDate.clone().add(dayIndex, 'days');
            const formattedDate = date.format("YYYYMMDD");

            const holiday = holidays.find(holiday => holiday.date === formattedDate);
            const isHoliday = !!holiday;
            const holidayName = holiday?.name;

            const scheduleForDate = schedules.filter(schedule => moment(schedule.date).format("YYYYMMDD") === formattedDate);
            const workTypeForDate = types.filter(type => moment(type.date).format("YYYYMMDD") === formattedDate);

            return (
              <View key={dayIndex} style={styles.date}>
                <Text style={[styles.dateText, date.day() === 0 && styles.red, date.day() === 6 && styles.blue, isHoliday && styles.holiday]}>
                  {date.format('D')}
                </Text>
                {isHoliday && <Text style={styles.holidayText}>{holidayName}</Text>}

                <View style={styles.scheduleContainer}>
                  {scheduleForDate.map((schedule, index) => (
                    <TouchableOpacity key={index} style={styles.scheduleItem} onLongPress={() => handleLongPressDelete(schedule.date, schedule.text)}>
                      <Text style={styles.scheduleText}>{schedule.text}</Text>
                    </TouchableOpacity>
                  ))}
                  {workTypeForDate.map((work, i) => (
                    <TouchableOpacity key={i} style={styles.scheduleItem} onLongPress={() => handleLongPressDelete2(work.date, work.type)}>
                      <Text style={ workTypeStyles[work.type] }>{work.type}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
            );
          })}
        </View>
      </View>
    </>
  );
};

const workTypeStyles: Record<string, TextStyle> = {
  "연장": { color: "white", textAlign: 'center', borderRadius: 50, marginBottom: 3, paddingHorizontal: 10, backgroundColor: "#ffb61e" },
  "파견": { color: "white", textAlign: 'center', borderRadius: 50, marginBottom: 3, paddingHorizontal: 10, backgroundColor: "#ffa400" },
  "외근": { color: "white", textAlign: 'center', borderRadius: 50, marginBottom: 3, paddingHorizontal: 10, backgroundColor: "#fa8c35" },
  "출장": { color: "white", textAlign: 'center', borderRadius: 50, marginBottom: 3, paddingHorizontal: 10, backgroundColor: "#ff7500" },
};

const styles = StyleSheet.create({
  headerContainer: { flexDirection: 'row', margin: 20, alignItems: 'center', gap: 25, justifyContent: 'center' },
  monthText: { fontSize: 20, fontWeight: 'bold', paddingBottom: 10 },
  calendarContainer: { width: '90%', marginHorizontal: '5%', backgroundColor: '#fff', borderRadius: 10, padding: 10, shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.1, shadowRadius: 10, elevation: 5 },
  header: { flexDirection: 'row', justifyContent: 'space-between' },
  day: { flex: 1, paddingTop: 10 },
  dayText: { fontWeight: 'bold', color: '#333', textAlign: "center" },
  grid: { flexDirection: 'row', flexWrap: 'wrap', marginTop: 10 },
  date: { width: '14.2%', paddingVertical: 10 },
  dateText: { fontSize: 16, color: '#333', textAlign: "center" },
  red: { color: 'red' },
  blue: { color: 'blue' },
  holiday: { color: 'red' },
  holidayText: { textAlign: 'center', fontSize: 12, color: 'red', marginTop: 3 },
  scheduleContainer: { marginTop: 5, marginHorizontal:2 },
  scheduleText: { color: '#fff', backgroundColor: '#44cef6', borderRadius: 50, paddingHorizontal: 10, marginBottom: 3, textAlign: 'center' },
  scheduleItem: {},
});

export default Weekly;
