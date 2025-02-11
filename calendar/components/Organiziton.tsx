import React, { useState, useEffect } from "react";
import { View, StyleSheet, Text } from "react-native";
import { getOrganization } from "@/services/organization";

const Organization = () => {
  const [members, setMembers] = useState<any[]>([]);

  useEffect(() => {
    getOrganization(1, 100).then((jsonData) => {
      if (jsonData) {
        setMembers(jsonData.SeoulOrganizationService.row);
      }
    }).catch(error => {
      console.error("Error fetching organization data:", error);
    });
  }, []); 
  console.log(members)
  return (

        <View style={styles.container}>
        {members.map((member, i) => {
            return (
            <View key={i} style={styles.item}>
                <Text style={styles.name}>{member.POSIT_CD_NM} {member.MEM_NM} </Text>
                <Text>{member.OFFI_TEL_NUM}</Text>
                <Text style={styles.assignWork}>
                {member.ASSIGN_WORK ? member.ASSIGN_WORK.replace(/\r\n/g, "\n") : "업무 없음"}
                </Text>
                <Text>부서: {member.DEPT_NM}</Text>
            </View>
            );
        })}
        </View>
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
