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
import Icon from "react-native-vector-icons/MaterialIcons";
import Avatar from "./Avatar";

const Story = () => {
  return (
    <View style={styles.container}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View style={styles.card}>
          <Image
            style={styles.cardStory}
            source={require("../assets/story3.jpg")}
          />
          <View style={styles.storyUser}>
            <Icon name="add" size={30} color={"#3491ff"} />
          </View>
          <View style={styles.storyFooter}>
            <Text style={styles.storyText}>Add to Story</Text>
          </View>
        </View>
        <View style={styles.card}>
        <Image
            style={styles.cardStory}
            source={require("../assets/story6.jpg")}
          />
          <View style={styles.storyUser}>
            <Avatar 
            source={require("../assets/a1.png")}
             />
          </View>
          <View style={styles.storyFooter}>
            <Text style={styles.storyText}>Jane Doe</Text>
          </View>
        </View>
        <View style={styles.card}>
        <Image
            style={styles.cardStory}
            source={require("../assets/story5.jpg")}
          />
          <View style={styles.storyUser}>
            <Avatar 
            source={require("../assets/a2.png")}
             />
          </View>
          <View style={styles.storyFooter}>
            <Text style={styles.storyText}>Rick Toe</Text>
          </View>
        </View>
        <View style={styles.card}>
        <Image
            style={styles.cardStory}
            source={require("../assets/story1.jpg")}
          />
          <View style={styles.storyUser}>
            <Avatar 
            source={require("../assets/a4.png")}
             />
          </View>
          <View style={styles.storyFooter}>
            <Text style={styles.storyText}>Damon Ross</Text>
          </View>
        </View>
        <View style={styles.card}>
        <Image
            style={styles.cardStory}
            source={require("../assets/story2.jpg")}
          />
          <View style={styles.storyUser}>
            <Avatar 
            source={require("../assets/a3.png")}
             />
          </View>
          <View style={styles.storyFooter}>
            <Text style={styles.storyText}>Damon Ross</Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    width: "100%",
    height: 170,
    alignItems: "center",
    paddingLeft:5,
    paddingRight:5,
    //borderWidth:2,
    //borderColor:'#f0f0f0',
    // borderRadius:10,
    marginTop: 10,

    // backgroundColor: "#3491ff",
  },
  card: {
    width: 106,
    height: 170,
    position: "relative",
    marginRight: 5,
    //marginLeft:5,
    justifyContent: "center",
    // backgroundColor:'grey',
    // borderRadius:10,
  },
  cardStory: {
    width: "100%",
    height: 170,
    borderRadius: 10,
  },
  storyUser: {
    position: "absolute",
    top: 8,
    left: 8,
    backgroundColor: "#ffffff",
    borderRadius: 20,
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  storyFooter: {
    width: "100%",
    position: "absolute",
    bottom: 10,
    left: 17,
  },
  storyText: {
    fontSize: 13,
    fontWeight: "500",
    color: "#ffffff",
    alignItems: "center",
    justifyContent: "center",
  },
});
export default Story;
