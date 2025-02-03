import React, { useState } from "react";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import { TextInput } from "react-native";

interface Props {

}
const Test = () => {
	const [dateMemo, setDateMemo] = useState<string>('');
	const [dateMemoList, setDateMemoList] = useState<string[]>([]);

	const submitMemo = () => {
		setDateMemoList([...dateMemoList, dateMemo]);
		setDateMemo('');
	}
	return (
		<>
		<View>
				{dateMemoList.map((k, i) => {
					return (
						<Text key={i}>{k}</Text>
					)
				})}
			</View>
			<View style={{ backgroundColor: 'white', width: '90%', marginHorizontal: '5%', marginTop: 20, height: 50, display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center' }}>

				<TextInput
					placeholder="일정 입력" placeholderTextColor={'gray'}
					style={{ backgroundColor: 'white', width: '80%' }}
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
			
			
		</>
	)
};

const styles = StyleSheet.create({
	plus: {
		
	}
});

export default Test;

