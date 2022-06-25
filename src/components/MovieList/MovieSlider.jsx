import React from "react";
import MovieCard from "./MovieCard";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
const sliderSettings = {
    // autoplay: true,
    lazyLoad: true,
    infinite: true,
    slidesToShow: 4,
    slidesToScroll: 1,
    initialSlide: 2,
};
export default function MovieSlider({ movieToShow }) {
    return (
        <div>
            <Slider {...sliderSettings}>
                {movieToShow.map((movie) => {
                    return (
                        <MovieCard key={movie.maPhim} data={movie}></MovieCard>
                    );
                })}
            </Slider>
        </div>
    );
}
