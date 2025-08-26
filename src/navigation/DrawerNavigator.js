import React from "react";
import { createDrawerNavigator, DrawerContentScrollView } from "@react-navigation/drawer";
import Dashboard from "../screens/Pages/Dashboard";
import SplashScreen from "../screens/splashscreen/SplashScreen";
import Login from "../screens/authentication/Login";
import LoginSelection from "../screens/authentication/LoginSelection";
import OtpVerification from "../screens/authentication/OtpVerification";
import { COLORS } from "../styles/Theme";
import { View, Text, Image, Pressable, StyleSheet } from "react-native";
import MainTabs from "./BottomTabs";

const Drawer = createDrawerNavigator();

// Custom Drawer Content
function CustomDrawerContent({ navigation, state }) {
  const currentRoute = state.routes[state.index].name;

  return (
    <DrawerContentScrollView contentContainerStyle={{ flex: 1, backgroundColor: COLORS.backgroundLight }}>
      <View style={styles.header}>
        <Image source={require("../../assets/user.png")} style={styles.profileImage} />
        <View style={{ marginLeft: 10 }}>
          <Text style={styles.name}>John Smith</Text>
          <Text style={styles.role}>Developer</Text>
        </View>
      </View>

      <View style={styles.menuContainer}>
        <Pressable
          style={[styles.menuItem, currentRoute === "dashboard" && styles.menuActive]}
          onPress={() => navigation.navigate("dashboard")}
        >
          <Text style={[styles.menuText, currentRoute === "dashboard" && styles.menuTextActive]}>Dashboard</Text>
        </Pressable>

        <Pressable
          style={[styles.menuItem, currentRoute === "profile" && styles.menuActive]}
          onPress={() => navigation.navigate("profile")}
        >
          <Text style={[styles.menuText, currentRoute === "profile" && styles.menuTextActive]}>Profile</Text>
        </Pressable>
      </View>
    </DrawerContentScrollView>
  );
}

export default function DrawerNavigator() {
  return (
    <Drawer.Navigator drawerContent={(props) => <CustomDrawerContent {...props} />} initialRouteName="loginSelection">
      {/* Auth Screens */}
      <Drawer.Screen name="splashScreen" component={SplashScreen} options={{ headerShown: false }} />
      <Drawer.Screen name="login" component={Login} options={{ headerShown: false }} />
      <Drawer.Screen name="loginSelection" component={LoginSelection} options={{ headerShown: false }} />
      <Drawer.Screen name="otp" component={OtpVerification} options={{ headerShown: false }} />

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
    </Drawer.Navigator>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, justifyContent: "center", alignItems: "center" },
  text: { fontSize: 22, fontWeight: "bold" },
  header: { flexDirection: "row", alignItems: "center", padding: 15 },
  profileImage: { width: 60, height: 60, borderRadius: 30, borderWidth: 1, borderColor: "#007BFF" },
  name: { fontWeight: "bold", fontSize: 18 },
  role: { color: "#555", fontSize: 14 },
  menuContainer: { marginTop: 20, paddingHorizontal: 10 },
  menuItem: { flexDirection: "row", alignItems: "center", paddingVertical: 12, paddingHorizontal: 10, marginBottom: 10, borderRadius: 8, backgroundColor: "#f1f1f1" },
  menuText: { fontSize: 16 },
  menuActive: { backgroundColor: COLORS.secondary },
  menuTextActive: { color: COLORS.white, fontWeight: "bold" },
});