import React from "react";
import lang from "../utils/languageConstants";
import { useSelector } from "react-redux";

const GptSearchBar = () => {
  const selectedLang = useSelector((store) => store.configuration.lang);

  return (
    <div className="pt-[10%] flex justify-center">
      <form className="w-1/2 bg-gray-900 bg-opacity-50 grid grid-cols-12 rounded-md">
        <input
          type="text"
          className="p-2 m-4 rounded-lg bg-transparent border border-white col-span-10 font-bold text-white"
          placeholder={lang[selectedLang].send_a_message}
        />
        <button className="p-1 m-4 col-span-2  bg-red-800 font-semibold text-white rounded-md hover:bg-red-900">
          {lang[selectedLang].send}
        </button>
      </form>
    </div>
  );
};

export default GptSearchBar;
