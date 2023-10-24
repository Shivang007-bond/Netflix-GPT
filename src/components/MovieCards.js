import { image_url } from "../utils/constants";

const MovieCards = ({ alt, posterPath }) => {
  return (
    <div className="w-48 px-4">
      <img alt={alt} src={image_url + posterPath} />
    </div>
  );
};

export default MovieCards;
 