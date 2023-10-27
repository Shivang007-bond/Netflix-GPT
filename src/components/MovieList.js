import MovieCards from "./MovieCards";

const MovieList = ({ title, movies }) => {
  return (
    <div className="p-6">
      <h1 className="text-lg font-semibold md:text-xl text-white">{title}</h1>
      <div className="flex overflow-x-scroll py-4">
        <div className="flex">
          {movies?.map((movie) => (
            <MovieCards
              key={movie.id}
              alt={movie.original_title}
              posterPath={movie.poster_path}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default MovieList;
