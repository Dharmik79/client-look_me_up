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


const VerifyScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        {/* <Text>Open up App.js to start working on your app!</Text> */}
        <Text style={styles.mainText}>Verify {"\n"}Account</Text>
        <Image
          style={styles.logo}
          source={require("../assets/verify_account.png")}
        />
      </View>
      <View style={styles.body}>
        <Text style={{ marginTop: 80, marginBottom: 30 }}>
          Enter 6 digit OTP send on mobile
        </Text>
        <View style={{ justifyContent: "space-evenly", flexDirection: "row" }}>
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            maxLength={1}
          />
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            maxLength={1}
          />
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            maxLength={1}
          />
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            maxLength={1}
          />
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            maxLength={1}
          />
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            maxLength={1}
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
        <TouchableOpacity>
          <View style={styles.done} onPress={""}>
            <Text style={styles.doneText}>Done</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("RegisterScreen", { screen: "RegisterScreen" })
          }
        >
          <View style={styles.cancel}>
            <Text style={styles.cancelText}>Cancel</Text>
          </View>
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
