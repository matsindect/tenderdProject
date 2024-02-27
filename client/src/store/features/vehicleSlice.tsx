import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from 'axios';

export enum VehicleStatus {
    Active = "Active",
    Inactive = "Inactive",
    Maintenance = "Maintenance"
}
// Define Vehicle data schema
export interface IVehicleData {
    regNumber: string;
    vehicleModel: string;
    type: string;
    status: VehicleStatus;
    iotDevice: string;
    _id: string;
}

interface VehicleState {
    vehicles: IVehicleData[];
}

const initialState: VehicleState = {
    vehicles: []
}

export const registerVehicle = createAsyncThunk(
    "vehicle/addVehicle",
    async (payload: IVehicleData) => { // Accept payload as a single object
        const newVehicle = await axios.post("http://localhost:8082/api/vehicles", payload);
        return newVehicle.data; // Return the data property of the response
    }
)

export const getAllVehicles = createAsyncThunk(
    "vehicle/getAllVehicles",
    async () => { // Accept payload as a single object
        const newVehicle = await axios.get("http://localhost:8082/api/vehicles");
        return newVehicle.data; // Return the data property of the response
    }
)

export const VehicleSlice = createSlice({
    name: 'vehicle',
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder.addCase(registerVehicle.fulfilled, (state, action: PayloadAction<IVehicleData>) => { // Correct payload action type
            state.vehicles.push(action.payload); // Push the received payload directly
        }).addCase(getAllVehicles.fulfilled,(state, action: PayloadAction<IVehicleData[]>)=>{
            state.vehicles = action.payload
        })
    }
})

export default VehicleSlice.reducer;
