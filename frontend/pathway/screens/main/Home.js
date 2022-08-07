import React, { useState, useEffect } from "react";
import { StatusBar } from 'expo-status-bar';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { Animated, Easing, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import {FontAwesome} from "@expo/vector-icons"
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';

const category = '33'
const themecolor = '#28407E'


export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.container}>
                <View>
                    <TouchableOpacity style={styles.bubble}>
                        <Text style={styles.title}>Daily Quote Board</Text>
                        <View style={{flexDirection: 'row'}}>
                          <Text style={styles.text}>
                              This quote board contains reccomended quotes by other users, and can be manually inputted.
                          </Text>                        
                        </View>
                        
                        <TouchableOpacity activeOpacity={1}>
                            <View style={styles.theButton}>
                                <Text style={styles.whiteText}>Access Resource</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity activeOpacity={1}>
                            <View style={styles.theButton}>
                                <Text style={styles.whiteText}>Submit Feedback</Text>
                            </View>
                        </TouchableOpacity>
                    </TouchableOpacity>
                    
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