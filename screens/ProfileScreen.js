import React, { useState, useEffect } from "react";
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
import CoverAndProfile from "../components/CoverAndProfile";
import ProfileDetails from "../components/ProfileDetails";
import UserFriends from "../components/UserFriends";
import UserGroups from "../components/UserGroups";
import NoPost from "react-native-vector-icons/Entypo";
import { useSelector } from "react-redux";
import commonApi from "../api/common";
const ProfileScreen = ({ navigation }) => {
  const [posts, setPosts] = useState([]);
  const user = useSelector((state) => state.Reducers.user);
  const token = useSelector((state) => state.Reducers.token);
  const getPosts = async (query = {}) => {
    console.log("Called");
    await commonApi({
      action: "findAllPost",
      data: {
        query: { userId: user._id },
        options: {
          pagination: false,
          populate: [
            {
              path: "userId",
              model: "user",
              select: ["_id", "fullName", "profilePicture"],
            },
            {
              path: "comments.userId",
              model: "user",
              select: ["_id", "fullName", "profilePicture"],
            },
          ],
          sort: { createdAt: -1 },
        },
      },
      config: {
        authToken: token,
      },
    })
      .then(async ({ DATA = {} }) => {
        setPosts(DATA.data);
      })
      .catch((error) => {
        console.error("Fetch Posts", error);
      });
  };
  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      getPosts();
    });
    return () => {
      unsubscribe();
    };
  }, [navigation]);
  return (
    <View style={styles.container}>
      <ScrollView>
        <CoverAndProfile />
        <ProfileDetails navigation={navigation} />
        <UserFriends navigation={navigation} />
        {/*<UserGroups />*/}

        {/* Show only if the profile is users profile */}
        {/*<CreatePost /> */}

        {/* Show only users posts */}
        {posts.length == 0 && (
          <View style={styles.noPostsFound}>
            <NoPost name="camera" size={50} color="grey" />
            <Text style={{ fontSize: 22, color: "grey", marginTop: 5 }}>
              No Post Found
            </Text>
          </View>
        )}
       {posts.length != 0 && <Post getPosts={getPosts} posts={posts} />}
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
  noPostsFound: {
    alignItems: "center",
    marginTop: 20,
  },
});
export default ProfileScreen;
