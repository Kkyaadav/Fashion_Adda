import { CameraView, CameraType, useCameraPermissions, Camera } from 'expo-camera';
import { useState, useRef } from 'react';
import { Button, StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native';
import * as FileSystem from 'expo-file-system';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useRouter } from 'expo-router';

function Cameraa() {
  const [facing, setFacing] = useState<CameraType>('back');
  const [permission, requestPermission] = useCameraPermissions();
  const [photoUri, setPhotoUri] = useState<string | null>(null);
  const cameraRef = useRef<Camera>(null);
  const router = useRouter();

  if (!permission) {
    // Camera permissions are still loading.
    return <View />;
  }

  if (!permission.granted) {
    // Camera permissions are not granted yet.
    return (
      <View style={styles.container}>
        <Text style={styles.message}>We need your permission to show the camera</Text>
        <Button onPress={requestPermission} title="grant permission" />
      </View>
    );
  }

  function toggleCameraFacing() {
    setFacing(current => (current === 'back' ? 'front' : 'back'));
  }

  async function capturePhoto() {
    if (cameraRef.current) {
      const photo = await cameraRef.current.takePictureAsync();
      const fileUri = FileSystem.documentDirectory + 'photo.jpg';
      await FileSystem.moveAsync({
        from: photo.uri,
        to: fileUri,
      });
      setPhotoUri(fileUri);
      console.log('Photo saved to:', fileUri);
    }
  }

  function retakePhoto() {
    setPhotoUri(null);
  }

  function goToWaitingScreen() {
    router.push('/screen/Loading');
  }

  return (
    <View style={styles.container}>
      {photoUri ? (
        <View style={styles.container}>
          <Image source={{ uri: photoUri }} style={styles.capturedPhoto} />
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.circleButton} onPress={retakePhoto}>
              <Icon name="refresh" size={24} color="black" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.circleButton} onPress={goToWaitingScreen}>
              <Icon name="arrow-right" size={24} color="black" />
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        <CameraView style={styles.camera} facing={facing} ref={cameraRef}>
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.circleButton} onPress={toggleCameraFacing}>
              <Icon name="refresh" size={24} color="white" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.circleButton} onPress={capturePhoto}>
              <Icon name="camera" size={24} color="white" />
            </TouchableOpacity>
          </View>
        </CameraView>
      )}
    </View>
  );
}

export default Cameraa;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  message: {
    textAlign: 'center',
    paddingBottom: 10,
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 30,
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'center',
    gap: 10,
  },
  circleButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
   borderWidth:1,
   borderColor:'gray',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  capturedPhoto: {
    flex: 1,
    resizeMode: 'contain',
  },
});