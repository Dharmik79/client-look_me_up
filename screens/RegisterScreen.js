import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Button,
  TextInput,
  KeyboardAvoidingView,
} from "react-native";
import { CheckBox } from "react-native-btr";
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';


const RegisterScreen = ({ navigation }) => {
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
      <View style={styles.body}>
        <Text style={{ marginBottom: 5 }}>Full Name</Text>
        <TextInput style={styles.input} keyboardType="default" />
        <Text style={styles.errors}>Name cannot be left empty</Text>
        <Text style={{ marginBottom: 5 }}>Mobile Number</Text>
        <TextInput style={styles.input} keyboardType="numeric" />
        <Text style={styles.errors}>Mobile Number already registered</Text>
        <Text style={{ marginBottom: 5 }}>Email</Text>
        <TextInput style={styles.input} keyboardType="default" />
        <Text style={styles.errors}>Email already exists</Text>
        <Text style={{ marginBottom: 5 }}>Password</Text>
        <TextInput style={styles.input} secureTextEntry={true} keyboardType="default" />
        <Text style={styles.errors}>Passwords dont match</Text>
        <Text style={{ marginBottom: 5 }}>Confirm Password</Text>
        <TextInput style={styles.input} secureTextEntry={true} keyboardType="default" />
        <Text style={styles.errors}>Passwords dont match</Text>
        <View style={{flexDirection:'row'}}>
            <CheckBox
            checked='true'
            color="#3491ff"/>
          <Text style={{marginLeft:5}}>Agree to terms and conditions</Text>
        </View>
      </View>

      <View style={styles.buttons}>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("VerifyScreen", { screen: "VerifyScreen" })
          }
        >
          <View style={styles.signup}>
            <Text style={styles.signupText}>Create Account</Text>
          </View>
        </TouchableOpacity>

        {/* <StatusBar style="auto" /> */}
        <Text>Already have an account?</Text>
        <Text
          style={{ color: "#3491ff" }}
          onPress={() =>
            navigation.navigate("LoginScreen", { screen: "LoginScreen" })
          }
        >
          Sign In
        </Text>
      </View>
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
