import React, { useState, useEffect } from 'react';
import {View, Text, Touchable, TouchableOpacity,NativeModules,Alert} from 'react-native';
import Background from './Background';
import Btn from './Btn';
import {darkGreen} from './Constants';
import Field from './Field';
//import firebase from "react-native-firebase";
//import {auth,createUserWithEmailAndPassword} from '@react-native-firebase/app';
import auth from '@react-native-firebase/auth';
import { NavigationContainer, useNavigationContainerRef } from "@react-navigation/native";

const { InteractionStudioModule } = NativeModules;
const Signup = props => {
const [firstname, onChangeText0] = React.useState('');
const [lastname, onChangeText1] = React.useState('');
//const [phonenumber, onChangeText3] = React.useState('');
const [email, onChangeText] = React.useState('');
const [password, onChangeText2] = React.useState('');
const register = async() => {
        //setShowLoading(true);
        try {
            const doRegister = await auth().createUserWithEmailAndPassword(email, password);
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
            marginTop: 20,
          }}>
          Register
        </Text>
        <Text
          style={{
            color: 'white',
            fontSize: 19,
            fontWeight: 'bold',
            marginBottom: 20,
          }}>
          Create a new account
        </Text>
        <View
          style={{
            backgroundColor: 'white',
            height: 700,
            width: 460,
            borderTopLeftRadius: 130,
            paddingTop: 50,
            alignItems: 'center',
          }}>
          <Field
          placeholder="First Name"
           onChangeText={text => onChangeText0(text)}
           value={firstname}
           />
          <Field
          placeholder="Last Name"
           onChangeText={text => onChangeText1(text)}
           value={lastname}
          />
          <Field
            placeholder="Email"
            keyboardType={'email-address'}
            onChangeText={text => onChangeText(text)}
            value={email}
          />
          <Field
          placeholder="Contact Number"
          keyboardType={'number'}

          />
          <Field placeholder="Password"
          secureTextEntry={true}
          onChangeText={text => onChangeText2(text)}
          value={password}
          />
          <Field placeholder="Confirm Password" secureTextEntry={true} />
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              width: '78%',
              paddingRight: 16
            }}>
            <Text style={{color: 'grey', fontSize: 16}}>
              By signing in, you agree to our{' '}
            </Text>
            <Text style={{color: darkGreen, fontWeight: 'bold', fontSize: 16}}>
              Terms & Conditions
            </Text>
          </View>

          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent :"center",
              width: '78%',
              paddingRight: 16,
              marginBottom: 10
            }}>
            <Text style={{color: 'grey', fontSize: 16}}>
              and {" "}
            </Text>
            <Text style={{color: darkGreen, fontWeight: 'bold', fontSize: 16}}>
              Privacy Policy
            </Text>
          </View>
          <Btn
            textColor="white"
            bgColor={darkGreen}
            btnLabel="Signup"
            Press={() => {

              register();
              InteractionStudioModule.signup(email,firstname,lastname, () => {
                                                        Alert.alert( null, "Account Created" );
                                                    });
             // alert('Account created');
              props.navigation.navigate('Login');
            }}
          />
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'center',
            }}>
            <Text style={{fontSize: 16, fontWeight: 'bold'}}>
              Already have an account ?{' '}
            </Text>
            <TouchableOpacity
              onPress={() => props.navigation.navigate('Login')}>
              <Text
                style={{color: darkGreen, fontWeight: 'bold', fontSize: 16}}>
                Login
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Background>
  );
};

export default Signup;
