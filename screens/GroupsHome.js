import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Button,
  TextInput,
  KeyboardAvoidingView,
  ScrollView,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import Avatar from "../components/Avatar";

const GroupsHome = () => {
  return (
    <>
    <View style={styles.container}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        // style={{ paddingLeft: 11 }}
      >
        <TouchableOpacity style={styles.group}>
          <Text style={styles.text}>Create Group</Text>
        </TouchableOpacity>
        <View style={styles.groupNames}>
          <Avatar source={require('../assets/3.jpg')} />
        </View>
        <View style={styles.groupNames}>
          <Avatar source={require('../assets/avatar1.jpeg')}/>
        </View>
        <View style={styles.groupNames}>
          <Avatar source={require('../assets/1.jpg')}/>
        </View>
        <View style={styles.groupNames}>
          <Avatar source={require('../assets/2.jpg')}/>
        </View>
        <View style={styles.groupNames}>
          <Avatar source={require('../assets/4.jpg')}/>
        </View>
        <View style={styles.groupNames}>
          <Avatar source={require('../assets/5.jpg')}/>
        </View>
        <View style={styles.groupNames}>
          <Avatar source={require('../assets/6.jpg')}/>
        </View>
        <View style={styles.groupNames}>
          <Avatar source={require('../assets/avatar.png')}/>
        </View>
      </ScrollView>
    </View>
    </>
  );
};
const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 60,
    marginTop: 10,
    //backgroundColor: "#3491ff",
    //borderRadius:10,
    borderWidth:2,
    borderColor: "#f0f0f0",
    flexDirection: "row",
    alignItems: "center",
    paddingLeft:5,
  },

  group: {
    width: 100,
    height: 40,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#3491ff",
    backgroundColor:'#3491ff',
    marginRight: 10,
    //marginLeft:5,
  },
  text: {
    color: "#ffffff",
    fontSize: 13,
    fontWeight: "500",
    padding: 8,
    textAlign: "center",
    position: "relative",
    //justifyContent:'center',
    //  alignItems:'center',
  },

  groupNames: {
    marginRight: 10,
  },
});
export default GroupsHome;
