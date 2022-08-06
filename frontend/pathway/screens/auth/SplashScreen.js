import React from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
  LayoutAnimation,
} from "react-native";

export default function SplashScreen({ navigation }) {
  LayoutAnimation.easeInEaseOut();
  
  return (
    <View style={styles.container}>
      <View style={styles.SVGcontainer}>
        <Image
          source={require("./../../assets/undraw_doctors2.png")}
          style={{ width: 430, height: 259 }}
        />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.blackText}>Welcome to Pathway</Text>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("Register")}
        >
          <Text style={styles.whiteText}>Register</Text>
        </TouchableOpacity>
        <View style={{padding: 10}}>
        </View>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("Login")}
        >
          <Text style={styles.whiteText}>Login</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  loginText: {
    fontFamily: "Avenir",
    fontSize: 18,
    textAlign: "center",
    color: "black",
    fontWeight: "bold",
    textAlignVertical: "center",
  },
  button: {
    backgroundColor: "#28407E",
    width: 300,
    height: 60,
    borderRadius: 15,
    justifyContent: "center",
    shadowOffset: { width: 0, height: 2 },
    shadowColor: "black",
    shadowOpacity: 0.25,
  },
  whiteText: {
    fontFamily: "Avenir",
    fontSize: 18,
    textAlign: "center",
    color: "white",
    fontWeight: "bold",
    textAlignVertical: "center",
  },
  buttonContainer: {
    alignItems: "center",
    flex: 0.3,
    padding: 30,
    top: 0,
  },
  blackText: {
    fontFamily: "Proxima Nova",
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    top: 20,
    padding: 20
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: 'center'
  },
});