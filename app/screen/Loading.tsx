import React from 'react';
import { View, Text, StyleSheet, Image, ActivityIndicator } from 'react-native';

function Loading() {
  return (
    <View style={styles.container}>
        <View style={styles.textb}>
      <Text style={styles.title}>Please Hold On ...</Text>
      <Text style={styles.subtitle}>we are fetching your Matchings.</Text>
      </View>
      <Image
        source={require('../../assets/images/ttfinal.gif')}
        style={styles.image}
        resizeMode="contain"
      />
      <ActivityIndicator size="large" color="#0000ff" style={styles.spinner} />
    </View>
  );
}

export default Loading;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    height: '100%',
    paddingTop:25
  },
  textb:{
   paddingLeft:20
  },
  title: {
    fontFamily: 'outfit-medium',
    fontSize: 26,
    fontWeight: 'bold',
  },
  subtitle: {
    fontFamily: 'outfit',
    fontSize: 17,
    marginBottom: 20,
  },
  image: {
    width: '100%',
    height: 300, // Set a fixed height to ensure the image is visible
  },
  spinner: {
    marginTop: 20,
  },
});