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
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import { COLORS, gaps } from "../../styles/Theme";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import Octicons from "@expo/vector-icons/Octicons";
import AddressCard from "../../component/AddressCard";
import HistoryCard from "../../component/HistoryCard"; // ✅ import your history card
import { useUserType } from "../../hooks/UserTypeContext";

export default function Dashboard({ navigation, route }) {
  const insets = useSafeAreaInsets();

  const MOCK_ORDERS = [
    {
      id: "1",
      orderId: "#00250",
      status: "out_for_delivery",
      cylinder: "Commercial 25KG",
      price: 519.0,
      quantity: 10,
      total: 5190,
      address:
        "9953612444, SECOND FLOOR, O-267, SECTOR-1, PKT-O, DSIIDC BAWANA, Delhi, Delhi, [110002]",
      bookingNote: "Sample booking note 249",
      deliveryDate: "2025-07-22T16:43:00",
      history: [
        {
          status: "Pending",
          message: "Booking created successfully.",
          user: "Texmith",
          time: "1 month ago",
        },
        {
          status: "Confirmed",
          message: "Your booking has been confirmed.",
          user: "Mr. Rogers Hoeger V",
          time: "1 month ago",
        },
        {
          status: "Confirmed",
          message:
            "A driver is assigned to your booking and it will be out for delivery soon.",
          user: "Mr. Rogers Hoeger V",
          time: "1 month ago",
        },
        {
          status: "Out_for_delivery",
          message: "Your booking is out for delivery.",
          user: "Shakira Ryan",
          time: "1 month ago",
        },
      ],
    },
  ];

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
  const { type } = useUserType();

  const consumer = type === "consumer";
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
        <Pressable
          onPress={() => navigation.openDrawer()}
          style={styles.menuButton}
        >
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
            {consumer ? (
              <>
                <DashboardCard
                  icon={MaterialCommunityIcons}
                  name="gas-cylinder"
                  label="Book Now"
                  onPress={() =>
                    navigation.navigate("bookingRoot", { screen: "booking" })
                  }
                />
                <DashboardCard
                  icon={FontAwesome}
                  name="address-book"
                  label="Address"
                  onPress={() =>
                    navigation.navigate("addressRoot", { screen: "address" })
                  }
                />
              </>
            ) : (
              <>
                <DashboardCard
                  icon={MaterialCommunityIcons}
                  name="truck-delivery"
                  label="Upcoming Delivery"
                  onPress={() =>
                    navigation.navigate("upcomingDeliveryRoot", {
                      screen: "upcomingDelivery",
                    })
                  }
                />
              </>
            )}

            <DashboardCard
              icon={Octicons}
              name="history"
              label="Booking History"
              onPress={() =>
                navigation.navigate("historyRoot", { screen: "history" })
              }
            />
            <DashboardCard
              icon={FontAwesome}
              name="user"
              label="Profile"
              onPress={() =>
                navigation.navigate("profile", {
                  screen: "profile",
                  params: {
                    screen: "ProfileShow",
                  },
                })
              }
            />
          </View>

          {/* ✅ Show last booking card here */}
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: 10,
            }}
          >
            <Text
              style={{ fontSize: 18, fontWeight: "700", marginVertical: 10 }}
            >
              {consumer ? "Recent Bookings" : "Upcoming Bookings"}
            </Text>
            {consumer ? (
              <Pressable
                onPress={() =>
                  navigation.navigate("historyRoot", { screen: "history" })
                }
              >
                <Text style={{ fontWeight: "bold", color: COLORS.textLight }}>
                  See all{" "}
                </Text>
              </Pressable>
            ) : (
              <Pressable
                onPress={() =>
                  navigation.navigate("upcomingDeliveryRoot", {
                    screen: "upcomingDelivery",
                  })
                }
              >
                <Text style={{ fontWeight: "bold", color: COLORS.textLight }}>
                  See all{" "}
                </Text>
              </Pressable>
            )}
          </View>
          <HistoryCard
            item={MOCK_ORDERS[0]}
            onView={(order) => console.log("View", order)}
            onInvoice={(order) => console.log("Invoice", order)}
          />

          <Image
            source={require("../../../assets/Images/homeBanner.jpg")}
            style={styles.bannerImage}
          />
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
    paddingVertical: 40,
    rowGap: 30,
    alignItems: "center",
  },
  dashboardContainerParent: {
    width: "50%",
    alignItems: "center",
  },
  dashboardContainerChild: {
    width: 130,
    height: 130,
    borderRadius: 65,
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
  bannerImage: {
    width: "100%",
    resizeMode: "contain",
    height: 300,
    marginVertical: 20,
  },
});
