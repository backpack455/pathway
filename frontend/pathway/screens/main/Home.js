import React, { useState, useEffect } from "react";
import { StatusBar } from 'expo-status-bar';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { Animated, Easing, StyleSheet, Text, TouchableOpacity, View, FlatList } from 'react-native';
import {Entypo, MaterialIcons} from "@expo/vector-icons"
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
// v9 compat packages are API compatible with v8 code
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const category = '33'
const themecolor = '#28407E'
let pending = true


export default function HomeScreen({navigation}) {
  const [loading, setLoading] = useState(true)
  const [users, setUsers] = useState([]);

  const signOutUser = () => {
    firebase.auth().signOut()
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            console.log('user is still signed in!!')
        } else {
            console.log('user is logged out!!')
        }
      });
}

  useEffect(() => {
    firebase.firestore()
    .collection('Quote Post Board')
    .get()
    .then(querySnapshot => {
      // console.log(querySnapshot.data())
      const users = []
      if(querySnapshot.size > 0)
      {
       pending = false
      }
    querySnapshot.forEach(documentSnapshot => {
      users.push({
        ...documentSnapshot.data(),
        key: documentSnapshot.id,
      });
      console.log(documentSnapshot.data())
      console.log(documentSnapshot.data().author)
    })
    setUsers(users);
    console.log(users.author)
    setLoading(false);
    })
}, [])

  return (
    <View style={styles.container}>
      <View style={styles.container}>
                <View>
                    <View style={styles.bubble}>
                        <TouchableOpacity style={{flexDirection: 'row'}} onPress={() => navigation.navigate('Add a Quote')}>
                          <Text style={styles.title}>Daily Quote Board</Text>
                          <MaterialIcons name="library-add" color={themecolor} size={32} style={{paddingTop: 40}}/>                                             
                        </TouchableOpacity>
                        <TouchableOpacity style={{flexDirection: 'row', alignContent: 'center'}} onPress={() => signOutUser()}>
                          <Text style={styles.text}>Sign Out</Text>
                          <Entypo name="log-out" color={themecolor} size={18} style={{paddingTop: 40}}/>                                             
                        </TouchableOpacity>
                        <Text style={styles.text}>
                            This quote board contains reccomended quotes by other users, and can be manually inputted.
                        </Text>    
                          {/* {users.map((quoteData) => {
                            <View>
                              <Text style={styles.title}>{quoteData.author}</Text>
                              <Text style={styles.text}>
                                  {quoteData.quote}
                              </Text>   
                            </View>
                          })}                     */}
                          <FlatList
                          data={users}
                          renderItem={({ item }) => (
                            <View>
                            <Text style={styles.otherTitle}>{item.author}</Text>
                            <Text style={styles.text}>
                                {item.quote}
                            </Text>   
                          </View>
                          )}
                        />
                    </View>
                    
                </View>
                
            </View>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  },
  bubble: {
    alignItems: "center",
    width: wp(70),
    height: hp(70),
    margin: 8,
    borderRadius: 20,
    shadowRadius: 10,
    backgroundColor: '#fff',
    shadowOpacity: 0.1,
    flexDirection: 'column',
    },
   title: {
        fontSize: 30,
        fontFamily: 'Avenir',
        padding: 20,
        fontWeight: 'bold'
    },
    otherTitle: {
      fontSize: 26,
      fontFamily: 'Avenir',
      padding: 20,
      fontWeight: 'bold'
  },
    text: {
        padding: 20,
        fontSize: 16,
        fontFamily: 'Avenir'
    },
    theButton: {
        borderRadius: 12,
        marginTop: hp(2.37),
        backgroundColor: `${themecolor}`,
        height: hp(7.11),
        shadowOffset: { width: wp(0), height: wp(0.24) },
        shadowColor: "black",
        shadowOpacity: 0.25,
        alignItems: "center",
        justifyContent: "center",
      },
    whiteText: {
        padding: 20,
        fontSize: 16,
        fontFamily: 'Avenir',
        color: '#fff'
    }
});