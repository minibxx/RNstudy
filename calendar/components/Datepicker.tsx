import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, Platform, StyleSheet } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useCalendarStore } from "@/stores/calendarStore";
import moment from "moment";

const Datepicker = ({ onChange }: { onChange: (value: string) => void }) => {
    const { selectedDate, setSelectedDate } = useCalendarStore();
    const [show, setShow] = useState(false);
    const [tempDate, setTempDate] = useState<Date | null>(null); // ✅ 임시 날짜 상태

    // DatePicker 값 변경 시 처리
    const onChange2 = (event: any, selectedDate?: Date) => {
        if (selectedDate) {
            setTempDate(selectedDate); // 선택된 날짜 임시 저장
            if (Platform.OS === "android") {
                // Android에서는 날짜가 선택되면 바로 부모로 전달
                const formattedDate = moment(selectedDate).format("YYYY-MM-DD");
                onChange(formattedDate); // 부모 컴포넌트로 값 전달
                setShow(false); // DateTimePicker 숨김
            }
        }
    };

    // iOS에서 "완료" 버튼을 눌렀을 때 날짜 전달
    const handleConfirm = () => {
        if (tempDate) {
            const formattedDate = moment(tempDate).format("YYYY-MM-DD");
            onChange(formattedDate); // 부모 컴포넌트로 값 전달
        }
        setShow(false); // DateTimePicker 숨김
    };

    return (
        <View style={styles.container}>
            {/* Android에서는 날짜 선택 버튼 */}
            {Platform.OS === "android" && (
                <TouchableOpacity style={styles.button} onPress={() => setShow(true)}>
                    <Text style={styles.buttonText}>날짜 선택</Text>
                </TouchableOpacity>
            )}
            {/* iOS 및 Android에서 DateTimePicker 표시 */}
            {show || Platform.OS === "ios" ? (
                <View>
                    <DateTimePicker
                        value={tempDate || selectedDate.toDate()} // 선택된 날짜 반영
                        mode="date"
                        display="default"
                        onChange={onChange2}
                    />
                    {/* iOS에서 "완료" 버튼 추가 */}
                    {Platform.OS === "ios" && (
                        <TouchableOpacity onPress={handleConfirm}>
                            <Text>완료</Text>
                        </TouchableOpacity>
                    )}
                </View>
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
    
})
export default Datepicker;
