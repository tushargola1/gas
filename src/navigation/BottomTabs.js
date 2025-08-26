import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";
import Dashboard from "../screens/Pages/Dashboard";
import ConsumerProfileForm from "../screens/Consumer/Profile/ConsumerProfileForm";
import { COLORS } from "../styles/Theme";

const Tab = createBottomTabNavigator();

export default function MainTabs() {
  return (
    <Tab.Navigator
      initialRouteName="profile"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName = route.name === "dashboard" ? "home-outline" : "person-outline";
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        headerShown: false,
        tabBarActiveTintColor: COLORS.secondary,
        tabBarInactiveTintColor: "gray",
      })}
    >
      {/* <Tab.Screen name="dashboard" component={Dashboard} options={{ title: "Dashboard" }} /> */}
      <Tab.Screen name="profile" component={ConsumerProfileForm} options={{ title: "Profile" }} />
    </Tab.Navigator>
  );
}