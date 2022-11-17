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
import Icon from "react-native-vector-icons/Entypo";
import Like from "react-native-vector-icons/AntDesign";
import Comment from "react-native-vector-icons/MaterialIcons";
import Share from "react-native-vector-icons/MaterialIcons";

import Avatar from "./Avatar";

import Send from "react-native-vector-icons/MaterialIcons";
import DropDown from "react-native-vector-icons/MaterialCommunityIcons";

const Post = () => {
  return (
    <>
      {/* STORY 1 */}

      <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.row}>
            <Avatar source={require("../assets/a3.png")} />
            <View style={{ paddingLeft: 10 }}>
              <Text style={styles.user}>Jane Sicaro</Text>

              <View style={styles.row}>
                <Text style={styles.postTime}>10 hours ago</Text>
              </View>
            </View>
          </View>
          <Icon name="dots-three-vertical" size={20} />
        </View>

        <Text style={styles.post}>This look good....!</Text>
        <Image style={styles.photo} source={require("../assets/story2.jpg")} />
        <View style={styles.footer}>
          <View style={styles.footerCount}>
            <View style={styles.row}>
              <View style={styles.likeCount}>
                <Like name="heart" size={15} color={"red"} />
              </View>
              <Text style={styles.noLikesCount}>10 likes</Text>
            </View>
            <Text style={styles.noCommentsCount}>20 Comments</Text>
          </View>
          <View style={styles.separator} />

          <View style={styles.footerMenu}>
            <TouchableOpacity style={styles.button}>
              <View style={styles.icon}>
                <Like name="heart" size={15} />
              </View>
              <Text style={styles.text}>Like</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button}>
              <View style={styles.icon}>
                <Comment name="comment" size={15} />
              </View>
              <Text style={styles.text}>Comment</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button}>
              <View style={styles.icon}>
                <Share name="share" size={15} />
              </View>
              <Text style={styles.text}>Share</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.separator} />

          <View style={styles.footerMenu}>
            <View style={styles.button}>
              <View style={styles.icon}>
                <Avatar source={require("../assets/a3.png")} />
              </View>
              <View style={styles.commentBox}>
                <TextInput
                  style={styles.textInput}
                  placeholder="Write a comment"
                ></TextInput>
                <TouchableOpacity>
                  <Send name="send" size={20} color="#3491ff" />
                </TouchableOpacity>
              </View>
            </View>
          </View>
          <View style={styles.commentsViewFilter}>
          <Text style={styles.commentsView}>Most Recent</Text>
          <TouchableOpacity>
          <DropDown name="filter" size={18}/>
          </TouchableOpacity>
          </View>
          
          <View style={styles.commentsHeader}>
          <View style={styles.commentsRow}>
            <Avatar source={require("../assets/a5.png")} />
            <View style={styles.commentBoxBorder}>
            <View style={{ paddingLeft: 5 }}>
              <Text style={styles.commentUser}>Jason Dark</Text>

              <View style={styles.commentsRow}>
                <Text style={styles.commentContent}>It looks beautiful</Text>
              </View>
            </View>
            </View>
          </View>
          {/* <Icon name="dots-three-vertical" size={20} /> */}
        </View>
        <View style={styles.commentsHeader}>
          <View style={styles.commentsRow}>
            <Avatar source={require("../assets/a4.png")} />
            <View style={styles.commentBoxBorder2}>
            <View style={{ paddingLeft: 5 }}>
              <Text style={styles.commentUser}>John Doe</Text>

              <View style={styles.commentsRow}>
                <Text style={styles.commentContent}>Wish I was there, sad I missed it</Text>
              </View>
            </View>
            </View>
          </View>
          {/* <Icon name="dots-three-vertical" size={20} /> */}
        </View>
        <TouchableOpacity>
        <Text style={styles.viewMoreReplies}>View more replies</Text>
        </TouchableOpacity>



        </View>
      </View>
      {/* <View style={styles.divider}/> */}

      {/* STORY 2 */}

      <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.row}>
            <Avatar source={require("../assets/a1.png")} />
            <View style={{ paddingLeft: 10 }}>
              <Text style={styles.user}>Karak Tir</Text>

              <View style={styles.row}>
                <Text style={styles.postTime}>14 hours ago</Text>
              </View>
            </View>
          </View>
          <Icon name="dots-three-vertical" size={20} />
        </View>

        <Text style={styles.post}>Feeling alive...!</Text>
        <Image style={styles.photo} source={require("../assets/story1.jpg")} />
        <View style={styles.footer}>
          <View style={styles.footerCount}>
            <View style={styles.row}>
              <View style={styles.likeCount}>
                <Like name="heart" size={15} color={"red"} />
              </View>
              <Text style={styles.noLikesCount}>10 likes</Text>
            </View>
            <Text style={styles.noCommentsCount}>20 Comments</Text>
          </View>
          <View style={styles.separator} />

          <View style={styles.footerMenu}>
            <TouchableOpacity style={styles.button}>
              <View style={styles.icon}>
                <Like name="heart" size={15} />
              </View>
              <Text style={styles.text}>Like</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button}>
              <View style={styles.icon}>
                <Comment name="comment" size={15} />
              </View>
              <Text style={styles.text}>Comment</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button}>
              <View style={styles.icon}>
                <Share name="share" size={15} />
              </View>
              <Text style={styles.text}>Share</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.separator} />

          <View style={styles.footerMenu}>
            <View style={styles.button}>
              <View style={styles.icon}>
                <Avatar source={require("../assets/a1.png")} />
              </View>
              <View style={styles.commentBox}>
                <TextInput
                  style={styles.textInput}
                  placeholder="Write a comment"
                ></TextInput>
                <TouchableOpacity>
                  <Send name="send" size={20} color="#3491ff" />
                </TouchableOpacity>
              </View>
            </View>
          </View>
          <View style={styles.commentsViewFilter}>
          <Text style={styles.commentsView}>Most Recent</Text>
          <TouchableOpacity>
          <DropDown name="filter" size={18}/>
          </TouchableOpacity>
          </View>
          
          <View style={styles.commentsHeader}>
          <View style={styles.commentsRow}>
            <Avatar source={require("../assets/a5.png")} />
            <View style={styles.commentBoxBorder}>
            <View style={{ paddingLeft: 5 }}>
              <Text style={styles.commentUser}>Jason Dark</Text>

              <View style={styles.commentsRow}>
                <Text style={styles.commentContent}>It looks beautiful</Text>
              </View>
            </View>
            </View>
          </View>
          {/* <Icon name="dots-three-vertical" size={20} /> */}
        </View>
        <View style={styles.commentsHeader}>
          <View style={styles.commentsRow}>
            <Avatar source={require("../assets/a4.png")} />
            <View style={styles.commentBoxBorder2}>
            <View style={{ paddingLeft: 5 }}>
              <Text style={styles.commentUser}>John Doe</Text>

              <View style={styles.commentsRow}>
                <Text style={styles.commentContent}>Wish I was there, sad I missed it</Text>
              </View>
            </View>
            </View>
          </View>
          {/* <Icon name="dots-three-vertical" size={20} /> */}
        </View>
        <TouchableOpacity>
        <Text style={styles.viewMoreReplies}>View more replies</Text>
        </TouchableOpacity>



        </View>
      </View>

      {/* STORY 3 */}

      <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.row}>
            <Avatar source={require("../assets/a5.png")} />
            <View style={{ paddingLeft: 10 }}>
              <Text style={styles.user}>Jason Dark</Text>

              <View style={styles.row}>
                <Text style={styles.postTime}>1 day ago</Text>
              </View>
            </View>
          </View>
          <Icon name="dots-three-vertical" size={20} />
        </View>

        <Text style={styles.post}>Memories from last trip</Text>
        <Image style={styles.photo} source={require("../assets/story3.jpg")} />
        <View style={styles.footer}>
          <View style={styles.footerCount}>
            <View style={styles.row}>
              <View style={styles.likeCount}>
                <Like name="heart" size={15} color={"red"} />
              </View>
              <Text style={styles.noLikesCount}>10 likes</Text>
            </View>
            <Text style={styles.noCommentsCount}>20 Comments</Text>
          </View>
          <View style={styles.separator} />

          <View style={styles.footerMenu}>
            <TouchableOpacity style={styles.button}>
              <View style={styles.icon}>
                <Like name="heart" size={15} />
              </View>
              <Text style={styles.text}>Like</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button}>
              <View style={styles.icon}>
                <Comment name="comment" size={15} />
              </View>
              <Text style={styles.text}>Comment</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button}>
              <View style={styles.icon}>
                <Share name="share" size={15} />
              </View>
              <Text style={styles.text}>Share</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.separator} />

          <View style={styles.footerMenu}>
            <View style={styles.button}>
              <View style={styles.icon}>
                <Avatar source={require("../assets/a5.png")} />
              </View>
              <View style={styles.commentBox}>
                <TextInput
                  style={styles.textInput}
                  placeholder="Write a comment"
                ></TextInput>
                <TouchableOpacity>
                  <Send name="send" size={20} color="#3491ff" />
                </TouchableOpacity>
              </View>
            </View>
          </View>
          <View style={styles.commentsViewFilter}>
          <Text style={styles.commentsView}>Most Recent</Text>
          <TouchableOpacity>
          <DropDown name="filter" size={18}/>
          </TouchableOpacity>
          </View>
          
          <View style={styles.commentsHeader}>
          <View style={styles.commentsRow}>
            <Avatar source={require("../assets/a5.png")} />
            <View style={styles.commentBoxBorder}>
            <View style={{ paddingLeft: 5 }}>
              <Text style={styles.commentUser}>Jason Dark</Text>

              <View style={styles.commentsRow}>
                <Text style={styles.commentContent}>It looks beautiful</Text>
              </View>
            </View>
            </View>
          </View>
          {/* <Icon name="dots-three-vertical" size={20} /> */}
        </View>
        <View style={styles.commentsHeader}>
          <View style={styles.commentsRow}>
            <Avatar source={require("../assets/a4.png")} />
            <View style={styles.commentBoxBorder2}>
            <View style={{ paddingLeft: 5 }}>
              <Text style={styles.commentUser}>John Doe</Text>

              <View style={styles.commentsRow}>
                <Text style={styles.commentContent}>Wish I was there, sad I missed it</Text>
              </View>
            </View>
            </View>
          </View>
          {/* <Icon name="dots-three-vertical" size={20} /> */}
        </View>
        <TouchableOpacity>
        <Text style={styles.viewMoreReplies}>View more replies</Text>
        </TouchableOpacity>



        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor:'#3491ff',
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#f0f0f0",
    marginTop: 10,
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
    marginRight:5,
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
  commentBoxBorder:{
borderWidth:2,
width:'60%',
borderRadius:10,
borderColor:'#f0f0f0',
marginLeft:6,
  },
  commentBoxBorder2:{
    borderWidth:2,
    width:'75%',
    borderRadius:10,
    borderColor:'#f0f0f0',
    marginLeft:6,
      },
      viewMoreReplies:{
fontSize:14,
fontWeight:'bold',
textDecorationLine:'underline',
textAlign:'center',
      },
  divider: {
    marginBottom: 10,
  },
});

export default Post;
