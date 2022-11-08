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

const ResetPasswordScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        {/* <Text>Open up App.js to start working on your app!</Text> */}
        <Text style={styles.mainText}>Reset {"\n"}Password</Text>
        <Image
          style={styles.logo}
          source={require("../assets/reset_password.png")}
        />
      </View>
      <View style={styles.body}>
        <Text style={{ marginTop: 80, marginBottom: 30 }}>
          Enter your email to reset your password
        </Text>
        <View>
          <TextInput
            style={styles.input}
            keyboardType="default"
           
          />

        </View>
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
      </View>
      <View style={styles.buttons}>
        <TouchableOpacity onPress={() =>
            navigation.navigate("NewPasswordScreen", { screen: "NewPasswordScreen" })
          }>
          <View style={styles.done} onPress={""}>
            <Text style={styles.doneText}>Send One Time Password</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("LoginScreen", { screen: "LoginScreen" })
          }
        >
           <Text>Already have an account?</Text>
                    <Text style={{ color: '#3491ff' }} onPress={() => navigation.navigate('LoginScreen', { screen: 'LoginScreen' })}>Sign In</Text>
        </TouchableOpacity>
      </View>
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
    height: "50%",
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

export default ResetPasswordScreen;
