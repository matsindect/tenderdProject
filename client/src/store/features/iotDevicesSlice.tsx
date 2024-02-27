import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit"
import axios from 'axios';



interface IoTDeviceState{
    iotDevices:any[],
}

const initialState:IoTDeviceState = {
    iotDevices:[]
}

export const IoTDevicesSlice = createSlice({
    name:'iotDevices',
    initialState,
    reducers:{
    },
    extraReducers:(builder)=>{
        builder.addCase(getIoTDevices.fulfilled,(state, action:PayloadAction<any>)=>{
            state.iotDevices = action.payload
        })
    }
})

export const getIoTDevices = createAsyncThunk(
    "vehicle/getIoTDevices",
    async()=>{
        const {data} = await axios.get("http://localhost:8082/api/devices")
       return data
    }
        
)

export default IoTDevicesSlice.reducer
