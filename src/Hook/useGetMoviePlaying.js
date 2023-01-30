import axios from 'axios';
import {useState, useEffect} from 'react';
import API_URL from '../Services/API';

const useGetMoviePlaying = () => {
  const [data, setData] = useState([]);
  const getMoviePlaying = async () => {
    return await axios
      .get(`${API_URL}/api/QuanLyPhim/LayDanhSachPhim?keyword=1&status=1`)
      .then(({data}) => {
        setData(data?.content);
      })
      .catch(err => console.log(err));
  };
  useEffect(() => {
    getMoviePlaying();
  }, []);

  const moviesPlay = data;

  return {
    moviesPlay,
  };
};

export default useGetMoviePlaying;
