import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Button,
  TextInput,
  KeyboardAvoidingView,
} from "react-native";
import Icon from "react-native-vector-icons/SimpleLineIcons";
import Icon2 from "react-native-vector-icons/Feather";
import Avatar from "./Avatar";
import commonApi from "../api/common";
import { useSelector } from "react-redux";
const CreatePost = () => {
  const user = useSelector((state) => state.Reducers.user);
  const [post, setPost] = useState({
    images: [],
    desc: "",
  });
  const [posts, setPosts] = useState([]);
  const handleSubmit = () => {
    console.log(post);
    // TODO : clear the form when done with the post submit
  };
  useEffect(() => {
    const getPosts = async () => {
      await commonApi({
        action: "createPost",
        data: {},
        config: {
          authToken: true,
        },
      })
        .then(async ({ DATA = {} }) => {
          console.log("DATA", DATA);
        })
        .catch((error) => {
          console.error("Fetch Posts", error);
        });
    };
    getPosts();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <Avatar source={require("../assets/a4.png")} />
        <TextInput
          style={styles.input}
          placeholder="Whats on your mind?"
          onChangeText={(text) => setPost({ ...post, desc: text })}
          value={post.desc}
        ></TextInput>
      </View>
      <View style={styles.divider} />

      {/* Only show when image is selected */}
      <Image style={styles.photo} source={require("../assets/story3.jpg")} />

      <View style={styles.row}>
        <TouchableOpacity style={styles.menuPhoto}>
          <Icon name="picture" size={20} color="#ffffff" />
          <Text style={styles.menuText}>Photo</Text>
        </TouchableOpacity>
        {/* <View style={styles.separator}/> */}
        <View style={styles.menuCamera}>
          <Icon name="camera" size={20} color="#ffffff" />
          <Text style={styles.menuText}>Camera</Text>
        </View>
        {/* <View style={styles.separator}/> */}
        <View style={styles.menuVideo}>
          <Icon2 name="video" size={20} color="#ffffff" />
          <Text style={styles.menuText}>Video</Text>
        </View>
        {/* <View style={styles.separator}/> */}
        <TouchableOpacity onPress={handleSubmit}>
          <View style={styles.menuPost}>
            <Icon2 name="send" size={20} color="#ffffff" />
            <Text style={styles.menuText}>Post</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    //flex: 1,
    width: "100%",
    height: 435,
    padding: 5,
    //backgroundColor: "#3491ff",
    borderWidth: 2,
    borderColor: "#f0f0f0",
    // borderRadius: 10,
    marginBottom: 10,
  },
  row: {
    flexDirection: "row",
    backgroundColor: "#ffffff",
    width: "100%",
    //padding: 10,
    alignItems: "center",
    // borderWidth: 2,
  },
  input: {
    height: 50,
    width: "86%",
    borderWidth: 2,
    borderColor: "#f0f0f0",
    borderRadius: 10,
    padding: 10,
    marginLeft: 5,
  },
  divider: {
    width: "100%",
    height: 1,
    marginTop: 8,
    marginBottom: 8,
    backgroundColor: "#f0f0f0",
  },

  //Only show when image is selected
  photo: {
    //marginTop: 5,
    marginBottom: 10,
    width: "100%",
    height: 300,
    borderRadius: 5,
  },
  menuPhoto: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
    marginLeft: 2,
    marginRight: 2,
    height: 35,
    //width:50,
    backgroundColor: "#44c041",
    // opacity:0.2,
    borderRadius: 10,
  },
  menuCamera: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
    marginLeft: 2,
    marginRight: 2,
    height: 35,
    //width:50,
    backgroundColor: "#4183c0",
    // opacity:0.2,
    borderRadius: 10,
  },
  menuVideo: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
    marginLeft: 2,
    marginRight: 2,
    height: 35,
    //width:50,
    backgroundColor: "#c0ac41",
    // opacity:0.2,
    borderRadius: 10,
  },
  menuPost: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
    marginLeft: 2,
    marginRight: 2,
    height: 35,
    //width:50,
    backgroundColor: "#3491ff",
    // opacity:0.2,
    borderRadius: 10,
  },
  menuText: {
    //paddingLeft:10,
    fontSize: 13,
    fontWeight: "500",
    color: "#ffffff",
    //backgroundColor:'grey',
    borderRadius: 10,
  },
  separator: {
    width: 1,
    height: 30,
    backgroundColor: "grey",
  },
  //   componentSeparator:{
  // width:'100%',
  // height:10,
  // backgroundColor:'grey',
  //   },
});

export default CreatePost;
