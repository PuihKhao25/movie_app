import React, { useContext, useState } from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";
import Field from "../../Constants/Field";
import { AuthContext } from "../../Constants/AuthContext";
const ForgotPassword = ({ navigation }) => {
  const [email, setEmail] = useState("khaoba@gmail.com");
  const [matKhau, setMat_khau] = useState("654321");
  const { isLoading, login } = useContext(AuthContext);
  return (
    <>
      <View style={styles.container}>
        <View style={styles.backgroundImage}>
          <Image
            style={styles.imgaeLogo}
            source={require("../../assets/logomovie.png")}
          />
        </View>
        <View style={styles.containerLogin}>
          <Text style={styles.loginNumber}>Quên Mật Khẩu</Text>
          <Field
            style={styles.EnterField}
            placeholder="Nhập email"
            keyboardType={"email"}
            value={email}
            onChangeText={(text) => setEmail(text)}
          />
          <TouchableOpacity
            style={styles.forgetPass}
            onPress={() => navigation.navigate("Login")}
          >
            <Text style={styles.colorForgetPass}>Đăng nhập</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.buttonLogin}
            onPress={() => navigation.navigate("ChangePassword")}
            // onPress={() => {
            //   login(email, matKhau);
            // }}
          >
            <Text style={styles.colorTextLogin}>Tiếp tục</Text>
          </TouchableOpacity>
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
    width: 405,
  },
  imgaeLogo: {
    width: 150,
    height: 150,
    marginTop: 50,
  },
  containerLogin: {
    backgroundColor: "#041b2d",
    height: 700,
    width: 405,
    borderTopLeftRadius: 130,
    paddingTop: 85,
    alignItems: "center",
  },
  loginNumber: {
    fontSize: 30,
    color: "#fff",
    fontWeight: "bold",
    marginBottom: 50,
  },
  EnterField: {
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#bbb",
    borderRadius: 5,
    paddingHorizontal: 14,
  },
  forgetPass: {
    alignItems: "flex-end",
    width: "78%",
    paddingRight: 16,
    marginBottom: 100,
  },
  colorForgetPass: {
    color: "#f47326",
    fontWeight: "bold",
    fontSize: 16,
  },
  buttonLogin: {
    backgroundColor: "#f47326",
    borderRadius: 100,
    alignItems: "center",
    width: 300,
    paddingVertical: 5,
    marginVertical: 10,
  },
  colorTextLogin: {
    color: "#fff",
    fontSize: 25,
    fontWeight: "bold",
  },
  notAccount: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
  },
  titleNotAccount: {
    fontSize: 13,
    color: "#ffff",
  },
  titleRegisterAccount: {
    color: "#f47326",
    fontWeight: "bold",
    fontSize: 13,
    marginLeft: 5,
  },
});

export default ForgotPassword;


// ForgotPassword

