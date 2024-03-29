import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Button,
  Image,
  TextInput,
  KeyboardAvoidingView,
} from "react-native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import Ionic from "react-native-vector-icons/Ionicons";
import Icon from "react-native-vector-icons/Entypo";
import Icon2 from "react-native-vector-icons/Ionicons";
import NoPost from "react-native-vector-icons/FontAwesome5";
import { Avatar } from "react-native-paper";
import commonApi from "../api/common";
import { useSelector } from "react-redux";
import { baseUrl } from "../api";

const Friends = ({ friends, fetchFriends, getProfile }) => {
  const user = useSelector((state) => state.Reducers.user);
  const token = useSelector((state) => state.Reducers.token);

  const unFollowFriend = async (id) => {
    await commonApi({
      action: "removeFriend",
      data: {
        followingId: id,
      },
      config: {
        authToken: token,
      },
    })
      .then(() => {
        fetchFriends();
        getProfile();
      })
      .catch((error) => {
        console.error("Error - Add Friend", error);
      });
  };
  useEffect(() => {
    fetchFriends();
  }, [user]);
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={{
        width: "100%",
        height: "100%",
        backgroundColor: "#ffffff",
      }}
    >
      {friends.length == 0 && (
        <View style={{ alignItems: "center", marginTop: 20 }}>
          <NoPost name="user-friends" size={40} color="grey" />
          <Text style={{ fontSize: 22, color: "grey", marginTop: 5 }}>
            No friends found
          </Text>
        </View>
      )}
      {friends.map((friend, index) => {
        return (
          <View key={index}>
            <View
              style={{
                width: "100%",
                height: 1,
                marginTop: 8,
                marginBottom: 8,
                backgroundColor: "#f0f0f0",
              }}
            />
            <View
              style={{
                // height: 50,
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                // marginTop:5,
                //marginLeft: 5,
              }}
            >
              <View style={{ alignItems: "center", flexDirection: "row" }}>
                {friend.profilePicture && (
                  <Image
                    source={{
                      uri: baseUrl + "assets/" + friend.profilePicture,
                    }}
                    style={{ width: 80, height: 80, borderRadius: 100 }}
                  />
                )}

                {!friend.profilePicture && (
                  <Image
                    source={require("../assets/a4.png")}
                    style={{ width: 80, height: 80, borderRadius: 100 }}
                  />
                )}
                <View style={{ paddingLeft: 10 }}>
                  <Text
                    style={{
                      fontSize: 18,
                      fontWeight: "bold",
                      marginBottom: 5,
                    }}
                  >
                    {friend.fullName}
                  </Text>

                  <View
                    style={{
                      alignItems: "center",
                      flexDirection: "row",
                      marginBottom: 5,
                    }}
                  >
                    <Text
                      style={{ fontSize: 14, color: "grey", fontWeight: "300" }}
                    >
                      {friend.followers.length} Followers {"\t"}{" "}
                      {friend.following.length} Friends
                    </Text>
                  </View>

                  <View style={{ alignItems: "center", flexDirection: "row" }}>
                    <TouchableOpacity
                      style={{
                        //flex: 0.8,
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "center",
                        marginLeft: 2,
                        marginRight: 2,
                        height: 35,
                        width:130,
                        backgroundColor: "#a3a3a3",
                        // opacity:0.2,
                        borderRadius: 10,
                      }}
                      onPress={() => {
                        unFollowFriend(friend._id);
                      }}
                    >
                      <Icon2
                        name="close-circle-sharp"
                        size={20}
                        color="#ffffff"
                      />
                      <Text
                        style={{
                          //paddingLeft:10,
                          fontSize: 13,
                          fontWeight: "500",
                          color: "#ffffff",
                          //backgroundColor:'grey',
                          borderRadius: 10,
                          marginLeft:5,
                        }}
                      >
                        Remove Friend
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
              {/* <TouchableOpacity >
              <Icon name="dots-three-vertical" size={20} />
            </TouchableOpacity> */}
            </View>
            <View
              style={{
                width: "100%",
                height: 1,
                marginTop: 8,
                marginBottom: 8,
                backgroundColor: "#f0f0f0",
              }}
            />
          </View>
        );
      })}
    </ScrollView>
  );
};

export default Friends;
