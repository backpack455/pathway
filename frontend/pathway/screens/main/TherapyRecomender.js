import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  ActivityIndicator,
  TextInput,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { IconButton } from "react-native-paper";
import { theme } from "native-base";
const themecolor = '#28407E'

export default App = ({navigation}) => {
  const [mapRoutingActive, setMapRoutingActive] = useState();
  const [dilemna, setDilemna] = useState();

  useEffect(() => {
    (async () => {

    })();
  }, []);

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
          onPress={() => navigation.navigate('Therapy Response Screen')}
        />
      </View>
      <View style={styles.response}>

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
    
  }
});