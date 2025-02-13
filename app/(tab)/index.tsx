import { router } from 'expo-router';
import { Button, Image, Pressable, StyleSheet, Text, View } from 'react-native';
import React from "react";

const PlaceholderImage = require("@/assets/images/background-image.png");


export default function Index(){
    return <View style={styles.container}>
        <Text style={styles.title}>
            Home screen
        </Text>
      <Pressable onPress={()=>{router.push('/login')}}><Text style={styles.title}>GO Login</Text></Pressable>
    </View>
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: "#25292e",
    flex: 1,
    padding: 24,
  },

  imageContainer:{
     flex: 1,    // 和权重类似， 占满剩余全部的空间或者 按比例平分空间。
      paddingTop:28,
      paddingBottom:28
  },

    footerContainer:{
      flex: 1/3,
        alignItems: 'center',
    },

    optionContainer:{
      position: "absolute",
        bottom:60,
    },

    optionRow:{
      alignItems: "center",
       flexDirection: "row",
    },
    title:{
        fontSize: 64,
        fontWeight: "bold",
        color: "#38434D",
    }


})