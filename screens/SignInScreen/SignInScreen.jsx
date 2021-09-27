import React, { useState, useContext }  from 'react';
import { View, Text , TextInput, StyleSheet, Button} from 'react-native';
import { AuthContext } from '../../Components/context';


const SignInScreen = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { signIn } = useContext(AuthContext);
  function submit()
  { 
    console.log( "Signin in")
    signIn()
   
    // const data = { name: username, pass: password };

    // fetch('https://example.com/profile', {
    //   method: 'POST', // or 'PUT'
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify(data),
    // })
    // .then(response => response.json())
    // .then(data => {
    //   console.log('Success:', data);
    // })
    // .catch((error) => {
    //   console.error('Error:', error);
    // });
    
  }
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Sign in Screen</Text>
            <TextInput 
      style = {styles.input} 
      placeholder = "Username"
      onChangeText = {() => setUsername}
      />
            <TextInput 
      style = {styles.input} 
      placeholder = "Password"
      onChangeText = {() => setPassword}
      />
            <Button 
            title = "Sign in"
            onPress = {() => submit()}
      />

    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    borderWidth:1,
    borderColor:'#777',
    padding: 8,
    margin: 10,
    width: 200,
  }
});



export default SignInScreen;
