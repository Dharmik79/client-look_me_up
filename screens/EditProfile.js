import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ToastAndroid,
  Image,
  StyleSheet,
  
  TextInput,
} from "react-native";
import Ionic from "react-native-vector-icons/Ionicons";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

const EditProfile = () => {
  return (
    <KeyboardAwareScrollView style={{backgroundColor:'#ffffff'}}>
    <View style={styles.container}>
      <View style={styles.topBar}>
        <TouchableOpacity>
          <Ionic name="close-outline" style={{ fontSize: 35 }} />
        </TouchableOpacity>
        <Text style={{ fontSize: 16, fontWeight: "bold" }}>Edit Profile</Text>
        <TouchableOpacity>
          <Ionic name="checkmark" style={{ fontSize: 35, color: "#3491ff" }} />
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={{ padding: 20, alignItems: "center" }}>
        <Image
          source={require("../assets/a4.png")}
          style={{ width: 80, height: 80, borderRadius: 100 }}
        />
        <Text
          style={{
            color: "#3493D9",
          }}
        >
          Change profile photo
        </Text>
      </TouchableOpacity>
      <View style={{ padding: 10 }}>
        <View>
          <Text
            style={{
              opacity: 0.5,
            }}
          >
            First Name
          </Text>
          <TextInput
            placeholder="First Name"
            keyboardType="default"
            style={styles.textInputEdit}
          />
        </View>
        <View>
          <Text
            style={{
              opacity: 0.5,
            }}
          >
            Last Name
          </Text>
          <TextInput
            placeholder="Last Name"
            keyboardType="default"
            style={styles.textInputEdit}
          />
        </View>
        <View >
          <Text
            style={{
              opacity: 0.5,
            }}
          >
            Mobile Number
          </Text>
          <TextInput
          placeholder="Mobile Number"
                style={styles.textInputEdit}
                keyboardType="numeric"
                maxLength={10}
              />
        </View>
        <View >
          <Text
            style={{
              opacity: 0.5,
            }}
          >
            Password
          </Text>
          <TextInput
            placeholder="Change Password"
            style={styles.textInputEdit}
          />
        </View>
        {/* <View style={{ paddingVertical: 10 }}>
          <TextInput
            placeholder="Website"
            style={{
              fontSize: 16,
              borderBottomWidth: 1,
              borderColor: "#CDCDCD",
            }}
          />
        </View>
        <View style={{ paddingVertical: 10 }}>
          <TextInput
            placeholder="Bio"
            style={{
              fontSize: 16,
              borderBottomWidth: 1,
              borderColor: "#CDCDCD",
            }}
          />
        </View> */}
      </View>
      <TouchableOpacity>
        <Text
          style={styles.accountChange}
        >
          Switch to Private account
        </Text>
      </TouchableOpacity>
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

    width: "100%",
    height: "100%",
    backgroundColor: "white",
    marginTop: 35,

    // backgroundColor: '#fff',
    // alignItems: 'center',
    // justifyContent: 'center',
  },
  topBar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 10,
  },

  textInputEdit:{
    height: 40,
    //margin: 12,
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    borderColor: "#CDCDCD",
    marginTop:5,
    marginBottom:5,
  },
  accountChange:{
    paddingLeft: 10,
    color: "#3491ff",
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: "#EFEFEF",
  },
});

export default EditProfile;
