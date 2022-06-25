import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { showMessage } from "../../utils/messageUtils";
import { clearMessage } from "../../redux/messageReducer";
import Spinner from "../../components/Spinner";
import { getBannerList, getMovieList } from "../../redux/movieReducer";
import Banner from "./Banner/Banner";
import MovieList from "../../components/MovieList/MovieList";
import WelcomeScreen from "./WelcomeScreen";
import { setWelcomeScreen } from "../../redux/miscReducer";
export default function HomePage() {
    const dispatch = useDispatch();
    const message = useSelector((state) => state.message);
    const { welcomeScreen } = useSelector((state) => state.misc);
    const { loading, bannerList, movieList } = useSelector(
        (state) => state.movie
    );
    const auth = useSelector((state) => state.auth);
    useEffect(() => {
        showMessage(message);
        dispatch(clearMessage());
    }, [message]);

    useEffect(() => {
        dispatch(clearMessage());
        dispatch(getBannerList());
        dispatch(getMovieList());
        setTimeout(() => {
            dispatch(setWelcomeScreen(false));
        }, 1.5 * 1000);
    }, []);
    document.title = "Movie Time";
    return (
        <div>
            <div className="">
                {welcomeScreen && <WelcomeScreen />}
                {loading && <Spinner size="large" />}
                {bannerList.length > 0 && <Banner bannerList={bannerList} />}

                {movieList.length > 0 && <MovieList movieList={movieList} />}
            </div>
        </div>
    );
}
