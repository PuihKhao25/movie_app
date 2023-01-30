import axios from 'axios';
import {useState, useEffect} from 'react';
import API_URL from '../Services/API';

const useGetDetailMovie = ({maPhim}) => {
  const [data, setData] = useState([]);
  const getDetailMovie = async () => {
    return await axios
      .get(`${API_URL}/api/QuanLyRap/LayThongTinLichChieu?maPhim=${maPhim}`)
      .then(({data}) => {
        setData(data?.content);
      })
      .catch(err => console.log(err));
  };
  useEffect(() => {
    getDetailMovie();
  }, []);

  const detailMovie = data;

  return {
    detailMovie,
  };
};

export default useGetDetailMovie;
