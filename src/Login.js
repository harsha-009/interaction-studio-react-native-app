import React, {Component,useState, useEffect}  from 'react';
import {View, Text, Touchable, TouchableOpacity,NativeModules,Alert} from 'react-native';
import Background from './Background';
import Btn from './Btn';
import {darkGreen} from './Constants';
import Field from './Field';
import auth from '@react-native-firebase/auth';
import { NavigationContainer, useNavigationContainerRef } from "@react-navigation/native";
//import {auth,signInWithEmailAndPassword} from '@react-native-firebase/auth';
//import InteractionStudioModule from './android/app/src/main/java/com/myreactnativeapp';
const { InteractionStudioModule } = NativeModules;
const Login = (props) => {
//state = {
//Email: "",
//};
//handleEmailChange = email => {
//this.setState({ Email: email });
//};
const [email, onChangeText] = React.useState('Enter Email');
  const [password, onChangeText2] = React.useState('Enter Password');
  const login = async() => {
          //setShowLoading(true);
          try {
              const doRegister = await auth().signInWithEmailAndPassword(email, password);
              //setShowLoading(false);
              if(doRegister.user) {
                  //navigation.navigate('Home');
                  props.navigation.navigate("Home");
              }
          } catch (e) {
              //setShowLoading(false);
              Alert.alert(
                  e.message
              );
          }
      };
  return (
    <Background>
      <View style={{alignItems: 'center', width: 460}}>
        <Text
          style={{
            color: 'white',
            fontSize: 64,
            fontWeight: 'bold',
            marginVertical: 20,
          }}>
          Login
        </Text>
        <View
          style={{
            backgroundColor: 'white',
            height: 700,
            width: 460,
            borderTopLeftRadius: 130,
            paddingTop: 100,
            alignItems: 'center',
          }}>
          <Text style={{fontSize: 40, color: darkGreen, fontWeight: 'bold'}}>
            Welcome Back
          </Text>
          <Text
            style={{
              color: 'grey',
              fontSize: 19,
              fontWeight: 'bold',
              marginBottom: 20,
            }}>
            Login to your account
          </Text>
          <Field

            placeholder="Email"
            keyboardType={'email-address'}
            onChangeText={text => onChangeText(text)}
            //defaultValue={text}
            value={email}
          />
          <Field
          placeholder="Password"
          secureTextEntry={true}
          onChangeText={text => onChangeText2(text)}
          value={password}
          />
          <View
            style={{alignItems: 'flex-end', width: '78%', paddingRight: 16, marginBottom: 200}}>
            <Text style={{color: darkGreen, fontWeight: 'bold', fontSize: 16}}>
              Forgot Password ?
            </Text>
          </View>
          <Btn textColor='white' bgColor={darkGreen} btnLabel="Login"
          Press={() => {
//         auth().signInWithEmailAndPassword(email, password)
//                        .then(() => {
//                          console.log('User Signed In');
//                        })
//                        .catch(error => {
////                          if (error.code === 'auth/email-already-in-use') {
////                            console.log('That email address is not known to us!');
////                          }
//
//                          if (error.code === 'auth/invalid-email') {
//                            console.log('That email address is invalid!');
//                          }
//
//                          console.error(error);
//                        });
          login();
          InteractionStudioModule.signin(email, () => {
                              Alert.alert( null, "Logged In" );
                          });
           //InteractionStudioModule.signin("harsha@gmail.com");
          }} />
          <View style={{ display: 'flex', flexDirection :'row', justifyContent: "center" }}>
            <Text style={{ fontSize: 16, fontWeight:"bold" }}>Don't have an account ? </Text>
            <TouchableOpacity onPress={() => props.navigation.navigate("Signup")}>
            <Text style={{ color: darkGreen, fontWeight: 'bold', fontSize: 16 }}>Signup</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Background>
  );
};

export default Login;
