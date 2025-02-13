import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Picker } from "@react-native-picker/picker";

const PickerExample: React.FC = () => {
  const [selectedValue, setSelectedValue] = useState<string>("java");

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Select a language: {selectedValue}</Text>
      <Picker
        selectedValue={selectedValue}
        onValueChange={(itemValue) => setSelectedValue(itemValue)}
        style={styles.picker}
      >
        <Picker.Item label="Java" value="java" />
        <Picker.Item label="JavaScript" value="javascript" />
        <Picker.Item label="Python" value="python" />
        <Picker.Item label="Swift" value="swift" />
      </Picker>
      {/* <Text style={styles.result}>You selected: {selectedValue}</Text> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
  },
  label: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  picker: {
    width: 250,
    height: 50,
    backgroundColor: "#fff",
    borderRadius: 10,
  },
  result: {
    marginTop: 20,
    fontSize: 16,
    color: "#333",
  },
});

export default PickerExample;
