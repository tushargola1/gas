import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Ionicons from "react-native-vector-icons/Ionicons";
import Animated, {
  useSharedValue,
  withTiming,
  useAnimatedStyle,
} from "react-native-reanimated";
import { View, StyleSheet, TouchableWithoutFeedback } from "react-native";

import ConsumerProfileForm from "../screens/Consumer/Profile/ConsumerProfileForm";
import AddressScreen from "../screens/Consumer/Address/AddressScreen";
import NewAddress from "../screens/Consumer/Address/NewAddress";
import { COLORS } from "../styles/Theme";
import History from "../screens/Consumer/history/History";

const Tab = createBottomTabNavigator();
const AddressStack = createNativeStackNavigator();

// Address Stack
function AddressStackScreen() {
  return (
    <AddressStack.Navigator screenOptions={{ headerShown: false }}>
      <AddressStack.Screen name="AddressMain" component={AddressScreen} />
      <AddressStack.Screen name="newAddress" component={NewAddress} />
    </AddressStack.Navigator>
  );
}

function AnimatedTabIcon({ focused, color, size, iconName }) {
  const scale = useSharedValue(1);
  React.useEffect(() => {
    scale.value = withTiming(focused ? 1.1 : 1, { duration: 200 });
  }, [focused]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  return (
    <Animated.View style={animatedStyle}>
      <Ionicons name={iconName} size={size} color={color} />
    </Animated.View>
  );
}

const NoRippleTabButton = ({ children, onPress, accessibilityState }) => {
  const focused = accessibilityState?.selected;
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View
        style={[
          styles.tabButtonContainer,
          focused && styles.activeTabBackground,
        ]}
      >
        {children}
      </View>
    </TouchableWithoutFeedback>
  );
};

export default function MainTabs() {
  return (
    <Tab.Navigator
      initialRouteName="profile"
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: COLORS.accent,
        tabBarInactiveTintColor: "gray",
        tabBarLabelStyle: { color: COLORS.textDark },
        tabBarStyle: { height: 60 },
        tabBarIcon: ({ focused, color, size }) => {
          const iconMap = {
            profile: { filled: "person", outline: "person-outline" },
            address: { filled: "location", outline: "location-outline" },
            history: { filled: "time", outline: "time-outline" },

            info: {
              filled: "information-circle",
              outline: "information-circle-outline",
            },
          };
          const current = iconMap[route.name] || {
            filled: "ellipse",
            outline: "ellipse-outline",
          };
          const iconName = focused ? current.filled : current.outline;

          return (
            <AnimatedTabIcon
              focused={focused}
              color={color}
              size={size}
              iconName={iconName}
            />
          );
        },
        tabBarButton: (props) => <NoRippleTabButton {...props} />,
      })}
    >
      <Tab.Screen
        name="profile"
        component={ConsumerProfileForm}
        options={{ title: "Profile" }}
      />
      <Tab.Screen
        name="address"
        component={AddressStackScreen}
        options={{ title: "Address" }}
      />
      <Tab.Screen
        name="history"
        component={History}
        options={{ title: "History" }}
      />
      <Tab.Screen
        name="info"
        component={ConsumerProfileForm}
        options={{ title: "Info" }}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  tabButtonContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
