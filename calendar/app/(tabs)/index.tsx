import React, { useState } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, ScrollView, TextInput, SafeAreaView } from "react-native";

import Monthly from '../../components/Monthly'
import Weekly from '../../components/Weekly'
import Test from '@/components/Test';
import Schedule from '@/components/Schedule';

const HomeScreen = () => {
  const [clickCalendar, setClickCalendar] = useState<string>('monthly');
  const clickMonth = () => {
    setClickCalendar('monthly')
  }
  const clickWeek = () => {
    setClickCalendar('weekly')
  }
  return (
    <>
     <SafeAreaView style={styles.container}>
      
      <ScrollView>
        <View style={{display: 'flex', flexDirection: 'row', justifyContent:'flex-end', gap: 10, paddingRight: '4%', paddingTop: '3%'}}>
          <TouchableOpacity
            onPress={clickMonth}
          >
            <Text style={{}}>월간</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={clickWeek}
          >
            <Text style={{}}>주간</Text>
          </TouchableOpacity>
        </View>
        { clickCalendar == 'monthly' ? 
        <Monthly />
        :
       <Weekly /> 
        }

        <Schedule/>
        {/* <Test /> */}
      </ScrollView>
    </SafeAreaView>
    </>
  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
	plus: {
		backgroundColor: 'blue'
	}
});

export default HomeScreen;
