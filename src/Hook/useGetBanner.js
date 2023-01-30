import axios from 'axios';
import {useEffect, useState,useContext} from 'react';
import API_URL from '../Services/API';
import { AuthContext } from '../Constants/AuthContext';
const useGetBanner = () => {
  const {userInfo} = useContext(AuthContext);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false)
  const config = {
    headers: {
      Authorization: 'Bearer ' + userInfo.content.accessToken,
    },
  };
  const getInfoUser = async () => {
    setLoading(true)
    return await axios
      .get(`${API_URL}/api/QuanLyPhim/LayDanhSachBanner`,config)
      .then(({data}) => {
        setData(data?.content);
      })
      .catch(err => console.log(err))
      .finally(() => {
        setLoading(false)
      })
  };
  useEffect(() => {
    getInfoUser();
  }, []);

  const banners = data;
  return {
    banners,
    loading,
  };
};

export default useGetBanner;
