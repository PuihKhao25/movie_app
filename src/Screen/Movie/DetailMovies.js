import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  Button,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import Styles from '../../Styles';
import YoutubePlayer from 'react-native-youtube-iframe';
import {useNavigation} from '@react-navigation/native';
import moment from 'moment/moment';
import HeaderSreen from '../../Components/HeaderSreen';
import { useGetDetailMovie } from '../../Hook';

const DetailMovies = ({route}) => {

  const [showTime, setShowTime] = useState(false);
  const navigation = useNavigation();
  const {maPhim, tenPhim, trailer, moTa, ngay_khoi_chieu} = route?.params?.item;
  const {detailMovie} = useGetDetailMovie({maPhim});

  return (
    <>
      <HeaderSreen
        iconLeft
        onIconLeft={navigation.goBack}
        title={'Chi tiết phim'}
      />
      <ScrollView style={Styles.sectionBg}>
        <View>
          <YoutubePlayer height={300} play={true} videoId={trailer} />
          <View style={styles.padding}>
            <Text style={Styles.detailsMovieTitle}>Tên Phim : {tenPhim}</Text>
            <View>
              <Text style={styles.time}>
                Ngày khởi chiếu: {moment(ngay_khoi_chieu).format('YYYY-MM-DD ')}
              </Text>
            </View>
            <View style={styles.padding}>
              {detailMovie?.map(item => {
                return (
                  <>
                    <View key={item?.maRap}>
                      <TouchableOpacity onPress={() => setShowTime(!showTime)}>
                        <View style={styles.containnerLogo}>
                          <Image
                            source={{uri: item?.logo}}
                            style={styles.logo}
                          />
                          <Text style={styles.nameRap}>{item?.tenRap}</Text>
                        </View>
                      </TouchableOpacity>
                      {showTime && (
                        <TouchableOpacity
                          onPress={() =>
                            navigation.navigate('BookTickets', item)
                          }
                          style={styles.chooseTime}>
                          <Text style={styles.centerTime}>
                            {moment(item?.ngayGioChieu).format('hh:mm')}
                          </Text>
                        </TouchableOpacity>
                      )}
                    </View>
                  </>
                );
              })}
            </View>
            <View>
              <Text style={styles.content}>Nội dung</Text>
              <Text style={Styles.overview}>{moTa}</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  padding: {
    padding: 10,
  },
  time: {
    color: 'white',
    marginLeft: 35,
    fontSize: 20,
  },
  containnerLogo: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 15,
  },
  logo: {
    height: 50,
    width: 50,
    borderRadius: 20,
  },
  nameRap: {
    fontSize: 20,
    marginLeft: 10,
  },
  chooseTime: {
    flex: 1,
    flexWrap: 'wrap',
    backgroundColor: 'hsla(0,0%,96%,.6)',
    justifyContent: 'center',
    width: 70,
    height: 50,
    borderRadius: 10,
    marginTop: 10,
  },
  centerTime: {
    textAlign: 'center',
    width: 70,
  },
  content: {
    marginTop: 10,
    color: 'white',
    fontSize: 20,
  },
});

export default DetailMovies;
