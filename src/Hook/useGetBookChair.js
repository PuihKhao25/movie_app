import axios from 'axios';
import {useState, useEffect} from 'react';
import API_URL from '../Services/API';

const useGetBookChair = ({maLichChieu}) => {
  const [data, setData] = useState([]);
  const getBookChairMovie = async () => {
    return await axios
      .get(`${API_URL}/api/QuanLyDatVe/LayVeDaDat?malichchieu=${maLichChieu}`)
      .then(({data}) => {
        setData(data?.content);
      })
      .catch(err => console.log(err));
  };
  useEffect(() => {
    getBookChairMovie();
  }, []);

  const BookChairMovie = data;

  return {
    BookChairMovie,
  };
};

export default useGetBookChair;
