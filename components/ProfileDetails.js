import React, { useEffect } from "react";
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
import commonApi from "../api/common";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
const ProfileDetails = ({ navigation }) => {
  const user = useSelector((state) => state.Reducers.user);
  const token = useSelector((state) => state.Reducers.token);
  const dispatch = useDispatch();
  const getProfile = async () => {
    await commonApi({
      action: "getProfile",
      config: {
        authToken: token,
      },
    }).then(async ({ DATA }) => {
      dispatch({ type: "UPDATE_USER", payload: DATA });
      await AsyncStorage.setItem("user", JSON.stringify(DATA));
    }).catch((error)=>{
      console.error("Error",error)
    })
  };

  useEffect(() => {
    getProfile();
  }, []);
  return (
    <View style={styles.container}>
      <Text style={{ textAlign: "center", fontSize: 18, fontWeight: "bold" }}>
        {user.fullName}
      </Text>
      <View style={styles.separator} />
      <View style={styles.userInfoWrapper}>
        <View style={styles.userInfoItem}>
          <Text style={styles.userInfoTitle}>
            {user.postCount ? user.postCount : 0}
          </Text>
          <Text style={styles.userInfoSubTitle}>Posts</Text>
        </View>

        <View style={styles.userInfoItem}>
          <Text style={styles.userInfoTitle}>{user.followers.length}</Text>
          <Text style={styles.userInfoSubTitle}>Followers</Text>
        </View>
        <View style={styles.userInfoItem}>
          <Text style={styles.userInfoTitle}>{user.following.length}</Text>
          <Text style={styles.userInfoSubTitle}>Friends</Text>
        </View>
      </View>
      <View style={styles.separator} />
      <View style={styles.buttons}>
        <TouchableOpacity
          style={styles.login}
          onPress={() =>
            navigation.navigate("EditProfile", {
              screen: "EditProfile",
            })
          }
        >
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
