import { useCalendarStore } from "@/stores/calendarStore";
import React, { useState } from "react";
import { View, StyleSheet, Text, TextInput, TouchableOpacity } from "react-native";
import DropDownPicker from 'react-native-dropdown-picker';
import moment from "moment";

const WorkType = () => {
    const [open, setOpen] = useState(false);
    const [workType, setWorkType] = useState<string | null>(null);
    const [workDate, setWorkDate] = useState<string>('');

    const { addWorkType } = useCalendarStore();

    const items = [
        { label: '연장', value: '연장' },
        { label: '파견', value: '파견' },
        { label: '외근', value: '외근' },
        { label: '출장', value: '출장' },
    ];

    const submitType2 = () => {
        if (workDate && workType !== null) {
            const formattedDate = moment(workDate, "YYYY-MM-DD");
            if (!formattedDate.isValid()) {
                console.error("유효하지 않은 날짜 형식입니다.");
                return;
            }

            console.log("저장된 일정:", { type: workType, date: formattedDate.format("YYYY-MM-DD") });

            addWorkType(workType, formattedDate); 
            setWorkDate(moment().format("YYYY-MM-DD"));
            setWorkType('');

        }
    };

    return (
        <View style={styles.testContainer}>
            <TextInput
                placeholder="날짜 (YYYY-MM-DD)"
                placeholderTextColor={'gray'}
                style={styles.input}
                value={workDate}
                onChangeText={setWorkDate}
            />

            <DropDownPicker
                placeholder="근무 형태 선택"
                open={open}
                value={workType}
                items={items}
                setOpen={setOpen}
                setValue={setWorkType}
                style={styles.dropdown}
                placeholderStyle={{ color: 'gray' }}
                containerStyle={styles.dropdownContainer}
                dropDownContainerStyle={styles.dropDownContainer}
            />

            <TouchableOpacity onPress={submitType2}>
                <Text style={styles.plus}>+</Text>
            </TouchableOpacity>
        </View>
    );
};

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
    input: {
        width: "35%",
    }
});

export default WorkType;
