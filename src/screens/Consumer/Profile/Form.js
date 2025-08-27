import React, { useState } from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { useFormik } from "formik";
import * as Yup from "yup";
import * as ImagePicker from "expo-image-picker";
import { COLORS } from "../../../styles/Theme";
import LinearGradientButton from "../../../component/button/LinearGradientButton";
import FormInput from "../../../component/FormInput";

const validationSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  firmName: Yup.string().required("Firm Name is required"),
  number: Yup.string()
    .matches(/^[0-9]{10}$/, "Enter a valid 10-digit number")
    .required("Phone number is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  permanentAddress: Yup.string().required("Permanent address is required"),
  addressLine1: Yup.string().required("Address Line 1 is required"),
  addressLine2: Yup.string().required("Address Line 2 is required"),
  city: Yup.string().required("City is required"),
  state: Yup.string().required("State is required"),
  pincode: Yup.string()
    .matches(/^[0-9]{6}$/, "Enter a valid 6-digit pincode")
    .required("Pincode is required"),
  gst: Yup.string().required("GST number is required"),
  aadhar: Yup.string()
    .matches(/^[0-9]{12}$/, "Aadhar must be 12 digits")
    .required("Aadhar is required"),
});

export default function Form() {
  const [image, setImage] = useState(null);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
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
    },
    validationSchema,
    validateOnChange: false, // validation only on submit
    validateOnBlur: false,
    onSubmit: (values) => {
      console.log("Form Data: ", values);
      alert("Profile Updated!");
    },
  });

  return (
    <View style={{ marginVertical: 20 }}>
      {/* Profile Image Picker */}
      <TouchableOpacity
        onPress={pickImage}
        style={{ alignSelf: "center", marginBottom: 20 }}
      >
        {image ? (
          <Image source={{ uri: image }} style={styles.profileImage} />
        ) : (
          <View
            style={{
              width: 150,
              height: 150,
              borderRadius: 20,
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: COLORS.backgroundLight,
            }}
          >
            <Text style={{ color: COLORS.textLight }}>+ Add Photo</Text>
          </View>
        )}
      </TouchableOpacity>

      <FormInput
        label="Name"
        placeholder="Enter your full name"
        value={formik.values.name}
        onChangeText={formik.handleChange("name")}
        error={formik.errors.name}
      />

      <FormInput
        label="Firm Name"
        placeholder="Enter your company/firm name"
        value={formik.values.firmName}
        onChangeText={formik.handleChange("firmName")}
        error={formik.errors.firmName}
      />

      <FormInput
        label="Number"
        placeholder="Enter your phone number"
        keyboardType="phone-pad"
        value={formik.values.number}
        onChangeText={formik.handleChange("number")}
        error={formik.errors.number}
      />

      <FormInput
        label="Email"
        placeholder="Enter your email address"
        keyboardType="email-address"
        value={formik.values.email}
        onChangeText={formik.handleChange("email")}
        error={formik.errors.email}
      />

      <FormInput
        label="Permanent Address"
        placeholder="Enter your permanent address"
        value={formik.values.permanentAddress}
        onChangeText={formik.handleChange("permanentAddress")}
        error={formik.errors.permanentAddress}
      />

      <FormInput
        label="Address Line 1"
        placeholder="Enter street, house no., etc."
        value={formik.values.addressLine1}
        onChangeText={formik.handleChange("addressLine1")}
        error={formik.errors.addressLine1}
      />

      <FormInput
        label="Address Line 2"
        placeholder="Enter apartment, floor, landmark, etc."
        value={formik.values.addressLine2}
        onChangeText={formik.handleChange("addressLine2")}
        error={formik.errors.addressLine2}
      />

      <FormInput
        label="City"
        placeholder="Enter your city"
        value={formik.values.city}
        onChangeText={formik.handleChange("city")}
        error={formik.errors.city}
      />

      <FormInput
        label="State"
        placeholder="Enter your state"
        value={formik.values.state}
        onChangeText={formik.handleChange("state")}
        error={formik.errors.state}
      />

      <FormInput
        label="Pincode"
        placeholder="Enter 6-digit pincode"
        keyboardType="numeric"
        value={formik.values.pincode}
        onChangeText={formik.handleChange("pincode")}
        error={formik.errors.pincode}
      />

      <FormInput
        label="GST Number"
        placeholder="Enter your GST number"
        value={formik.values.gst}
        onChangeText={formik.handleChange("gst")}
        error={formik.errors.gst}
      />

      <FormInput
        label="Aadhar Number"
        placeholder="Enter your Aadhar number"
        keyboardType="numeric"
        value={formik.values.aadhar}
        onChangeText={formik.handleChange("aadhar")}
        error={formik.errors.aadhar}
      />

      <LinearGradientButton
        onPress={formik.handleSubmit}
        title="Update Profile"
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
};
