import axios from "axios";
import { useEffect, useState } from "react";
import API_URL from "../Services/API";
const useGetUpcomingMovie = () => {
  const [data, setData] = useState([]);
  const getUpcomingMovie = async () => {
    return await axios
      .get(`${API_URL}/api/QuanLyPhim/LayDanhSachPhim?keyword=1&status=0`)
      .then(({ data }) => {
        setData(data?.content);
      })
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    getUpcomingMovie();
  }, []);

  const movies = data;

  return {
    movies,
  };
};

export default useGetUpcomingMovie;
