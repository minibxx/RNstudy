import React from 'react';
import { Text, View, StyleSheet, TouchableOpacity, ScrollView, TextInput } from "react-native";

import Monthly from '../../components/Monthly'
import Weekly from '../../components/Weekly'
import Test from '@/components/Test';

const HomeScreen = () => {

  const clickMonth = () => {

  }
  const clickWeek = () => {

  }
  return (
    <>
      <ScrollView>
        <View style={{display: 'flex', flexDirection: 'row', justifyContent:'flex-end', gap: 10, padding: '3%'}}>
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
        <Monthly />
        {/* <Weekly /> */}
        <Test />
      </ScrollView>
    </>
  )
};

const styles = StyleSheet.create({
	plus: {
		backgroundColor: 'blue'
	}
});

export default HomeScreen;
