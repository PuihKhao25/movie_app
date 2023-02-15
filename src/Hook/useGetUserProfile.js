import axios from 'axios';
import {useEffect, useState} from 'react';
import API_URL from '../Services/API';

const useGetUserProfile = ({taiKhoan}) => {
  const [data, setData] = useState([]);
  const getUserProfile = async () => {
    return await axios
      .get(`${API_URL}/api/QuanLyNguoiDung/ThongTinTaiKhoan/${taiKhoan}`)
      .then(({data}) => {
        setData(data?.content);
      })
      .catch(err => console.log(err));
  };
  useEffect(() => {
    getUserProfile();
  }, []);
  profile = data;
  return {
    profile,
  };
};

export default useGetUserProfile;
