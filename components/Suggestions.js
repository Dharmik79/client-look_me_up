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
import { Avatar } from "react-native-paper";
import commonApi from "../api/common";
import { useSelector } from "react-redux";

const Suggestions = ({ suggestions, getSuggestions, fetchFriends }) => {
  const user = useSelector((state) => state.Reducers.user);
  const token = useSelector((state) => state.Reducers.token);

  useEffect(() => {
    getSuggestions();
  }, []);

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
        getSuggestions();
        fetchFriends();
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
      {suggestions.map((suggestion, index) => {
        return (
          <>
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
                <Image
                  source={require("../assets/a4.png")}
                  style={{ width: 80, height: 80, borderRadius: 100 }}
                />
                <View style={{ paddingLeft: 10 }}>
                  <Text
                    style={{
                      fontSize: 18,
                      fontWeight: "bold",
                      marginBottom: 5,
                    }}
                  >
                    {suggestion.fullName}
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
                      {suggestion.followers.length} Followers {"\t"}{" "}
                      {suggestion.following.length} Friends
                    </Text>
                  </View>

                  <View style={{ alignItems: "center", flexDirection: "row" }}>
                    <TouchableOpacity
                      style={{
                        //flex: 0.5,
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "center",
                        marginLeft: 2,
                        marginRight: 2,
                        height: 35,
                        width: 120,
                        backgroundColor: "#3491ff",
                        // opacity:0.2,
                        borderRadius: 10,
                      }}
                      onPress={() => {
                        addFriend(suggestion._id);
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
          </>
        );
      })}
    </ScrollView>
  );
};

export default Suggestions;
