import React, { useState } from "react";
import { View, StyleSheet, Text, TouchableOpacity, TextInput } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import moment from "moment";
import { useCalendarStore } from "@/stores/calendarStore";
import Datepicker from "./Datepicker";



const WorkType = () => {
    const { addWorkType } = useCalendarStore();
    
    const [open, setOpen] = useState(false);
    const [workType, setWorkType] = useState<string | null>(null);
    const [workDate, setWorkDate] = useState<string>(moment().format("YYYY-MM-DD"));
    const [datePickerVisible, setDatePickerVisible] = useState(false);

    const items = [
        { label: '연장', value: '연장' },
        { label: '파견', value: '파견' },
        { label: '외근', value: '외근' },
        { label: '출장', value: '출장' },
    ];

    const handleConfirm = (date: Date) => {
        setWorkDate(moment(date).format("YYYY-MM-DD"));
        setDatePickerVisible(false);
    };

    const submitType = () => {
        if (workDate && workType) {
            const formattedDate = moment(workDate, "YYYY-MM-DD");
            if (!formattedDate.isValid()) {
                console.error("유효하지 않은 날짜 형식입니다.");
                return;
            }

            console.log("저장된 근무 타입:", { type: workType, date: formattedDate.format("YYYY-MM-DD") });

            addWorkType(workType, formattedDate);
            setWorkDate(moment().format("YYYY-MM-DD"));
            setWorkType(null);
        }
    };
    
    return (
        <View style={styles.testContainer}>
            <Datepicker onChange={setWorkDate}/>
        
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

            <TouchableOpacity onPress={submitType}>
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
        width: 137,
        borderColor: '#fff',
        borderWidth: 1,
    },
    dropDownContainer: {
        borderColor: '#fff',
        borderWidth: 1,
    },
    input: {
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "white",
        padding: 5,
        borderRadius: 5,
    },
    dateText: {
        color: "gray",
    }
});

export default WorkType;
