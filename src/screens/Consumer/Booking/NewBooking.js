import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import * as Animatable from "react-native-animatable";
import { StatusBar } from "expo-status-bar";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { COLORS, gaps } from "../../../styles/Theme";
import LinearGradientButton from "../../../component/button/LinearGradientButton";

// Address Card Component
const AddressCard = ({
  label,
  address,
  landmark,
  pincode,
  isDefault,
  selected,
  onSelect,
}) => {
  return (
    <Pressable
      onPress={onSelect}
      style={[styles.card, selected && styles.cardActive]}
    >
      <View style={styles.cardRow}>
        <MaterialCommunityIcons
          name={selected ? "checkbox-marked" : "checkbox-blank-outline"}
          size={22}
          color={selected ? COLORS.primary : "#9ca3af"}
        />
        <View style={{ flex: 1, marginLeft: 10 }}>
          <View style={styles.cardHeader}>
            <Text style={styles.label}>{label}</Text>
            {isDefault && (
              <View style={styles.defaultBadge}>
                <Ionicons name="star" size={12} color="#B7791F" />
                <Text style={styles.defaultText}>Default</Text>
              </View>
            )}
          </View>
          <Text style={styles.addressText}>{address}</Text>
          {landmark ? (
            <Text style={styles.subText}>
              <Text style={styles.bold}>Landmark:</Text> {landmark}
            </Text>
          ) : null}
          {pincode ? (
            <Text style={styles.subText}>
              <Text style={styles.bold}>Pincode:</Text> {pincode}
            </Text>
          ) : null}
        </View>
      </View>
    </Pressable>
  );
};

// Cylinder Selector Component
const CylinderSelector = ({ cylinders, selectedId, onSelect }) => {
  return (
    <View
      style={{
        flexDirection: "row",
        flexWrap: "wrap",
        columnGap: 15,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {cylinders.map((cylinder, index) => {
        const isSelected = selectedId === index;

        return (
          <Pressable
            key={index}
            onPress={() => onSelect(index)}
            style={[styles.cylinderBox, isSelected && styles.cylinderBoxActive]}
          >
            <Animatable.Image
              animation={isSelected ? "pulse" : undefined}
              iterationCount="infinite"
              source={require("../../../../assets/Images/cylinder.jpg")}
              style={{ width: 50, height: 100, resizeMode: "contain" }}
            />
            <Text style={styles.cylinderText}>{cylinder.label}</Text>
            <Text style={styles.cylinderText}>₹ {cylinder.price}/-</Text>
          </Pressable>
        );
      })}
    </View>
  );
};

// Quantity Selector Component
const QuantitySelector = ({ quantity, setQuantity }) => {
  return (
    <View style={styles.qtyContainer}>
      <TouchableOpacity
        style={styles.qtyBtn}
        onPress={() => setQuantity(Math.max(1, quantity - 1))}
      >
        <Text style={styles.qtyBtnText}>-</Text>
      </TouchableOpacity>
      <TextInput
        style={styles.qtyInput}
        value={String(quantity)}
        keyboardType="numeric"
        onChangeText={(val) => {
          const num = parseInt(val) || 1;
          setQuantity(num);
        }}
      />
      <TouchableOpacity
        style={styles.qtyBtn}
        onPress={() => setQuantity(quantity + 1)}
      >
        <Text style={styles.qtyBtnText}>+</Text>
      </TouchableOpacity>
    </View>
  );
};

export default function NewBooking({ navigation }) {
  const insets = useSafeAreaInsets();
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [selectedCylinder, setSelectedCylinder] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [deliveryNote, setDeliveryNote] = useState("");
  const cylinderOptions = [
    { label: "19 Kg Cylinder", price: 1150 },
    { label: "5 Kg Cylinder", price: 450 },
  ];

  // ✅ Now this will not error
  const CYLINDER_PRICE =
    selectedCylinder !== null ? cylinderOptions[selectedCylinder].price : 0;
  const totalAmount = selectedCylinder !== null ? quantity * CYLINDER_PRICE : 0;
  const handleBackPress = () => {
    navigation.getParent()?.navigate("dashboard");
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

      {/* Header */}
      <View style={styles.headerContainer}>
        <Pressable onPress={handleBackPress} style={styles.menuButton}>
          <Ionicons name="arrow-back" size={24} color="white" />
        </Pressable>
        <View style={styles.headerTitleWrapper}>
          <Text style={styles.headerTitle}>New Booking</Text>
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
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingVertical: 20 }}
        >
          {/* Address */}
          <Text style={styles.sectionTitle}>Select Delivery Address</Text>
          <AddressCard
            label="Home"
            address="123, Green Street, New Delhi"
            landmark="Near Metro Station"
            pincode="110001"
            isDefault
            selected={selectedAddress === "home"}
            onSelect={() => setSelectedAddress("home")}
          />
          <AddressCard
            label="Office"
            address="4th Floor, IT Park, Gurugram"
            landmark="Cyber Hub"
            pincode="122002"
            selected={selectedAddress === "office"}
            onSelect={() => setSelectedAddress("office")}
          />

          {/* Show these only if address is selected */}
          {selectedAddress && (
            <>
              {/* Cylinder */}
              <Text style={styles.sectionTitle}>Select Cylinder</Text>
              <View style={{ flexDirection: "row", justifyContent: "center" }}>
                <CylinderSelector
                  cylinders={cylinderOptions}
                  selectedId={selectedCylinder}
                  onSelect={(id) => setSelectedCylinder(id)}
                />
              </View>

              {/* Quantity */}
              {selectedCylinder && (
                <>
                  <Text style={styles.sectionTitle}>Quantity</Text>
                  <QuantitySelector
                    quantity={quantity}
                    setQuantity={setQuantity}
                  />

                  {/* Delivery Note */}
                  <Text style={styles.sectionTitle}>Delivery Note</Text>
                  <TextInput
                    style={styles.noteInput}
                    placeholder="Add any delivery note (optional)"
                    value={deliveryNote}
                    onChangeText={setDeliveryNote}
                  />

                  {/* Total */}
                  <View style={styles.totalBox}>
                    <Text style={styles.totalText}>Total: ₹{totalAmount}</Text>
                  </View>

                  {/* Submit Button */}

                  <LinearGradientButton
                    title="Confirm Booking"
                    onPress={() => {
                      Alert.alert(
                        "Success!",
                        "Your booking has been confirmed.",
                        [
                          {
                            text: "OK",
                            onPress: () => navigation.navigate("dashboard"), // or navigate anywhere else
                          },
                        ],
                        { cancelable: false }
                      );
                    }}
                    style={{ marginVertical: 20 }}
                  />
                </>
              )}
            </>
          )}
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
  headerTitle: { color: COLORS.white, fontSize: 18, fontWeight: "bold" },
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

  // AddressCard
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#f3f4f6",
  },
  cardActive: { borderColor: COLORS.primary, borderWidth: 1.5 },
  cardRow: { flexDirection: "row", alignItems: "flex-start" },
  cardHeader: { flexDirection: "row", alignItems: "center", marginBottom: 4 },
  label: { fontWeight: "bold", color: "#111827", fontSize: 15 },
  defaultBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FEF3C7",
    marginLeft: 8,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 10,
  },
  defaultText: { fontSize: 11, color: "#92400E", marginLeft: 4 },
  addressText: { color: "#374151", marginBottom: 2 },
  subText: { color: "#6b7280", fontSize: 13 },
  bold: { fontWeight: "bold" },

  // Cylinder
  cylinderBox: {
    borderWidth: 1,
    borderColor: "#e5e7eb",
    borderRadius: 12,
    padding: 15,
    alignItems: "center",
    marginBottom: 15,
  },
  cylinderBoxActive: { borderColor: COLORS.primary, borderWidth: 2 },
  cylinderText: {
    marginTop: 6,
    fontSize: 14,
    fontWeight: "600",
    color: "#111827",
  },

  // Quantity
  sectionTitle: {
    fontSize: 15,
    fontWeight: "bold",
    marginVertical: 10,
    color: "#111827",
  },
  qtyContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
  },
  qtyBtn: {
    paddingHorizontal: 10,
    paddingVertical:5,
    borderWidth: 1,
    borderColor: "#d1d5db",
    borderRadius: 8,
    backgroundColor: "#f9fafb",
  },
  qtyBtnText: { fontSize: 18, fontWeight: "bold", color: "#111827" },
  qtyInput: {
    borderWidth: 1,
    borderColor: "#d1d5db",
    borderRadius: 8,
    marginHorizontal: 10,
    padding: 8,
    width: 60,
    textAlign: "center",
    fontSize: 16,
  },

  // Delivery Note
  noteInput: {
    borderWidth: 1,
    borderColor: "#d1d5db",
    borderRadius: 10,
    padding: 12,
    minHeight: 70,
    textAlignVertical: "top",
    marginBottom: 20,
  },

  // Total
  totalBox: {
    marginBottom: 10,
    alignItems: "center",
  },
  totalText: {
    fontSize: 18,
    fontWeight: "bold",
    color: COLORS.primary,
  },

  // Submit
  submitBtn: {
    backgroundColor: COLORS.primary,
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: "center",
    marginTop: 10,
  },
  submitText: { color: "#fff", fontSize: 16, fontWeight: "bold" },
});
