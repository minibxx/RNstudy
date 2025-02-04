import React, { useState } from "react";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import { TextInput } from "react-native";
import { useCalendarStore } from '../stores/calendarStore';

const Test = () => {
	const [dateMemo, setDateMemo] = useState<string>('');
	const [dateMemoList, setDateMemoList] = useState<string[]>([]);
	const { startDate, endDate, goToPreviousWeek, goToNextWeek, selectedDate, setSelectedDate } = useCalendarStore();
	
	const submitMemo = () => {
		setDateMemoList([...dateMemoList, dateMemo]);
		setDateMemo('');
	}
	return (
		<>
			<View style={styles.testContainer}>
				<View style={{paddingVertical: '3%', width: '45%'}}>
					<Text style={{marginBottom: 10}}>이번 주 일정</Text>
					{dateMemoList.map((k, i) => {
						return (
							<>	
							<View style={{display: 'flex', flexDirection:'row', gap: '2%'}}>

								<Text>✔️</Text>
								<Text key={i} style={{marginBottom: 10}}>{k}</Text>
							</View>
							</>
						)
					})}
				</View>

				<View style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: '45%'}}>

					<TextInput
						placeholder="일정 입력" placeholderTextColor={'gray'}
						style={{ backgroundColor: 'white', width: '90%' }}
						value={dateMemo}
						onChangeText={setDateMemo}
					>
					</TextInput>
					<TouchableOpacity
						onPress={submitMemo}
					>
						<Text style={styles.plus}>+</Text>
					</TouchableOpacity>
				</View>
			</View>


		</>
	)
};

const styles = StyleSheet.create({
	plus: {

	},
	testContainer: {
		width: '90%',
		marginHorizontal: '5%',
		backgroundColor: '#fff',
		borderRadius: 10,
		shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.1, shadowRadius: 10,
		elevation: 5,
		paddingHorizontal: '5%',
		marginTop: 20,  display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'
	},
});

export default Test;

