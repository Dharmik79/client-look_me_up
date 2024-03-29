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

const UserGroups = ({ navigation }) => {
  return (
    <View style={styles.container}>
 <View style={styles.friendsContainerBox}>
          <View style={styles.friendsContainerOutline}>
            <View style={styles.totalFriends}>
              <Text>Groups (20) </Text>
              <TouchableOpacity>
                <Text style={{ textDecorationLine: "underline" }}>
                  View All
                </Text>
              </TouchableOpacity>
            </View>
            <View style={styles.friendsContainer}>
              <Image
                style={styles.friendImage}
                source={require("../assets/1.jpg")}
              />
              <Image
                style={styles.friendImage}
                source={require("../assets/5.jpg")}
              />
              <Image
                style={styles.friendImage}
                source={require("../assets/4.jpg")}
              />
              <Image
                style={styles.friendImage}
                source={require("../assets/6.jpg")}
              />
            </View>
          </View>
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
  friendsContainerBox: {
    paddingLeft: 5,
    paddingRight: 5,
    //marginLeft:10,
    marginBottom: 10,
  },
  friendsContainerOutline: {
    padding: 10,
    // paddingLeft:10,
    // paddingRight:10,
    width: "100%",
    height: 175,
    borderWidth: 2,
    borderColor: "#f0f0f0",
    borderRadius: 10,
  },

  friendsContainer: {
    width: "100%",
    height: 170,
    flexDirection: "row",
    //padding:8,
    justifyContent: "space-between",
  },
  friendImage: {
    width: "23%",
    height: 125,
    marginTop: 5,
    marginBottom: 5,
    borderRadius: 10,
    //marginLeft:6,
  },
  totalFriends: {
    flexDirection: "row",
    justifyContent: "space-between",
    //backgroundColor:'#f0f0f0',
    height: 20,
    width: "100%",
  },
  
});
export default UserGroups;
