const VideoTitle = ({ title, overview }) => {
  return (
    <div className="aspect-video w-screen pt-[30%] px-6 md:px-20 absolute z-20 bg-gradient-to-r from-black">
      <h1 className="font-bold text-xl md:text-4xl py-2 text-white">{title}</h1>
      <p className="hidden md:inline-block font-medium text-md w-2/4 text-white">
        {overview}
      </p>

      <div className="my-2 md:my-4">
        <button className="bg-white text-black px-2 py-1 md:px-4 md:py-2 rounded-sm text-lg font-semibold hover:opacity-70">
          ▶ Play
        </button>
        <button className="hidden md:inline-block bg-gray-500 bg-opacity-50 text-white px-4 py-2 rounded-sm text-lg font-semibold mx-4 hover:bg-gray-800">
          ℹ️ More Info
        </button>
      </div>
    </div>
  );
};

export default VideoTitle;
