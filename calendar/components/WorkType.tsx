import React, { useState } from "react";
import { View, StyleSheet, Text, TextInput, TouchableOpacity } from "react-native";
import DropDownPicker from 'react-native-dropdown-picker';

const WorkType = () => {
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(null);
    const [items, setItems] = useState([
        { label: '연장', value: '연장' },
        { label: '파견', value: '파견' },
        { label: '외근', value: '외근' },
        { label: '출장', value: '출장' },
    ]);

    return (
        <><View style={styles.testContainer}>
            <TextInput
                placeholder="날짜 (YYYY-MM-DD)"
                placeholderTextColor={'gray'}
            style={styles.input}
            // value={scheduleDate}
            // onChangeText={setScheduleDate} 
            />

            <DropDownPicker
                placeholder="근무 형태 선택"
                open={open}
                value={value}
                items={items}
                setOpen={setOpen}
                setValue={setValue}
                setItems={setItems}
                style={styles.dropdown}
                placeholderStyle={{ color: 'gray' }}
                containerStyle={styles.dropdownContainer}  // 부모 컨테이너 스타일
                dropDownContainerStyle={styles.dropDownContainer}  // 목록 스타일
                zIndex={1000}  // 다른 요소 위에 표시
            />

            <TouchableOpacity >
                <Text style={styles.plus}>+</Text>
            </TouchableOpacity>
        </View>
        </>
    );
}

const styles = StyleSheet.create({
    testContainer: {
        height: 50,
        width: "90%",
        marginHorizontal: "5%",
        backgroundColor: "#fff",
        borderRadius: 10,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 10,
        elevation: 5,
        paddingHorizontal: "5%",
        marginTop: 20,
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    plus: {
        fontSize: 20,
        fontWeight: "bold",
    },
    dropdownContainer: {
        width: '37%',
    },
    dropdown: {
        width: '100%',
        borderColor: '#fff',
        borderWidth: 1,
    },
    dropDownContainer: {
        borderColor: '#fff',
        borderWidth: 1,
    },
    input:{
        width: "35%"
    }
})

export default WorkType;