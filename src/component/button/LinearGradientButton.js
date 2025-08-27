import React from "react";
import { TouchableOpacity, Text, StyleSheet, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { COLORS } from "../../styles/Theme";

export default function LinearGradientButton({
  title = "BUTTON",
  onPress,
  style,
  textStyle,
  icon,
}) {
  return (
    <TouchableOpacity onPress={onPress} style={[styles.buttonWrapper, style]}>
      <LinearGradient
        colors={[COLORS.secondary, COLORS.accent]} // ← gradient colors
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.button}
      >
        <View style={styles.innerContainer}>
          {icon && <View style={{ marginRight: 10 }}>{icon}</View>}
          <Text style={[styles.buttonText, textStyle]}>{title}</Text>
        </View>
      </LinearGradient>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  buttonWrapper: {
    borderRadius: 25,
    overflow: "hidden", // ← important for pill shape and gradient clipping
    shadowColor: COLORS.shadowColor,
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 5,
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 25,
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
