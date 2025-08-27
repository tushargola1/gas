import React from "react";
import { View, Text, StyleSheet, Pressable, Platform } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import * as Animatable from "react-native-animatable";
import { StatusBar } from "expo-status-bar";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { COLORS, gaps } from "../../../styles/Theme";
import { ScrollView } from "react-native-gesture-handler";
import AddressCard from "../../../component/AddressCard";
import Button from "../../../component/button/Button";
import SmallSideButton from "../../../component/button/SmallSideButton";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

export default function AddressScreen({ navigation }) {
  const insets = useSafeAreaInsets();
  const addresses = [
    {
      id: "1",
      label: "Home",
      address: "789 Residency Road, Bangalore, Karnataka 560025",
      landmark: "Near City Mall",
      pincode: "560025",
      isDefault: true,
    },
    {
      id: "2",
      label: "Office",
      address: "12 MG Road, Bangalore, Karnataka 560001",
      landmark: "Opposite Metro Station",
      pincode: "560001",
      isDefault: false,
    },
    {
      id: "3",
      label: "Parents' House",
      address: "45 JP Nagar, Bangalore, Karnataka 560078",
      landmark: "Next to Reliance Fresh",
      pincode: "560078",
      isDefault: false,
    },
    {
      id: "4",
      label: "Warehouse",
      address: "98 Industrial Layout, Whitefield, Bangalore, Karnataka 560066",
      landmark: "Behind Tech Park",
      pincode: "560066",
      isDefault: false,
    },
    {
      id: "5",
      label: "Friend's Place",
      address: "22 Indiranagar, Bangalore, Karnataka 560038",
      landmark: "Near Café Coffee Day",
      pincode: "560038",
      isDefault: false,
    },
  ];

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
        <Pressable
          onPress={() => navigation.goBack()}
          style={styles.menuButton}
        >
          <Ionicons name="arrow-back" size={24} color="white" />
        </Pressable>
        <View style={styles.headerTitleWrapper}>
          <Text style={styles.headerTitle}>Delivery Address</Text>
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
        <ScrollView
          style={{ marginVertical: 15 }}
          showsVerticalScrollIndicator={false}
        >
          <View style={{ flex: 1, alignItems: "flex-end", marginBottom: 16 }}>
            <SmallSideButton
              title="New Address"
              onPress={() => navigation.navigate("newAddress")}
              icon={
                <MaterialIcons
                  name="add-location-alt"
                  size={18}
                  color="white"
                  style={{ fontWeight: "700" }}
                />
              }
            />
          </View>
          {addresses.map((item) => (
            <AddressCard
              key={item.id}
              label={item.label}
              address={item.address}
              landmark={item.landmark}
              pincode={item.pincode}
              isDefault={item.isDefault}
              onEdit={() => console.log("Edit", item.id)}
              onDelete={() => console.log("Delete", item.id)}
              onSetDefault={() => console.log("Set Default", item.id)}
            />
          ))}
        </ScrollView>
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
    paddingTop: 6,
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
