import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  ScrollView,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import * as Animatable from "react-native-animatable";
import { StatusBar } from "expo-status-bar";
import { LinearGradient } from "expo-linear-gradient";
import { AntDesign, Ionicons, Feather } from "@expo/vector-icons";
import { COLORS, gaps } from "../../../styles/Theme";
import SmallSideButton from "../../../component/button/SmallSideButton";
import { useUserType } from "../../../hooks/UserTypeContext";

export default function DisplayProfile({ navigation }) {
  const insets = useSafeAreaInsets();
  const { type } = useUserType();

  const handleBackPress = () => {
    navigation.getParent()?.navigate("dashboard");
  };

  // Temporary mock data — replace with real data
  const profile = {
    name: "Rajesh Kumar",
    firmName: "Kumar Enterprises",
    number: "9876543210",
    email: "rajesh@kumarenterprises.com",

    // Permanent Address
    addressLine1: "123 MG Road",
    addressLine2: "Near Metro Station",
    city: "Bangalore",
    state: "Karnataka",
    pincode: "560001",

    // Temporary Address
    temp_addressLine1: "5A Block C, Rent Complex",
    temp_addressLine2: "Near Old Railway Station",
    temp_city: "Hyderabad",
    temp_state: "Telangana",
    temp_pincode: "500001",

    // Consumer-only fields
    gst: "29ABCDE1234F1Z5",
    aadhar: "123456789012",
  };

  // Basic fields differ for consumer vs delivery
  const basicFields = type === "delivery"
    ? [
        { key: "name", label: "Full Name", icon: "user" },
        { key: "number", label: "Mobile Number", icon: "phone" },
        { key: "email", label: "Email Address", icon: "mail" },
      ]
    : [
        { key: "name", label: "Full Name", icon: "user" },
        { key: "firmName", label: "Firm Name", icon: "briefcase" },
        { key: "number", label: "Mobile Number", icon: "phone" },
        { key: "email", label: "Email Address", icon: "mail" },
      ];

  const tempAddressFields = [
    { key: "temp_addressLine1", label: "Address Line 1", icon: "map-pin" },
    { key: "temp_addressLine2", label: "Address Line 2", icon: "map" },
    { key: "temp_city", label: "City", icon: "building" },
    { key: "temp_state", label: "State", icon: "globe" },
    { key: "temp_pincode", label: "Pincode", icon: "hash" },
  ];

  const permAddressFields = [
    { key: "addressLine1", label: "Address Line 1", icon: "map-pin" },
    { key: "addressLine2", label: "Address Line 2", icon: "map" },
    { key: "city", label: "City", icon: "building" },
    { key: "state", label: "State", icon: "globe" },
    { key: "pincode", label: "Pincode", icon: "hash" },
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
        <Pressable onPress={handleBackPress} style={styles.menuButton}>
          <Ionicons name="arrow-back" size={24} color="white" />
        </Pressable>
        <View style={styles.headerTitleWrapper}>
          <Text style={styles.headerTitle}>My Profile</Text>
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
        <ScrollView showsVerticalScrollIndicator={false}>
          {/* Edit Button */}
          <View style={{ alignItems: "flex-end", marginVertical: 16 }}>
            <SmallSideButton
              title="Edit Profile"
              onPress={() => navigation.navigate("ProfileForm")}
              icon={
                <AntDesign
                  name="edit"
                  size={18}
                  color="white"
                  style={{ fontWeight: "700" }}
                />
              }
            />
          </View>

          {/* Avatar */}
          <View style={styles.profilePicture}>
            <View style={styles.avatar}>
              <Feather name="user" size={40} color="white" />
            </View>
            <Text style={styles.profileName}>{profile.name}</Text>
            {type !== "delivery" && (
              <Text style={styles.profileFirm}>{profile.firmName}</Text>
            )}
          </View>

          {/* Basic Info */}
          {basicFields.map((field) => (
            <View key={field.key} style={styles.fieldCard}>
              <View style={styles.fieldHeader}>
                <View style={styles.iconWrapper}>
                  <Feather name={field.icon} size={18} color={COLORS.primary} />
                </View>
                <Text style={styles.fieldLabel}>{field.label}</Text>
              </View>
              <Text style={styles.fieldValue}>{profile[field.key]}</Text>
            </View>
          ))}

          {/* Delivery person: Temporary + Permanent Address */}
          {type === "delivery" && (
            <>
              <Text style={styles.sectionTitle}>Temporary Address</Text>
              {tempAddressFields.map((field) => (
                <View key={field.key} style={styles.fieldCard}>
                  <View style={styles.fieldHeader}>
                    <View style={styles.iconWrapper}>
                      <Feather name={field.icon} size={18} color={COLORS.primary} />
                    </View>
                    <Text style={styles.fieldLabel}>{field.label}</Text>
                  </View>
                  <Text style={styles.fieldValue}>{profile[field.key]}</Text>
                </View>
              ))}

              <Text style={styles.sectionTitle}>Permanent Address</Text>
              {permAddressFields.map((field) => (
                <View key={field.key} style={styles.fieldCard}>
                  <View style={styles.fieldHeader}>
                    <View style={styles.iconWrapper}>
                      <Feather name={field.icon} size={18} color={COLORS.primary} />
                    </View>
                    <Text style={styles.fieldLabel}>{field.label}</Text>
                  </View>
                  <Text style={styles.fieldValue}>{profile[field.key]}</Text>
                </View>
              ))}
            </>
          )}

          {/* Consumer: Permanent Address + GST & Aadhar */}
          {type !== "delivery" && (
            <>
              {permAddressFields.map((field) => (
                <View key={field.key} style={styles.fieldCard}>
                  <View style={styles.fieldHeader}>
                    <View style={styles.iconWrapper}>
                      <Feather name={field.icon} size={18} color={COLORS.primary} />
                    </View>
                    <Text style={styles.fieldLabel}>{field.label}</Text>
                  </View>
                  <Text style={styles.fieldValue}>{profile[field.key]}</Text>
                </View>
              ))}

              <View style={styles.fieldCard}>
                <View style={styles.fieldHeader}>
                  <View style={styles.iconWrapper}>
                    <Feather name="credit-card" size={18} color={COLORS.primary} />
                  </View>
                  <Text style={styles.fieldLabel}>GST Number</Text>
                </View>
                <Text style={styles.fieldValue}>{profile.gst}</Text>
              </View>
              <View style={styles.fieldCard}>
                <View style={styles.fieldHeader}>
                  <View style={styles.iconWrapper}>
                    <Feather name="file-text" size={18} color={COLORS.primary} />
                  </View>
                  <Text style={styles.fieldLabel}>Aadhar Number</Text>
                </View>
                <Text style={styles.fieldValue}>{profile.aadhar}</Text>
              </View>
            </>
          )}

          {/* Account Status */}
          <View style={styles.statusCard}>
            <View style={styles.statusRow}>
              <View style={styles.statusDot} />
              <Text style={styles.statusText}>Account Active</Text>
            </View>
            <Text style={styles.statusDesc}>
              Your account is verified and ready for orders
            </Text>
          </View>
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
  menuButton: {
    padding: 8,
    borderRadius: 30,
    backgroundColor: "rgba(255, 255, 255, 0.3)",
  },
  profilePicture: {
    alignItems: "center",
    marginBottom: 20,
  },
  avatar: {
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: COLORS.primary,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 8,
  },
  profileName: {
    fontSize: 18,
    fontWeight: "700",
    color: COLORS.text,
  },
  profileFirm: {
    fontSize: 14,
    color: "gray",
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "700",
    marginVertical: 10,
    color: COLORS.textLight,
  },
  fieldCard: {
    backgroundColor: COLORS.white,
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
    elevation: 1,
    borderWidth: 1,
    borderColor: "#eee",
  },
  fieldHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 6,
  },
  iconWrapper: {
    padding: 6,
    backgroundColor: "#f1f5ff",
    borderRadius: 8,
    marginRight: 8,
  },
  fieldLabel: {
    fontSize: 15,
    fontWeight: "700",
    color: COLORS.textLight,
  },
  fieldValue: {
    fontSize: 15,
    fontWeight: "500",
    color: COLORS.text,
    marginLeft: 34,
  },
  statusCard: {
    backgroundColor: "#e6f9ec",
    borderRadius: 12,
    padding: 14,
    borderWidth: 1,
    borderColor: "#b6e3c9",
    marginTop: 20,
    marginBottom: 40,
  },
  statusRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  statusDot: {
    width: 8,
    height: 8,
    backgroundColor: "green",
    borderRadius: 4,
    marginRight: 6,
  },
  statusText: {
    fontSize: 14,
    fontWeight: "600",
    color: "green",
  },
  statusDesc: {
    fontSize: 12,
    color: "green",
    marginTop: 4,
  },
});
