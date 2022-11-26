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


const SuggestionsScreen = ({ navigation }) => {
  

   // The path of the picked image
   const [pickedImagePath, setPickedImagePath] = useState("");
  const showImagePicker = async () => {
    // Ask the user for the permission to access the media library
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("You've refused to allow this app to access your photos!");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setPickedImagePath(result);
    }
  };
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
                  JOHN DOE
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
                      Followers {"\t"}{" "}
                      Friends
                    </Text>
                  </View>

                  <View style={{ alignItems: "center", flexDirection: "row" }}>
                    <TouchableOpacity
                      style={{
                        //flex: 1.0,
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: 'space-evenly',
                        marginLeft: 2,
                        marginRight: 2,
                        height: 35,
                        width:'40%',
                        backgroundColor: "#3491ff",
                        // opacity:0.2,
                        borderRadius: 10,
                      }}
                      // onPress={() => {
                      //   unFollowFriend(friend._id);
                      // }}
                    >
                      <Icon2
                        name="person-add"
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
                        Add Friend
                      </Text>
                    </TouchableOpacity>
                                <TouchableOpacity
                      style={{
                        //flex: 1.0,
                        width: '40%',
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
    height: '100%',
    //flexDirection: "row",
  },

});

export default SuggestionsScreen;
