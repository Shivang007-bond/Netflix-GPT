import React, { useRef } from "react";
import lang from "../utils/languageConstants";
import { useDispatch, useSelector } from "react-redux";
import openai from "../utils/openAI";
import { addGptMovieResult } from "../utils/Redux/gptSlice";
import { options } from "../utils/constants";

const GptSearchBar = () => {
  const selectedLang = useSelector((store) => store.configuration.lang);
  const searchedText = useRef(null);
  const dispatch = useDispatch();

  const searchTMDbMovies = async (movie) => {
    const data = await fetch(
      "https://api.themoviedb.org/3/search/movie?query=" +
        movie +
        "&include_adult=false&language=en-US&page=1",
      options
    );
    const json = await data.json();

    return json.results;
  };

  const handleGptSearchClick = async () => {
    //call GPT API
    const prompt =
      "Act as a movie recommendation system and suggest some movies for the query :" +
      searchedText.current.value +
      "only give me names of 10 movies, comma saperated like the example result given ahead : 'phir hera pheri' , 'gadar' , 'sholay' , 'don','golmaal' ";

    const gptResults = await openai.chat.completions.create({
      messages: [{ role: "user", content: prompt }],
      model: "gpt-3.5-turbo",
    });

    // console.log(gptResults.choices?.[0]?.message?.content);
    const gptMovies = gptResults.choices?.[0]?.message?.content.split(",");

    const promiseArr = gptMovies.map((movie) => searchTMDbMovies(movie));
    // [Promise , Promise , Promise , Promise , Promise]

    const tmdbResults = await Promise.all(promiseArr);

    dispatch(
      addGptMovieResult({ movieNames: gptMovies, movieResults: tmdbResults })
    );
  };

  return (
    <div className="pt-[10%] flex justify-center">
      <form
        className="w-1/2 bg-gray-900 bg-opacity-50 grid grid-cols-12 rounded-md"
        onSubmit={(e) => e.preventDefault()}
      >
        <input
          ref={searchedText}
          type="text"
          className="p-2 m-4 rounded-lg bg-transparent border border-white col-span-10 font-bold text-white"
          placeholder={lang[selectedLang].send_a_message}
        />
        <button
          className="p-1 m-4 col-span-2  bg-red-800 font-semibold text-white rounded-md hover:bg-red-900"
          onClick={handleGptSearchClick}
        >
          {lang[selectedLang].send}
        </button>
      </form>
    </div>
  );
};

export default GptSearchBar;
