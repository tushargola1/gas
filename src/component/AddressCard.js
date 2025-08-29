import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const AddressCard = ({ label, address, landmark, pincode, isDefault, onEdit, onDelete, onSetDefault }) => {
  return (
    <View style={styles.card}>
      {/* Header */}
      <View style={styles.cardHeader}>
        <View style={styles.labelContainer}>
          <Ionicons
            name={label === "home" ? "home-outline" : "business-outline"}
            size={18}
            color={label === "home" ? "green" : "blue"}
          />
          <Text style={styles.label}>{label}</Text>
          {isDefault && (
            <View style={styles.defaultBadge}>
              <Ionicons name="star" size={12} color="#B7791F" />
              <Text style={styles.defaultText}>Default</Text>
            </View>
          )}
        </View>

        <View style={styles.actionIcons}>
          <TouchableOpacity style={styles.iconButton} onPress={onEdit}>
            <Ionicons name="create-outline" size={20} color="#2563eb" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton} onPress={onDelete}>
            <Ionicons name="trash-outline" size={20} color="#dc2626" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Address Details */}
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

      {/* Set Default */}
      {!isDefault && (
        <View style={styles.footer}>
          <TouchableOpacity onPress={onSetDefault}>
            <Text style={styles.setDefaultText}>Set as Default</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default AddressCard;

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 3,
    elevation: 2,
    borderWidth: 1,
    borderColor: "#f1f1f1",
  },
  cardHeader: { flexDirection: "row", justifyContent: "space-between", marginBottom: 10 },
  labelContainer: { flexDirection: "row", alignItems: "center" },
  label: { fontWeight: "bold", color: "#111827", marginLeft: 6, fontSize: 15 },
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

  actionIcons: { flexDirection: "row" },
  iconButton: { padding: 6, borderRadius: 8 },

  addressText: { color: "#374151", marginBottom: 4 },
  subText: { color: "#6b7280", fontSize: 13, marginBottom: 2 },
  bold: { fontWeight: "bold" },

  footer: { borderTopWidth: 1, borderTopColor: "#f3f4f6", marginTop: 8, paddingTop: 8 },
  setDefaultText: { color: "#2563eb", fontSize: 13, fontWeight: "600" },
});
