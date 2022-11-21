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
  TouchableHighlight,
} from "react-native";
//   import { CheckBox } from "react-native-btr";
import Icon from "react-native-vector-icons/Feather";
import { useDispatch } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Logout } from "./context/Actions";
const TopBar = ({ getPosts }) => {
  const dispatch = useDispatch();

  const logout = async () => {
    try {
      await dispatch(Logout());
    } catch (e) {
      console.error(e);
    }
  };
  return (
    <View style={styles.container}>
      {/* <Text style={styles.textLogo}>Look Me Up</Text> */}

        <Image
          style={styles.textLogo2}
          source={require("../assets/logo.png")}
        />
 
      <View style={styles.topBarRow}>
        <TouchableOpacity style={styles.searchButton}>
          <TextInput style={styles.searchText} placeholder="Search"></TextInput>
          <Icon name="search" size={25} color="#3491ff" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.settingsButton} onPress={logout}>
          <Icon name="settings" size={22} color="grey" />
        </TouchableOpacity>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    // flex: 1,
    width: "100%",
    height: 80,
    // padding: 10,
    //borderWidth:2,
    // backgroundColor: "#3491ff",
    //marginTop: 35,
    flexDirection: "row",
    justifyContent: "space-between",
    // justifyContent:'center',
    alignItems: "center",
  },
  textLogo: {
    color: "#ffffff",
    fontSize: 24,
    fontWeight: "bold",
    letterSpacing: -0.3,
  },
  textLogo2: {
    height: 100,
    width: "28%",
  },
  topBarRow: {
    flexDirection: "row",
  },
  searchButton: {
    width: "66%",
    height: 42,
    borderRadius: 10,
    padding: 5,
    backgroundColor: "#F6F6F6",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginLeft: 5,
  },
  searchText: {
    fontSize: 20,
    color: "#bababa",
    width: "80%",
    marginLeft: 5,
  },
  settingsButton: {
    width: "15%",
    height: 42,
    borderRadius: 10,
    backgroundColor: "#F6F6F6",
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 5,
  },
});
export default TopBar;
