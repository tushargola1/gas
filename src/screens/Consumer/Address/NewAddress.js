import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  ScrollView,
  TextInput,
  Platform,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import * as Animatable from "react-native-animatable";
import { StatusBar } from "expo-status-bar";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useFormik } from "formik";
import * as Yup from "yup";
import { COLORS, gaps } from "../../../styles/Theme";
import SmallSideButton from "../../../component/button/SmallSideButton";
import LinearGradientButton from "../../../component/button/LinearGradientButton";
import FormInput from "../../../component/FormInput";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import Entypo from '@expo/vector-icons/Entypo';
const validationSchema = Yup.object().shape({
  mobile: Yup.string()
    .matches(/^[0-9]{10}$/, "Enter a valid 10-digit number")
    .required("Mobile number is required"),
  addressLabel: Yup.string().required("Address name is required"),
  addressLine1: Yup.string().required("Address Line 1 is required"),
  addressLine2: Yup.string().required("Address Line 2 is required"),
  city: Yup.string().required("City is required"),
  state: Yup.string().required("State is required"),
  pincode: Yup.string()
    .matches(/^[0-9]{6}$/, "Enter a valid 6-digit pincode")
    .required("Pincode is required"),
});

export default function NewAddress({ navigation }) {
  const insets = useSafeAreaInsets();

  const formik = useFormik({
    initialValues: {
      mobile: "",
      addressLabel: "",
      addressLine1: "",
      addressLine2: "",
      city: "",
      state: "",
      pincode: "",
    },
    validationSchema,
    validateOnChange: false, // validation only on submit
    validateOnBlur: false,
    onSubmit: (values) => {
      console.log("New Address Data:", values);
      alert("Address Submitted!");
    },
  });

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
        <Pressable onPress={() => navigation.goBack()} style={styles.menuButton}>
          <Ionicons name="arrow-back" size={24} color="white" />
        </Pressable>
        <View style={styles.headerTitleWrapper}>
          <Text style={styles.headerTitle}>Add Address</Text>
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
        <KeyboardAwareScrollView
                 enableOnAndroid
                 extraScrollHeight={Platform.OS === "ios" ? 50 : 80}
                 keyboardShouldPersistTaps="handled"
                 contentContainerStyle={styles.scrollContent}
                 showsVerticalScrollIndicator={false}
                 style={{ marginVertical: 20 }}
           
               >
             <View style={{ flex: 1, alignItems: "flex-end", marginBottom: 16 }}>
            <SmallSideButton
              title="All Addresses"
              onPress={() => navigation.navigate("AddressMain")}
              icon={
                <Entypo 
                  name="list"
                  size={20}
                  color="white"
                  style={{ fontWeight: "700" }}
                />
              }
            />
          </View>
          <FormInput
            label="Mobile"
            placeholder="Enter your mobile number"
            keyboardType="phone-pad"
            value={formik.values.mobile}
            onChangeText={formik.handleChange("mobile")}
            error={formik.errors.mobile}
          />

          <FormInput
            label="Address Name"
            placeholder="Home / Office"
            value={formik.values.addressLabel}
            onChangeText={formik.handleChange("addressLabel")}
            error={formik.errors.addressLabel}
          />

          <FormInput
            label="Address Line 1"
            placeholder="Street, House No., etc."
            value={formik.values.addressLine1}
            onChangeText={formik.handleChange("addressLine1")}
            error={formik.errors.addressLine1}
          />

          <FormInput
            label="Address Line 2"
            placeholder="Apartment, Floor, Landmark, etc."
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

          <LinearGradientButton
            onPress={formik.handleSubmit}
            title="Submit Address"
          />
        </KeyboardAwareScrollView>
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
    scrollContent: {
    paddingBottom: 10,
  },
});
