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
const VerifyScreen = ({ navigation, route }) => {
  let { email } = route.params;
  const verify = async (data, setFieldError, setSubmitting) => {
    await commonApi({
      action: "verifyEmailOTP",
      data: { email: email, OTP: data.OTP },
    })
      .then(({ DATA = {} }) => {
        navigation.navigate("LoginScreen", {
          screen: "LoginScreen",
          reset: true,
        });
      })
      .catch((error) => {
        setFieldError("OTP", error.MESSAGE);
        setSubmitting(true);
      });
  };

  const resendOTP = async () => {
    await commonApi({ action: "resendEmailOTP", data: { email: email } })
      .then(({ DATA = {} }) => {
        console.log("Send Successfully");
        // TODO
        // Add the animation for the button to stop
      })
      .catch((error) => {
        console.log("Error in sending the OTP");
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

          // TODO
          // actions.resetForm() ;
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
            <TouchableOpacity onPress={resendOTP}>
            <Text
            style={{
              marginBottom: 20,
              marginTop: 20,
              fontWeight: "500",
              textDecorationLine: "underline",
              textAlign:'center',
            }}
          >
            Send again
          </Text>
          </TouchableOpacity>
            <View style={styles.buttons}>
              <TouchableOpacity onPress={props.handleSubmit}>
                <View style={styles.done}>
                  <Text style={styles.doneText}>SUBMIT</Text>
                </View>
              </TouchableOpacity>

             
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate("LoginScreen", {
                    screen: "LoginScreen",
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
    height: "50%",
  },

  input: {
    // marginTop:10,
    // marginBottom:10,
    backgroundColor: "#BABABA",
    fontWeight: "600",
    fontSize: 18,
    alignSelf: "center",
    padding: 10,
    height: 50,
    width: "12%",
    //margin: 12,
    borderWidth: 0.5,
    borderColor: "grey",
    borderRadius: 10,
    //padding: 10,
    marginBottom: 10,
    justifyContent: "center",
    textAlign: "center",
  },

  mainText: {
    color: "black",
    padding: 10,
    fontSize: 24,
    //marginTop: 10,
  },
  buttons: {
    marginTop: 10,
    height:'20%',
    width:'100%',
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
});

export default VerifyScreen;
