import React ,{useEffect} from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Button,
  TextInput,
  BackHandler
} from "react-native";
import * as yup from "yup";
import { Formik } from "formik";
import commonApi from "../api/common";
const validationSchema = yup.object().shape({
  email: yup
    .string()
    .email("Please Enter the valid Email")
    .required("Email Address is required."),
});
const ResetPasswordScreen = ({ navigation }) => {
  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      () => true
    );
    return () => backHandler.remove();
  }, []);
  const sendOTP=async(data, setFieldError, setSubmitting, actions)=>{
    await commonApi({
      action: "resetPassword",
      data: data,
    })
      .then(async ({ DATA = {} }) => {
       console.log(DATA)
        
        navigation.navigate("VerifyResetPasswordScreen", {
          screen: "VerifyResetPasswordScreen ",
          email:data.email
        })
          actions.resetForm();
        
      })
      .catch((error) => {
        setFieldError(error.DATA, error.MESSAGE);
        setSubmitting(true);
      });

 }
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.mainText}>Reset {"\n"}Password</Text>
        <Image
          style={styles.logo}
          source={require("../assets/reset_password.png")}
        />
      </View>
      <Formik
        initialValues={{
          email: "",
        }}
        validateOnBlur={true}
        validateOnChange={true}
        validateOnMount={true}
        onSubmit={(values, { actions, setFieldError, setSubmitting }) => {
          sendOTP(values, setFieldError, setSubmitting, actions);
        }}
        validationSchema={validationSchema}
      >
        {(props) => (
          <View style={styles.body}>
            <Text style={{ marginTop: 80, marginBottom: 30 }}>
              Enter your email to reset your password
            </Text>
            <View>
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
            </View>

            <View style={styles.buttons}>
              <TouchableOpacity onPress={props.handleSubmit}>
                <View style={styles.done}>
                  <Text style={styles.doneText}>Send One Time Password</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate("LoginScreen", { screen: "LoginScreen" })
                }
              >
                <Text>Already have an account?</Text>
                <Text style={{ color: "#3491ff" }}>Sign In</Text>
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
    marginTop: 35,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",

    // backgroundColor: '#fff',
    // alignItems: 'center',
    //justifyContent: 'center',
  },
  logo: {
    //marginTop: 10,
    // marginLeft:130,
    //marginTop:100,
    height: 227,
    width: 160,
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
    padding: 10,
    marginBottom: 10,
  },

  mainText: {
    color: "black",
    padding: 10,
    fontSize: 24,
    //marginTop: 10,
  },
  buttons: {
    marginTop: 10,
    height: "20%",
    width: "100%",
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
  }
});

export default ResetPasswordScreen;
