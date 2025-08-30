import { View, StyleSheet, Image } from "react-native";
import { Feather, FontAwesome5 } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { COLORS } from "../../styles/Theme";
import { LinearGradient } from "expo-linear-gradient";
import Button from "../../component/button/Button";
import SmallSideButton from "../../component/button/SmallSideButton";
import { useUserType } from "../../hooks/UserTypeContext"; // 👈 import here

const LoginSelection = () => {
  const navigation = useNavigation();
  const { setType } = useUserType(); // 👈 get setter from context

  // Set type and navigate to Login screen
  const handleLoginSelection = (userType) => {
    setType(userType);
    navigation.navigate("login");
  };

  return (
    <LinearGradient
      colors={[COLORS.primary, COLORS.cardBackground]}
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}
      style={styles.container}
    >
      <View style={styles.logoContainer}>
        <Image
          source={require("../../../assets/logo.png")}
          style={{ width: 150, height: 200, resizeMode: "contain" }}
        />
      </View>

      <View style={styles.buttonContainer}>
        <Button
          title="Consumer Login"
          icon={
            <FontAwesome5
              name="shopping-bag"
              size={24}
              color={COLORS.primary}
            />
          }
          style={{ backgroundColor: COLORS.cardBackground }}
          textStyle={{ color: COLORS.textDark }}
          onPress={() => handleLoginSelection("consumer")} // 👈 use handler here
        />

        <SmallSideButton
          title="Delivery Partner Login"
          onPress={() => handleLoginSelection("delivery")} // 👈 use handler here
          icon={<Feather name="truck" size={24} color={COLORS.white} />}
          style={{ backgroundColor: COLORS.primary, alignSelf: "center" }}
        />
      </View>
    </LinearGradient>
  );
};

export default LoginSelection;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.primary,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  logoContainer: {
    backgroundColor: COLORS.cardBackground,
    paddingVertical: 5,
    borderRadius: 10,
    marginBottom: 20,
    shadowColor: COLORS.shadowColor,
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 10,
  },

  buttonContainer: {
    width: "100%",
    maxWidth: 320,
    gap: 15,
  },
});
