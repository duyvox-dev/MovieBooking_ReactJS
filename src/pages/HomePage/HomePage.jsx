import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { showMessage } from "../../utils/messageUtils";
import { clearMessage } from "../../redux/messageReducer";
import Spinner from "../../components/Spinner";
import { getBannerList, getMovieList } from "../../redux/movieReducer";
export default function HomePage() {
    const dispatch = useDispatch();
    const message = useSelector((state) => state.message);
    const { loading, bannerList, movieList } = useSelector(
        (state) => state.movie
    );
    const auth = useSelector((state) => state.auth);
    useEffect(() => {
        showMessage(message);
        dispatch(clearMessage());
    }, [message]);

    useEffect(() => {
        console.log(movieList);
    }, [movieList]);
    useEffect(() => {
        console.log(bannerList);
    }, [bannerList]);
    useEffect(() => {
        console.log(auth);
    }, [auth]);
    useEffect(() => {
        dispatch(clearMessage());
        dispatch(getBannerList());
        dispatch(getMovieList());
    }, []);
    return <div>{loading && <Spinner size="large" />}</div>;
}
