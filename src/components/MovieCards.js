import { image_url } from "../utils/constants";

const MovieCards = ({ alt, posterPath }) => {
  if (!posterPath) return null;
  return (
    <div className="w-32 md:w-48 px-4">
      <img alt={alt} src={image_url + posterPath} />
    </div>
  );
};

export default MovieCards;
