import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Pressable,
  Modal,
  TextInput,
  Image,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import * as Animatable from "react-native-animatable";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
import { COLORS, gaps } from "../../styles/Theme";
import HistoryCard from "../../component/HistoryCard";
import { Picker } from "@react-native-picker/picker";
const MOCK_DELIVERIES = [
  {
    id: "1",
    orderId: "#DLV250",
    status: "out_for_delivery",
    cylinder: "Domestic 14KG",
    price: 950.0,
    quantity: 2,
    total: 1900,
    address: "221B Baker Street, London",
    phone_number: "9876543210",
    bookingNote: "Leave at the door if not available.",
    deliveryDate: "2025-09-01T11:30:00",
    user: "John Doe",
  },
];

export default function UpcomingDelivery({ navigation }) {
  const insets = useSafeAreaInsets();
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [otpVisible, setOtpVisible] = useState(false);
  const [enteredOtp, setEnteredOtp] = useState("");
  const [otpResult, setOtpResult] = useState(null); // "success" | "fail"

  const [cancelVisible, setCancelVisible] = useState(false);
  const [cancelReason, setCancelReason] = useState("");
  const [cancelNotes, setCancelNotes] = useState("");

  const handleOpenOtp = () => {
    setSelectedOrder(null); // close details first
    setTimeout(() => {
      setOtpVisible(true); // then open OTP modal
    }, 300);
  };

 const handleCancelConfirm = () => {
  if (!cancelReason || !cancelNotes.trim()) {
    Alert.alert("Missing Information ⚠️", "Please select a reason and add notes before cancelling.");
    return;
  }

  setCancelVisible(false);
  Alert.alert("Cancelled ✅", "Delivery has been cancelled successfully.");
  setCancelReason("");
  setCancelNotes("");
};

  const handleVerifyOtp = () => {
    const correctOtp = "1234";
    if (enteredOtp === correctOtp) {
      setOtpResult("success");
      setTimeout(() => {
        setOtpVisible(false);
        setOtpResult(null);
        setEnteredOtp("");
      }, 2000);
    } else {
      setOtpResult("fail");
      setTimeout(() => {
        setOtpResult(null);
        setEnteredOtp("");
      }, 2000);
    }
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
        <Pressable
          onPress={() => navigation.goBack()}
          style={styles.menuButton}
        >
          <Ionicons name="arrow-back" size={24} color="white" />
        </Pressable>
        <View style={styles.headerTitleWrapper}>
          <Text style={styles.headerTitle}>Upcoming Deliveries</Text>
        </View>
      </View>

      {/* Bottom White Container */}
      <Animatable.View
        animation="slideInUp"
        duration={800}
        delay={100}
        easing="ease-out-cubic"
        style={styles.bottomContainer}
      >
        {MOCK_DELIVERIES.length === 0 ? (
          <View style={styles.emptyBox}>
            <Image
              source={require("../../../assets/Images/noAddress.png")}
              style={styles.emptyImage}
            />
            <Text style={styles.emptyText}>No deliveries found</Text>
          </View>
        ) : (
          <FlatList
            data={MOCK_DELIVERIES}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <HistoryCard
                item={item}
                onView={setSelectedOrder}
                onInvoice={() => {}}
                type="delivery"
                onCancel={() => setCancelVisible(true)} // ✅ open cancel modal
              />
            )}
            contentContainerStyle={{ marginVertical: 20 }}
          />
        )}
      </Animatable.View>

      {/* Modal for Order Details */}
      <Modal
        visible={!!selectedOrder}
        transparent
        animationType="fade"
        onRequestClose={() => setSelectedOrder(null)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>
                Order: {selectedOrder?.orderId}
              </Text>
              <Pressable onPress={() => setSelectedOrder(null)}>
                <Ionicons name="close" size={24} color={COLORS.textDark} />
              </Pressable>
            </View>

            {/* Consumer Details */}
            {selectedOrder && (
              <View style={styles.detailsBox}>
                {[
                  { label: "Customer", value: selectedOrder.user },
                  { label: "Phone", value: selectedOrder.phone_number },
                  { label: "Cylinder", value: selectedOrder.cylinder },
                  { label: "Quantity", value: selectedOrder.quantity },
                  { label: "Price", value: `₹${selectedOrder.price}` },
                  { label: "Total", value: `₹${selectedOrder.total}` },
                  { label: "Address", value: selectedOrder.address },
                  {
                    label: "Delivery Date",
                    value: new Date(
                      selectedOrder.deliveryDate
                    ).toLocaleString(),
                  },
                ].map(({ label, value }, idx) => (
                  <View key={idx} style={styles.detailRow}>
                    <Text style={styles.detailLabel}>{label}</Text>
                    <Text style={styles.detailValue}>{value}</Text>
                  </View>
                ))}
              </View>
            )}
            <Pressable style={styles.verifyButton} onPress={handleOpenOtp}>
              <Text style={styles.verifyButtonText}>Verify Delivery</Text>
            </Pressable>
          </View>
        </View>
      </Modal>

      {/* OTP Verification Modal */}
      <Modal
        visible={otpVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setOtpVisible(false)}
      >
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={styles.modalOverlay}
        >
          <View style={styles.otpModal}>
            {otpResult === "success" ? (
              <View style={styles.resultBox}>
                <Ionicons name="checkmark-circle" size={64} color="green" />
                <Text style={styles.successText}>Delivery Verified</Text>
              </View>
            ) : otpResult === "fail" ? (
              <View style={styles.resultBox}>
                <Ionicons name="close-circle" size={64} color="red" />
                <Text style={styles.failText}>Invalid OTP </Text>
              </View>
            ) : (
              <>
                <Text style={styles.otpTitle}>Enter Delivery OTP</Text>
                <TextInput
                  style={styles.otpInput}
                  placeholder="____"
                  keyboardType="numeric"
                  maxLength={4}
                  value={enteredOtp}
                  onChangeText={setEnteredOtp}
                />
                <Pressable
                  style={styles.verifyButton}
                  onPress={handleVerifyOtp}
                >
                  <Text style={styles.verifyButtonText}>Submit OTP</Text>
                </Pressable>
              </>
            )}
          </View>
        </KeyboardAvoidingView>
      </Modal>

      {/* Cancel Delivery Modal */}
<Modal visible={cancelVisible} animationType="slide" transparent>
  <View style={styles.modalOverlay}>
    <View style={styles.modalContent}>
      <Text style={styles.modalTitle}>Cancel Delivery</Text>

      {/* Reason Dropdown */}
      <Text style={styles.label}>Reason</Text>
      <View style={styles.dropdownWrapper}>
        <Picker
          selectedValue={cancelReason}
          onValueChange={(value) => setCancelReason(value)}
        >
          <Picker.Item label="Select a reason..." value="" />
          <Picker.Item label="Customer not available" value="not_available" />
          <Picker.Item label="Incorrect address" value="wrong_address" />
          <Picker.Item label="Stock unavailable" value="out_of_stock" />
          <Picker.Item label="Other" value="other" />
        </Picker>
      </View>

      {/* Notes */}
      <Text style={styles.label}>Additional Notes</Text>
      <TextInput
        style={styles.input}
        placeholder="Write notes here..."
        value={cancelNotes}
        onChangeText={setCancelNotes}
        multiline
      />

      {/* Buttons */}
      <View style={styles.buttonRow}>
        <Pressable
          style={[styles.button, styles.cancelBtn]}
          onPress={() => setCancelVisible(false)}
        >
          <Text style={styles.cancelText}>Close</Text>
        </Pressable>

        <Pressable
          style={[styles.button, styles.confirmBtn]}
          onPress={handleCancelConfirm}
        >
          <Text style={styles.confirmText}>Confirm Cancel</Text>
        </Pressable>
      </View>
    </View>
  </View>
</Modal>


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
  menuButton: {
    padding: 8,
    borderRadius: 30,
    backgroundColor: "rgba(255,255,255,0.3)",
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
  emptyBox: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginTop: "30%",
  },
  emptyImage: { width: "100%", height: 280, resizeMode: "contain" },
  emptyText: { fontSize: 18, color: "#666", marginTop: 10, fontWeight: "bold" },
  /* Modal */
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.6)",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  modalContent: {
    backgroundColor: COLORS.white,
    padding: 20,
    borderRadius: 20,
    width: "90%",
    maxHeight: "80%",
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  modalTitle: { fontSize: 18, fontWeight: "bold", color: COLORS.textDark },

  detailsBox: {
    backgroundColor: "#f9f9f9",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#ddd",
    padding: 12,
    marginBottom: 20,
  },
  detailRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 6,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  detailLabel: { fontWeight: "600", color: "#333", fontSize: 15 },
  detailValue: { flex: 1, textAlign: "right", color: "#555", fontSize: 15 },

  verifyButton: {
    backgroundColor: COLORS.primary,
    padding: 12,
    borderRadius: 10,
    alignItems: "center",
  },
  verifyButtonText: { color: "white", fontWeight: "700", fontSize: 16 },

  /* OTP Modal */
  otpModal: {
    backgroundColor: COLORS.white,
    padding: 20,
    borderRadius: 20,
    width: "90%",
    alignItems: "center",
  },
  otpTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 15,
    color: COLORS.textDark,
  },
  otpInput: {
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 8,
    padding: 12,
    fontSize: 20,
    width: "60%",
    textAlign: "center",
    letterSpacing: 8,
    marginBottom: 12,
  },
  resultBox: { alignItems: "center" },
  successText: {
    fontSize: 18,
    fontWeight: "600",
    color: "green",
    marginTop: 10,
  },
  failText: { fontSize: 18, fontWeight: "600", color: "red", marginTop: 10 },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    width: "90%",
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 12,
    textAlign: "center",
  },
  label: {
    fontSize: 14,
    marginTop: 8,
    marginBottom: 4,
    fontWeight: "500",
  },
  dropdownWrapper: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    marginBottom: 12,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 8,
    minHeight: 60,
    textAlignVertical: "top",
    marginBottom: 12,
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 12,
  },
  button: {
    flex: 1,
    padding: 12,
    borderRadius: 8,
    marginHorizontal: 5,
    alignItems: "center",
  },
  cancelBtn: {
    backgroundColor: "#E5E7EB",
  },
  confirmBtn: {
    backgroundColor: "#DC2626",
  },
  cancelText: {
    color: "#374151",
    fontWeight: "600",
  },
  confirmText: {
    color: "#fff",
    fontWeight: "700",
  },

});
