import React from "react";
import { View, Text, StyleSheet, Pressable, Platform } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import * as Animatable from "react-native-animatable";
import { StatusBar } from "expo-status-bar";
import { LinearGradient } from "expo-linear-gradient";
import { AntDesign, Ionicons, MaterialIcons } from "@expo/vector-icons";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { COLORS, gaps } from "../../../styles/Theme";
import Form from "./Form";
import SmallSideButton from "../../../component/button/SmallSideButton";

export default function ConsumerProfileForm({ navigation }) {
  const insets = useSafeAreaInsets();

  const handleBackPress = () => {
    navigation.getParent()?.navigate('dashboard');
  };

  return (
    <LinearGradient
      style={{
        flex: 1,
        paddingTop: insets.top,
        paddingBottom: insets.bottom,
        paddingLeft: insets.left,
        paddingRight: insets.right,
      }}
      start={{ x: 1, y: 0 }}
      end={{ x: 0, y: 1 }}
      colors={[COLORS.primary, COLORS.cardBackground]}
    >
      <StatusBar style="light" />

      {/* Header */}
      <View style={styles.headerContainer}>
        <Pressable onPress={handleBackPress} style={styles.menuButton}>
          <Ionicons name="arrow-back" size={24} color="white" />
        </Pressable>
        <View style={styles.headerTitleWrapper}>
          <Text style={styles.headerTitle}>Profile</Text>
        </View>
      </View>

      {/* Content */}
      <Animatable.View
        animation="slideInUp"
        duration={800}
        delay={100}
        easing="ease-out-cubic"
        style={styles.bottomContainer}
      >
       
        <KeyboardAwareScrollView
          enableOnAndroid
          extraScrollHeight={Platform.OS === "ios" ? 50 : 80}
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          
          <Form />
        </KeyboardAwareScrollView>
      </Animatable.View>
    </LinearGradient>
  );
}

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
  bottomContainer: {
    flex: 1,
    backgroundColor: COLORS.white,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    marginTop: 10,
    paddingHorizontal: gaps.paddingHorizontal,
    paddingTop: 6
  },
  scrollContent: {
    paddingBottom: 10,
  },
  menuButton: {
    padding: 8,
    borderRadius: 30,
    backgroundColor: "rgba(255, 255, 255, 0.3)",
  },
});