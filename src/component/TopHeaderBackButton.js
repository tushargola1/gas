import { Ionicons } from "@expo/vector-icons"
import { Pressable, StyleSheet, Text, View } from "react-native"
import { COLORS, gaps } from "../styles/Theme"


const TopHeaderBackButton = () => {
  return (
     <View style={styles.headerContainer}>
            <Pressable onPress={() => navigation.goBack()} style={styles.menuButton}>
              <Ionicons name="arrow-back" size={24} color="white" />
            </Pressable>
            <View style={styles.headerTitleWrapper}>
              <Text style={styles.headerTitle}>Add Address</Text>
            </View>
          </View>
  )
}

export default TopHeaderBackButton

const styles = StyleSheet.create({
  headerContainer: {
    paddingHorizontal: gaps.paddingHorizontal,
    paddingVertical: 10,
    flexDirection: "row",
    alignItems: "center",
    position: "relative",
  },
  headerTitleWrapper: {
    flex: 1,
    alignItems: "center",
    position: "absolute",
    left: 0,
    right: 0,
  },
  headerTitle: {
    color: COLORS.white,
    fontSize: 18,
    fontWeight: "bold",
  },
  menuButton: {
    padding: 8,
    borderRadius: 30,
    backgroundColor: "rgba(255, 255, 255, 0.3)",
  }
});