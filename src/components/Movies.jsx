import { useEffect, useState } from "react";
import Shimmer from "./Shimmer";
import MovieCard from "./MovieCard";

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4MjU4NjY4OTNjNjBiYTVjYmYwZTY3MThiZGQ2NzMxMCIsInN1YiI6IjY1Y2JiYTFjOGM0NGI5MDE4MDk0MTc5MyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.pRwXeZxUfIkxE78P1llG_i4SlD3CV6i8dfhHeU9Y1EI",
  },
};

const Movies = () => {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [searchItem, setSearchItem] = useState("");

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    searchItem ? searchMovies(searchItem) : fetchMovies();
  }, [page]);

  const fetchMovies = () => {
    setSearchItem("");
    fetch(
      `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=${page}&sort_by=popularity.desc`,
      options
    )
      .then((response) => response.json())
      .then((response) => setMovies(response.results))
      .catch((err) => console.error(err));
  };

  const searchMovies = (searchData) => {
    console.log(searchData);
    fetch(
      `https://api.themoviedb.org/3/search/movie?query=${searchData}&include_adult=false&language=en-US&page=${page}`,
      options
    )
      .then((response) => response.json())
      .then((response) => setMovies(response.results))
      .catch((err) => console.error(err));
  };

  return (
    <div>
      <div className="flex">
        <section className="wrapper">
          <div className="top">MOVIES</div>
          <div className="bottom" aria-hidden="true">
            MOVIES
          </div>
        </section>

        <input
          className="inputBox"
          type="text"
          placeholder="Search Movies..."
          value={searchItem}
          onChange={(e) => {
            setSearchItem(e.target.value);
          }}
        />
        <div className="p-4">
          <button
            className="button-89"
            onClick={() => {
              fetchMovies();
              setPage(1);
            }}
          >
            RESET
          </button>

          {/* <button className="button-89" onClick={searchMovies}>
            SEARCH
          </button> */}

          <button
            className="button-89"
            onClick={() => {
              searchMovies(searchItem);
              setPage(1);
            }}
          >
            SEARCH
          </button>
        </div>
      </div>

      <h1 className="font-bold text-3xl p-3 ml-12">
        {searchItem
          ? movies.length
            ? `Search Results for ${searchItem}`
            : `No Results Found for ${searchItem}`
          : "All Movies"}
      </h1>

      <div className="flex flex-wrap">
        {movies.map((movie) => (
          <MovieCard moviesData={movie} key={movie.id} />
        ))}
      </div>

      <div className="flex justify-center gap-11 p-10">
        <button
          className="button-89"
          onClick={() => setPage(page === 1 ? 1 : page - 1)}
        >
          Previous
        </button>
        <p className="button-89 text-center font-medium"> Page {page} </p>
        <button
          className="button-89"
          onClick={() => {
            setPage(page + 1);
          }}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Movies;
