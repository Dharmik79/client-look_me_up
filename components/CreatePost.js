import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Button,
  Alert,
  TextInput,
  KeyboardAvoidingView,
  Platform,
} from "react-native";

import Icon from "react-native-vector-icons/SimpleLineIcons";
import Icon2 from "react-native-vector-icons/Feather";
import Avatar from "./Avatar";
import commonApi from "../api/common";
import { useSelector } from "react-redux";
//import ImagePicker from "react-native-image-picker";
import * as ImagePicker from "expo-image-picker";
import * as Permissions from "expo-permissions";
import { CAMERA, MEDIA_LIBRARY } from "expo-permissions";
import * as MediaLibrary from "expo-media-library";
// import { Camera } from "expo-camera";
import { Camera, CameraType } from "expo-camera";

const CreatePost = ({ getPosts }) => {
  const user = useSelector((state) => state.Reducers.user);
  const token = useSelector((state) => state.Reducers.token);
  const [post, setPost] = useState({
    images: [],
    desc: "",
  });
  // The path of the picked image
  const [pickedImagePath, setPickedImagePath] = useState("");
  const handleSubmit = async () => {
    let data = {};
    if (post.desc != "") {
      data.desc = post.desc;
    }
    let images = [];
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
        .then((response) => {
          images = [name];
          console.log("success", response);
        })
        .catch((error) => {
          console.error("Error in Upload File ", error);
        });
    }
    await commonApi({
      action: "createPost",
      data: { ...data, images: images },
      config: {
        authToken: token,
      },
    })
      .then(async ({ DATA = {} }) => {
        getPosts();
        setPost({ images: [], desc: "" });
        setPickedImagePath(null);
      })
      .catch((error) => {
        console.error("Create Post", error);
      });
  };

  //Testing permissions and access gallery

  //   const pickFromGallery = async ()=>{
  //     const {granted} =  await Permissions.askAsync(Permissions.MEDIA_LIBRARY)
  //     if(granted){
  //          let data =  await ImagePicker.launchImageLibraryAsync({
  //               mediaTypes:ImagePicker.MediaTypeOptions.Images,
  //               allowsEditing:true,
  //               aspect:[1,1],
  //               quality:0.5
  //           })
  //           console.log(data)
  //           if(!data.cancelled){
  //               let newfile = {
  //                 uri:data.uri,
  //                 type:`test/${data.uri.split(".")[1]}`,
  //                 name:`test.${data.uri.split(".")[1]}`

  //             }
  //               handleUpload(newfile)
  //           }
  //     }else{
  //        Alert.alert("you need to give up permission to work")
  //     }
  //  }
  //  const pickFromCamera = async ()=>{
  //     const {granted} =  await Permissions.askAsync(Permissions.CAMERA)
  //     if(granted){
  //          let data =  await ImagePicker.launchCameraAsync({
  //               mediaTypes:ImagePicker.MediaTypeOptions.Images,
  //               allowsEditing:true,
  //               aspect:[1,1],
  //               quality:0.5
  //           })
  //           console.log(data)
  //         if(!data.cancelled){
  //             let newfile = {
  //               uri:data.uri,
  //               type:`test/${data.uri.split(".")[1]}`,
  //               name:`test.${data.uri.split(".")[1]}`

  //           }
  //             handleUpload(newfile)
  //         }
  //     }else{
  //        Alert.alert("You need to give up permission to work")
  //     }
  //  }

  // const [hasGalleryPermission, setHasGalleryPermission] = useState(null);
  // const [image, setImage] = useState(null);
  // const [video, setVideo] = useState(null);

  // useEffect(() => {
  //   (async () => {
  //     const galleryStatus =
  //       await ImagePicker.requireMediaLibraryPermissionsAsync();
  //     setHasGalleryPermission(galleryStatus.status === "granted");
  //   })();
  // }, []);

  // const pickImage = async () => {
  //   let result = await ImagePicker.launchImageLibraryAsync({
  //     mediaTypes: ImagePicker.MediaTypeOptions.Images,
  //     allowsEditing: true,
  //     aspect: [4, 3],
  //     quality: 1,
  //   });
  //   console.log(result);

  //   if (!result.cancelled) {
  //     setImage(result.uri);
  //   } else {
  //     alert("You did not select any image");
  //   }
  // };
  // if (hasGalleryPermission === false) {
  //   return;
  //   <Text>No access</Text>;
  // }

  // const pickVideo = async () => {
  //   let result = await ImagePicker.launchImageLibraryAsync({
  //     mediaTypes: ImagePicker.MediaTypeOptions.Videos,
  //     allowsEditing: true,
  //     aspect: [4, 3],
  //     quality: 1,
  //   });
  //   console.log(result);

  //   if (!result.cancelled) {
  //     setVideo(result.uri);
  //   }
  // };
  // if (hasGalleryPermission === false) {
  //   return;
  //   <Text>No access</Text>;
  // }

  //   const [hasPermission, setHasPermission] = useState(null);
  //   const [camera, setCamera] = useState(null);
  //   const [image1, setImage1] = useState(null);
  //   const [type, setType] = useState(Camera.Constants.Type.back);
  // useEffect(() => {
  //     (async () => {
  //       const { status } = await Camera.requestPermissionsAsync();
  //       setHasPermission(status === 'granted');
  //     })();
  //   }, []);
  // const takePicture = async () => {
  //     if(camera){
  //       const data = await camera.takePictureAsync(null);
  //       //console.log(data.uri)
  //       setImage(data.uri)
  //     }
  //   }
  // if (hasPermission === null) {
  //     return <View />;
  //   }
  //   if (hasPermission === false) {
  //     return <Text>No access to camera</Text>;
  //   }

  // This function is triggered when the "Select an image" button pressed
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

  const openCamera = async () => {
    // Ask the user for the permission to access the camera
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("You've refused to allow this app to access your camera!");
      return;
    }

    const result = await ImagePicker.launchCameraAsync();

    if (!result.cancelled) {
      setPickedImagePath(result);
    }
  };

  // const [type, setType] = useState(CameraType.back);
  // const [permission, requestPermission] = Camera.useCameraPermissions();

  // function toggleCameraType() {
  //   setType(current => (current === CameraType.back ? CameraType.front : CameraType.back));
  // }
  // const [image, setImage] = useState(null);

  // useEffect(()=>{
  //   (async()=> {
  //     if(Platform.OS === "ios"){
  //     const {status} = ImagePicker.requestMediaLibraryPermissionsAsync();
  //     if(status !=="granted"){
  //       alert("Sorry,not granted")
  //     }
  //     }
  //   })();
  //  const {status} = ImagePicker.requestMediaLibraryPermissionsAsync();
  // },[]);

  // const pickImage = async () => {
  //   let result = await ImagePicker.launchImageLibraryAsync({
  //     mediaTypes : ImagePicker.MediaTypeOptions.Images,
  //     allowsEditing: false
  //   })
  //   if (!result.cancelled){
  //   setImage(result.uri)
  // }
  // }

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
      {pickedImagePath && (
        <Image style={styles.photo} source={{ uri: pickedImagePath.uri }} />
      )}

      <View style={styles.row}>
        <TouchableOpacity style={styles.menuPhoto} onPress={showImagePicker}>
          {pickedImagePath && <Image source={{ uri: pickedImagePath.uri }} />}
          <Icon name="picture" size={20} color="#ffffff" />
          <Text style={styles.menuText}>Photo</Text>
        </TouchableOpacity>
        {/* <View style={styles.separator}/> */}
        {/* <Camera 
          ref={ref => setCamera(ref)} 
          style={styles.camera} 
          type={type} 
          ratio={'1:1'} 
       /> */}
        <TouchableOpacity style={styles.menuCamera} onPress={openCamera}>
          <Icon name="camera" size={20} color="#ffffff" />
          <Text style={styles.menuText}>Camera</Text>
        </TouchableOpacity>

        {/* <View style={styles.separator}/> */}
        {/* <TouchableOpacity style={styles.menuVideo} onPress={() => pickVideo()}>
          {video && <Image source={{ uri: video }} />}
          <Icon2 name="video" size={20} color="#ffffff" />
          <Text style={styles.menuText}>Video</Text>
        </TouchableOpacity> */}
        {/* <View style={styles.separator}/> */}
        <TouchableOpacity
          onPress={handleSubmit}
          style={styles.menuPost}
          disabled={post.desc == "" && post.images.length == 0}
        >
          <Icon2 name="send" size={20} color="#ffffff" />
          <Text style={styles.menuText}>Post</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    //flex: 1,
    width: "100%",
    // height: 435,
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
    //marginBottom:10,
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
    height: 40,
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
    height: 40,
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
    height: 40,
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
    fontSize: 15,
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
