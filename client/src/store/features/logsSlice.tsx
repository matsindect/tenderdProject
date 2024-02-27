import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit"
import axios from 'axios';

// Define interface for VehicleMaintenanceRecord
export interface IVehicleMaintenanceRecord {
    _id:string,
    milage: number;
    reportOfWorkPerformed: string;
    costs: number;
    notes: string;
    vehicle:string;
    date:string;
}

interface LogState{
    logs:IVehicleMaintenanceRecord[],
}

const initialState:LogState = {
    logs:[]
}

export const LogsSlice = createSlice({
    name:'logs',
    initialState,
    reducers:{
    },
    extraReducers:(builder)=>{
        builder.addCase(getLogs.fulfilled,(state, action:PayloadAction<any>)=>{
            state.logs = action.payload
        })
    }
})

export const getLogs = createAsyncThunk(
    "vehicle/getLogs",
    async()=>{
        const {data} = await axios.get("http://localhost:8082/api/logs")
        console.log(data)
       return data
    }   
)
export const createLogs = createAsyncThunk(
    "vehicle/addVehicle",
    async (payload: IVehicleMaintenanceRecord) => { // Accept payload as a single object
        const newVehicle = await axios.post("http://localhost:8082/api/logs", payload);
        return newVehicle.data; // Return the data property of the response
    }
)
export default LogsSlice.reducer
