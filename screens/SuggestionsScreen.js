import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ToastAndroid,
  ScrollView,
  Image,
  StyleSheet,
  TextInput,
} from "react-native";

import * as ImagePicker from "expo-image-picker";
import Icon from "react-native-vector-icons/FontAwesome5";
import Icon2 from "react-native-vector-icons/Ionicons";
import BottomTabView from "../components/BottomTabView";
import commonApi from "../api/common";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { baseUrl } from "../api";

const SuggestionsScreen = ({ navigation }) => {
  const user = useSelector((state) => state.Reducers.user);
  const token = useSelector((state) => state.Reducers.token);
  const dispatch = useDispatch();
  const [suggestions, setSuggestions] = useState([]);
  const getSuggestions = async () => {
    await commonApi({
      action: "suggestions",
      data: {
        options: {
          select: ["fullName", "following", "followers","profilePicture"],
        },
      },
      config: {
        authToken: token,
      },
    }).then(({ DATA }) => {
      setSuggestions(DATA.data);
    });
  };
  const getProfile = async () => {
    await commonApi({
      action: "getProfile",
      config: {
        authToken: token,
      },
    }).then(async ({ DATA }) => {
      dispatch({ type: "UPDATE_USER", payload: DATA });
      await AsyncStorage.setItem("user", JSON.stringify(DATA));
    });
  };
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
        getProfile();
      })
      .catch((error) => {
        console.error("Error - Add Friend", error);
      });
  };
  useEffect(() => {
    getSuggestions();
  }, [user]);
  return (
    <View style={styles.container}>
      <View style={styles.topBar}>
        <Icon2
          name="md-globe"
          size="35"
          color={"#3491ff"}
          style={{ marginRight: 10 }}
        />
        <Text
          onPress={() => navigation.navigate("Home")}
          style={{ fontSize: 26, fontWeight: "bold" }}
        >
          Suggestions
        </Text>
      </View>

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
              {suggestion.profilePicture && (
                <Image
                  source={{
                    uri: baseUrl+"assets/"+suggestion.profilePicture,
                  }}
                  style={{ width: 80, height: 80, borderRadius: 100 }}
                />
              )}
             
              {!suggestion.profilePicture && (
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
          </View>
        );
      })}
      </ScrollView>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",

    //padding: 5,
    marginTop: 35,
    backgroundColor: "#ffffff",

    //marginBottom: 10,
  },
  topBar: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    backgroundColor: "#ffffff",
  },
  separator: {
    width: "100%",
    height: 2,
    //marginTop: 8,
    marginBottom: 8,
    backgroundColor: "grey",
  },
  category: {
    marginBottom: 10,
    // backgroundColor: "grey",
    borderRadius: 10,
    //padding: 5,
    height: "100%",
    //flexDirection: "row",
  },
});

export default SuggestionsScreen;
