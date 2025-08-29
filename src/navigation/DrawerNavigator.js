import React from "react";
import {
  createDrawerNavigator,
  DrawerContentScrollView,
} from "@react-navigation/drawer";
import Dashboard from "../screens/Pages/Dashboard";
import SplashScreen from "../screens/splashscreen/SplashScreen";
import Login from "../screens/authentication/Login";
import LoginSelection from "../screens/authentication/LoginSelection";
import OtpVerification from "../screens/authentication/OtpVerification";
import { COLORS } from "../styles/Theme";
import { View, Text, Image, Pressable, StyleSheet, Alert } from "react-native";
import MainTabs from "./BottomTabs";
import { Ionicons, MaterialIcons, FontAwesome5 } from "@expo/vector-icons";
const Drawer = createDrawerNavigator();

// Custom Drawer Content
function CustomDrawerContent({ navigation, state }) {
  const currentRoute = state.routes[state.index].name;

  const handleLogout = () => {
    Alert.alert("Logout", "Are you sure you want to logout?", [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "Logout",
        style: "destructive",
        onPress: () => {
          navigation.navigate("login");
        },
      },
    ]);
  };

  return (
    <DrawerContentScrollView
      contentContainerStyle={{
        flex: 1,
        backgroundColor: COLORS.backgroundLight,
      }}
    >
      {/* Header */}
      <View style={styles.header}>
        <Image
          source={require("../../assets/user.png")}
          style={styles.profileImage}
        />
        <View style={{ marginLeft: 10 }}>
          <Text style={styles.name}>John Smith</Text>
          <Text style={styles.role}>Developer</Text>
        </View>
      </View>

      {/* Menu Items */}
      <View style={styles.menuContainer}>
        <Pressable
          style={[
            styles.menuItem,
            currentRoute === "dashboard" && styles.menuActive,
          ]}
          onPress={() => navigation.navigate("dashboard")}
        >
          <Ionicons name="home-outline" size={20} color="#4B5563" style={styles.icon} />
          <Text
            style={[
              styles.menuText,
              currentRoute === "dashboard" && styles.menuTextActive,
            ]}
          >
            Dashboard
          </Text>
        </Pressable>

        <Pressable
          style={[
            styles.menuItem,
            currentRoute === "profile" && styles.menuActive,
          ]}
          onPress={() =>
            navigation.navigate("profile", {
              screen: "profile",
              params: { screen: "ProfileShow" },
            })
          }
        >
          <Ionicons name="person-outline" size={20} color="#4B5563" style={styles.icon} />
          <Text
            style={[
              styles.menuText,
              currentRoute === "profile" && styles.menuTextActive,
            ]}
          >
            Profile
          </Text>
        </Pressable>

        <Pressable
          style={[
            styles.menuItem,
            currentRoute === "addressRoot" && styles.menuActive,
          ]}
          onPress={() =>
            navigation.navigate("addressRoot", { screen: "address" })
          }
        >
          <Ionicons name="location-outline" size={20} color="#4B5563" style={styles.icon} />
          <Text
            style={[
              styles.menuText,
              currentRoute === "addressRoot" && styles.menuTextActive,
            ]}
          >
            Address
          </Text>
        </Pressable>

        <Pressable
          style={[
            styles.menuItem,
            currentRoute === "bookingRoot" && styles.menuActive,
          ]}
          onPress={() =>
            navigation.navigate("bookingRoot", { screen: "booking" })
          }
        >
          <MaterialIcons name="book-online" size={20} color="#4B5563" style={styles.icon} />
          <Text
            style={[
              styles.menuText,
              currentRoute === "bookingRoot" && styles.menuTextActive,
            ]}
          >
            Booking
          </Text>
        </Pressable>

        <Pressable
          style={[
            styles.menuItem,
            currentRoute === "historyRoot" && styles.menuActive,
          ]}
          onPress={() =>
            navigation.navigate("historyRoot", { screen: "history" })
          }
        >
          <FontAwesome5 name="history" size={18} color="#4B5563" style={styles.icon} />
          <Text
            style={[
              styles.menuText,
              currentRoute === "historyRoot" && styles.menuTextActive,
            ]}
          >
            History
          </Text>
        </Pressable>
      </View>

      {/* Logout Button at Bottom */}
   <View style={styles.logoutContainer}>
  <Pressable style={styles.menuItem} onPress={handleLogout}>
    <Ionicons name="log-out-outline" size={20} color="#4B5563" style={styles.icon} />
    <Text style={styles.menuText}>Logout</Text>
  </Pressable>
</View>

    </DrawerContentScrollView>
  );
}


export default function DrawerNavigator() {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      initialRouteName="splashScreen"
    >
      {/* Auth Screens */}
      <Drawer.Screen
        name="splashScreen"
        component={SplashScreen}
        options={{ headerShown: false }}
      />
      <Drawer.Screen
        name="login"
        component={Login}
        options={{ headerShown: false }}
      />
      <Drawer.Screen
        name="loginSelection"
        component={LoginSelection}
        options={{ headerShown: false }}
      />
      <Drawer.Screen
        name="otp"
        component={OtpVerification}
        options={{ headerShown: false }}
      />

      {/* Dashboard - No bottom tabs */}
      <Drawer.Screen
        name="dashboard"
        component={Dashboard}
        options={{ headerShown: false }}
      />

      {/* Profile - With bottom tabs */}
      <Drawer.Screen
        name="profile"
        component={MainTabs}
        options={{ headerShown: false }}
      />
      <Drawer.Screen
        name="addressRoot"
        component={MainTabs}
        options={{ headerShown: false }}
      />
      <Drawer.Screen
        name="bookingRoot"
        component={MainTabs}
        options={{ headerShown: false }}
      />
      <Drawer.Screen
        name="historyRoot"
        component={MainTabs}
        options={{ headerShown: false }}
      />
    </Drawer.Navigator>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, justifyContent: "center", alignItems: "center" },
  text: { fontSize: 22, fontWeight: "bold" },
  header: { flexDirection: "row", alignItems: "center", padding: 15 },
  profileImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: "#007BFF",
  },
  name: { fontWeight: "bold", fontSize: 18 },
  role: { color: "#555", fontSize: 14 },
  menuContainer: { marginTop: 20, paddingHorizontal: 10 },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 10,
    marginBottom: 10,
    borderRadius: 8,
    backgroundColor: "#f1f1f1",
  },
  menuText: { fontSize: 16 },
  menuActive: { backgroundColor: COLORS.secondary },
  menuTextActive: { color: COLORS.white, fontWeight: "bold" },
   logoutContainer: {
    marginTop: "auto",
    padding: 15,
    borderTopWidth: 1,
    borderColor: "#E5E7EB",
  },
  icon:{
    marginRight:20
  },
  logoutBtn: {
  flexDirection: "row",
  alignItems: "center",
},
logoutText: {
  color: "red",
  fontSize: 15,
  fontWeight: "bold",
  marginLeft: 10,
},

});
