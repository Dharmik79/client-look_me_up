import React, { useState,useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Button,
  TextInput,
  KeyboardAvoidingView,
  BackHandler
} from "react-native";
import * as yup from "yup";
import { Formik } from "formik";
import commonApi from "../api/common";
import { CheckBox } from "react-native-btr";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

const registrationValidationSchema = yup.object().shape({
  firstName: yup.string().required("FirstName is required"),
  lastName: yup.string().required("Last Name is required"),
  phone: yup.string().matches(/^[0-9]{10}$/, "Phone number is not valid"),
  email: yup
    .string()
    .email("Please Enter the valid Email")
    .required("Email Address is required."),
  password: yup
    .string()
    // .min(8, ({ min }) => `Password must be at least ${min} characters`)
    .required("Password is required")
    .matches(/[0-9]/, "Password requires a number"),
  // .matches(/[a-z]/, "Password requires a lowercase letter")
  // .matches(/[A-Z]/, "Password requires an uppercase letter")
  // .matches(/[^\w]/, "Password requires a symbol"),

  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Must match password field value")
    .required("Confirm Password is Required"),
});

const RegisterScreen = ({ navigation }) => {
  const register = async (data, setFieldError, setSubmitting, actions) => {
    await commonApi({
      action: "register",
      data: data,
    })
      .then(({ DATA = {} }) => {
        navigation.navigate("VerifyScreen", {
          screen: "VerifyScreen",
          email: data.email,
        });
        actions.resetForm();
      })
      .catch((error) => {
        setFieldError(error.DATA, error.MESSAGE);
        setSubmitting(true);
      });
  };
  useEffect(() => {
    const backPressed = () => {
      navigation.navigate("OnboardingScreen",{
        screen:"OnboardingScreen"
      })
      return true;
    };
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backPressed
    );
    return () => backHandler.remove();
  }, []);
  return (
    <KeyboardAwareScrollView>
      <View style={styles.container}>
        <View style={styles.header}>
          {/* <Text>Open up App.js to start working on your app!</Text> */}
          <Text style={styles.mainText}>Create {"\n"}Account</Text>
          <Image
            style={styles.logo}
            source={require("../assets/create_account.png")}
          />
        </View>
        <Formik
          initialValues={{
            firstName: "",
            lastName: "",
            phone: "",
            email: "",
            password: "",
            confirmPassword: "",
          }}
          validateOnBlur={true}
          validateOnChange={true}
          validateOnMount={true}
          onSubmit={(values, { actions, setFieldError, setSubmitting }) => {
            let { confirmPassword, ...formValue } = values;
            formValue.phone = {
              countryCode: "+1",
              phone: formValue.phone,
            };
            register(formValue, setFieldError, setSubmitting, actions);
          }}
          validationSchema={registrationValidationSchema}
        >
          {(props) => (
            <View style={styles.body}>
              <Text style={{ marginBottom: 5 }}>First Name</Text>
              <TextInput
                style={styles.input}
                keyboardType="default"
                onChangeText={props.handleChange("firstName")}
                value={props.values.firstName}
                onBlur={props.handleBlur("firstName")}
              />
              {props.errors.firstName && props.touched.firstName && (
                <Text style={styles.errors}>{props.errors.firstName}</Text>
              )}
              <Text style={{ marginBottom: 5 }}>Last Name</Text>
              <TextInput
                style={styles.input}
                keyboardType="default"
                onChangeText={props.handleChange("lastName")}
                value={props.values.lastName}
                onBlur={props.handleBlur("lastName")}
              />
              {props.errors.lastName && props.touched.lastName && (
                <Text style={styles.errors}>{props.errors.lastName}</Text>
              )}

              <Text style={{ marginBottom: 5 }}>Mobile Number</Text>
              <TextInput
                style={styles.input}
                keyboardType="numeric"
                onChangeText={props.handleChange("phone")}
                value={props.values.phone}
                onBlur={props.handleBlur("phone")}
                maxLength={10}
              />
              {props.errors.phone && props.touched.phone && (
                <Text style={styles.errors}>{props.errors.phone}</Text>
              )}

              <Text style={{ marginBottom: 5 }}>Email</Text>
              <TextInput
                style={styles.input}
                keyboardType="default"
                onChangeText={props.handleChange("email")}
                value={props.values.email}
                onBlur={props.handleBlur("email")}
              />
              {props.errors.email && props.touched.email && (
                <Text style={styles.errors}>{props.errors.email}</Text>
              )}

              <Text style={{ marginBottom: 5 }}>Password</Text>
              <TextInput
                style={styles.input}
                keyboardType="default"
                onChangeText={props.handleChange("password")}
                value={props.values.password}
                onBlur={props.handleBlur("password")}
                secureTextEntry
              />
              {props.errors.password && props.touched.password && (
                <Text style={styles.errors}>{props.errors.password}</Text>
              )}

              <Text style={{ marginBottom: 5 }}>Confirm Password</Text>
              <TextInput
                style={styles.input}
                keyboardType="default"
                onChangeText={props.handleChange("confirmPassword")}
                value={props.values.confirmPassword}
                onBlur={props.handleBlur("confirmPassword")}
                secureTextEntry
              />
              {props.errors.confirmPassword &&
                props.touched.confirmPassword && (
                  <Text style={styles.errors}>
                    {props.errors.confirmPassword}
                  </Text>
                )}

              <View style={{ flexDirection: "row" }}>
                <CheckBox checked="true" color="#3491ff" />
                <Text style={{ marginLeft: 5 }}>
                  Agree to terms and conditions
                </Text>
              </View>

              <View style={styles.buttons}>
                <TouchableOpacity onPress={props.handleSubmit}>
                  <View style={styles.signup}>
                    <Text style={styles.signupText}>Create Account</Text>
                  </View>
                </TouchableOpacity>

                {/* <StatusBar style="auto" /> */}
                <Text>Already have an account?</Text>
                <Text
                  style={{ color: "#3491ff" }}
                  onPress={() =>
                    navigation.navigate("LoginScreen", {
                      screen: "LoginScreen",
                    })
                  }
                >
                  Sign In
                </Text>
              </View>
            </View>
          )}
        </Formik>
      </View>
    </KeyboardAwareScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    marginTop: 35,
    flexDirection: "column",
    // justifyContent:'center',
    alignItems: "center",

    // backgroundColor: '#fff',
    // alignItems: 'center',
    // justifyContent: 'center',
  },
  logo: {
    // marginTop:20,
    // marginLeft:130,
    height: 158,
    width: 120,
  },
  header: {
    //backgroundColor: 'skyblue',
    //flex: 1,
    display: "flex",
    flexDirection: "row",
    //  padding: 20,

    //marginTop: 25,
    //height: 300,

    width: "100%",
    height: "20%",
    alignItems: "flex-start",
    //   alignContent:'space-between',
    justifyContent: "space-between",
  },
  errors: {
    // marginTop: 5,
    marginBottom: 5,
    color: "red",
  },
  body: {
    //flex: 5,
    padding: 10,
    width: "100%",
    height: "65%",
  },
  input: {
    height: 40,
    //margin: 12,
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
  },

  mainText: {
    color: "black",
    padding: 10,
    fontSize: 24,
  },
  buttons: {
    //marginTop: 10,
    //flex: 2,
    width: "100%",
    height: "20%",
    padding: 10,
    // backgroundColor: 'red',
  },
  signup: {
    marginBottom: 10,
    backgroundColor: "#3491ff",
    borderRadius: 10,
    padding: 10,
    //height:40,
    //alignContent:'center',
    alignItems: "center",
  },
  signupText: {
    color: "#ffffff",
    fontSize: 16,
  },
});

export default RegisterScreen;
