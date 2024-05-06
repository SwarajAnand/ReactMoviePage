import propTypes from "prop-types";

const MovieCard = ({ moviesData }) => {
  const { poster_path, title, vote_average, overview } = moviesData;
  return (
    <div className="w-1/4 p-4 text-center">
      <div className="flex justify-center relative">
        <img
          className="h-[400px] rounded-lg cursor-pointer hover:scale-105 duration-150"
          src={`https://image.tmdb.org/t/p/w500${poster_path}`}
          alt={title}
        />

        <p
          className={"font-bold text-lg bg-white p-1 absolute bottom-2 right-6"}
          style={{
            color: vote_average > 7 ? "green" : "red",
            fontFamily: "Dancing Script, cursive",
            borderRadius: "4px",
            width: "60px",
          }}
        >
          {vote_average.toString().slice(0, 3)}
        </p>
      </div>
      <div className="flex justify-around p-2">
        <h1 className="font-black text-xl">{title}</h1>
      </div>

      <p
        className="text-center"
        style={{
          fontFamily: "Roboto, sans-serif",
          fontWeight: "300",
        }}
      >
        {overview.length > 150 ? `${overview.slice(0, 160)}...` : overview}
      </p>
    </div>
  );
};

MovieCard.propTypes = {
  moviesData: propTypes.object.isRequired,
};

export default MovieCard;
