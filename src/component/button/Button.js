
import { TouchableOpacity, Text, StyleSheet, View } from "react-native";
import { COLORS } from "../../styles/Theme";

export default function Button({ 
  title = "BUTTON", 
  onPress, 
  style, 
  textStyle, 
  icon 
}) {
  return (
    <TouchableOpacity style={[styles.button, style]} onPress={onPress}>
      <View style={styles.innerContainer}>
        {icon && <View style={{ marginRight: 10 }}>{icon}</View>}
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
    paddingVertical: 15,
    borderRadius: 25, // pill shape
    gap: 10,
    shadowColor: COLORS.shadowColor,
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 5,
    backgroundColor: COLORS.accent, // default, can override via style prop
    
    paddingHorizontal: 20,
  },
  innerContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "600",
    color: COLORS.white, // default, can override via textStyle prop
  },
});
