import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Button,
  TextInput,
  ScrollView,
  KeyboardAvoidingView,
} from "react-native";
import CreatePost from "../components/CreatePost";
import Post from "../components/Post";

const ProfileDetails = ({ navigation }) => {
  console.log("Navigation",navigation)
  return (
    <View style={styles.container}>
       <Text style={{ textAlign: "center", fontSize: 18, fontWeight: "bold" }}>
          John Doe
        </Text>
        <View style={styles.separator} />
        <View style={styles.userInfoWrapper}>
          <View style={styles.userInfoItem}>
            <Text style={styles.userInfoTitle}>22</Text>
            <Text style={styles.userInfoSubTitle}>Posts</Text>
          </View>

          <View style={styles.userInfoItem}>
            <Text style={styles.userInfoTitle}>80K</Text>
            <Text style={styles.userInfoSubTitle}>Followers</Text>
          </View>
          <View style={styles.userInfoItem}>
            <Text style={styles.userInfoTitle}>45</Text>
            <Text style={styles.userInfoSubTitle}>Friends</Text>
          </View>
        </View>
        <View style={styles.separator} />
        <View style={styles.buttons}>
          <TouchableOpacity style={styles.login} onPress={()=>navigation.navigate('EditProfile',{
            screen:"EditProfile"
          })}>
            <Text style={styles.loginText}>Edit Profile</Text>
          </TouchableOpacity>
        </View>
     
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
   // marginTop: 35,
    //padding:10,
    //paddingLeft:10,
    //paddingRight:10,
  },
  separator: {
    width: "100%",
    height: 1,
    marginTop: 8,
    marginBottom: 8,
    backgroundColor: "#f0f0f0",
  },
  buttons: {
    //width: 100,
    // padding: 10,
    // backgroundColor: 'red',
    paddingLeft: 5,
    paddingRight: 5,
    marginTop: 5,
  },
  login: {
    marginBottom: 10,
    backgroundColor: "#3491ff",
    borderRadius: 10,
    padding: 10,
    //height:40,
    //alignContent:'center',
    alignItems: "center",
  },
  loginText: {
    color: "#ffffff",
    fontSize: 16,
  },
  userInfoWrapper: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    //marginVertical:20,
  },
  userInfoItem: {
    justifyContent: "center",
  },
  userInfoTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
    textAlign: "center",
  },
  userInfoSubTitle: {
    fontSize: 14,
    fontWeight: "300",
    marginBottom: 5,
    textAlign: "center",
  },
  
});
export default ProfileDetails;
