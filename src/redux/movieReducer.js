import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { movieService } from "../service/movieService";
import { setSuccessMessage } from "./messageReducer";
export const getBannerList = createAsyncThunk(
    "movie/bannerList",
    async (thunkAPI) => {
        try {
            const res = await movieService.getBannerList();
            const data = res.data.content;
            return data;
        } catch (err) {
            // const message = err.response.data.content;
            // thunkAPI.dispatch(setErrorMessage(message));
            return thunkAPI.rejectWithValue();
        }
    }
);
export const getMovieList = createAsyncThunk(
    "movie/movieList",
    async (thunkAPI) => {
        try {
            const res = await movieService.getMovieList();
            const data = res.data.content;
            return data;
        } catch (err) {
            // const message = err.response.data.content;
            // thunkAPI.dispatch(setErrorMessage(message));
            return thunkAPI.rejectWithValue();
        }
    }
);
export const getMovieDetail = createAsyncThunk(
    "movie/movieDetail",
    async (movieCode, thunkAPI) => {
        try {
            const res = await movieService.getMovieDetailAndShowTime(movieCode);
            const rawData = res.data.content;
            const processRawData = () => {
                const movieInfo = {
                    maPhim: rawData?.maPhim,
                    tenPhim: rawData?.tenPhim,
                    hinhAnh: rawData?.hinhAnh,
                    trailer: rawData?.trailer,
                    moTa: rawData?.moTa,
                    ngayKhoiChieu: rawData?.ngayKhoiChieu,
                    danhGia: rawData?.danhGia,
                    sapChieu: rawData?.sapChieu,
                    dangChieu: rawData?.dangChieu,
                };
                const showTime = rawData.heThongRapChieu;
                return {
                    movieInfo,
                    showTime,
                };
            };
            return processRawData();
        } catch (err) {
            // const message = err.response.data.content;
            // thunkAPI.dispatch(setErrorMessage(message));
            return thunkAPI.rejectWithValue();
        }
    }
);
export const getCheckoutDetail = createAsyncThunk(
    "movie/checkout",
    async (data, thunkAPI) => {
        try {
            const res = await movieService.getShowTimeDetail(data);
            const rawData = res.data.content;
            const movieInfo = rawData.thongTinPhim;
            const seats = rawData.danhSachGhe;
            return {
                movieInfo,
                seats,
            };
        } catch (err) {
            // const message = err.response.data.content;
            // thunkAPI.dispatch(setErrorMessage(message));
            return thunkAPI.rejectWithValue();
        }
    }
);
export const bookMovieTicket = createAsyncThunk(
    "movie/bookticket",
    async (data, thunkAPI) => {
        try {
            const res = await movieService.bookMovieTicket(data);
            thunkAPI.dispatch(setSuccessMessage(res.data.message));
            thunkAPI.dispatch(getCheckoutDetail(data.maLichChieu));
            return res;
        } catch (err) {
            // const message = err.response.data.content;
            // thunkAPI.dispatch(setErrorMessage(message));
            return thunkAPI.rejectWithValue();
        }
    }
);
export const bookSeat = createAsyncThunk(
    "movie/bookSeat",
    async (data, thunkAPI) => {
        try {
        } catch (err) {
            // const message = err.response.data.content;
            // thunkAPI.dispatch(setErrorMessage(message));
            return thunkAPI.rejectWithValue();
        }
    }
);

const movieSlice = createSlice({
    name: "movie",
    initialState: {
        bannerList: [],
        movieList: [],
        movieDetail: {},
        checkoutDetail: {},
        loading: false,
    },
    extraReducers: {
        [getBannerList.pending]: (state, action) => {
            state.loading = true;
        },
        [getBannerList.fulfilled]: (state, action) => {
            state.loading = false;
            state.bannerList = action.payload;
        },
        [getMovieList.pending]: (state, action) => {
            state.loading = true;
        },
        [getMovieList.fulfilled]: (state, action) => {
            state.loading = false;
            state.movieList = action.payload;
        },
        [getMovieDetail.pending]: (state, action) => {
            state.loading = true;
            state.movieDetail = {};
        },
        [getMovieDetail.fulfilled]: (state, action) => {
            state.loading = false;
            state.movieDetail = action.payload;
        },
        [getMovieDetail.rejected]: (state, action) => {
            state.loading = false;
        },
        [getCheckoutDetail.pending]: (state, action) => {
            state.loading = true;
            state.checkoutDetail = {};
        },
        [getCheckoutDetail.fulfilled]: (state, action) => {
            state.loading = false;
            state.checkoutDetail = action.payload;
        },
        [getCheckoutDetail.rejected]: (state, action) => {
            state.loading = false;
        },
        [bookMovieTicket.pending]: (state, action) => {
            state.loading = true;
        },
        [bookMovieTicket.fulfilled]: (state, action) => {
            state.loading = false;
        },
        [bookMovieTicket.rejected]: (state, action) => {
            state.loading = false;
        },
    },
});
const { reducer } = movieSlice;
export default reducer;
