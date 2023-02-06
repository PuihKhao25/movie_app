import axios from "axios";
import API_URL from "../Services/API";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Alert,
} from "react-native";
import React, { useEffect, useState, useContext } from "react";
import Styles from "../Styles";
import { AuthContext } from "../Constants/AuthContext";
import moment from "moment/moment";
import { useNavigation } from "@react-navigation/native";
import HeaderSreen from "./HeaderSreen";
import useGetBookChair from "../Hook/useGetBookChair";

const BookTickets = ({ route }) => {
  const { isLoading, userInfo } = useContext(AuthContext);
  const { maLichChieu, maRap, ngayGioChieu, tenRap, gia_thuong, gia_vip } =
    route?.params;
  const [chairs, setChairs] = useState([]);
  const [selectedChairs, setSelectedChairs] = useState([]);
  const navigation = useNavigation();
  const tai_khoan = userInfo.content.taiKhoan;
  const { BookChairMovie } = useGetBookChair({ maLichChieu });
  const [counter, setCounter] = useState(120);

  useEffect(() => {
    counter > 0 && setTimeout(() => setCounter(counter - 1), 1000);
    if (counter === 0) {
     Alert.alert("Bạn đã giữ ghế quá lâu!")
      setTimeout(() => {
        setCounter(120)
      }, 3000);
  }
  }, [counter]);
  useEffect(() => {
    async function getflim() {
      const res = await axios.get(
        API_URL + `/api/QuanLyRap/layGheTheoRap?maRap=${maRap}`
      );
      return res;
    }
    getflim().then((response) => {
      const result = response?.data?.content;
      const newData = result?.map((l) => {
        if (l.tenGhe > 40) {
          return { ...l, giaVeVip: gia_vip, Action: false };
        }
        return { ...l, giaVeThuong: gia_thuong, Action: false };
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
    const valueSubmit = selectedChairs.map(
      ({ giaVeVip, giaVeThuong, tenGhe, ...v }) => {
        return { ...v, tai_khoan: tai_khoan, ma_lich_chieu: maLichChieu };
      }
    );
    await axios
      .post(`${API_URL}/api/QuanLyDatVe/DatVe`, { danhSachVe: valueSubmit })
      .then(({ data }) => {
        Alert.alert("Đặt vé thành công");
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
          <View>
            <Text style={[styles.titleColor, styles.fontSizeColor]}>
              Rạp: {tenRap}
            </Text>
            <Text style={[styles.titleColor, styles.fontSizeColor]}>
              Suất: {moment(ngayGioChieu).format("hh:mm")}
            </Text>
          </View>
          <View>
            <Text style={[styles.titleColor, styles.fontSizeColor]}>
              Tổng giá Vé: {sumPrice}
            </Text>
          </View>
          <View>
          <Text style={[styles.titleColor, styles.fontSizeColor]}>
              Thời gian giữ vé: {counter}
            </Text>
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
                          ? "linen"
                          : item?.giaVeVip
                          ? "#002f4f"
                          : "black"
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
    backgroundColor: "blue",
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
    backgroundColor: "red",
  },
  backgroundChairNormol: {
    backgroundColor: "yellow",
  },
  backgroundChairSelecteds: {
    backgroundColor: "pink",
  },
  fontSizeColor: {
    fontSize: 17,
  },
});
