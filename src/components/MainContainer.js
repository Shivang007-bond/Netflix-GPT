import { useSelector } from "react-redux";
import VideoTitle from "./VideoTitle.js";
import VideoBackground from "./VideoBackground.js";

const MainContainer = () => {
  const movies = useSelector((store) => store.movies?.nowPlayingMovies);
  if (!movies) return; //early return

  const mainMovie = movies[3];
  //   console.log(mainMovie)

  const { original_title, overview, id } = mainMovie;

  return (
    <div className="pt-[40%] bg-black  md:pt-0 ">
      <VideoTitle title={original_title} overview={overview} />
      <VideoBackground movieID={id} />
    </div>
  );
};

export default MainContainer;
