import { useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TextInput,
  Pressable,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import * as Animatable from "react-native-animatable";
import { COLORS } from "../../styles/Theme";
import { StatusBar } from "expo-status-bar";
import EvilIcons from "@expo/vector-icons/EvilIcons";
import LinearGradientButton from "../../component/button/LinearGradientButton";
import { LinearGradient } from "expo-linear-gradient";

export default function Login({ navigation, route }) {
  const insets = useSafeAreaInsets();
  const loginType = route.params?.type || "consumer"; 
  const otpNumber = "123456"; 
  const [phone, setPhone] = useState("");
  const pulse = {
    0: { transform: [{ scale: 1 }] },
    0.5: { transform: [{ scale: 1.1 }] },
    1: { transform: [{ scale: 1 }] },
  };

  const heading =
    loginType === "consumer" ? "Consumer Login" : "Delivery Partner Login";
  const switchText =
    loginType === "consumer"
      ? "Or login as Delivery Partner"
      : "Or login as Consumer";

  const switchType = () => {
    const newType = loginType === "consumer" ? "delivery" : "consumer";
    setPhone("");
    navigation.navigate("login", { type: newType });
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
      {/* Background image */}
      <Animatable.View
        animation={pulse}
        iterationCount="infinite"
        duration={2000}
        easing="ease-in-out"
        style={styles.leftImage}
      >
        <Image source={require("../../../assets/eclipse.png")} />
      </Animatable.View>

      {/* Overlay back button */}
      <Pressable
        onPress={() => navigation.navigate("loginSelection")}
        style={{ marginTop: 10, marginLeft: 10 }}
      >
        <EvilIcons
          name="chevron-left"
          size={35}
          color="white"
          style={{
            backgroundColor: "white",
            borderRadius: 20,
            width: 40,
            height: 40,
            textAlign: "center",
            textAlignVertical: "center",
            marginLeft: 10,
            color: "black",
            fontWeight: "bold",
          }}
        />
      </Pressable>

      <View style={styles.topContainer}>
        <Text style={styles.topContainerHeading}>{heading}</Text>
        <Text style={styles.topContainerText}>
          Please sign in to your existing account
        </Text>
      </View>

      <Animatable.View
        animation="slideInUp"
        duration={800}
        delay={100}
        easing="ease-out-cubic"
        style={styles.bottomContainer}
      >
        <View style={styles.bottomContainer}>
          <View style={styles.bottomMainContainer}>
            {/* Phone Number */}
            <View>
              <Text style={styles.loginHeadText}>Phone Number</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter your phone number"
                value={phone}
                onChangeText={setPhone}
                keyboardType="phone-pad"
                maxLength={10}
              />
            </View>

            <LinearGradientButton
              title="Send OTP"
              onPress={() => navigation.navigate("otp", { otp: otpNumber })}
              style={{ marginVertical: 20 }}
            />

            <View style={{ alignItems: "center" }}>
              <Text
                style={[
                  styles.forgotPass,
                  { textAlign: "center", fontSize: 15 },
                ]}
                onPress={switchType}
              >
                {switchText}
              </Text>
            </View>
              <Image
                          source={require("../../../assets/Images/cylinder.jpg")}
                          style={styles.bannerImage}
                        />
          </View>
        </View>
      </Animatable.View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  leftImage: {
    position: "absolute",
    top: 0,
    left: -30,
    zIndex: 0,
    tintColor: "#a6a6a6ff",
  },

  topContainer: {
    flex: 1 / 4,
    justifyContent: "center",
    alignItems: "center",
  },
  topContainerHeading: {
    color: COLORS.white,
    fontSize: 25,
    fontWeight: "bold",
  },
  topContainerText: {
    color: COLORS.white,
    marginTop: 10,
  },
  bottomContainer: {
    flex: 3 / 4,
    backgroundColor: COLORS.white,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    padding: 15,
  },
  bottomMainContainer: {
    flex: 1,
  },
  loginHeadText: {
    fontSize: 14,
    textTransform: "uppercase",
  },
  input: {
    backgroundColor: COLORS.backgroundLight,
    paddingVertical: 20,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginTop: 8,
  },
  checkboxSection: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  checkboxContainer: {
    flexDirection: "row",
  },
  rememberMe: {
    paddingLeft: 10,
    fontSize: 14,
    color: COLORS.textLight,
  },
  forgotPass: {
    color: COLORS.primary,
    fontWeight: "600",
  },
   bannerImage: {
    width: "100%",
    resizeMode: "contain",
    height: 300,
    marginTop:40
  },
});
