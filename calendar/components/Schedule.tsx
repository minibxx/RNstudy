import React, { useState } from "react";
import { Text, View, StyleSheet, TouchableOpacity, TextInput } from "react-native";
import { useCalendarStore } from "../stores/calendarStore";
import moment, { Moment } from "moment";

const Schedule = () => {
    const { addSchedule } = useCalendarStore();
    
    const [scheduleDate, setScheduleDate] = useState<string>('');
    const [scheduleText, setScheduleText] = useState<string>('');

    const submitSchedule = () => {
        if (scheduleDate && scheduleText) {
            const formattedDate = moment(scheduleDate, "YYYY-MM-DD");
            if (!formattedDate.isValid()) {
                console.error("유효하지 않은 날짜 형식입니다.");
                return;
            }

            console.log("저장된 일정:", { text: scheduleText, date: formattedDate });

            addSchedule(scheduleText, formattedDate); 
            setScheduleDate(moment().format("YYYY-MM-DD"));
            setScheduleText('');
        }
    };

    return (
        <View style={styles.testContainer}>
            <TextInput
                placeholder="날짜 (YYYY-MM-DD)"
                placeholderTextColor={'gray'}
                style={styles.input}
                value={scheduleDate}
                onChangeText={setScheduleDate} 
            />

            <TextInput
                placeholder="스케줄 입력"
                placeholderTextColor={'gray'}
                style={styles.input}
                value={scheduleText}
                onChangeText={setScheduleText}
            />

            <TouchableOpacity onPress={submitSchedule}>
                <Text style={styles.plus}>+</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    plus: {
        fontSize: 20,
        fontWeight: "bold",
    },
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
    input: {
        backgroundColor: "white",
        width: "35%",
        padding: 5,
    },
});

export default Schedule;
