import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, Platform, StyleSheet } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useCalendarStore } from "@/stores/calendarStore";
import moment from "moment";

const Datepicker = ({ onChange }: { onChange: (value: string) => void }) => {
    const { selectedDate, setSelectedDate, addSchedule } = useCalendarStore();
    const [show, setShow] = useState(false);


    const onChange2 = (event: any, selectedDate?: Date) => {
        if (Platform.OS === "android") {
            setShow(false);
        }
        if (selectedDate) {
            const formattedDate = moment(selectedDate).format("YYYY-MM-DD");
        onChange(formattedDate);
        }
    };
    return (
        <View style={styles.container}>
            {/* <Text style={styles.label}>{selectedDate.format("YY-MM-DD")}</Text> */}
            {Platform.OS === "android" && (
                <TouchableOpacity style={styles.button} onPress={() => setShow(true)}>
                    <Text style={styles.buttonText}>날짜 선택</Text>
                </TouchableOpacity>
            )}
            {show || Platform.OS === "ios" ? (
                <DateTimePicker
                    value={selectedDate.toDate()} // 선택한 날짜 반영
                    mode="date"
                    display="default"
                    onChange={onChange2}
                    
                />
                
            ) : null}
        </View>
        
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    label: {
        padding: 5,
        fontSize: 16,
    },
    button: {
        // backgroundColor: "#d4d4d4",
        paddingHorizontal: 10,
        // paddingVertical: 4,
        borderRadius: 10,
    },
    buttonText: {
        // color: "#fff",
    },
});

export default Datepicker;
