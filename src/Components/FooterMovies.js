import React from "react";
import { View, Text, ScrollView, Image, StyleSheet } from "react-native";
import Styles from "../Styles";

const FooterMovies = () => {
  return (
    <>
      <Text style={{color:'white',fontSize:20}}>Liên hệ</Text>
      <View style={{ marginBottom: 10, marginLeft: 10, marginRight: 10 }}>
        <View style={styles.backgroundImage}>
          <Text style={styles.textColor}>● Logo</Text>
          <Image
            style={styles.imgaeLogo}
            source={require("../assets/logomovie.png")}
          />
        </View>
        <View >
          <Text style={styles.textColor}>
            ● Địa chỉ: Tổ 40 phường hòa hài, quân ngũ hành sơn, đà nẵng
            @25/09/2022
          </Text>
          <Text style={styles.textColor}>● Số ĐT: 0899367709</Text>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#041b2d",
    marginTop: 30,
  },
  backgroundImage: {
    alignItems: "center",
    flexDirection:'row',
    width: 405,
  },
  imgaeLogo: {
    width: 70,
    height: 70,
    marginLeft:10
  },
  textColor:{
    color:'white'
  }
});

export default FooterMovies;
