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

const CoverAndProfile = ({ navigation }) => {
  return (
    <View style={styles.container}>
        <View style={styles.coverPhotoConatiner}>
          <Image
            style={styles.coverPhoto}
            source={require("../assets/story5.jpg")}
          />
          <Image
            style={styles.profilePhoto}
            source={require("../assets/a4.png")}
          />
          <TouchableOpacity style={styles.changeCoverPhoto}>
            <Image source={require("../assets/changecover.png")} />
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
  coverPhotoConatiner: {
    width: "100%",
    height: 210,
    //borderWidth:2,
    borderRadius: 10,
    //borderWidth: 2,
  },
  coverPhoto: {
    width: "100%",
    height: 160,
    //borderBottomRightRadius: 10,
    //borderBottomLeftRadius: 10,
  },
  profilePhoto: {
    width: 100,
    height: 100,
    borderRadius: 50,
    alignSelf: "center",
    position: "absolute",
    marginTop: 105,
  },
  changeCoverPhoto: {
    width: 20,
    height: 20,
    // borderRadius: 10,
    alignSelf: "baseline",
    marginLeft: 10,
    position: "absolute",
    marginTop: 130,
  },
  
});
export default CoverAndProfile;
