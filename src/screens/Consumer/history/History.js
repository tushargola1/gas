import React, { useState, useMemo } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Pressable,
  Modal,
  SafeAreaView,
  ScrollView,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import * as Animatable from "react-native-animatable";
import { StatusBar } from "expo-status-bar";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { COLORS, gaps } from "../../../styles/Theme";
import SmallSideButton from "../../../component/button/SmallSideButton";

/* ================== MOCK DATA ================== */
const STATUS_TABS = [
  { key: "all", label: "All Bookings" },
  { key: "confirmed", label: "Confirmed" },
  { key: "pending", label: "Pending" },
  { key: "cancel", label: "Cancel" },
  { key: "out_for_delivery", label: "Out for Delivery" },
  { key: "completed", label: "Completed" },
];

const STATUS_COLORS = {
  confirmed: { bg: "#E0F2FE", text: "#0284C7" },
  pending: { bg: "#FEF3C7", text: "#B45309" },
  cancel: { bg: "#FEE2E2", text: "#B91C1C" },
  out_for_delivery: { bg: "#D1FAE5", text: "#065F46" },
  completed: { bg: "#DBEAFE", text: "#1D4ED8" },
};

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

/* ================== COMPONENT ================== */
export default function History({ navigation }) {
  const insets = useSafeAreaInsets();
  const [activeStatus, setActiveStatus] = useState("all");
  const [selectedOrder, setSelectedOrder] = useState(null);

  const filteredOrders = useMemo(() => {
    return activeStatus === "all"
      ? MOCK_ORDERS
      : MOCK_ORDERS.filter((o) => o.status === activeStatus);
  }, [activeStatus]);

  const renderOrder = ({ item }) => {
    const statusColor = STATUS_COLORS[item.status] || {
      bg: "#E5E7EB",
      text: "#374151",
    };

    return (
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <View
            style={[styles.statusBadge, { backgroundColor: statusColor.bg }]}
          >
            <Text style={[styles.statusText, { color: statusColor.text }]}>
              {item.status.replace(/_/g, " ").toUpperCase()}
            </Text>
          </View>
          <Text style={styles.orderId}>{item.orderId}</Text>
        </View>

        <Text style={styles.cylinderText}>
          Cylinder: {item.cylinder} | {item.price.toFixed(2)} {item.quantity}{" "}
          {item.total}
        </Text>

        <Text style={styles.addressText}>{item.address}</Text>

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

        <View style={styles.buttonRow}>
          <Pressable
            style={[
              styles.button,
              {
                backgroundColor: COLORS.primary,
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
              },
            ]}
            onPress={() => setSelectedOrder(item)}
          >
            <FontAwesome name="eye" size={20} color="white" />
            <Text style={[styles.buttonText, { marginLeft: 8 }]}>
              View Details
            </Text>
          </Pressable>

          <Pressable
            style={[
              styles.button,
              {
                backgroundColor: COLORS.white,
                borderWidth: 1,
                borderColor: COLORS.primary,
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
              },
            ]}
            onPress={() => alert("Invoice clicked")}
          >
            <FontAwesome name="download" size={20} color={COLORS.primary} />
            <Text
              style={[
                styles.buttonText,
                {
                  color: COLORS.primary,
                  marginLeft: 8,
                  fontWeight: "700",
                  fontSize: 15,
                },
              ]}
            >
              Invoice
            </Text>
          </Pressable>
        </View>
      </View>
    );
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
          <Text style={styles.headerTitle}>Booking History</Text>
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
        <View style={{ alignItems: "flex-end", marginTop: 15 }}>
          <SmallSideButton
            title="New Booking"
            onPress={() => navigation.navigate("newAddress")}
            icon={
              <Ionicons
                name="add-outline"
                size={18}
                color="white"
                style={{ fontWeight: "700" }}
              />
            }
          />
        </View>
        <FlatList
          data={filteredOrders}
          keyExtractor={(item) => item.id}
          renderItem={renderOrder}
          contentContainerStyle={{ paddingBottom: 50 }}
          ListHeaderComponent={
            <>
              {/* STATUS FILTERS */}
              <FlatList
                data={STATUS_TABS}
                horizontal
                showsHorizontalScrollIndicator={false}
                keyExtractor={(item) => item.key}
                contentContainerStyle={{
                  paddingHorizontal: 12,
                  paddingVertical: 20,
                }}
                renderItem={({ item }) => (
                  <Pressable
                    onPress={() => setActiveStatus(item.key)}
                    style={[
                      styles.tab,
                      activeStatus === item.key && {
                        backgroundColor: COLORS.primary,
                      },
                    ]}
                  >
                    <Text
                      style={[
                        styles.tabText,
                        activeStatus === item.key && {
                          color: COLORS.white,
                          fontWeight: "600",
                        },
                      ]}
                    >
                      {item.label}
                    </Text>
                  </Pressable>
                )}
              />

              {/* Show "No Bookings Found" if empty */}
              {filteredOrders.length === 0 && (
                <View style={styles.emptyContainer}>
                  <Text style={styles.emptyText}>No Bookings Found</Text>
                </View>
              )}
            </>
          }
          // Only show orders if there are any
          ListEmptyComponent={null}
        />
      </Animatable.View>

      {/* MODAL */}
      <Modal
        visible={!!selectedOrder}
        transparent
        animationType="slide"
        onRequestClose={() => setSelectedOrder(null)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>
                Booking: {selectedOrder?.orderId}
              </Text>
              <Pressable onPress={() => setSelectedOrder(null)}>
                <Ionicons name="close" size={24} color={COLORS.textDark} />
              </Pressable>
            </View>

            {selectedOrder && (
              <View>
                {/* Booking Timeline */}
                {selectedOrder.history.map((h, idx) => {
                  const color =
                    STATUS_COLORS[h.status.toLowerCase()]?.text ||
                    COLORS.textDark;
                  return (
                    <View key={idx} style={styles.timelineItem}>
                      <Text style={[styles.timelineStatus, { color }]}>
                        {h.status}
                      </Text>
                      <Text style={styles.timelineMessage}>{h.message}</Text>
                      <Text style={styles.timelineUser}>
                        {h.user} at {h.time}
                      </Text>
                    </View>
                  );
                })}

                {/* Buttons */}
                <View style={styles.modalButtonRow}>
                  <Pressable
                    style={[
                      styles.button,
                      {
                        backgroundColor: COLORS.primary,
                        borderWidth: 1,
                        borderColor: COLORS.primary,
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "center",
                      },
                    ]}
                    onPress={() => alert("Invoice clicked")}
                  >
                    <FontAwesome
                      name="download"
                      size={20}
                      color={COLORS.white}
                    />
                    <Text
                      style={[
                        styles.buttonText,
                        {
                          color: COLORS.white,
                          marginLeft: 8,
                          fontWeight: "700",
                          fontSize: 16,
                        },
                      ]}
                    >
                      Invoice
                    </Text>
                  </Pressable>
                </View>
              </View>
            )}
          </View>
        </View>
      </Modal>
    </LinearGradient>
  );
}

/* ================== STYLES ================== */
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

  tab: {
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: COLORS.border,
    marginRight: 8,
    backgroundColor: COLORS.white,
  },
  tabText: { color: COLORS.textLight },

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
  },
  buttonText: { color: COLORS.white, fontWeight: "bold" },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 50,
  },
  emptyText: { fontSize: 18, fontWeight: "bold", color: COLORS.textLight },

  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "flex-end",
  },
  modalContent: {
    backgroundColor: COLORS.white,
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  modalTitle: { fontSize: 18, fontWeight: "bold", color: COLORS.textDark },
  timelineItem: {
    marginBottom: 12,
    paddingBottom: 6,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  timelineStatus: { fontWeight: "bold", fontSize: 14 },
  timelineMessage: { color: COLORS.textDark, marginTop: 2 },
  timelineUser: { fontSize: 12, color: COLORS.textLight, marginTop: 2 },
  modalButtonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    flexWrap: "wrap",
    marginTop: 12,
  },
});
