import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ThunkAction } from 'redux-thunk';

import socket from "../../Socket.io";
import { RootState } from "../store";


// Define Vehicle data schema
export interface LatLng {
    lat: number;
    lng: number;
    bearing: number;
  }
  

interface PathState {
    path: LatLng;
}

const initialState: PathState = {
    path: {
        lat:0,
        lng:0,
        bearing:0
    }
}; 

export const socketSlice = createSlice({
    name: 'path',
    initialState,
    reducers: {
        changePath:(state, action) => {
            state.path =action.payload.data;
          },
    },
    
})
export const { changePath } = socketSlice.actions
export default socketSlice.reducer;
