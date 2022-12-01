import React, { useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Button,
  TextInput,
  BackHandler,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Formik } from "formik";
import commonApi from "../api/common";
import * as yup from "yup";
import { useSelector } from "react-redux";
const validationSchema = yup.object().shape({
  currentPassword: yup.string().required("Old Password is required"),

  password: yup
    .string()
    .min(8, ({ min }) => `Password must be at least ${min} characters`)
    .required("Password is required")
    .matches(/[0-9]/, "Password requires a number")
    .matches(/[a-z]/, "Password requires a lowercase letter")
    .matches(/[A-Z]/, "Password requires an uppercase letter")
    .matches(/[^\w]/, "Password requires a symbol"),

  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Must match password field value")
    .required("Confirm Password is Required"),
});

const ChangePasswordScreen = ({ navigation }) => {
  const token = useSelector((state) => state.Reducers.token);
  const setPassword = async (data, setFieldError, setSubmitting, actions) => {
    await commonApi({
      action: "changePassword",
      data: {
        currentPassword: data.currentPassword,
        newPassword: data.password,
      },
      config: {
        authToken: token,
      },
    })
      .then(async ({ DATA = {} }) => {
        navigation.navigate("HomeScreen", {
          screen: "HomeScreen",
        })
      })
      .catch((error) => {
        setFieldError("currentPassword", error.MESSAGE);
        setSubmitting(true);
      });
  };

  return (
    <KeyboardAwareScrollView>
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
            currentPassword: "",
            password: "",
            confirmPassword: "",
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
                Old password
              </Text>
              <TextInput
                secureTextEntry={true}
                style={styles.input}
                keyboardType="default"
                onChangeText={props.handleChange("currentPassword")}
                value={props.values.currentPassword}
                onBlur={props.handleBlur("currentPassword")}
              />
              {props.errors.currentPassword &&
                props.touched.currentPassword && (
                  <Text style={styles.errors}>
                    {props.errors.currentPassword}
                  </Text>
                )}
              <Text style={{ marginBottom: 5 }}>Create new password</Text>
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
              {props.errors.confirmPassword &&
                props.touched.confirmPassword && (
                  <Text style={styles.errors}>
                    {props.errors.confirmPassword}
                  </Text>
                )}
              <View style={styles.buttons}>
                {
                  (!(props.isValid && props.dirty))
                  ?
                  (
                    <TouchableOpacity onPress={props.handleSubmit} disabled={true}>
                      <View style={styles.doneDisabled}>
                        <Text style={styles.doneText}>Submit</Text>
                      </View>
                    </TouchableOpacity>
                  )
                  :
                  (
                    <TouchableOpacity onPress={props.handleSubmit} disabled={false}>
                      <View style={styles.done}>
                        <Text style={styles.doneText}>Submit</Text>
                      </View>
                    </TouchableOpacity>
                  )
                }
                
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate("HomeScreen", {
                      screen: "HomeScreen",
                    })
                  }
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
    </KeyboardAwareScrollView>
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
    height: "40%",
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
    height: "60%",
    // marginTop:50,
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
  doneDisabled: {
    marginBottom: 10,
    backgroundColor: "#BABABA",
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

export default ChangePasswordScreen;
