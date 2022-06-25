import React from "react";
import BannerItem from "./BannerItem";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
export default function Banner({ bannerList }) {
    const sliderSettings = {
        autoplay: true,
        lazyLoad: true,
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        initialSlide: 1,
        arrows: false,
    };
    return (
        <div className="">
            <Slider {...sliderSettings}>
                {bannerList.map((banner) => {
                    return <BannerItem key={banner.maBanner} data={banner} />;
                })}
            </Slider>
        </div>
    );
}
