import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { options } from "../utils/constants";
import { addUpcomingMovies } from "../utils/Redux/movieSlice";

const useUpcomingMovies = () => {
  const dispatch = useDispatch();

  const upcomingMovies = useSelector((store) => store.movies.upcomingMovies);

  const fetchUpcomingMovies = async () => {
    const data = await fetch(
      "https://api.themoviedb.org/3/movie/upcoming",
      options
    );
    const json = await data.json();
    // console.log(json.results)
    dispatch(addUpcomingMovies(json.results));
  };

  useEffect(() => {
    !upcomingMovies && fetchUpcomingMovies();
  }, []);
};

export default useUpcomingMovies;
