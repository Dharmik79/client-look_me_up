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
import commonApi from "../api/common";
import { useSelector } from "react-redux";
import { baseUrl } from "../api";
const UserFriends = ({ navigation }) => {
  const user = useSelector((state) => state.Reducers.user);
  const token = useSelector((state) => state.Reducers.token);
  const [friends, setFriends] = useState([]);
  const [count, setCount] = useState(0);
  const fetchFriends = async () => {
    await commonApi({
      action: "friends",
      data: {
        options: {
          select: ["fullName", "following", "followers","profilePicture"],
        },
      },
      config: {
        authToken: token,
      },
    }).then(({ DATA }) => {
      setFriends(DATA.data);
      setCount(DATA.data.length);
      if (friends.length > 5) {
        setFriends(friends.slice(0, 4));
      }
    });
  };

  useEffect(() => {
    fetchFriends();
  }, [user]);
  return (
    <View style={styles.container}>
      <View style={styles.friendsContainerBox}>
        <View style={styles.friendsContainerOutline}>
          <View style={styles.totalFriends}>
            <Text>Friends ({count}) </Text>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("Friends");
              }}
            >
              <Text style={{ textDecorationLine: "underline" }}>View All</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.friendsContainer}>
            {friends.map((friend) => {
              return (
                <>
                  {friend.profilePicture && (
                    <Image
                      style={styles.friendImage}
                      source={{uri:baseUrl+"assets/"+friend.profilePicture}}
                    />
                  )}
                  {!friend.profilePicture && (
                    <Image
                      style={styles.friendImage}
                      source={require("../assets/1.jpg")}
                    />
                  )}
                </>
              );
            })}
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
    justifyContent: "flex-start",
  },
  friendImage: {
    width: "23%",
    height: 125,
    marginTop: 5,
    marginRight: 10,
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
export default UserFriends;
