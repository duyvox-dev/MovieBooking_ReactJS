import { createAsyncThunk, createSlice, createAction } from "@reduxjs/toolkit";
import { movieService } from "../service/movieService";
import { setSuccessMessage } from "./messageReducer";
export const getCheckoutDetail = createAsyncThunk(
    "checkout/getDetail",
    async (data, thunkAPI) => {
        try {
            const res = await movieService.getShowTimeDetail(data);
            const rawData = res.data.content;
            const movieInfo = rawData.thongTinPhim;
            const seats = rawData.danhSachGhe.map((seat) => {
                if (seat.taiKhoanNguoiDat) seat.type = "reserved";
                else seat.type = "available";
                return seat;
            });
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
    "checkout/bookticket",
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
    async (seatCode, thunkAPI) => {
        try {
            thunkAPI.dispatch(updateBookingSeats(seatCode));

            return {};
        } catch (err) {
            console.log(err);
            return thunkAPI.rejectWithValue();
        }
    }
);
const checkoutSlice = createSlice({
    name: "checkout",
    initialState: {
        movieInfo: {},
        bookingSeats: [],
        othersBooking: [],
        seats: {},
        loading: false,
    },
    reducers: {
        updateBookingSeats: (state, action) => {
            const newBookingSeats = [...state.bookingSeats];
            let seatToBook = newBookingSeats.find(
                (seat) => seat.maGhe === action.payload
            );
            if (seatToBook) {
                newBookingSeats.forEach((seat, index) => {
                    if (seat.maGhe === action.payload) {
                        newBookingSeats.splice(index, 1);
                    }
                });
            } else {
                seatToBook = state.seats.find((seat) => {
                    if (seat.maGhe === action.payload && !seat.taiKhoanNguoiDat)
                        return seat;
                });
                if (seatToBook) newBookingSeats.push(seatToBook);
            }
            state.bookingSeats = newBookingSeats;
        },
        setOthersBooking: (state, action) => {
            state.othersBooking = action.payload;
        },
    },
    extraReducers: {
        [getCheckoutDetail.pending]: (state, action) => {
            state.loading = true;
            state.movieInfo = {};
            state.seats = {};
        },
        [getCheckoutDetail.fulfilled]: (state, action) => {
            state.loading = false;
            state.movieInfo = action.payload.movieInfo;
            state.seats = action.payload.seats;
        },
        [getCheckoutDetail.rejected]: (state, action) => {
            state.loading = false;
        },
        [bookMovieTicket.pending]: (state, action) => {
            state.loading = true;
        },
        [bookMovieTicket.fulfilled]: (state, action) => {
            state.loading = false;
            state.bookingSeats = [];
        },
        [bookMovieTicket.rejected]: (state, action) => {
            state.loading = false;
        },
        // [bookSeat.pending]: (state, action) => {
        //     state.loading = true;
        // },
        // [bookSeat.fulfilled]: (state, action) => {
        //     state.loading = false;
        //     state.bookingSeats = action.payload;
        // },
        // [bookSeat.rejected]: (state, action) => {
        //     state.loading = false;
        // },
    },
});
const { reducer, actions } = checkoutSlice;
export const { updateBookingSeats, setOthersBooking } = actions;

export default reducer;
