import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  ActivityIndicator,
  TextInput,
  TouchableOpacity, FlatList
} from "react-native";
import { StatusBar } from "expo-status-bar";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { IconButton } from "react-native-paper";
import { theme } from "native-base";
const themecolor = '#28407E'

import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import Firebasekeys from './../../config'
import { getAuth, createUserWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
let firebaseConfig = Firebasekeys;
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const auth = getAuth();
const user = auth.currentUser;



export default function App({navigation}) {
  const [mapRoutingActive, setMapRoutingActive] = useState();
  const [dilemna, setDilemna] = useState();
  const [response, setResponse] = useState()

  useEffect(() => {
    (async () => {

    })();
  }, []);
  
  const handleInput = () => {
    
    const userId = firebase.auth().currentUser.uid
    fetch('https://localhost:3001/diagnoser', {
      method: 'POST',
      headers: {
        'userRatingId': userId
      },
      body: {
        'user_input': dilemna
      }
    }).then((response) => setResponse(response))
    .catch((error) => {
      console.log(error)
    })
    
    console.log(userId)
    //navigation.navigate('Therapy Response Screen')
  }

  return (
    <View style={styles.container}>
      <View style={styles.search}>
        <TextInput
          placeholder="Type your concern"
          placeholderTextColor="#fff"
          style={styles.searchBarInput}
          onChangeText={(text) => setDilemna(text)}
        />
        <IconButton
          icon="check"
          color="#fff"
          size={20}
          style={{ bottom: 5, left: 30 }}
          onPress={() => handleInput()}
        />
      </View>
      <View style={styles.response}>
      {response ?
      <View style={{flexDirection: 'row', marginTop: 125}}>  
            {/* <TouchableOpacity activeOpacity={1}  onPress={() => navigation.navigate('Therapy Response Screen')}>
                <View style={styles.lesserButton}>
                    <Text style={styles.otherText}>{response.category_diagnosis}</Text>
                </View>
            </TouchableOpacity> */}
            <TouchableOpacity activeOpacity={1}  onPress={() => navigation.navigate('Details', {
            itemId: `${response.unviewed_links}`,
          })}>
                <View style={styles.lesserButton}>
                    <Text style={styles.otherText}>Sentiment Analysis: {response.sentiment_analysis.label} {response.sentiment_analysis.score}</Text>
                </View>
            </TouchableOpacity> 
        </View> : <Text></Text>}
      {/* <FlatList
        data={response}
        renderItem={({ item }) => (
          <View style={{flexDirection: 'row'}}>
            <TouchableOpacity activeOpacity={1}  onPress={() => navigation.navigate('Therapy Response Screen')}>
                <View style={styles.lesserButton}>
                    <Text style={styles.otherText}>Competition</Text>
                </View>
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={1}  onPress={() => navigation.navigate('Therapy Response Screen')}>
                <View style={styles.lesserButton}>
                    <Text style={styles.otherText}>Happiness</Text>
                </View>
            </TouchableOpacity>
        </View>
        )}
      /> */}
      </View>
      <StatusBar style="light" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: `#fff`,
    alignItems: "center",
  },
  searchBarInput: {
    color: "#fff",
  },
  search: {
    flex: 1,
    position: "absolute",
    top: 40,
    flexDirection: "row",
    backgroundColor: `${themecolor}`,
    alignSelf: "center",
    borderRadius: 12,
    borderColor: `#000`,
    padding: 10,
    shadowColor: "#000",
    shadowRadius: 15,
    justifyContent: "center",
    width: wp(80),
    height: hp(6),
    paddingLeft: hp(3.5),
  },
  response: {
    
  },
  otherText: {
    padding: 20,
    fontSize: 12,
    fontFamily: 'Avenir',
    color: '#fff'
},
  lesserButton: {
    borderRadius: 12,
    marginTop: hp(.37),
    backgroundColor: `${themecolor}`,
    height: hp(7.11),
    width: wp(40),
    marginRight: 10,
    // width: hp
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