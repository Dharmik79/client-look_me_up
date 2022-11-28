import React,{useEffect} from "react";
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
import { Formik } from "formik";
import commonApi from "../api/common";
import * as yup from "yup";
const validationSchema = yup.object().shape({

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

const NewPasswordScreen = ({ navigation ,route}) => {
  let {email,OTP} = route.params;

  const setPassword = async (data, setFieldError, setSubmitting, actions) => {
    await commonApi({
      action: "resetOTPpassword",
      data: {
        email:email,
        OTP:OTP,
        password:data.password
      },
    })
      .then(async ({ DATA = {} }) => {
    
          navigation.navigate("AuthScreen", {
            screen: "LoginScreen",
          });
          actions.resetForm();
      
      })
      .catch((error) => {
        setFieldError(error.DATA, error.MESSAGE);
        setSubmitting(true);
      });
  };

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      () => true
    );
    return () => backHandler.remove();
  }, []);
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.mainText}>Choose new {"\n"}Password</Text>
        <Image
          style={styles.logo}
          source={require("../assets/new_password.png")}
        />
      </View>
      <Formik
      initialValues={{
        password: "",
        confirmPassword:""
      }}
      validateOnBlur={true}
      validateOnChange={true}
      validateOnMount={true}
      onSubmit={(values, { actions, setFieldError, setSubmitting }) => {
        setPassword(values, setFieldError, setSubmitting, actions);
      }}
      validationSchema={validationSchema}
    >
      {(props) => (
      <View style={styles.body}>
        <Text style={{ marginTop: 80, marginBottom: 5 }}>
          Create new password
        </Text>

        <TextInput
          secureTextEntry={true}
          style={styles.input}
          keyboardType="default"

          onChangeText={props.handleChange("password")}
          value={props.values.password}
          onBlur={props.handleBlur("password")}
        />
        {props.errors.password && props.touched.password && (
          <Text style={styles.errors}>{props.errors.password}</Text>
        )}
        <Text style={{ marginBottom: 5 }}>Confirm password</Text>

        <TextInput
          secureTextEntry={true}
          style={styles.input}
          keyboardType="default"
          onChangeText={props.handleChange("confirmPassword")}
          value={props.values.confirmPassword}
          onBlur={props.handleBlur("confirmPassword")}
        />
        {props.errors.confirmPassword && props.touched.confirmPassword && (
          <Text style={styles.errors}>{props.errors.confirmPassword}</Text>
        )}
      <View style={styles.buttons}>
        <TouchableOpacity onPress={props.handleSubmit}>
          <View style={styles.done} >
            <Text style={styles.doneText}>Submit</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("AuthScreen", {
              screen: "ResetPasswordScreen",
            });
          }}
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
    marginTop: 35,
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
    height: 242,
    width: 200,
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
    height: "50%",
  },

  input: {
    // backgroundColor: "#BABABA",
    // fontSize: 18,
    // alignSelf: "center",
    // padding: 10,
    // width: "100%",
    // borderWidth: 0.5,
    // borderColor: "grey",
    // borderRadius: 10,

    // marginBottom: 10,
    // justifyContent: "center",

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
    padding: 10,
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

export default NewPasswordScreen;
