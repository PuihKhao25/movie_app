// logo
// Quận Hải Châu.TP Đà Nẵng
// https://www.instagram.com
// +84 123456789
// https://www.facebook.com
// https://twitter.com

import React, { useEffect, useState, useContext } from "react";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import { AuthContext } from "../../Constants/AuthContext";
import { useNavigation } from "@react-navigation/native";
import { useGetUserProfile } from "../../Hook";
import Icon from "react-native-vector-icons/Ionicons";

export default function Profile() {
  const navigation = useNavigation();
  const { userInfo } = useContext(AuthContext);
  const { taiKhoan } = userInfo.content;
  const { profile } = useGetUserProfile({ taiKhoan });

  return (
    <>
      <View style={{ flex: 1, height: 20, marginTop: 30 }}>
        <TouchableOpacity
          style={{
            paddingLeft: 10,
            paddingRight: 10,
            backgroundColor: "#151C26",
          }}
          onPress={() => {
            navigation.openDrawer();
          }}
        >
          <Icon name="menu" color={"white"} size={40} />
        </TouchableOpacity>
        <View style={styles.container}>
          <View style={styles.backgroundView}>
            <Text style={styles.titleColor}>
              Tài Khoản: {profile?.taiKhoan}
            </Text>
            <Text style={styles.titleColor}>Họ và Tên: {profile?.hoTen} </Text>
            <Text style={styles.titleColor}>
              Số điện thoại: {profile?.soDT}{" "}
            </Text>
            <Text style={styles.titleColor}>Email: {profile?.email}</Text>
          </View>
          <View style={{ marginTop: 10, height: 40 }}>
            <TouchableOpacity
              onPress={() => navigation.navigate("EditProfile")}
              style={styles.buttonEdit}
            >
              <Text style={styles.textColor}>Sửa</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  button: {
    marginTop: 40,
    color: "white",
    height: 40,
    backgroundColor: "#ec5990",
    borderRadius: 4,
  },
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: "#0e101c",
  },
  titleColor: {
    color: "#fff",
  },
  backgroundView: {
    borderWidth: 2,
    borderColor: "#fff",
    borderRadius: 10,
    padding: 10,
  },
  buttonEdit: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "blue",
    width: 100,
  },
  textColor: {
    color: "#fff",
    textAlign: "center",
  },
});
