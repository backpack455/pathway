import React, { useState, useEffect } from "react";
import { StatusBar } from 'expo-status-bar';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { Animated, Easing, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import {Picker} from '@react-native-picker/picker';
import {FontAwesome} from "@expo/vector-icons"
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';


const themecolor = '#28407E'


export default function QuoteGenerator() {
    const [category, setCategory] = useState()
    const [author, setAuthor] = useState()
    const [quote, setQuote] = useState();

    function getRandomInt(max) {
        return Math.floor(Math.random() * max);
    }

    useEffect(() => {
        
        var requestOptions = {
            method: 'GET',
            redirect: 'follow'
          };
          
          fetch("https://api.quotable.io/random", requestOptions)
            .then(response => response.json())
            .then(result => 
                {
                    setAuthor(result.author)
                    setQuote(result.content)
                    setCategory(result.tags[0])
                })
            .catch(error => console.log('error', error));
            console.log(author)
            console.log(quote)
    
    }, []);

    const fetchQuote = async (tag) => {
        var requestOptions = {
            method: 'GET',
            redirect: 'follow'
          };
          
          fetch(`https://api.quotable.io/quotes?tags=`+ tag, requestOptions)
            .then(response => response.json())
            .then(result => 
                {
                    let i = getRandomInt(result.results.length)
                    if(i>1){
                        setAuthor(result.results[i].author)
                        setQuote(result.results[i].content)
                        setCategory(result.results[i].tags[0])
                    } else {
                        setAuthor(result.author)
                        setQuote(result.content)
                        setCategory(result.tags[0])
                    }
                    
                })
            .catch(error => console.log('error', error));
            console.log(author)
            console.log(quote)
    }

  return (
    <View style={styles.container}>
      <View style={styles.container}>
                <View>
                    <View style={styles.bubble}>
                        <Text style={styles.title}>{author}</Text>
                        <Text style={styles.text}>
                            {quote}
                        </Text>                        
                        {/* <TouchableOpacity activeOpacity={1}>
                            <View style={styles.theButton}>
                                <Text style={styles.whiteText}>Generate Quote</Text>
                            </View>
                        </TouchableOpacity> */}
                        <Text style={styles.text}>
                            Category: {category.toUpperCase()}
                        </Text> 
                        <View style={{paddingTop: 50}}>
                            <View style={{flexDirection: 'row'}}>
                                <TouchableOpacity activeOpacity={1}  onPress={() => fetchQuote('love')}>
                                    <View style={styles.lesserButton}>
                                        <Text style={styles.otherText}>Love</Text>
                                    </View>
                                </TouchableOpacity>
                                <TouchableOpacity activeOpacity={1}  onPress={() => fetchQuote('famous-quotes')}>
                                    <View style={styles.lesserButton}>
                                        <Text style={styles.otherText}>Famous</Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                            <View style={{flexDirection: 'row'}}>
                                <TouchableOpacity activeOpacity={1} onPress={() => fetchQuote('funny')}>
                                    <View style={styles.lesserButton}>
                                        <Text style={styles.otherText}>Funny</Text>
                                    </View>
                                </TouchableOpacity>
                                <TouchableOpacity activeOpacity={1}>
                                    <View style={styles.lesserButton}  onPress={() => fetchQuote('life')}>
                                        <Text style={styles.otherText}>Life</Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                            <View style={{flexDirection: 'row'}}>
                                <TouchableOpacity activeOpacity={1}  onPress={() => fetchQuote('art')}>
                                    <View style={styles.lesserButton}>
                                        <Text style={styles.otherText}>Art</Text>
                                    </View>
                                </TouchableOpacity>
                                <TouchableOpacity activeOpacity={1}  onPress={() => fetchQuote('happiness')}>
                                    <View style={styles.lesserButton}>
                                        <Text style={styles.otherText}>Happiness</Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                        </View>
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
    width: wp(75),
    height: hp(70),
    margin: 8,
    borderRadius: 20,
    shadowRadius: 10,
    backgroundColor: '#fff',
    shadowOpacity: 0.1,
    flexDirection: 'column',
    },
   title: {
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
    otherText: {
        padding: 20,
        fontSize: 12,
        fontFamily: 'Avenir',
        color: '#fff'
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
      lesserButton: {
        borderRadius: 12,
        marginTop: hp(2.37),
        backgroundColor: `${themecolor}`,
        height: hp(7.11),
        width: wp(30),
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