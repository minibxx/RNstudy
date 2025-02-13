import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, Platform, StyleSheet } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useCalendarStore } from "@/stores/calendarStore";
import moment from "moment";

const Datepicker = ({ onChange }: { onChange: (value: string) => void }) => {
    const { selectedDate } = useCalendarStore();
    const [show, setShow] = useState(false);
const [tempDate, setTempDate] = useState<Date | null>(null); // ✅ 임시 날짜 상태

    const onChange2 = (event: any, selectedDate?: Date) => {
        if (selectedDate) {
                    setTempDate(selectedDate); // 선택된 날짜 임시 저장
                    const formattedDate = moment(selectedDate).format("YYYY-MM-DD");
                    onChange(formattedDate); // 부모 컴포넌트로 값 전달
                    setShow(false); // DateTimePicker 숨김
                }
    };
    
    return (
        <View style={styles.container}>
            {/* <Text style={styles.label}>{selectedDate.format("MM/DD")}</Text> */}

            {Platform.OS === "android" && (
                <TouchableOpacity style={styles.button} onPress={() => setShow(true)}>
                    <Text style={styles.buttonText}>날짜 선택</Text>
                </TouchableOpacity>
            )}

            {show || Platform.OS === "ios" ? (
                <DateTimePicker
                    value={tempDate || selectedDate.toDate()} // 선택한 날짜 반영
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
        paddingHorizontal: 10,
        borderRadius: 10,
    },
    buttonText: {
    },
});

export default Datepicker;
