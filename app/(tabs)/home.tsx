import React, { useState } from 'react';
import { SafeAreaView, TouchableOpacity, View, Text, StyleSheet, Image } from 'react-native';
import { useRouter } from 'expo-router';
import Icon from 'react-native-vector-icons/FontAwesome';

// Main Screen Component
export default function Index() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Text style={{ textAlign: 'left', paddingLeft: 10, fontSize: 30, marginTop: 20, color: 'black',fontWeight:'200' }}>
          Welcome to
        </Text>
        <Text style={{ textAlign: 'left', paddingLeft: 10, fontSize: 30, fontWeight: 'bold' }}>Fashion Adda</Text>
        <Text style={{ textAlign: 'center', fontSize: 16, marginTop: 2, color: 'gray' }}>
          Scan the image of a product to get more information.
        </Text>
      </View>
      <View style={styles.main}>
        <Image
          source={require('../../assets/images/pic_1.jpg')}
          style={{
            width: '100%',
            height: 520,
            objectFit: 'contain',
          }}
        />
        <TouchableOpacity style={styles.scannerButton} onPress={() => router.push('/screen/Cameraa')}>
        <Icon name="camera" size={20} color="white" style={styles.icon} />
        <Text style={styles.scannerButtonText}>Open Camera</Text>
      </TouchableOpacity>
      </View>
      
    </SafeAreaView>
  );
}

// Main App Component
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'ghost',
    paddingTop: 50,
  },
  headerContainer: {
    backgroundColor: 'black',
    padding: 20,
    alignItems: 'center',
  },
 
  scannerButton: {
    backgroundColor: 'black',
    padding: 15,
    borderRadius: 5,
    margin: 20,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  scannerButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 10,
  
  },
  icon: {
    marginRight: 10,
  },
  main:{
    marginTop:20,
    backgroundColor:'white',
    borderTopLeftRadius:40,
    borderTopRightRadius:40,
   height:"100%",
  elevation:50,
  }
});