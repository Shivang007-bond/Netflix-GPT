import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { options } from "../utils/constants";
import { addTopRatedMovies } from "../utils/Redux/movieSlice";

const useTopRatedMovies = () => {
  const dispatch = useDispatch();

  const topRatedMovies = useSelector((store) => store.movies.topRatedMovies);

  const fetchTopRatedMovies = async () => {
    const data = await fetch(
      "https://api.themoviedb.org/3/movie/top_rated",
      options
    );
    const json = await data.json();
    // console.log(json.results)
    dispatch(addTopRatedMovies(json.results));
  };

  useEffect(() => {
    !topRatedMovies && fetchTopRatedMovies();
  }, []);
};

export default useTopRatedMovies;
