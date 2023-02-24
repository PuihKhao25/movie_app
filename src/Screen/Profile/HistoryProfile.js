import React, { useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Image,
} from "react-native";

import { useNavigation } from "@react-navigation/native";
import { AuthContext } from "../../Constants/AuthContext";
import Icon from "react-native-vector-icons/Ionicons";
import API_URL from "../../Services/API";
import axios from "axios";
const HistoryProfile = ({ props, navigation }) => {
  const { userInfo } = useContext(AuthContext);
  const { taiKhoan } = userInfo.content;
  const [history, setHistory] = useState([]);

  useEffect(() => {
    async function getHistory() {
      const res = await axios.get(
        API_URL + `/api/lichSuPhim?taiKhoan=${taiKhoan}`
      );
      return res;
    }
    getHistory().then((response) => {
      const result = response?.data?.content;
      setHistory(result);
    });
  }, []);

  const combinedLichSuDatVe = [];
  for (let i = 0; i < history.length; i++) {
    const currentLSDV = history[i];

    // kiểm tra xem mã lịch chiếu đã có trong currentLSDV chưa
    const index = combinedLichSuDatVe.findIndex(
      (t) => t.ma_lich_chieu === currentLSDV.ma_lich_chieu
    );
    if (index === -1) {
      // nếu chưa tồn tại, thêm object vào
      const newlichsudatve = {
        taiKhoan: taiKhoan,
        tenPhim: currentLSDV.tenPhim,
        hinhAnh: currentLSDV.hinhAnh,
        ngayDat: currentLSDV.ngayDat,
        ngayGioChieu: currentLSDV.ngayGioChieu,
        ma_rap: currentLSDV.ma_rap,
        tenRap: currentLSDV.tenRap,
        ma_lich_chieu: currentLSDV.ma_lich_chieu,
        danh_sach_ghe: [currentLSDV.ten_ghe],
        tong_gia_ve: currentLSDV.gia_ve,
      };
      combinedLichSuDatVe.push(newlichsudatve);
    } else {
      combinedLichSuDatVe[index].danh_sach_ghe.push(currentLSDV.ten_ghe);
      combinedLichSuDatVe[index].tong_gia_ve += currentLSDV.gia_ve;
    }
  }

  return (
    <View
      style={{ flex: 1, height: 20, marginTop: 30, backgroundColor: "#151C26" }}
    >
      <TouchableOpacity
        style={{
          paddingLeft: 10,
          paddingRight: 10,
          width: 80,
          backgroundColor: "#151C26",
        }}
        onPress={() => {
          navigation.openDrawer();
        }}
      >
        <Icon name="menu" color={"white"} size={40} />
      </TouchableOpacity>
      <View>
        <ScrollView>
          <View
            style={{
              flex: 1,
              flexDirection: "row",
              justifyContent: "space-around",
            }}
          >
            <View>
              <Text sstyle={styles.textColor}>Tên Phim</Text>
            </View>
            <View>
              <Text style={styles.textColor}> Tên ghê</Text>
            </View>
            <View>
              <Text style={styles.textColor}>Giá vé</Text>
            </View>
          </View>
          <View>
            {combinedLichSuDatVe?.map((e) => {
              return (
                <>
                  <View
                    style={{
                      flex: 1,
                      flexDirection: "row",
                      justifyContent: "space-around",
                      alignItems: "center",
                      height: 100,
                    }}
                  >
                    <View>
                      <View>
                        <Image
                          source={{ uri: e?.hinhAnh }}
                          style={{ height: 70, width: 70, borderRadius: 10 }}
                        />
                      </View>
                      <Text style={styles.textColor}>{e?.tenPhim}</Text>
                    </View>
                    <View>
                      <Text style={styles.textColor}>
                        {" "}
                        {e?.danh_sach_ghe.join(",")}{" "}
                      </Text>
                    </View>
                    <View>
                      <Text style={styles.textColor}>{e?.tong_gia_ve}</Text>
                    </View>
                  </View>
                </>
              );
            })}
          </View>
        </ScrollView>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    marginTop: 30,
    padding: 10,
  },
  textColor: {
    color: "white",
  },
});
export default HistoryProfile;
