import React from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useRoute } from "@react-navigation/native"; // ✅ import route
import { COLORS } from "../styles/Theme";

const STATUS_COLORS = {
  confirmed: { bg: "#E0F2FE", text: "#0284C7" },
  pending: { bg: "#FEF3C7", text: "#B45309" },
  cancel: { bg: "#FEE2E2", text: "#B91C1C" },
  out_for_delivery: { bg: "#D1FAE5", text: "#065F46" },
  completed: { bg: "#DBEAFE", text: "#1D4ED8" },
};

export default function HistoryCard({ item, onView, onInvoice, type }) {
  const route = useRoute(); // ✅ get current route
  const statusColor = STATUS_COLORS[item.status] || {
    bg: "#E5E7EB",
    text: "#374151",
  };

  return (
    <View style={styles.card}>
      {/* Status & Order ID */}
      <View style={styles.cardHeader}>
        <View style={[styles.statusBadge, { backgroundColor: statusColor.bg }]}>
          <Text style={[styles.statusText, { color: statusColor.text }]}>
            {item.status.replace(/_/g, " ").toUpperCase()}
          </Text>
        </View>
        <Text style={styles.orderId}>{item.orderId}</Text>
      </View>

      {/* Cylinder Info */}
      <Text style={styles.cylinderText}>
        Cylinder: {item.cylinder} | ₹{item.price.toFixed(2)} × {item.quantity} =
        ₹{item.total}
      </Text>

      {/* Address */}
      <Text style={styles.addressText}>{item.address}</Text>

      {/* Note + Date */}
      <View style={styles.row}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <MaterialIcons
            name="speaker-notes"
            size={14}
            color={COLORS.textLight}
          />
          <Text style={[styles.noteText, { marginLeft: 5 }]}>
            {item.bookingNote}
          </Text>
        </View>
        <Text style={styles.dateText}>
          {new Date(item.deliveryDate).toLocaleDateString("en-IN", {
            day: "numeric",
            month: "short",
            year: "numeric",
          })}{" "}
          {new Date(item.deliveryDate).toLocaleTimeString("en-IN", {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </Text>
      </View>

      {/* ✅ Show actions only if NOT on dashboard */}
      {route.name !== "dashboard" && (
        <View style={styles.buttonRow}>
          <Pressable
            style={[styles.button, styles.viewBtn]}
            onPress={() => onView(item)}
          >
            <FontAwesome name="eye" size={20} color="white" />
            <Text
              style={[
                styles.buttonText,
                { marginLeft: 8, color: COLORS.white },
              ]}
            >
              View Details
            </Text>
          </Pressable>
          {type === "consumer" ? (
            <>
              <Pressable
                style={[styles.button, styles.invoiceBtn]}
                onPress={() => onInvoice(item)}
              >
                <FontAwesome name="download" size={20} color={COLORS.primary} />
                <Text style={[styles.buttonText, styles.invoiceText]}>
                  Invoice
                </Text>
              </Pressable>
            </>
          ) : (
            <></>
          )}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.white,
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 6,
  },
  statusBadge: { paddingHorizontal: 8, paddingVertical: 2, borderRadius: 12 },
  statusText: { fontWeight: "600", fontSize: 12 },
  orderId: { fontWeight: "bold" },
  cylinderText: { fontWeight: "600", marginBottom: 4 },
  addressText: { fontSize: 14, color: COLORS.textLight, marginBottom: 6 },
  noteText: { fontSize: 13, color: COLORS.textLight },
  dateText: { fontSize: 12, color: COLORS.textDark },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    flexWrap: "wrap",
  },
  button: {
    flex: 1,
    padding: 10,
    borderRadius: 8,
    alignItems: "center",
    marginHorizontal: 4,
    flexDirection: "row",
    justifyContent: "center",
  },
  buttonText: { fontWeight: "bold" },
  viewBtn: {
    backgroundColor: COLORS.primary,
  },
  invoiceBtn: {
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.primary,
  },
  invoiceText: {
    color: COLORS.primary,
    fontWeight: "700",
    fontSize: 15,
    marginLeft: 8,
  },
});
