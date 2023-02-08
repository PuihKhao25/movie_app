import React from "react";
import { ScrollView, View, Text, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import Styles from "../Styles";
import { BannerMovies } from "../Components";
import NowShowingMovie from "./Movie/NowShowingMovie";
import TrendingMovies from "./Movie/TrendingMovies";

const Home = ({ route, navigation }) => {
  return (
    <>
      <View style={{ flex: 1, height:20, marginTop: 30 }}>
        <TouchableOpacity
          style={{ paddingLeft: 10, paddingRight: 10, backgroundColor:'#151C26' }}
          onPress={() => {
            navigation.openDrawer();
          }}

        >
          <Icon name="menu" color={"white"} size={40} />
        </TouchableOpacity>
        <ScrollView style={Styles.sectionBg}>
          <BannerMovies />
          <TrendingMovies />
        </ScrollView>
      </View>
    </>
  );
};

export default Home;
