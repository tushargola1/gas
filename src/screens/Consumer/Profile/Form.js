import React, { useEffect, useState } from "react";
import { View, Text, Image, TouchableOpacity, Pressable } from "react-native";
import { useFormik } from "formik";
import * as ImagePicker from "expo-image-picker";
import { useUserType } from "../../../hooks/UserTypeContext";
import { COLORS } from "../../../styles/Theme";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import FormInput from "../../../component/FormInput";
import LinearGradientButton from "../../../component/button/LinearGradientButton";

export default function ProfileForm() {
  const { type } = useUserType(); // "consumer" or "delivery"
  const [image, setImage] = useState(null);
  const [sameAsTemp, setSameAsTemp] = useState(false);

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const formik = useFormik({
    initialValues: {
      name: "",
      firmName: "",
      number: "",
      email: "",
      permanentAddress: "",
      addressLine1: "",
      addressLine2: "",
      city: "",
      state: "",
      pincode: "",
      gst: "",
      aadhar: "",
      temp_addressLine1: "",
      temp_addressLine2: "",
      temp_city: "",
      temp_state: "",
      temp_pincode: "",
    },
    onSubmit: (values) => {
      alert("Profile Updated Successfully");
    },
    validateOnChange: false,
    validateOnBlur: false,
  });

  useEffect(() => {
    if (sameAsTemp) {
      formik.setFieldValue("addressLine1", formik.values.temp_addressLine1);
      formik.setFieldValue("addressLine2", formik.values.temp_addressLine2);
      formik.setFieldValue("city", formik.values.temp_city);
      formik.setFieldValue("state", formik.values.temp_state);
      formik.setFieldValue("pincode", formik.values.temp_pincode);
    }
  }, [
    sameAsTemp,
    formik.values.temp_addressLine1,
    formik.values.temp_addressLine2,
    formik.values.temp_city,
    formik.values.temp_state,
    formik.values.temp_pincode,
  ]);

  return (
    <View style={{ marginVertical: 20 }}>
      {/* Profile Image */}
      <TouchableOpacity
        onPress={pickImage}
        style={{ alignSelf: "center", marginBottom: 20 }}
      >
        {image ? (
          <Image source={{ uri: image }} style={styles.profileImage} />
        ) : (
          <View style={styles.placeholderImage}>
            <Text style={{ color: COLORS.textLight }}>+ Add Photo</Text>
          </View>
        )}
      </TouchableOpacity>

      {/* Common Fields */}
      <FormInput
        label="Full Name"
        placeholder="Enter full name"
        value={formik.values.name}
        onChangeText={formik.handleChange("name")}
      />
      <FormInput
        label="Phone Number"
        placeholder="Enter phone number"
        keyboardType="phone-pad"
        value={formik.values.number}
        onChangeText={formik.handleChange("number")}
      />
      <FormInput
        label="Email"
        placeholder="Enter email"
        keyboardType="email-address"
        value={formik.values.email}
        onChangeText={formik.handleChange("email")}
      />

      {/* Consumer-only fields */}
      {type === "consumer" && (
        <>
          <FormInput
            label="Firm Name"
            placeholder="Enter firm name"
            value={formik.values.firmName}
            onChangeText={formik.handleChange("firmName")}
          />
          <FormInput
            label="Permanent Address"
            placeholder="Enter permanent address"
            value={formik.values.permanentAddress}
            onChangeText={formik.handleChange("permanentAddress")}
          />
          <FormInput
            label="Address Line 1"
            placeholder="Street / House No."
            value={formik.values.addressLine1}
            onChangeText={formik.handleChange("addressLine1")}
          />
          <FormInput
            label="Address Line 2"
            placeholder="Floor / Landmark"
            value={formik.values.addressLine2}
            onChangeText={formik.handleChange("addressLine2")}
          />
          <FormInput
            label="City"
            placeholder="Enter city"
            value={formik.values.city}
            onChangeText={formik.handleChange("city")}
          />
          <FormInput
            label="State"
            placeholder="Enter state"
            value={formik.values.state}
            onChangeText={formik.handleChange("state")}
          />
          <FormInput
            label="Pincode"
            placeholder="Enter pincode"
            keyboardType="numeric"
            value={formik.values.pincode}
            onChangeText={formik.handleChange("pincode")}
          />
          <FormInput
            label="GST Number"
            placeholder="Enter GST number"
            value={formik.values.gst}
            onChangeText={formik.handleChange("gst")}
          />
          <FormInput
            label="Aadhar Number"
            placeholder="Enter Aadhar number"
            keyboardType="numeric"
            value={formik.values.aadhar}
            onChangeText={formik.handleChange("aadhar")}
          />
        </>
      )}

      {/* Delivery-only fields */}
    {type === "delivery" && (
  <>
    <Text style={styles.sectionTitle}>Temporary Address</Text>

    <FormInput
      label="Address Line 1"
      placeholder="Street / House No."
      value={formik.values.temp_addressLine1}
      onChangeText={formik.handleChange("temp_addressLine1")}
    />
    <FormInput
      label="Address Line 2"
      placeholder="Floor / Landmark"
      value={formik.values.temp_addressLine2}
      onChangeText={formik.handleChange("temp_addressLine2")}
    />
    <FormInput
      label="City"
      placeholder="Enter city"
      value={formik.values.temp_city}
      onChangeText={formik.handleChange("temp_city")}
    />
    <FormInput
      label="State"
      placeholder="Enter state"
      value={formik.values.temp_state}
      onChangeText={formik.handleChange("temp_state")}
    />
    <FormInput
      label="Pincode"
      placeholder="Enter 6-digit pincode"
      keyboardType="numeric"
      value={formik.values.temp_pincode}
      onChangeText={formik.handleChange("temp_pincode")}
    />

    {/* Checkbox for "Same as Temporary" */}
    <Pressable
      onPress={() => setSameAsTemp((prev) => !prev)}
      style={{
        flexDirection: "row",
        alignItems: "center",
        marginTop: 15,
        marginBottom: 10,
      }}
    >
      <MaterialCommunityIcons
        name={sameAsTemp ? "checkbox-marked" : "checkbox-blank-outline"}
        size={22}
        color={sameAsTemp ? COLORS.primary : "#9ca3af"}
      />
      <Text style={{ marginLeft: 10 }}>Same as Temporary Address</Text>
    </Pressable>

    <Text style={styles.sectionTitle}>Permanent Address</Text>
    <FormInput
      label="Address Line 1"
      placeholder="Street / House No."
      value={formik.values.addressLine1}
      onChangeText={formik.handleChange("addressLine1")}
    />
    <FormInput
      label="Address Line 2"
      placeholder="Floor / Landmark"
      value={formik.values.addressLine2}
      onChangeText={formik.handleChange("addressLine2")}
    />
    <FormInput
      label="City"
      placeholder="Enter city"
      value={formik.values.city}
      onChangeText={formik.handleChange("city")}
    />
    <FormInput
      label="State"
      placeholder="Enter state"
      value={formik.values.state}
      onChangeText={formik.handleChange("state")}
    />
    <FormInput
      label="Pincode"
      placeholder="Enter 6-digit pincode"
      keyboardType="numeric"
      value={formik.values.pincode}
      onChangeText={formik.handleChange("pincode")}
    />
  </>
)}


      <LinearGradientButton
        title="Update Profile"
        onPress={formik.handleSubmit}
        style={{ marginTop: 20 }}
      />
    </View>
  );
}

const styles = {
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 20,
  },
  placeholderImage: {
    width: 150,
    height: 150,
    borderRadius: 20,
    backgroundColor: COLORS.backgroundLight,
    justifyContent: "center",
    alignItems: "center",
  },
  sectionTitle: {
    fontWeight: "bold",
    fontSize: 16,
    marginTop: 20,
    marginBottom: 10,
  },
};
