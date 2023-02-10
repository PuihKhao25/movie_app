import axios from 'axios';
import {useState, useEffect} from 'react';
import API_URL from '../Services/API';

const useGetDetailMovieBookTicket = ({maLichChieu}) => {
  const [data, setData] = useState({});
  const getMovieDetail = async () => {
    return await axios
      .get(`${API_URL}/api/QuanLyDatVe/LayPhimTheoLichChieu?maLichChieu=${maLichChieu}`)
      .then(({data}) => {
        setData(data?.content);
      })
      .catch(err => console.log(err));
  };
  useEffect(() => {
    getMovieDetail();
  }, []);

  const movieDetail = data;

  return {
    movieDetail,
  };
};

export default useGetDetailMovieBookTicket;
