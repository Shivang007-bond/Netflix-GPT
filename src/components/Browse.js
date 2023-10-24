import React from "react";
import Header from "./Header";
import useNowPlayingMovies from "../customHooks/useNowPlayingMovies";
import MainContainer from "./MainContainer";
import SecondaryContainer from "./SecondaryContainer";
import useTopRatedMovies from "../customHooks/useTopRatedMovies";
import usePopularMovies from "../customHooks/usePopularMovies";
import useUpcomingMovies from "../customHooks/useUpcomingMovies";
import GptSearch from "./GptSearch";
import { useSelector } from "react-redux";

const Browse = () => {
  useNowPlayingMovies();
  usePopularMovies();
  useTopRatedMovies();
  useUpcomingMovies();

  const showGptSearch = useSelector((store) => store.gpt?.showGptSearch);

  return (
    <div>
      <Header />
      {showGptSearch ? (
        <GptSearch />
      ) : (
        <>
          {" "}
            <MainContainer />
          <SecondaryContainer />
        </>
      )}

      {/* 
      Main Container 
          - Video Background
          - Video Title 
          
      Secondary Container 
          - MovieList * n
          - cards * n
      */}
    </div>
  );
};

export default Browse;
