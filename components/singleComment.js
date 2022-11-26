import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Modal,
  StyleSheet,
  Image,
  TouchableOpacity,
  Button,
  TextInput,
  KeyboardAvoidingView,
  ScrollView,
  FlatList,
} from "react-native";
import Icon from "react-native-vector-icons/Entypo";
import Like from "react-native-vector-icons/AntDesign";
import Comment from "react-native-vector-icons/MaterialIcons";
import Share from "react-native-vector-icons/MaterialIcons";
import moment from "moment";
import Avatar from "./Avatar";
import { baseUrl } from "../api/index";
import Send from "react-native-vector-icons/MaterialIcons";
import DropDown from "react-native-vector-icons/MaterialCommunityIcons";
import commonApi from "../api/common";
import { useSelector } from "react-redux";

const SingleComment = ({ item }) => {
  item = item.item;
  let url = baseUrl + "assets/" + item.userId.profilePicture;
  return (
    <View style={styles.commentsHeader}>
      <View style={styles.commentsRow}>
        {item.userId.profilePicture && (
          <Image
            source={{ uri: url }}
            style={{ width: 40, height: 40, borderRadius: 100 }}
          />
        )}
        {!item.userId.profilePicture && (
          <Avatar source={require("../assets/a4.png")} />
        )}

        <View style={styles.commentBoxBorder2}>
          <View style={{ paddingLeft: 5 }}>
            <Text style={styles.commentUser}>{item.userId.fullName}</Text>
            <View style={styles.commentsRow}>
              <Text style={styles.commentContent}>{item.comment}</Text>
              
            </View>
          </View>
        </View>
        
      </View>
      
      {/* <Icon name="dots-three-vertical" size={20} /> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor:'#3491ff',
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#f0f0f0",
    // marginTop: 10,
    marginBottom: 10,
    marginLeft: 5,
    marginRight: 5,
  },
  header: {
    height: 50,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    //marginTop:10,
    marginLeft: 5,
  },

  row: {
    alignItems: "center",
    flexDirection: "row",
  },

  user: {
    fontSize: 14,
    fontWeight: "bold",
  },
  postTime: {
    fontSize: 10,
    color: "grey",
  },

  post: {
    fontSize: 13,
    lineHeight: 16,
    marginLeft: 5,
  },

  photo: {
    marginTop: 5,
    width: "100%",
    height: 300,
  },

  footer: {
    padding: 10,
  },

  footerCount: {
    flexDirection: "row",
    justifyContent: "space-between",
    //paddingLeft:10,
  },

  likeCount: {
    //backgroundColor:'#3491ff',
    width: 20,
    height: 20,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 6,
  },

  noLikesCount: {
    fontSize: 12,
    fontWeight: "500",
  },
  noCommentsCount: {
    fontSize: 12,
    fontWeight: "500",
  },
  separator: {
    width: "100%",
    height: 1,
    marginTop: 8,
    marginBottom: 8,
    backgroundColor: "#f0f0f0",
  },
  footerMenu: {
    flexDirection: "row",
    justifyContent: "space-between",
    //paddingTop: 10,
    borderRadius: 5,
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
  },

  icon: {
    marginRight: 6,
  },
  text: {
    fontSize: 14,
  },

  textInput: {
    fontSize: 14,
    width: "90%",
    paddingLeft: 5,
    //borderWidth:2,
  },
  commentBox: {
    flexDirection: "row",
    alignItems: "center",
    width: "86%",
    borderWidth: 2,
    borderColor: "#f0f0f0",
    borderRadius: 10,
    height: 40,
  },
  commentsViewFilter: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 5,
  },
  commentsView: {
    fontSize: 14,
    fontWeight: "bold",
    marginRight: 5,
  },
  commentsHeader: {
    height: 50,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    //marginTop:10,
    // marginLeft: 5,
  },

  commentsRow: {
    alignItems: "center",
    flexDirection: "row",
  },

  commentUser: {
    fontSize: 13,
    fontWeight: "500",
  },
  commentContent: {
    fontSize: 12,
    color: "grey",
  },
  commentBoxBorder: {
    borderWidth: 2,
    width: "60%",
    borderRadius: 10,
    borderColor: "#f0f0f0",
    marginLeft: 6,
  },
  commentBoxBorder2: {
    borderWidth: 2,
    width: "75%",
    borderRadius: 10,
    borderColor: "#f0f0f0",
    marginLeft: 6,
  },
  viewMoreReplies: {
    fontSize: 14,
    fontWeight: "bold",
    textDecorationLine: "underline",
    textAlign: "center",
  },
  divider: {
    marginBottom: 10,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  modalContent: {
    //height:250,
    width: "70%",
    backgroundColor: "#f0f0f0",
    borderRadius: 20,
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },

  fixButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  deletefix: {
    //marginLeft: 60,
  },
  deletePost: {
    // flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
    marginLeft: 2,
    marginRight: 2,
    height: 40,
    width: 80,
    //width:50,
    backgroundColor: "red",
    // opacity:0.2,
    borderRadius: 10,
    marginBottom: 10,
  },
  deleteYes: {
    //paddingLeft:10,
    fontSize: 13,
    fontWeight: "500",
    color: "#ffffff",
    backgroundColor: "red",
    borderRadius: 10,
  },
  cancelPost: {
    // flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
    marginLeft: 15,
    marginRight: 2,
    height: 40,
    width: 80,
    //width:50,
    //color:'black',
    backgroundColor: "#3491ff",
    //borderColor:'#3491ff',
    // opacity:0.2,
    borderRadius: 10,
    //borderWidth:2,
  },
  deleteCancel: {
    //paddingLeft:10,
    fontSize: 13,
    fontWeight: "500",
    color: "#ffffff",
    backgroundColor: "#3491ff",
    borderRadius: 10,
  },
});

export default SingleComment;
