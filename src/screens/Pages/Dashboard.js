import {
  View,
  Text,
  Image,
  StyleSheet,
  Pressable,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import * as Animatable from "react-native-animatable";
import { StatusBar } from "expo-status-bar";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import { COLORS, gaps } from "../../styles/Theme";
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Octicons from '@expo/vector-icons/Octicons';
export default function Dashboard({ navigation }) {
  const insets = useSafeAreaInsets();

  const DashboardCard = ({ icon: IconComponent, name, label, onPress }) => (
    <View style={styles.dashboardContainerParent}>
      <TouchableOpacity
        style={styles.dashboardContainerChild}
        activeOpacity={0.7}
        onPress={onPress}
      >
        <IconComponent name={name} size={50} color={COLORS.accent} />
      </TouchableOpacity>
      <Text style={styles.cardText}>{label}</Text>
    </View>
  );

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

      {/* Top Header */}
      <View style={styles.header}>
        <Pressable onPress={() => navigation.openDrawer()} style={styles.menuButton}>
          <Ionicons name="menu" size={30} color="white" />
        </Pressable>
        <Pressable onPress={() => navigation.navigate("profile")}>
          <Image
            source={require("../../../assets/user.png")}
            style={styles.profileImage}
          />
        </Pressable>
      </View>

      {/* Bottom Animated Container */}
      <Animatable.View
        animation="slideInUp"
        duration={800}
        easing="ease-out-cubic"
        style={styles.bottomContainer}
      >
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.dashboardContainer}>
            <DashboardCard
              icon={FontAwesome5}
              name="book"
              label="Book Now"
              onPress={() => console.log("I-Card pressed")}
            />
            <DashboardCard
              icon={FontAwesome}
              name="address-book"
              label="Address"
              onPress={() => console.log("Face of School pressed")}
            />
            <DashboardCard
              icon={Octicons }
              name="history"
              label="Booking History"
              onPress={() => console.log("My Photos pressed")}
            />
            <DashboardCard
              icon={FontAwesome}
              name="user"
              label="Profile"
              onPress={() => navigation.navigate("profile")}
            />
          </View>
        </ScrollView>
      </Animatable.View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: gaps.paddingHorizontal,
    paddingVertical: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  menuButton: {
    padding: 8,
    borderRadius: 30,
    backgroundColor: "rgba(255, 255, 255, 0.3)",
  },
  profileImage: {
    width: 45,
    height: 45,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: COLORS.white,
  },
  bottomContainer: {
    flex: 1,
    backgroundColor: COLORS.white,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: gaps.paddingHorizontal,
    marginTop: 10,

  },
  dashboardContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    paddingVertical: 50,
    rowGap: 40,
      alignItems: "center",
  },
  dashboardContainerParent: {
    width: "50%",
    alignItems: "center",
  },
  dashboardContainerChild: {
    width: 130,
    height: 130,
    borderRadius: "50%",
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 3,
    borderColor: COLORS.borderColor,
    shadowColor: COLORS.primary,
    elevation: 10,
  },
  cardText: {
    fontSize: 16,
    color: "black",
    fontWeight: "bold",
    marginTop: 10,
  },
});
