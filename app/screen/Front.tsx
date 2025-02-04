import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import React from 'react';
import { useRouter } from 'expo-router';
import { AntDesign } from '@expo/vector-icons';

export default function Front() {
  const router = useRouter();

  return (
    <View style={styles.main}>
      <Image
        source={require('../../assets/images/pic_1.jpg')}
        style={{
          marginTop:120,
          paddingTop: 90,
          width: 420,
          height: 420,
          objectFit: 'cover',
        }}
      />
      <View style={styles.container}>
        <Text style={styles.title}>Fashion Adda</Text>
        <Text style={styles.description}>
          Discover your next adventure destination effortlessly. Planning your Trips at your fingertips. Travel smarter with AI-driven insights.
        </Text>

        <TouchableOpacity style={styles.button} onPress={() => router.push('/(tabs)/home')}>
          <Text style={styles.buttonText}>Get Started</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  main:{
    backgroundColor:'white',
  },
  container: {
    backgroundColor: 'ghostwhite',
    marginTop: -20,
    height: '100%',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    padding: 25,
  },
  title: {
    fontSize: 30,
    fontFamily: 'outfit-bold',
    textAlign: 'center',
    fontWeight:'bold',
    marginTop: 10,
  },
  description: {
    fontFamily: 'outfit',
    fontSize: 17,
    textAlign: 'center',
    color: 'gray',
    marginTop: 20,
  },
  button: {
    backgroundColor: 'black',
    padding: 15,
    borderRadius: 5,
    marginTop: 20,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});