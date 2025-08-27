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
import { Ionicons } from "@expo/vector-icons";

/* ================== THEME & MOCK DATA ================== */
const COLORS = {
  primary: "#004699",
  green: "#16A34A",
  yellow: "#FACC15",
  orange: "#F97316",
  lightGray: "#F3F4F6",
  border: "#E5E7EB",
  white: "#FFFFFF",
  textDark: "#1F2937",
  textLight: "#6B7280",
};

const MOCK_ORDERS = [
  {
    id: "1",
    orderId: "ORD-2025-001",
    consumerName: "Aman Sharma",
    deliveryType: "bulk",
    quantity: 10,
    capacity: "20L",
    address: "221B Baker Street, Kolkata",
    deliveryDate: "2025-08-27T10:00:00",
    deliveredAt: "2025-08-27T11:30:00",
    totalAmount: 5600,
    status: "delivered",
  },
  {
    id: "2",
    orderId: "ORD-2025-002",
    consumerName: "Priya Verma",
    deliveryType: "normal",
    quantity: 2,
    capacity: "12L",
    address: "Sector 62, Noida",
    deliveryDate: "2025-08-26T14:00:00",
    deliveredAt: "2025-08-26T15:00:00",
    totalAmount: 800,
    status: "delivered",
  },
];

/* ================== COMPONENT ================== */
export default function DeliveryHistory() {
  const [selectedOrder, setSelectedOrder] = useState(null);

  const stats = {
    totalDeliveries: MOCK_ORDERS.length,
    totalEarnings: MOCK_ORDERS.reduce((sum, o) => sum + o.totalAmount * 0.1, 0),
    avgRating: 4.8,
  };

  const getDeliveryTypeColor = (type) => {
    return type === "bulk"
      ? { bg: "#DBEAFE", text: "#1D4ED8" }
      : { bg: "#DCFCE7", text: "#166534" };
  };

  const renderOrder = ({ item }) => {
    const typeColors = getDeliveryTypeColor(item.deliveryType);

    return (
      <Pressable
        style={styles.card}
        onPress={() => setSelectedOrder(item)}
      >
        {/* Header */}
        <View style={styles.cardHeader}>
          <Text style={styles.orderId}>{item.orderId}</Text>
          <View style={styles.headerRight}>
            <Text style={[styles.typePill, { backgroundColor: typeColors.bg, color: typeColors.text }]}>
              {item.deliveryType.toUpperCase()}
            </Text>
            <Text style={[styles.typePill, { backgroundColor: "#DCFCE7", color: COLORS.green }]}>
              DELIVERED
            </Text>
          </View>
        </View>

        {/* Customer Info */}
        <Text style={styles.consumerName}>{item.consumerName}</Text>
        <Text style={styles.address}>{item.address}</Text>

        {/* Delivery Details */}
        <View style={styles.detailsRow}>
          <View>
            <Text style={styles.detailLabel}>Quantity</Text>
            <Text style={styles.detailValue}>{item.quantity} units</Text>
          </View>
          <View>
            <Text style={styles.detailLabel}>Capacity</Text>
            <Text style={styles.detailValue}>{item.capacity}</Text>
          </View>
          <View>
            <Text style={styles.detailLabel}>Earnings</Text>
            <Text style={[styles.detailValue, { color: COLORS.green }]}>
              ₹{(item.totalAmount * 0.1).toLocaleString()}
            </Text>
          </View>
          <View>
            <Text style={styles.detailLabel}>Delivered</Text>
            <Text style={styles.detailValue}>
              {new Date(item.deliveredAt).toLocaleDateString("en-IN", { day: "numeric", month: "short" })}
            </Text>
          </View>
        </View>
      </Pressable>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        {/* Header */}
        <Text style={styles.title}>Delivery History</Text>

        {/* Stats */}
        <View style={styles.statsContainer}>
          <View style={styles.statCard}>
            <Text style={[styles.statNumber, { color: COLORS.orange }]}>{stats.totalDeliveries}</Text>
            <Text style={styles.statLabel}>Deliveries</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={[styles.statNumber, { color: COLORS.green }]}>
              ₹{stats.totalEarnings.toLocaleString()}
            </Text>
            <Text style={styles.statLabel}>Earnings</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={[styles.statNumber, { color: COLORS.yellow }]}>{stats.avgRating}</Text>
            <Text style={styles.statLabel}>Rating</Text>
          </View>
        </View>

        {/* Orders */}
        <FlatList
          data={MOCK_ORDERS}
          keyExtractor={(item) => item.id}
          renderItem={renderOrder}
          contentContainerStyle={{ paddingBottom: 50 }}
        />
      </ScrollView>

      {/* Modal */}
      {selectedOrder && (
        <Modal
          visible={!!selectedOrder}
          transparent
          animationType="slide"
          onRequestClose={() => setSelectedOrder(null)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <View style={styles.modalHeader}>
                <Text style={styles.modalTitle}>Delivery Details</Text>
                <Pressable onPress={() => setSelectedOrder(null)}>
                  <Ionicons name="close" size={24} color={COLORS.textDark} />
                </Pressable>
              </View>
              <Text>Order ID: {selectedOrder.orderId}</Text>
              <Text>Customer: {selectedOrder.consumerName}</Text>
              <Text>Address: {selectedOrder.address}</Text>
              <Text>Quantity: {selectedOrder.quantity}</Text>
              <Text>Capacity: {selectedOrder.capacity}</Text>
              <Text>Earnings: ₹{(selectedOrder.totalAmount * 0.1).toLocaleString()}</Text>
              <Text>Status: {selectedOrder.status}</Text>
            </View>
          </View>
        </Modal>
      )}
    </SafeAreaView>
  );
}

/* ================== STYLES ================== */
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.lightGray, padding: 12 },
  title: { fontSize: 22, fontWeight: "bold", marginBottom: 12, color: COLORS.textDark },

  statsContainer: { flexDirection: "row", justifyContent: "space-between", marginBottom: 16 },
  statCard: { flex: 1, backgroundColor: COLORS.white, marginHorizontal: 4, padding: 12, borderRadius: 12, alignItems: "center" },
  statNumber: { fontSize: 18, fontWeight: "bold" },
  statLabel: { fontSize: 12, color: COLORS.textLight, marginTop: 4 },

  card: { backgroundColor: COLORS.white, padding: 12, borderRadius: 12, marginBottom: 12, borderWidth: 1, borderColor: COLORS.border },
  cardHeader: { flexDirection: "row", justifyContent: "space-between", marginBottom: 8 },
  orderId: { fontWeight: "bold", fontSize: 16, color: COLORS.textDark },
  headerRight: { flexDirection: "row", alignItems: "center" },
  typePill: { fontSize: 12, fontWeight: "600", paddingHorizontal: 8, paddingVertical: 2, borderRadius: 12, marginLeft: 4 },

  consumerName: { fontSize: 14, fontWeight: "600", marginBottom: 2, color: COLORS.textDark },
  address: { fontSize: 12, color: COLORS.textLight, marginBottom: 8 },

  detailsRow: { flexDirection: "row", justifyContent: "space-between", flexWrap: "wrap" },
  detailLabel: { fontSize: 10, color: COLORS.textLight },
  detailValue: { fontSize: 12, fontWeight: "600" },

  modalOverlay: { flex: 1, backgroundColor: "rgba(0,0,0,0.5)", justifyContent: "flex-end" },
  modalContent: { backgroundColor: COLORS.white, padding: 20, borderTopLeftRadius: 20, borderTopRightRadius: 20 },
  modalHeader: { flexDirection: "row", justifyContent: "space-between", marginBottom: 16 },
  modalTitle: { fontSize: 18, fontWeight: "bold", color: COLORS.textDark },
});
