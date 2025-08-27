
import { TouchableOpacity, Text, StyleSheet, View } from "react-native";
import { COLORS } from "../../styles/Theme";

export default function SmallSideButton({ 
  title = "BUTTON", 
  onPress, 
  style, 
  textStyle, 
  icon 
}) {
  return (
    <TouchableOpacity style={[styles.button, style]} onPress={onPress}>
      <View style={styles.innerContainer}>
        {icon && <View style={{ marginRight: 5 }}>{icon}</View>}
        <Text style={[styles.buttonText, textStyle]}>{title}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 10,
    borderRadius: 18,
    gap: 10,
    shadowColor: COLORS.shadowColor,
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 5,
    backgroundColor: COLORS.primary, 
    paddingHorizontal: 15,
  },
  innerContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  buttonText: {
    fontSize: 14,
    fontWeight: "600",
    color: COLORS.white, 
  },
});
