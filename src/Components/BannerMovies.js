import React, {useState} from 'react';
import {
  View,
  Text,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Dimensions,
} from 'react-native';
import {useGetBanner} from '../Hook';

const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;
const BannerMovies = () => {
  const [imgActive, setimgActive] = useState(0);
  const {banners, loading} = useGetBanner({});
  const onchange = nativeEvent => {
    if (nativeEvent) {
      const silde = Math.ceil(
        nativeEvent.contentOffset.x / nativeEvent.layoutMeasurement.width,
      );
      if (silde != imgActive) {
        setimgActive(silde);
      }
    }
  };
  return (
    <>
      <SafeAreaView >
        <View style={style.wrap}>
          <ScrollView
            onScroll={({nativeEvent}) => onchange(nativeEvent)}
            showsHorizontalScrollIndicator={false}
            pagingEnabled
            horizontal
            style={style.wrap}>
            {banners?.map(item => {
              return (
                <Image
                  key={item?.ma_banner}
                  resizeMode="stretch"
                  style={style.wrap}
                  source={{
                    uri: item?.hinh_anh,
                  }}
                />
              );
            })}
          </ScrollView>
          <View style={style.wrapDot}>
            {banners?.map((item, index) => {
              return (
                <Text
                  key={item?.ma_banner}
                  style={imgActive === index ? style.dotActive : style.dot}>
                  ●
                </Text>
              );
            })}
          </View>
        </View>
      </SafeAreaView>
    </>
  );
};

const style = StyleSheet.create({
  wrap: {
    width: WIDTH,
    height: HEIGHT * 0.25,
  },
  wrapDot: {
    position: 'absolute',
    bottom: 0,
    flexDirection: 'row',
    alignSelf: 'center',
  },
  dotActive: {
    margin: 3,
    color: 'black',
  },
  dot: {
    margin: 3,
    color: 'white',
  },
});

export default BannerMovies;
