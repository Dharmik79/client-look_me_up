import React, { useRef, useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Button,
  Modal,
  TextInput,
  KeyboardAvoidingView,
  TouchableHighlight,
} from "react-native";

import "react-native-gesture-handler";
import {
  BottomSheetModal,
  BottomSheetModalProvider,
} from "@gorhom/bottom-sheet";

//   import { CheckBox } from "react-native-btr";
import Icon from "react-native-vector-icons/Feather";
import { useDispatch } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Logout } from "./context/Actions";
import { presentPermissionsPickerAsync } from "expo-media-library";
import ActionSheet from "react-native-actionsheet";
import EditProfile from "../screens/EditProfile";
const TopBar = ({ navigation, getPosts,searchValue, setSearchValue }) => {
  let actionSheet = useRef();
  let optionArray = ["Edit Profile", "Change Password", "Log Out", "Cancel"];
  const showActionSheet = () => {
    actionSheet.current.show();
  };
  const [modalOpen, setmodalOpen] = useState(false);
  const BottomSheetModalRef = useRef(null);

  const snapPoints = ["48"];

  function handlePresentModal() {
    BottomSheetModalRef.current?.present();
  }

  const dispatch = useDispatch();

  const logout = async () => {
    try {
      await dispatch(Logout());
      setmodalOpen(false);
    } catch (e) {
      console.error(e);
    }
  };

  const selectAction = async (index) => {
    if (index == 0) {
      // Navigate to Profile screen

      navigation.navigate("EditProfile", {
        screen: "EditProfile",
      });
    }
    if (index == 1) {
      // {
      //   // Navigate to change password screen
      //   console.log("Chnage Password");
      // }
      // Navigate to Change Passeord screen

      navigation.navigate("ChangePasswordScreen", {
        screen: "ChangePasswordScreen",
      });
    }
    if (index == 2) {
      setmodalOpen(true);
    }
    if (index == 4) {
      setmodalOpen(false);
    }
  };
  useEffect(() => {
    if (searchValue!="") {
      getPosts({
        desc: { $regex: searchValue, $options: "i" },
        showPosts: true,
      });
    }
    else
    {
      getPosts()
    }
  }, [searchValue]);
  return (
    // <BottomSheetModalProvider>

    <View style={styles.container}>
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
              You really want to logout?
            </Text>
            <View style={styles.fixButtons}>
              {/* <Button
          title="Delete"
          color={'red'}
        /> */}
              <View style={styles.deletePost}>
                <TouchableOpacity onPress={logout}>
                  <Text style={styles.deleteYes}>Logout</Text>
                </TouchableOpacity>
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

      {/* <Text style={styles.textLogo}>Look Me Up</Text> */}

      <Image style={styles.textLogo2} source={require("../assets/logo.png")} />

      <View style={styles.topBarRow}>
        <TouchableOpacity style={styles.searchButton}>
          <TextInput
            style={styles.searchText}
            placeholder="Search"
            onChangeText={(e) => {
              setSearchValue(e);
            }}
            value={searchValue}
          ></TextInput>
          <Icon name="search" size={25} color="#3491ff" />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.settingsButton}
          onPress={showActionSheet}
        >
          <Icon name="settings" size={22} color="grey" />
        </TouchableOpacity>
        {/* <BottomSheetModal ref={BottomSheetModalRef}
      index={0}
      snapPoints={snapPoints}
      // style={{height:'20%',width:'100%'}}
      >
        <View >
<Text style={{fontSize:55, color:'red',textAlign:'center'}}>Hello</Text>
        </View>
      </BottomSheetModal> */}
      </View>
      <ActionSheet
        styles={styles}
        ref={actionSheet}
        title={"Settings"}
        options={optionArray}
        cancelButtonIndex={3}
        destructiveButtonIndex={3}
        onPress={selectAction}
      ></ActionSheet>
    </View>

    // </BottomSheetModalProvider>
  );
};
const styles = StyleSheet.create({
  container: {
    // flex: 1,
    width: "100%",
    height: 80,
    // padding: 10,
    //borderWidth:2,
    // backgroundColor: "#3491ff",
    //marginTop: 35,
    flexDirection: "row",
    justifyContent: "space-between",
    // justifyContent:'center',
    alignItems: "center",
  },
  textLogo: {
    color: "#ffffff",
    fontSize: 24,
    fontWeight: "bold",
    letterSpacing: -0.3,
  },
  textLogo2: {
    height: 100,
    width: "28%",
  },
  topBarRow: {
    flexDirection: "row",
  },
  searchButton: {
    width: "66%",
    height: 42,
    borderRadius: 10,
    padding: 5,
    backgroundColor: "#F6F6F6",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginLeft: 5,
  },
  searchText: {
    fontSize: 20,
    color: "#bababa",
    width: "80%",
    marginLeft: 5,
  },
  settingsButton: {
    width: "15%",
    height: 42,
    borderRadius: 10,
    backgroundColor: "#F6F6F6",
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 5,
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
export default TopBar;
