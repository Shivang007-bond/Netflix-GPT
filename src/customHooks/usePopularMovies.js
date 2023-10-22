import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { options } from "../utils/constants";
import { addPopularMovies } from "../utils/Redux/movieSlice";

const usePopularMovies = () => {
  const dispatch = useDispatch();

  const fetchPopularMovies = async () => {
    const data = await fetch(
      "https://api.themoviedb.org/3/movie/popular?&page=1",
      options
    );
    const json = await data.json();
    // console.log(json.results)
    dispatch(addPopularMovies(json.results));
  };

  useEffect(() => {
    fetchPopularMovies();
  }, []);
};

export default usePopularMovies;
