
import { View, Text, TextInput, StyleSheet } from "react-native";
import { COLORS } from "../styles/Theme";

const FormInput = ({ label, error, ...props }) => {
  return (
    <View style={{ marginBottom: 15 }}>
      <Text style={styles.label}>{label}</Text>
      <TextInput style={styles.input} {...props} />
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  label: {
    fontSize: 14,
    fontWeight: "500",
    marginBottom: 5,
  },
  input: {
    backgroundColor: COLORS.backgroundLight,
    paddingVertical: 15,
    paddingHorizontal: 15,
    borderRadius: 10,
  },
  errorText: {
    color: "red",
    fontSize: 12,
    marginTop: 5,
  },
});

export default FormInput;
