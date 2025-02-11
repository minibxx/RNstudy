import React, { useState, useEffect } from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import organizationJson from '@/services/organizationData.json';
import { FlashList } from "@shopify/flash-list";

const Organization = () => {
    const [members, setMembers] = useState<any[]>([]);
    const filteredData = organizationJson.filter(item => item.MEM_NM !== "");

    const pageSize = 7;
    const [currentPage, setCurrentPage] = useState(1);
    const totalPages = Math.ceil(filteredData.length / pageSize);

    const currentData = filteredData.slice((currentPage - 1) * pageSize, currentPage * pageSize);

    return (
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
    );
};

const styles = StyleSheet.create({
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
    btns:{
        gap: 20,
        marginHorizontal: "auto",
        display: 'flex',
        flexDirection: 'row'
    }
});

export default Organization;
