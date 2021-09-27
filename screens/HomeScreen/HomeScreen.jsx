import React from 'react';
import { View, Text, Button } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { AuthContext } from '../../Components/context';
import  {useContext }  from 'react';
const HomeScreen = ({navigation}) => {

  const { signOut } = useContext(AuthContext);
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Home Screen</Text>
      <Button 
      title ="Sign Out" 
      onPress = {() => signOut()}
      />
      <StatusBar style='auto' />
    </View>
  );
};

export default HomeScreen;
