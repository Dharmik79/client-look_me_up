import React, { useEffect, useState } from "react";
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

const Suggestions = ({ followers, getFollowers, getProfile }) => {
  const user = useSelector((state) => state.Reducers.user);
  const token = useSelector((state) => state.Reducers.token);

  useEffect(() => {
    getFollowers();
  }, [user]);

  const addFriend = async (id) => {
    await commonApi({
      action: "addFriend",
      data: {
        followingId: id,
      },
      config: {
        authToken: token,
      },
    })
      .then(() => {
        getFollowers();
        getProfile();
      })
      .catch((error) => {
        console.error("Error - Add Friend", error);
      });
  };
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
        getProfile();
      })
      .catch((error) => {
        console.error("Error - Add Friend", error);
      });
  };
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={{
        width: "100%",
        height: "100%",
        backgroundColor: "#ffffff",
      }}
    >
      {followers.length == 0 && (
        <View style={{ alignItems: "center", marginTop: 20 }}>
          <NoPost name="user-friends" size={40} color="grey" />
          <Text style={{ fontSize: 22, color: "grey", marginTop: 5 }}>
            No followers found
          </Text>
        </View>
      )}
      {followers.map((follower, index) => {
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
                {follower.profilePicture && (
                  <Image
                    source={{
                      uri: baseUrl + "assets/" + follower.profilePicture,
                    }}
                    style={{ width: 80, height: 80, borderRadius: 100 }}
                  />
                )}

                {!follower.profilePicture && (
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
                    {follower.fullName}
                  </Text>

                  <View style={{ alignItems: "center", flexDirection: "row" }}>
                    <Text
                      style={{
                        fontSize: 14,
                        color: "grey",
                        marginBottom: 5,
                        fontWeight: "300",
                      }}
                    >
                      {follower.followers.length} Followers {"\t"}{" "}
                      {follower.following.length} Friends
                    </Text>
                  </View>

                  {user.following.includes(follower._id) && (
                    <View
                      style={{ alignItems: "center", flexDirection: "row" }}
                    >
                      <TouchableOpacity
                        style={{
                          //flex: 0.5,
                          flexDirection: "row",
                          alignItems: "center",
                          justifyContent: "center",
                          marginLeft: 2,
                          marginRight: 2,
                          height: 35,
                          width: 130,
                          backgroundColor: "#a3a3a3",
                          // opacity:0.2,
                          borderRadius: 10,
                        }}
                        onPress={() => {
                          unFollowFriend(follower._id);
                        }}
                      >
                        <Icon2 name="close-circle-sharp" size={20} color="#ffffff" />
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

                      {/* <TouchableOpacity
                      style={{
                        //flex: 0.5,
                        width: "70%",
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "center",
                        marginLeft: 2,
                        marginRight: 2,
                        height: 35,
                        width: 120,
                        backgroundColor: "#a3a3a3",
                        // opacity:0.2,
                        borderRadius: 10,
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
                        }}
                      >
                        Not Interested
                      </Text>
                    </TouchableOpacity> */}
                    </View>
                  )}
                  {!user.following.includes(follower._id) && (
                    <View
                      style={{ alignItems: "center", flexDirection: "row" }}
                    >
                      <TouchableOpacity
                        style={{
                          //flex: 0.5,
                          flexDirection: "row",
                          alignItems: "center",
                          justifyContent: "center",
                          marginLeft: 2,
                          marginRight: 2,
                          height: 35,
                          width: 130,
                          backgroundColor: "#3491ff",
                          // opacity:0.2,
                          borderRadius: 10,
                        }}
                        onPress={() => {
                          addFriend(follower._id);
                        }}
                      >
                        <Icon2 name="person-add" size={20} color="#ffffff" />
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
                          Add Friend
                        </Text>
                      </TouchableOpacity>

                      {/* <TouchableOpacity
                    style={{
                      //flex: 0.5,
                      width: "70%",
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "center",
                      marginLeft: 2,
                      marginRight: 2,
                      height: 35,
                      width: 120,
                      backgroundColor: "#a3a3a3",
                      // opacity:0.2,
                      borderRadius: 10,
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
                      }}
                    >
                      Not Interested
                    </Text>
                  </TouchableOpacity> */}
                    </View>
                  )}
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

export default Suggestions;
