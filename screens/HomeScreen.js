import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  ScrollView,
  SafeAreaView,
  RefreshControl,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import TopBar from "../components/TopBar";
import CreatePost from "../components/CreatePost";
import GroupsHome from "./GroupsHome";
import Story from "../components/Story";
import Post from "../components/Post";
import BottomTabNavigator from "../components/BottomTabNavigator";
import commonApi from "../api/common";
import NoPost from "react-native-vector-icons/Entypo";

import { useSelector } from "react-redux";
const HomeScreen = ({ navigation }) => {
  const [refresh, setRefresh] = useState(false);

  const [posts, setPosts] = useState([]);
  const user = useSelector((state) => state.Reducers.user);
  const token = useSelector((state) => state.Reducers.token);
  const getPosts = async () => {
    await commonApi({
      action: "findAllPost",
      data: {
        options: {
          pagination: false,
          populate: [
            {
              path: "userId",
              model: "user",
              select: ["_id", "fullName", "profilePicture"],
            },
            {
              path: "comments.userId",
              model: "user",
              select: ["_id", "fullName", "profilePicture"],
            },
          ],
          sort: { createdAt: -1 },
        },
      },
      config: {
        authToken: token,
      },
    })
      .then(async ({ DATA = {} }) => {
        setPosts(DATA.data);
        setRefresh(false);
      })
      .catch((error) => {
        console.error("Fetch Posts", error);
      });
  };
  const pullMe = () => {
    setRefresh(true);
    getPosts();
  };
  useEffect(() => {
    getPosts();
  }, [user]);
  return (
    // <KeyboardAwareScrollView>
    // <>
    // <StatusBar backgroundColor="#ffffff"
    // barStyle="dark-content">
    <View style={styles.container}>
      <TopBar getPosts={getPosts} navigation={navigation} />
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refresh} onRefresh={() => pullMe()} />
        }
      >
        <CreatePost getPosts={getPosts} />
        {/* <Story />
        <GroupsHome />*/}
        <Post getPosts={getPosts} posts={posts} />
        {posts.length == 0 && (
          <View style={styles.noPostsFound}>
            <NoPost name="camera" size={50} color="grey" />
            <Text style={{ fontSize: 22, color: "grey", marginTop: 5 }}>
              No Post Found
            </Text>
          </View>
        )}
        {/* <SafeAreaView
          style={styles.bottomNavigation}
        >
          <BottomTabNavigator />
        </SafeAreaView> */}
      </ScrollView>
    </View>
    // {/* </StatusBar> */}
    // </>
    // </KeyboardAwareScrollView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    marginTop: 35,
    //padding:10,
    //paddingLeft:10,
    //paddingRight:10,
  },
  bottomNavigation: {
    flex: 1,
    width: "100%",
    height: "100%",
    justifyContent: "flex-end",
    backgroundColor: "#3491ff",
  },
  noPostsFound: {
    alignItems: "center",
    marginTop: 20,
  },
});

// import React, { useEffect } from "react";
// import {
//   View,
//   Text,
//   AsyncStorage,
//   Button,
//   BackHandler,
//   Alert,
// } from "react-native";

// const HomeScreen = ({ navigation }) => {
//   useEffect(async () => {
//     let getData = await AsyncStorage.getItem("User");
//     const backPressed = () => {
//       Alert.alert(
//         "Exit App",
//         "Do you want to exit?",
//         [
//           {
//             text: "No",
//             onPress: () => console.log("Cancel Pressed"),
//             style: "cancel",
//           },
//           { text: "Yes", onPress: () => BackHandler.exitApp() },
//         ],
//         { cancelable: false }
//       );
//       return true;
//     };
//     const backHandler = BackHandler.addEventListener(
//       "hardwareBackPress",
//       backPressed
//     );
//     return () => backHandler.remove();
//   }, []);
//   return (
//     <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
//       <Text>Home Screen</Text>
//       <Button
//         title="Login"
//         onPress={() => {
//           navigation.navigate("AuthScreen", {
//             screen: "LoginScreen",
//           });
//         }}
//       ></Button>
//     </View>
//   );
// };

export default HomeScreen;
