import React, { useState } from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context'; // 안전 영역 관련 import 추가

import Monthly from '../../components/Monthly'
import Weekly from '../../components/Weekly'
import Schedule from '@/components/Schedule';
import ScheduleWork from '@/components/WorkType';

const HomeScreen = () => {
  const [clickCalendar, setClickCalendar] = useState<string>('monthly');
  const clickMonth = () => {
    setClickCalendar('monthly')
  }
  const clickWeek = () => {
    setClickCalendar('weekly')
  }
  return (
    <SafeAreaProvider> 
      <SafeAreaView style={styles.container}>
        <View style={{display: 'flex', flexDirection:'row', justifyContent:'center', alignItems:'center'}}>
          <View style={styles.buttonContainer}>
            <TouchableOpacity onPress={clickMonth}>
              <Text>월간</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={clickWeek}>
              <Text>주간</Text>
            </TouchableOpacity>
          </View>
        </View>
        { clickCalendar === 'monthly' ? <Monthly /> : <Weekly /> }

        <Schedule />
        <ScheduleWork />
      </SafeAreaView>
    </SafeAreaProvider>
  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  buttonContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 10,
    marginTop: 20
  },
});

export default HomeScreen;
