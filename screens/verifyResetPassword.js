import React, { useEffect, useState } from "react";
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
import * as yup from "yup";
import { Formik } from "formik";
import commonApi from "../api/common";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

const loginValidationSchema = yup.object().shape({
  OTP: yup.string().min(6).required("OTP is required"),
});
const VerifyResetScreen = ({ navigation, route }) => {
  let { email } = route.params;
  const verify = async (data, setFieldError, setSubmitting) => {
    await commonApi({
      action: "verifyResetPassword",
      data: { email: email, OTP: data.OTP },
    })
      .then(({ DATA = {} }) => {
        navigation.navigate("NewPasswordScreen", {
          screen: "NewPasswordScreen",
          email: email,
          OTP: data.OTP,
        });
      })
      .catch((error) => {
        setFieldError("OTP", error.MESSAGE);
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
  const resendOTP = async () => {
    await commonApi({ action: "resetPassword", data: { email: email } })
      .then(({ DATA = {} }) => {
        console.log("Send Successfully");
        // TODO
        // Add the animation for the button to stop
      })
      .catch((error) => {
        console.log(error);
        console.log("Error in sending the OTP");
      });
  };

  let clockCall = null
  const defaultCountdown = 60;
  const [countdown, setCountdown] = useState(defaultCountdown);
  const [enableResend,setEnableResend] = useState(false)
  useEffect(() => {
    clockCall = setInterval(() => {
      decrementClock();
    }, 1000);
    return () => {
      clearInterval(clockCall);
    };
  })


  const decrementClock = () => {
    if (countdown === 0) {
      setEnableResend(true);
      setCountdown(0);
      clearInterval(clockCall);
    } else {
      setCountdown(countdown - 1);
    }
  };

  const onResendOTP = () => {
    if (enableResend){
      setCountdown(defaultCountdown)
      setEnableResend(false)
      clearInterval(clockCall)
      clockCall = setInterval (()=> {
        decrementClock(0)
      },1000)
    }
  }

  return (
    <KeyboardAwareScrollView>
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.mainText}>Verify{"\n"}Account</Text>
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
              Enter 6 digit OTP sent on mobile
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

              {countdown!=0 && ( <TouchableOpacity 
              //onPress={resendOTP}
              onPress={onResendOTP}
              disabled={countdown!=0}
              >
                <View style={styles.done1}>
                  <Text style={styles.doneText}>
                    Resend OTP in {countdown} seconds
                  </Text>
                </View>
              </TouchableOpacity>
              )}
              {countdown == 0 && ( <TouchableOpacity 
              //onPress={resendOTP}
              onPress={onResendOTP}
             // disabled={countdown!=0}
              >
                <View style={styles.done}>
                  <Text style={styles.doneText}>
                    Resend OTP
                  </Text>
                </View>
              </TouchableOpacity>
              )}
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
    </KeyboardAwareScrollView>
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
  doneDisabled: {
    marginBottom: 10,
    backgroundColor: "#BABABA",
    borderRadius: 10,
    padding: 10,
    //height:40,
    //alignContent:'center',
    alignItems: "center",
  },
  done1: {
    marginBottom: 10,
    backgroundColor: "#bababa",
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

export default VerifyResetScreen;
