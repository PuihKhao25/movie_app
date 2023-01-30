import React from "react";
import { ScrollView, View } from "react-native";
import Styles from "../Styles";
import { BannerMovies } from "../Components";
import NowShowingMovie from "./Movie/NowShowingMovie";
import TrendingMovies from "./Movie/TrendingMovies";

const Home = (props) => {
  return (
    <>
      <View>
        <ScrollView style={Styles.sectionBg}>
          <BannerMovies />
          <TrendingMovies/>
        </ScrollView>
      </View>
    </>
  );
};

export default Home;
