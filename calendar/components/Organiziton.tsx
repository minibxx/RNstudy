import React, { useState, useEffect } from "react";
import { View, StyleSheet, Text } from "react-native";
import organizationJson from '@/services/organizationData.json';
import { FlashList } from "@shopify/flash-list";

const Organization = () => {
    const [members, setMembers] = useState<any[]>([]);

    const filteredData = organizationJson.filter(item => item.MEM_NM !== "");
    useEffect(() => {
        console.log("Filtered Data: ", filteredData);
    }, [filteredData]);
    return (
        <View style={{ flex: 1 }}>
    <FlashList
        data={filteredData}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
            <View style={styles.item}>
                <Text style={styles.name}>{`${item.MEM_NM}`} {`${item.POSIT_CD_NM}`}</Text>
                <Text>{`${item.DEPT_NM}`}</Text>
                <Text>📞 {`${item.OFFI_TEL_NUM}`}</Text>
                <Text style={styles.assignWork}>{`${item.ASSIGN_WORK}`}</Text>
            </View>
        )}
        estimatedItemSize={141}
    />
</View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1, // 화면을 꽉 채우도록 설정
        padding: 16,
    },
    item: {
        marginBottom: 10,
        padding: 10,
        backgroundColor: "#f0f0f0",
        borderRadius: 8,
    },
    name: {
        fontWeight: 'bold',
    },
    assignWork: {
        marginTop: 8,
    },
});

export default Organization;
