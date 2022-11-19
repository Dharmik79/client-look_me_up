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

const ProfileScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <ScrollView>
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
          <TouchableOpacity style={styles.login}>
            <Text style={styles.loginText}>Edit Profile</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.friendsContainerBox}>
          <View style={styles.friendsContainerOutline}>
            <View style={styles.totalFriends}>
              <Text>Friends (240) </Text>
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

        {/* Show only if the profile is users profile */}
        <CreatePost />

        {/* Show only users posts */}
        <Post />
      </ScrollView>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    marginTop: 35,
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
export default ProfileScreen;
