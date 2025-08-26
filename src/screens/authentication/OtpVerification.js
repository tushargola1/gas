import { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Pressable,
  Alert,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import * as Animatable from "react-native-animatable";
import { COLORS } from "../../styles/Theme";
import EvilIcons from "@expo/vector-icons/EvilIcons";
import OTPTextInput from "react-native-otp-textinput";
import { StatusBar } from "expo-status-bar";
import LinearGradientButton from "../../component/LinearGradientButton";
import { LinearGradient } from "expo-linear-gradient";

export default function OtpVerification({ navigation }) {
  const insets = useSafeAreaInsets();
  const [code, setCode] = useState("");
  const [timer, setTimer] = useState(30);
  const [canResend, setCanResend] = useState(false);

  // Countdown timer logic
  useEffect(() => {
    let interval = null;
    if (timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    } else {
      setCanResend(true);
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [timer]);

  const resendOtp = () => {
    if (!canResend) return;
    Alert.alert("OTP Resent", "We have resent the verification code.");
    setTimer(30);
    setCanResend(false);
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

      <Image
        source={require("../../../assets/eclipse.png")}
        style={styles.leftImage}
      />
      <Pressable
        onPress={() => navigation.navigate("login")}
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
        <Text style={styles.topContainerHeading}>Verification</Text>
        <Text style={styles.topContainerText}>
          Enter OTP sent to your phone
        </Text>
        <Text
          style={{
            color: "white",
            marginTop: 5,
            fontWeight: "bold",
            fontSize: 18,
          }}
        >
          9999999999
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
            {/* Email */}
            <View>
              <View
                style={{
                  justifyContent: "space-between",
                  flexDirection: "row",
                }}
              >
                <Text style={styles.loginHeadText}>Enter OTP</Text>
                <Text>
                  <Text
                    style={{
                      fontWeight: "bold",
                      textDecorationLine: canResend ? "underline" : "none",
                      color: canResend ? COLORS.primary : "gray",
                    }}
                    onPress={resendOtp}
                  >
                    Resend
                  </Text>
                  {!canResend ? (
                    <>
                      <Text style={{ fontWeight: "normal" }}>
                        {" "}
                        in {timer} sec
                      </Text>
                    </>
                  ) : (
                    <></>
                  )}
                </Text>
              </View>
              <OTPTextInput
                inputCount={4}
                handleTextChange={setCode}
                tintColor="#ccc"
                offTintColor="#ccc"
                containerStyle={{ marginTop: 10 }}
                textInputStyle={{
                  borderRadius: 10,
                  borderWidth: 1,
                  backgroundColor: "#F0F5FA",
                  marginHorizontal: 20, // Reduce spacing between inputs
                  paddingHorizontal: 0,
                }}
                placeholder="0"
              />
            </View>

            <LinearGradientButton
              title="Login"
              onPress={() => navigation.navigate("dashboard")}
              style={{ marginTop: 20 }}
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
    left: 0,
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
    backgroundColor: COLORS.background,
    paddingVertical: 20,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginTop: 8,
  },
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.background,
    borderRadius: 10,
    paddingHorizontal: 20,
    marginTop: 8,
  },
  passwordInput: {
    flex: 1,
    paddingVertical: 20,
  },
  icon: {
    marginLeft: 10,
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
    fontWeight: "semibold",
  },
});
