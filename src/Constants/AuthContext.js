import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import React, {createContext, useEffect, useState} from 'react';
import API_URL from '../Services/API';
import {Alert} from 'react-native';

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
  const [userInfo, setUserInfo] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [splashLoading, setSplashLoading] = useState(false);
  const [profile, setProfile] = useState('');
  const login = (email, matKhau) => {
    setIsLoading(true);
    axios
      .post(`${API_URL}/api/QuanLyNguoiDung/DangNhap`, {
        email,
        matKhau,
      })
      .then(res => {
        const userInfo = res.data;
        setUserInfo(userInfo);
        AsyncStorage.setItem('userInfo', JSON.stringify(userInfo));
        setIsLoading(false);
      })
      .catch((e) => {
        console.log(`login error ${e}`);
        setIsLoading(false);
      });
  };

  const Register = (hoTen, email, soDt, matKhau, setHo_ten) => {
    setIsLoading(true);

    axios
      .post(`${API_URL}/api/QuanLyNguoiDung/DangKy`, {
        hoTen,
        email,
        soDt,
        matKhau,
      })
      .then(res => {
        Alert.alert('Đăng kí thành công');
        setHo_ten('');
        setIsLoading(false);
      })
      .catch(e => {
        console.log(`Register error ${e}`);
        setIsLoading(false);
      });
  };

  const logout = () => {
    setUserInfo(null);
    AsyncStorage.removeItem('userInfo');
  };

  const isLoggedIn = async () => {
    try {
      setSplashLoading(true);

      const userInfo = await AsyncStorage.getItem('userInfo');
      userInfo = JSON.parse(userInfo);

      if (userInfo) {
        setUserInfo(userInfo);
      }

      setSplashLoading(false);
    } catch (e) {
      setSplashLoading(false);
      console.log(`is logged in error ${e}`);
    }
  };


  useEffect(() => {
    isLoggedIn();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isLoading,
        userInfo,
        splashLoading,
        profile,
        login,
        logout,
        Register,
      }}>
      {children}
    </AuthContext.Provider>
  );
};
