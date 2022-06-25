import React, { useState, useEffect } from "react";
import MovieSlider from "./MovieSlider";
export default function MovieList({ movieList }) {
    const [movieToShow, setMovieToShow] = useState([]);
    const [movieTab, setMovieTab] = useState(1);

    const handleNowShowingMovie = () => {
        const movieFilter = movieList.filter((movie) => !movie.sapChieu);
        setMovieToShow(movieFilter);
        setMovieTab(1);
    };
    const handleCommingSoonMovie = () => {
        const movieFilter = movieList.filter((movie) => movie.sapChieu);

        setMovieToShow(movieFilter);
        setMovieTab(2);
    };
    useEffect(() => {
        const movieFilter = movieList.filter((movie) => !movie.sapChieu);
        setMovieToShow(movieFilter);
    }, [movieList]);

    return (
        <div className="container mx-auto  py-10">
            <div className="flex gap-10 text-xl ml-10 mb-10">
                <div
                    onClick={handleNowShowingMovie}
                    className={
                        movieTab == 1
                            ? "text-yellow-500 underline cursor-pointer hover:text-yellow-500 underline-offset-8"
                            : "text-white cursor-pointer hover:text-yellow-500 underline-offset-8"
                    }
                >
                    Phim Đang Chiếu
                </div>
                <div
                    onClick={handleCommingSoonMovie}
                    className={
                        movieTab == 2
                            ? "text-yellow-500 underline cursor-pointer hover:text-yellow-500 underline-offset-8"
                            : "text-white cursor-pointer hover:text-yellow-500 underline-offset-8"
                    }
                >
                    Phim Sắp Chiếu
                </div>
            </div>
            <MovieSlider movieToShow={movieToShow} />
        </div>
    );
}
