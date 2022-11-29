import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Modal,
  StyleSheet,
  Image,
  TouchableOpacity,
  Button,
  Share,
  TextInput,
  KeyboardAvoidingView,
  ScrollView,
  FlatList,
} from "react-native";
import Icon from "react-native-vector-icons/Entypo";
import Like from "react-native-vector-icons/AntDesign";
import Comment from "react-native-vector-icons/MaterialCommunityIcons";
import Shares from "react-native-vector-icons/MaterialIcons";
import moment from "moment";
import Avatar from "./Avatar";
import { baseUrl } from "../api/index";
import Send from "react-native-vector-icons/MaterialIcons";
import DropDown from "react-native-vector-icons/MaterialCommunityIcons";
import commonApi from "../api/common";
// import Shares from "react-native-vector-icons/MaterialIcons";
import { useSelector } from "react-redux";
import SingleComment from "./singleComment";
import { useDispatch } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
const singlePost = ({ item, getPosts }) => {
  item = item.item;
  const { likes, comments } = item;
  const [modalOpen, setmodalOpen] = useState(false);
  const user = useSelector((state) => state.Reducers.user);
  const token = useSelector((state) => state.Reducers.token);
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(likes.length);
  const [com, setCom] = useState("");
  const [showComment, setShowComment] = useState(false);
  const dispatch = useDispatch();
  const getProfile = async () => {
    await commonApi({
      action: "getProfile",
      config: {
        authToken: token,
      },
    }).then(async ({ DATA }) => {
      dispatch({ type: "UPDATE_USER", payload: DATA });
      await AsyncStorage.setItem("user", JSON.stringify(DATA));
    }).catch((error)=>{
      console.error("Error",error)
    })
  };

  // const [isActive, setIsActive] = useState(false);

  //   const onPressComment = () =>{
  //     setIsActive(true);
  //   }

  const deletePost = async (id) => {
    await commonApi({
      action: "deletePost",
      parameters: [id],
      config: {
        authToken: token,
      },
    })
      .then(async ({ DATA = {} }) => {
        getPosts();
        getProfile();
        setmodalOpen(false);
      })
      .catch((error) => {
        console.error("Delete Post", error);
      });
  };
  let url = baseUrl + "assets/" + item.userId.profilePicture;
  const dislikeHandler = async () => {
    await commonApi({
      action: "likeDisLike",
      data: {
        action: 1,
        postId: item._id,
      },
      config: {
        authToken: token,
      },
    })
      .then(async ({ DATA = {} }) => {
        getPosts();
        setLikeCount(likeCount - 1);
        setIsLiked(!isLiked);
      })
      .catch((error) => {
        console.error("Like -Dislike", error);
      });
  };
  const likeHandler = async () => {
    await commonApi({
      action: "likeDisLike",
      data: {
        action: 0,
        postId: item._id,
      },
      config: {
        authToken: token,
      },
    })
      .then(async ({ DATA = {} }) => {
        getPosts();
        setLikeCount(likeCount + 1);
        setIsLiked(!isLiked);
      })
      .catch((error) => {
        console.error("Like -Dislike", error);
      });
  };

  const createComment = async () => {
    await commonApi({
      action: "createComment",
      data: {
        postId: item._id,
        comment: com,
      },
      config: {
        authToken: token,
      },
    })
      .then(async ({ DATA = {} }) => {
        setCom("");
        getPosts();
      })
      .catch((error) => {
        console.error("Create Comment : ", error);
      });
  };
  useEffect(() => {
    setIsLiked(likes.includes(user._id));
    setLikeCount(likes.length)
  }, [likes, user._id]);

  const onShare = async () => {
    try {
      const result = await Share.share({
        
        message: (item.userId.fullName) + ' posted on LookMeUp : ' + (item.desc),
        url: (baseUrl + "assets/" + item.images[0]),
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <View style={styles.container} key={item._id}>
      <Modal visible={modalOpen} animationType="slide" transparent={true}>
        <View style={styles.centeredView}>
          <View style={styles.modalContent}>
            <Text
              style={{
                fontWeight: "bold",
                fontSize: 16,
                textAlign: "center",
              }}
            >
              You really want to delete this masterpiece?
            </Text>
            <View style={styles.fixButtons}>
              {/* <Button
            title="Delete"
            color={'red'}
          /> */}
              <View style={styles.deletePost}>
                <Text
                  style={styles.deleteYes}
                  onPress={() => {
                    deletePost(item._id);
                  }}
                >
                  Delete
                </Text>
              </View>

              <View style={styles.deletefix}>
                {/* <Button
            title="Cancel"
            onPress={() => {
              setmodalOpen(false)
            }}
          /> */}
                <View style={styles.cancelPost}>
                  <Text
                    style={styles.deleteCancel}
                    onPress={() => {
                      setmodalOpen(false);
                    }}
                  >
                    Cancel
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </View>
      </Modal>

      <View style={styles.header}>
        <View style={styles.row}>
          {item.userId.profilePicture && (
            <Image
              source={{
                uri: url,
              }}
              style={{ width: 40, height: 40, borderRadius: 100 }}
            />
          )}
          {!item.userId.profilePicture && (
            <Avatar source={require("../assets/a3.png")} />
          )}
          <View style={{ paddingLeft: 10 }}>
            <Text style={styles.user}>{item.userId.fullName}</Text>

            <View style={styles.row}>
              <Text style={styles.postTime}>
                {moment(item.createdAt).fromNow()}
              </Text>
            </View>
          </View>
        </View>
        {item.userId._id === user._id && (
          <TouchableOpacity onPress={() => setmodalOpen(true)}>
            <Icon name="dots-three-vertical" size={20} />
          </TouchableOpacity>
        )}
      </View>

      <Text style={styles.post}>{item.desc}</Text>
      {item.images[0] && (
        <Image
          style={styles.photo}
          source={{ uri: baseUrl + "assets/" + item.images[0] }}
        />
      )}
      <View style={styles.footer}>
        <View style={styles.footerCount}>
          <View style={styles.row}>
            <View style={styles.likeCount}>
              <Image
                source={require("../assets/nooflikes.png")}
                // style={{ width: 80, height: 80, borderRadius: 100 }}
              />
            </View>
            <Text style={styles.noLikesCount}>{likeCount} Likes</Text>
          </View>
          <Text style={styles.noCommentsCount}>{comments.length} Comments</Text>
        </View>
        <View style={styles.separator} />

        <View style={styles.footerMenu}>
          {isLiked && (
            <TouchableOpacity style={styles.button} onPress={dislikeHandler}>
              <View style={styles.icon}>
                <Like name="heart" size={15} color="red" />
              </View>
              <Text style={styles.text}>Like</Text>
            </TouchableOpacity>
          )}
          {!isLiked && (
            <TouchableOpacity style={styles.button} onPress={likeHandler}>
              <View style={styles.icon}>
                <Like name="hearto" size={15}  />
              </View>
              <Text style={styles.text}>Like</Text>
            </TouchableOpacity>
          )}
          {showComment && (<TouchableOpacity
            style={styles.button1}
            onPress={() => {
              setShowComment(!showComment) ;

            }}
          >
            <View style={styles.icon}>
              <Comment name="comment-text-outline" size={15} color='#3491ff' />
            </View>
            <Text style={styles.text1}>Comment</Text>
          </TouchableOpacity>
          )}


          
          {!showComment && (<TouchableOpacity
            style={styles.button}
            onPress={() => {
              setShowComment(!showComment) ;

            }}
          >
            <View style={styles.icon}>
              <Comment name="comment-text-outline" size={15} />
            </View>
            <Text style={styles.text}>Comment</Text>
          </TouchableOpacity>
          )}
          <TouchableOpacity style={styles.button} onPress={onShare}>
            <View style={styles.icon}>
              <Shares name="share" size={15} />
            </View>
            <Text style={styles.text}>Share</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.separator} />

        <View style={styles.footerMenu}>
          <View style={styles.button}>
            <View style={styles.icon}>
            {user.profilePicture && (
              <Image
                source={{
                  uri: baseUrl+"assets/"+user.profilePicture,
                }}
                style={{ width: 40, height: 40, borderRadius: 100 }}
              />
            )}
            {!user.profilePicture && (
              <Avatar source={require("../assets/a3.png")} />
            )}
            </View>
            <View style={styles.commentBox}>
              <TextInput
                style={styles.textInput}
                placeholder="Write a comment"
                value={com}
                onChangeText={(e) => setCom(e)}
              ></TextInput>
              {
                (com == "")
                ?
                (
                  <TouchableOpacity disabled={true}>
                    <Send
                      name="send"
                      size={20}
                      color="#BABABA"
                      disabled={com == ""}
                      onPress={createComment}
                  />
                  </TouchableOpacity>
                )
                :
                (
                  <TouchableOpacity disabled={false}>
                    <Send
                      name="send"
                      size={20}
                      color="#3491ff"
                      disabled={com == ""}
                      onPress={createComment}
                  />
                  </TouchableOpacity>
                )
              }
              
            </View>
          </View>
        </View>
        {/* <View style={styles.commentsViewFilter}>
          <Text style={styles.commentsView}>Most Recent</Text>
          <TouchableOpacity>
            <DropDown name="filter" size={18} />
          </TouchableOpacity>
        </View> */}
        {showComment && (
          <FlatList
            data={comments}
            renderItem={(item) => <SingleComment item={item} />}
            keyExtractor={(item) => item._id}
          />
        )}
      </View>
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
  button1: {
    flexDirection: "row",
    alignItems: "center",
    //backgroundColor:"#3491ff",
   // borderRadius:10,
   // paddingLeft:10,
   // paddingRight:10,
   // height:30,
    //borderColor:'#3491ff',
   // borderWidth:2,
    
  },
  commentbutton: {
    flexDirection: "row",
    alignItems: "center",
    
    backgroundColor:'#3491ff',
  },

  icon: {
    marginRight: 6,
  },
  text: {
    fontSize: 14,
  },
  text1: {
    fontSize: 14,
    color:'#3491ff',
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
    width: "87.5%",
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

export default singlePost;
