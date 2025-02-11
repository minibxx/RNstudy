import React, { useState, useEffect } from "react";
import { View, StyleSheet, Text, FlatList } from "react-native";
import organizationJson from '@/services/organizationData.json';
import { ScrollView } from "react-native-gesture-handler";

const Organization = () => {
    const [members, setMembers] = useState<any[]>([]);

    const filteredData = organizationJson.filter(item => item.MEM_NM !== "");

    return (
  <>
  <ScrollView>
    <View>
      {filteredData.map((item, index) => (
        <View key={index} style={styles.item}>
          <Text style={styles.name}>{`${item.MEM_NM}`} {`${item.POSIT_CD_NM}`}</Text>
                <Text>{`${item.DEPT_NM}`}</Text>
                <Text>📞 {`${item.OFFI_TEL_NUM}`}</Text>
                <Text style={styles.assignWork}>{`${item.ASSIGN_WORK}`}</Text>
        </View>
      ))}
    </View>
    </ScrollView>
  </>
    );
};

const styles = StyleSheet.create({
    container: {
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
