import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ToastAndroid,
  Image,
  StyleSheet,
  TextInput,
} from "react-native";
import Ionic from "react-native-vector-icons/Ionicons";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import commonApi from "../api/common";
import { useSelector } from "react-redux";
import * as yup from "yup";
import { Formik } from "formik";
import { useDispatch } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Switch } from "react-native-gesture-handler";
import * as ImagePicker from "expo-image-picker";
import { baseUrl } from "../api/index";
const profileSchema = yup.object().shape({
  firstName: yup.string().required("First Name is required"),
  lastName: yup.string().required("Last Name is required"),
  phone: yup.string().required("Phone number is required"),
});
const EditProfile = ({ navigation }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.Reducers.user);
  const token = useSelector((state) => state.Reducers.token);
  const [privateAccount, setPrivateAccount] = useState(
    user.accountType == "private" ? true : false
  );
  const [pickedImagePath, setPickedImagePath] = useState(null);
  const [path, setPath] = useState(
    user.profilePicture ? user.profilePicture : ""
  );

  const updateAccountType = async () => {
    let data = {
      accountType: privateAccount ? "public" : "private",
    };
    setPrivateAccount(!privateAccount);
    await commonApi({
      action: "updateProfile",
      data: data,
      config: {
        authToken: token,
      },
    })
      .then(async ({ DATA = {} }) => {
        dispatch({ type: "UPDATE_USER", payload: DATA });
        await AsyncStorage.setItem("user", JSON.stringify(DATA));
        setPickedImagePath(null);
      })
      .catch((error) => {
        console.error(error);
      });
  };
  const updateProfile = async (data, setFieldError, setSubmitting) => {
    await commonApi({
      action: "updateProfile",
      data: {
        ...data,
        phone: {
          countryCode: "+1",
          phone: data.phone,
        },
      },
      config: {
        authToken: token,
      },
    })
      .then(async ({ DATA = {} }) => {
        dispatch({ type: "UPDATE_USER", payload: DATA });
        await AsyncStorage.setItem("user", JSON.stringify(DATA));

        // Navigate to Home Screen
        navigation.navigate("HomeScreen", {
          screen: "Home",
        });
      })
      .catch((error) => {
        console.error("error", error);
        setFieldError(error.DATA, error.MESSAGE);
        setSubmitting(true);
      });
  };

  // The path of the picked image

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
      if (pickedImagePath) {
        let formData = new FormData();
        let name = Date.now() + ".PNG";
        formData.append("photo", {
          name: name,
          type: pickedImagePath.type,
          uri: pickedImagePath.uri,
        });
        await commonApi({
          action: "upload",
          data: formData,
          config: {
            contentType: "multipart/form-data",
          },
        })
          .then(async (response) => {
            setPath(name);
            await commonApi({
              action: "updateProfile",
              data: {
                profilePicture: name,
              },
              config: {
                authToken: token,
              },
            })
              .then(async ({ DATA = {} }) => {
                dispatch({ type: "UPDATE_USER", payload: DATA });
                await AsyncStorage.setItem("user", JSON.stringify(DATA));
                
              })
              .catch((error) => {
                console.error("error", error);
              });
          })
          .catch((error) => {
            console.error("Error in Upload File ", error);
          });
      }
    }
  };

  return (
    <KeyboardAwareScrollView style={{ backgroundColor: "#ffffff" }}>
      <Formik
        initialValues={{
          firstName: user.firstName,
          lastName: user.lastName,
          phone: user.phone.phone,
        }}
        validateOnBlur={true}
        validateOnChange={true}
        validateOnMount={true}
        onSubmit={(values, { setFieldError, setSubmitting }) => {
          updateProfile(values, setFieldError, setSubmitting);
        }}
        validationSchema={profileSchema}
      >
        {(props) => (
          <View style={styles.container}>
            <View style={styles.topBar}>
              <TouchableOpacity
                onPress={() => {
                  navigation.goBack();
                }}
              >
                <Ionic name="close-outline" style={{ fontSize: 35 }} />
              </TouchableOpacity>
              <Text style={{ fontSize: 16, fontWeight: "bold" }}>
                Edit Profile
              </Text>
              <TouchableOpacity onPress={props.handleSubmit}>
                <Ionic
                  name="checkmark"
                  style={{ fontSize: 35, color: "#3491ff" }}
                />
              </TouchableOpacity>
            </View>
            <TouchableOpacity
              style={{ padding: 20, alignItems: "center" }}
              onPress={showImagePicker}
            >
              {pickedImagePath && (
                <Image
                  source={{
                    uri: pickedImagePath.uri,
                  }}
                  style={{ width: 80, height: 80, borderRadius: 100 }}
                />
              )}
              {!pickedImagePath && path && (
                <Image
                  source={{
                    uri: baseUrl + "assets/" + path,
                  }}
                  style={{ width: 80, height: 80, borderRadius: 100 }}
                />
              )}
              {!pickedImagePath && !path && (
                <Image
                  source={{
                    uri: require("../assets/4.jpg"),
                  }}
                  style={{ width: 80, height: 80, borderRadius: 100 }}
                />
              )}
              <Text
                style={{
                  color: "#3493D9",
                }}
              >
                Change profile photo
              </Text>
            </TouchableOpacity>
            <View style={{ padding: 10 }}>
              <View>
                <Text
                  style={{
                    opacity: 0.5,
                  }}
                >
                  First Name
                </Text>
                <TextInput
                  placeholder="First Name"
                  keyboardType="default"
                  style={styles.textInputEdit}
                  onChangeText={props.handleChange("firstName")}
                  value={props.values.firstName}
                  onBlur={props.handleBlur("firstName")}
                />
                {props.errors.firstName && props.touched.firstName && (
                  <Text style={styles.errors}>{props.errors.firstName}</Text>
                )}
              </View>
              <View>
                <Text
                  style={{
                    opacity: 0.5,
                  }}
                >
                  Last Name
                </Text>
                <TextInput
                  placeholder="Last Name"
                  keyboardType="default"
                  style={styles.textInputEdit}
                  onChangeText={props.handleChange("lastName")}
                  value={props.values.lastName}
                  onBlur={props.handleBlur("lastName")}
                />
                {props.errors.lastName && props.touched.lastName && (
                  <Text style={styles.errors}>{props.errors.lastName}</Text>
                )}
              </View>
              <View>
                <Text
                  style={{
                    opacity: 0.5,
                  }}
                >
                  Mobile Number
                </Text>
                <TextInput
                  placeholder="Mobile Number"
                  style={styles.textInputEdit}
                  keyboardType="numeric"
                  maxLength={10}
                  onChangeText={props.handleChange("phone")}
                  value={props.values.phone}
                  onBlur={props.handleBlur("phone")}
                />
                {props.errors.phone && props.touched.phone && (
                  <Text style={styles.errors}>{props.errors.phone}</Text>
                )}
              </View>
              <View>
                <Text
                  style={{
                    opacity: 0.5,
                  }}
                >
                  Password
                </Text>
                <TextInput
                  placeholder="Change Password"
                  style={styles.textInputEdit}
                />
              </View>
              {/* <View style={{ paddingVertical: 10 }}>
          <TextInput
            placeholder="Website"
            style={{
              fontSize: 16,
              borderBottomWidth: 1,
              borderColor: "#CDCDCD",
            }}
          />
        </View>
        <View style={{ paddingVertical: 10 }}>
          <TextInput
            placeholder="Bio"
            style={{
              fontSize: 16,
              borderBottomWidth: 1,
              borderColor: "#CDCDCD",
            }}
          />
        </View> */}
            </View>
            <TouchableOpacity
              style={{
                flexDirection: "row",
                width: "100%",
                alignItems: "center",
                justifyContent: "space-between",
                paddingLeft: 10,
                paddingRight: 10,
              }}
            >
              <Text style={styles.accountChange}>
                Switch to Private account
              </Text>
              <Switch value={privateAccount} onChange={updateAccountType} />
            </TouchableOpacity>
          </View>
        )}
      </Formik>
    </KeyboardAwareScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    marginTop: 35,
    flexDirection: "column",

    width: "100%",
    height: "100%",
    backgroundColor: "white",
    marginTop: 35,

    // backgroundColor: '#fff',
    // alignItems: 'center',
    // justifyContent: 'center',
  },
  topBar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 10,
  },

  textInputEdit: {
    height: 40,
    //margin: 12,
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    borderColor: "#CDCDCD",
    marginTop: 5,
    marginBottom: 5,
  },
  accountChange: {
    //paddingLeft: 10,
    color: "#3491ff",
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: "#EFEFEF",
    marginRight: 10,
  },
  errors: {
    color: "red",
    marginBottom: 5,
  },
});

export default EditProfile;
