import React, { useState, useEffect } from "react";
import { View, StyleSheet, Text, TouchableOpacity, TextInput } from "react-native";
import organizationJson from '@/services/organizationData.json';
import { FlashList } from "@shopify/flash-list";

// interface filteredData{
//     MEM_NM: string;
//     POSIT_CD_NM: string;
//     OFFI_TEL_NUM: string;
//     ASSIGN_WORK: string;
//     DEPT_NM: string;
//     DEPT_FAX_NO: string;
//     DEPT_LOC: string;
//     FULL_DEPTNAME: string;
//     ORDR: number;
// }
const Organization = () => {
    const [filterWord, setFilterWord] = useState<string>("");
    const [members, setMembers] = useState<any[]>(organizationJson.filter(item => item.MEM_NM !== ""));

    useEffect(() => {
        let result = organizationJson.filter(item => item.MEM_NM !== "");
        if (filterWord.trim() !== "") {
            result = result.filter(item =>
                item.MEM_NM.toLowerCase().includes(filterWord.toLowerCase()) ||
                item.POSIT_CD_NM.toLowerCase().includes(filterWord.toLowerCase()) ||
                item.DEPT_NM.toLowerCase().includes(filterWord.toLowerCase()) ||
                item.ASSIGN_WORK.toLowerCase().includes(filterWord.toLowerCase())
            );
        }
        setMembers(result);
        setCurrentPage(1);
    }, [filterWord]);

    const pageSize = 7;
    const [currentPage, setCurrentPage] = useState(1);
    const totalPages = Math.ceil(members.length / pageSize);

    const currentData = members.slice((currentPage - 1) * pageSize, currentPage * pageSize);

    

    return (
        <>  
            <View style={styles.inputBox}>
                <TextInput style={styles.input} value={filterWord} onChangeText={setFilterWord}></TextInput>
                <TouchableOpacity onPress={() => setFilterWord("")}>
                    <Text style={{fontSize: 20}}>🔍</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.container}>
                <FlashList
                    data={currentData}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item }) => (
                        <View style={styles.item}>
                            <Text style={styles.name}>{`${item.MEM_NM}`} {`${item.POSIT_CD_NM}`}</Text>
                            <Text>{`${item.DEPT_NM}`}  📞 {`${item.OFFI_TEL_NUM}`}</Text>
                            <Text style={styles.assignWork}>{`${item.ASSIGN_WORK}`}</Text>
                        </View>
                    )}
                />
                <View style={styles.btns}>
                    <TouchableOpacity
                        onPress={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                        disabled={currentPage === 1}
                    >
                        <Text>◀️</Text>
                    </TouchableOpacity>

                    <Text>Page {currentPage} of {totalPages}</Text>
                    <TouchableOpacity
                        onPress={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                        disabled={currentPage === totalPages}
                    >
                        <Text>▶️</Text>
                    </TouchableOpacity>
                </View>
            </View >
        </>
    );
};

const styles = StyleSheet.create({
    inputBox:{
        display: 'flex',
        flexDirection:'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 10,
        marginTop: 30
    },
    input: {
        borderRadius: 50,
        backgroundColor: 'white',
        height: 40,
        paddingHorizontal: 15,
        width: '80%'
    },
    container: {
        flex: 1,
        padding: 16,
    },
    item: {
        marginBottom: 10,
        paddingHorizontal: 20,
        paddingVertical: 10,
        margin: 10,
        backgroundColor: "#f0f0f0",
        borderLeftWidth: 10,
        borderLeftColor: "lightgray",
    },
    name: {
        fontWeight: 'bold',
    },
    assignWork: {
        marginTop: 8,
    },
    btns: {
        gap: 20,
        marginHorizontal: "auto",
        display: 'flex',
        flexDirection: 'row'
    }
});

export default Organization;
