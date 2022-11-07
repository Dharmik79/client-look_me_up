import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Button,
  TextInput,
} from "react-native";
import * as yup from "yup";
import { Formik } from "formik";
import commonApi from "../api/common";

const loginValidationSchema = yup.object().shape({
  OTP: yup.string().required("OTP is required"),
});

const VerifyScreen = ({ navigation }) => {
  let email = navigation.getParam("email");
  const verify = async (data, setFieldError, setSubmitting) => {
    await commonApi({
      action: "verifyEmailOTP",
      data: { email: email, OTP: data.OTP },
    })
      .then(({ DATA = {} }) => {
        console.log("Home Screen Navigation");
      })
      .catch((error) => {
       
        setFieldError("OTP", error.MESSAGE);
        setSubmitting(true);
      });
  };
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.mainText}>Verify {"\n"}Account</Text>
        <Image
          style={styles.logo}
          source={require("../assets/verify_account.png")}
        />
      </View>
      <Formik
        initialValues={{
          OTP: "",
        }}
        validateOnBlur={true}
        validateOnChange={true}
        validateOnMount={true}
        onSubmit={(values, { actions, setFieldError, setSubmitting }) => {
          verify(values, setFieldError, setSubmitting);
        }}
        validationSchema={loginValidationSchema}
      >
        {(props) => (
          <View style={styles.body}>
            <Text style={{ marginBottom: 5 }}>
              Enter 6 digit OTP send on mobile
            </Text>
            <TextInput
              style={styles.input}
              keyboardType="numeric"
              maxLength={6}
              onChangeText={props.handleChange("OTP")}
              value={props.values.OTP}
              onBlur={props.handleBlur("OTP")}
            />
            {props.errors.OTP && props.touched.OTP && (
              <Text style={styles.errors}>{props.errors.OTP}</Text>
            )}
            <View style={styles.buttons}>
              <TouchableOpacity onPress={props.handleSubmit}>
                <View style={styles.done}>
                  <Text style={styles.doneText}>SUBMIT</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => navigation.navigate("RegisterScreen")}
              >
                <View style={styles.cancel}>
                  <Text style={styles.cancelText}>Cancel</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </Formik>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    marginTop: 40,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",

    // backgroundColor: '#fff',
    // alignItems: 'center',
    //justifyContent: 'center',
  },
  logo: {
    marginTop: 10,
    // marginLeft:130,
    //marginTop:100,
    height: 207,
    width: 140,
    marginRight: 20,
  },
  header: {
    //backgroundColor: 'skyblue',
    //flex: 1,
    // marginTop: '10%',
    width: "100%",
    flexDirection: "row",
    height: "30%",
    //marginTop:100,
    justifyContent: "center",
    //padding: 20,

    //marginTop: 25,
    //height: 300,
    //width: '100%',
    //   alignContent:'space-between',
    justifyContent: "space-between",
    alignContent: "center",
  },
  body: {
    //flex: 5,
    padding: 10,
    width: "100%",
    height: "70%",
  },

  input: {
    height: 40,
    //margin: 12,
    borderWidth: 1,
    borderRadius: 10,
    //padding: 10,
    marginBottom: 10,
  },

  mainText: {
    color: "black",
    padding: 10,
    fontSize: 20,
    //marginTop: 10,
  },
  buttons: {
    marginTop: 10,
    //flex: 2,
    //width: 100,
    //padding: 10,
    // backgroundColor: 'red',
  },
  done: {
    marginBottom: 10,
    backgroundColor: "#3491ff",
    borderRadius: 10,
    padding: 10,
    //height:40,
    //alignContent:'center',
    alignItems: "center",
  },
  doneText: {
    color: "#ffffff",
    fontSize: 16,
  },
  cancel: {
    marginBottom: 10,
    backgroundColor: "#BABABA",
    borderRadius: 10,
    padding: 10,
    //height:40,
    //alignContent:'center',
    alignItems: "center",
  },
  cancelText: {
    color: "#ffffff",
    fontSize: 16,
  },
  errors: {
    // marginTop: 5,
    marginBottom: 5,
    color: "red",
  },
});

export default VerifyScreen;
