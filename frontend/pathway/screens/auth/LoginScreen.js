import React from 'react'
import {View, Text, StyleSheet, TouchableOpacity, TextInput, StatusBar, KeyboardAvoidingView, LayoutAnimation, Image, Platform} from 'react-native'
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import Firebasekeys from './../../config'
let firebaseConfig = Firebasekeys;
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

const auth = getAuth();

const tabcolor = '#28407E'
export default class LoginScreen extends React.Component{
    state= {
        email: "",
        password: "",
        errorMessage: null,
    }
    handleLogin = async () => {
        const {email, password} = this.state
        try {
          firebase
            .auth()
            .signInWithEmailAndPassword(email, password)
            .catch((error) => this.setState({errorMessage: error.message}));
          firebase.auth().onAuthStateChanged(function (user) {
            if (user) {
              console.log("user is signed in");
            } else {
              console.log("user is not signed in");
            }
          });
        } catch (error) {
          console.error(error);
        }
      };
    // handleLogin = () => {
    //     const {email, password} = this.state
    //         signInWithEmailAndPassword(email, password)
    //         .catch((error)=> this.setState({errorMessage: error.message}))
    //         firebase.auth().onAuthStateChanged(function(user) {
    //             if (user) {
    //              console.log('user is signed in')
                 
    //             } else {
    //              console.log('user is not signed in')
    //             }
    //           });
    // }
    render(){
        LayoutAnimation.easeInEaseOut()
        return(
            <KeyboardAvoidingView style={{flex: 1, backgroundColor: '#fff'}} behavior={Platform.OS === "ios" ? "padding" : null}>
                <View style={StyleSheet.container}>
                    <StatusBar barStyle='dark-content'></StatusBar>
                    <Image source={require('./../../assets/Pathway-2.png')} style={{marginTop: 100, alignSelf: "center", height: 100 ,width: 100,borderWidth: 1,borderColor: '#fee11a',borderRadius: 10}}/>
                    <Text style={styles.greeting}>{`Welcome back!\nSign in to get started`}</Text>
                    <View style={styles.errorMessage}>
                        {this.state.errorMessage && <Text style={styles.error}>{this.state.errorMessage}</Text>}
                    </View>

                    <View style={styles.form}>
                        <View>
                            <Text style={styles.inputTitle}>Email Address</Text>
                            <TextInput 
                            style={styles.input} 
                            autoCapitalize="none"
                            onChangeText={email => this.setState({email})}
                            value={this.state.email}
                            ></TextInput>
                        </View>
                        <View style={{marginTop: 32}}>
                            <Text style={styles.inputTitle}>Password</Text>
                            <TextInput style={styles.input}
                            secureTextEntry autoCapitalize="none" 
                            onChangeText={password => this.setState({password})}>
                            </TextInput>
                        </View>
                    </View>
                    <TouchableOpacity style={styles.button} onPress={this.handleLogin}>
                        <Text style={{color: "#FFF", fontWeight: "500", fontSize: 18 }}>Sign In </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{alignSelf: "center", marginTop: 32}} onPress={() => this.props.navigation.navigate('Register')}>
                        <Text style={{color: "#414959", fontSize: 14}}>
                            New? <Text style={{fontWeight: "500", color: `${tabcolor}`}}>Sign Up</Text>
                        </Text>
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    greeting : {
        marginTop: 32,
        fontSize: 24,
        fontWeight: "400",
        textAlign: "center"
    },
    errorMessage: {
        height: 72,
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: 30,
    },
    form: {
        marginBottom: 48,
        marginHorizontal: 30,
        justifyContent: "flex-end",
    },
    inputTitle: {
        color: '#8A8F9E',
        textTransform: "uppercase",
        fontSize: 14
    },
    input: {
        borderBottomColor: "#8a8f9e",
        borderBottomWidth: StyleSheet.hairlineWidth,
        height: 40,
        fontSize: 24,
        color: "#161F3D",
        justifyContent: "flex-end",
    },
    button: {
        marginHorizontal: 30,
        backgroundColor: `${tabcolor}`,
        borderRadius: 4,
        height: 52,
        alignItems: "center",
        justifyContent: "center",
    },
    error: {
        color: "#bb252b",
        fontSize: 24,
        fontWeight: "600",
        textAlign: "center",
    }
})