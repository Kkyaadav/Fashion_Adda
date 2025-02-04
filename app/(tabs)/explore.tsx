
import {View,Text,StyleSheet} from 'react-native';

export default function TabTwoScreen() {
  return (
   <View style={styles.container}>
    <View>
      <Text style={styles.title}>Result</Text>
    </View>
   </View>
  );
}

const styles = StyleSheet.create({
 container:{
  backgroundColor:'white',
  height:'100%',
  paddingTop:25,
  padding:10
 },
 title:{
  fontFamily:'outfit-medium',
  fontSize:26,
  fontWeight:'bold',
  marginTop:20,

 }
});
