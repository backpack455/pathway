import React from 'react'
import {View, Text, StyleSheet, TouchableOpacity, TextInput, StatusBar, Image, KeyboardAvoidingView} from 'react-native'
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import Firebasekeys from './../../config'
let firebaseConfig = Firebasekeys;
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}
const auth = firebase.auth();

const themecolor = '#fff'
const tabcolor = '#00BFA8'
export default class SignupScreen extends React.Component{
    state= {
        name: "",
        email: "",
        password: "",
        errorMessage: null,
    }
    handleSignUp = () => { 
        firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password)
        .then(userCredentials => {
            return userCredentials.user.updateProfile({
                displayName: this.state.name
            })
        })
        .catch (error => this.setState({errorMessage: error.message}))
        firebase.auth().onAuthStateChanged(function(user) {
            if (user) {
                console.log('user is signed in')
            } else {
                console.log('user is not signed in')
            }
            });
    }
    render(){
        return(
            <KeyboardAvoidingView style={{flex: 1, backgroundColor: '#fff'}} behavior={Platform.OS === "ios" ? "padding" : null}>
            <View style={StyleSheet.container} behavior="padding">

                <StatusBar barStyle='dark-content'></StatusBar>

                <Image source={require('./../../assets/Pathway.png')} style={{marginTop: 100, alignSelf: "center", height: 100 ,width: 100,borderWidth: 1,borderColor: `${tabcolor}`,borderRadius: 10}}/>
                
                <Text style={styles.greeting}>{`Hello!\nSign up and get started.`}</Text>

                <View style={styles.errorMessage}>
                    {this.state.errorMessage && <Text style={styles.error}>{this.state.errorMessage}</Text>}
                </View>

                <View style={styles.form}>
                    <View>
                        <Text style={styles.inputTitle}>Full Name</Text>
                        <TextInput 
                        style={styles.input} 
                        autoCapitalize="none"
                        onChangeText={name => this.setState({name})}
                        value={this.state.name}
                        ></TextInput>
                    </View>
                    <View style={{marginTop: 32}}>
                        <Text style={styles.inputTitle}>Email Address</Text>
                        <TextInput style={styles.input}
                         autoCapitalize="none" 
                         onChangeText={email => this.setState({email})}>
                         </TextInput>
                    </View>
                    <View style={{marginTop: 32}}>
                        <Text style={styles.inputTitle}>Password</Text>
                        <TextInput style={styles.input}
                         secureTextEntry autoCapitalize="none" 
                         onChangeText={password => this.setState({password})}>
                         </TextInput>
                    </View>
                </View>
                <TouchableOpacity style={styles.button} onPress={this.handleSignUp}>
                    <Text style={{color: `${themecolor}`, fontWeight: "500", fontSize:18 }}>Sign Up </Text>
                </TouchableOpacity>
                <TouchableOpacity style={{alignSelf: "center", marginTop: 32}} onPress={() => this.props.navigation.navigate('Login')}>
                    <Text style={{color: "#414959", fontSize: 14}}>
                        Already Have An Account? <Text style={{fontWeight: "500", color: `${tabcolor}`}}>Sign In</Text>
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
        justifyContent: "flex-end",
        alignItems: 'center',
        backgroundColor: '#fff'
    },
    greeting : {
        marginTop: 32,
        fontSize: 24,
        fontWeight: "400",
        textAlign: "center",
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
        color: "#E9446A",
        fontSize: 18,
        fontWeight: "600",
        textAlign: "center",
    },
    back: {
        position: "absolute",
        top: 48,
        left: 32,
        width: 32,
        height: 32,
        borderRadius: 16,
        backgroundColor: "rgba(21,22,48,01)",
        alignItems: "center",
        justifyContent: "center"
    }
})