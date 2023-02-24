import axios from "axios";
import API_URL from "../Services/API";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Alert,
  Image,
} from "react-native";
import React, { useEffect, useState, useContext } from "react";
import Styles from "../Styles";
import { AuthContext } from "../Constants/AuthContext";
import moment from "moment/moment";
import { useNavigation } from "@react-navigation/native";
import HeaderSreen from "./HeaderSreen";
import useGetBookChair from "../Hook/useGetBookChair";
import { useGetDetailMovieBookTicket } from "../Hook";

const BookTickets = ({ route }) => {
  const { isLoading, userInfo } = useContext(AuthContext);
  const {
    maLichChieu,
    maRap,
    logo,
    ngayGioChieu,
    tenRap,
    gia_thuong,
    gia_vip,
  } = route?.params;

  const [chairs, setChairs] = useState([]);
  const [selectedChairs, setSelectedChairs] = useState([]);
  const navigation = useNavigation();
  const tai_khoan = userInfo.content.taiKhoan;
  const { BookChairMovie } = useGetBookChair({ maLichChieu });
  const [counter, setCounter] = useState(120);
  const { movieDetail } = useGetDetailMovieBookTicket({ maLichChieu });
  useEffect(() => {
    counter > 0 && setTimeout(() => setCounter(counter - 1), 1000);
    if (counter === 0) {
      Alert.alert("Bạn đã giữ ghế quá lâu!");
      setTimeout(() => {
        setCounter(120);
      }, 3000);
    }
  }, [counter]);
  useEffect(() => {
    async function getChairs() {
      const res = await axios.get(
        API_URL + `/api/QuanLyRap/layGheTheoRap?maRap=${maRap}`
      );
      return res;
    }
    getChairs().then((response) => {
      const result = response?.data?.content;
      const newData = result?.map((l) => {
        if (l.tenGhe > 70) {
          return { ...l, gia_ve: gia_vip, giaVeVip: gia_vip, Action: false };
        }
        return {
          ...l,
          gia_ve: gia_thuong,
          giaVeThuong: gia_thuong,
          Action: false,
        };
      });
      if (newData) setChairs(newData);
    });
  }, []);

  const handleSeletedChairs = (item) => {
    const newSelectedChair = selectedChairs?.reduce(
      (acc, curr) => ((acc[curr?.tenGhe] = curr), acc),
      {}
    );
    if (newSelectedChair[item?.tenGhe]) {
      return setSelectedChairs(
        selectedChairs?.filter((i) => i?.tenGhe !== item?.tenGhe)
      );
    }
    setSelectedChairs((selectedChairs) => [...selectedChairs, item]);
  };

  const sumPrice = selectedChairs
    ?.map((s) => s.giaVeThuong || s.giaVeVip)
    ?.reduce((partialSum, a) => partialSum + a, 0);

  const submitBookTicts = async () => {
    const AlertSuccess = () =>
      Alert.alert("MOVIE GROUP", "Đặt vé thành công", [
        { text: "OK", onPress: () => navigation.navigate("Home") },
      ]);
    const valueSubmit = selectedChairs.map(({ giaVeVip,giaVeThuong,tenGhe, ...v }) => {
      return { ...v, tai_khoan: tai_khoan, ma_lich_chieu: maLichChieu };
    });
    await axios
      .post(`${API_URL}/api/QuanLyDatVe/DatVe`, { danhSachVe: valueSubmit })
      .then(({ data }) => {
        AlertSuccess();
      })
      .catch((e) => {
        console.log(`BookTicks error ${e}`);
      });
  };
  chairs?.map((c) => {
    BookChairMovie?.map((b) => {
      if (b.ten_ghe === c.tenGhe) {
        return (c.Action = true);
      }
    });
    return c;
  });
  return (
    <View>
      <HeaderSreen iconLeft onIconLeft={navigation.goBack} title={"Đặt vé"} />

      <ScrollView horizontal={false} style={Styles.sectionBg}>
        <View style={styles.container}>
          <View
            style={{
              flex: 1,
              height: 75,
              justifyContent: "space-around",
              backgroundColor: "#0a0f13",
              padding: 13,
              borderRadius: 10,
            }}
          >
            <View style={styles.containnerLogo}>
              <Image
                source={{ uri: movieDetail?.hinh_anh }}
                style={styles.logo}
              />
              <View>
                <Text style={styles.nameRap}>{movieDetail?.ten_phim}</Text>
                <Text style={styles.nameRap}>
                  Suất: {moment(ngayGioChieu).format("hh:mm")}
                </Text>
              </View>
            </View>
          </View>
          <View
            style={{
              flex: 1,
              height: 75,
              justifyContent: "space-around",
              backgroundColor: "#0a0f13",
              borderRadius: 10,
              padding: 13,
              marginTop: 5,
            }}
          >
            <View style={styles.containnerLogo}>
              <Image source={{ uri: logo }} style={styles.logo} />
              <Text style={styles.nameRap}>{tenRap}</Text>
            </View>
          </View>
          <View
            style={{
              flex: 1,
              height: 75,
              backgroundColor: "#0a0f13",
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              borderRadius: 10,
              marginTop: 5,
            }}
          >
            <View
              style={{
                height: 50,
                padding: 3,
                width: 175,
              }}
            >
              <View>
                <Text style={{ fontSize: 15, color: "white" }}>
                  Rap {maRap} - Ghế đang đặt :
                </Text>
              </View>
              <View style={{ flex: 1, flexDirection: "row" }}>
                <Text style={{ fontSize: 15, color: "white" }}>
                  Tổng tiền :
                </Text>
                <Text style={{ fontSize: 15, color: "#5cd4e4", marginLeft: 3 }}>
                  {sumPrice} VND
                </Text>
              </View>
            </View>
            <View
              style={{ backgroundColor: "white", height: 50, width: 1 }}
            ></View>
            <View style={{ height: 50, padding: 5, width: 170 }}>
              <Text
                style={{ textAlign: "center", fontSize: 17, color: "white" }}
              >
                Thời gian giữ Ghế:
              </Text>
              <Text
                style={{ textAlign: "center", fontSize: 17, color: "#5cd4e4" }}
              >
                {counter} s
              </Text>
            </View>
          </View>
          <View style={styles.BackgroundBookChair}>
            <View style={styles.row}>
              <View
                style={[styles.BackgroundChair, styles.backgroundChairVip]}
              />
              <Text style={[styles.titleColor, styles.rightChair]}>
                Ghế Vip
              </Text>
            </View>
            <View style={styles.row}>
              <View
                style={[styles.BackgroundChair, styles.backgroundChairNormol]}
              />
              <Text style={[styles.titleColor, styles.rightChair]}>
                Ghế Thường
              </Text>
            </View>
            <View style={styles.row}>
              <View
                style={[
                  styles.BackgroundChair,
                  styles.backgroundChairSelecteds,
                ]}
              />
              <Text style={[styles.titleColor, styles.rightChair]}>
                Ghế Đã Đặt
              </Text>
            </View>
          </View>
        </View>
        <View style={styles.containerChair}>
          {chairs?.map((item) => {
            return (
              <>
                <View key={item?.tenGhe} style={{ padding: 2 }}>
                  <TouchableOpacity
                    disabled={item?.Action}
                    style={{
                      backgroundColor: `${
                        selectedChairs
                          ?.map((i) => i?.tenGhe)
                          ?.includes(item?.tenGhe)
                          ? "red"
                          : item?.Action
                          ? "#6c757d"
                          : item?.giaVeVip
                          ? "#ffc107"
                          : "#007bff"
                      }`,
                      width: 30,
                      height: 30,
                      justifyContent: "center",
                      borderColor: "blue",
                      borderRadius: 2,
                    }}
                    onPress={() => handleSeletedChairs(item)}
                  >
                    <Text style={[styles.titleColor, styles.titleCenter]}>
                      {item.tenGhe}
                    </Text>
                  </TouchableOpacity>
                </View>
              </>
            );
          })}
        </View>
        <View style={styles.backgroundBookTicks}>
          <TouchableOpacity onPress={submitBookTicts} style={styles.buyTicks}>
            <Text style={styles.titleColor}>Mua Vé</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

export default BookTickets;

const styles = StyleSheet.create({
  container: {
    padding: 15,
  },
  row: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  BackgroundChair: {
    width: 30,
    height: 30,
  },
  buyTicks: {
    backgroundColor: "#1d8fe1",
    width: 100,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  titleColor: {
    color: "#fff",
  },
  titleCenter: {
    textAlign: "center",
  },
  backgroundBookTicks: {
    flex: 1,
    height: 50,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 100,
  },
  containerChair: {
    flexDirection: "row",
    flexWrap: "wrap",
    padding: 15,
    justifyContent: "center",
  },
  BackgroundBookChair: {
    flex: 1,
    justifyContent: "space-around",
    flexDirection: "row",
    alignItems: "center",
    marginTop: 7,
  },
  rightChair: {
    marginLeft: 5,
  },
  backgroundChairVip: {
    backgroundColor: "#ffc107",
  },
  backgroundChairNormol: {
    backgroundColor: "#007bff",
  },
  backgroundChairSelecteds: {
    backgroundColor: "#6c757d",
  },
  fontSizeColor: {
    fontSize: 17,
  },
  logo: {
    height: 50,
    width: 50,
    borderRadius: 20,
  },
  containnerLogo: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  nameRap: {
    fontSize: 15,
    marginLeft: 10,
    color: "white",
  },
});
