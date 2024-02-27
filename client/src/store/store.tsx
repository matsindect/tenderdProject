import { configureStore } from "@reduxjs/toolkit";
import VehicleSliceReducer from "./features/vehicleSlice";
import VehicleMakeReduser from "./features/vehicleMakesSlice";
import IotDevicesReducer from "./features/iotDevicesSlice"
import SockerReducer from './features/socketSlice'
import LogsReducer from './features/logsSlice'

import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

export const store = configureStore({
    reducer:{
        vehicle: VehicleSliceReducer,
        vihicleMake:VehicleMakeReduser,
        iotDevices: IotDevicesReducer,
        paths: SockerReducer,
        logs:LogsReducer
    }
})

export const useAppDispatch:()=> typeof store.dispatch = useDispatch;

export const useAppSelector: TypedUseSelectorHook<ReturnType<typeof store.getState>> = useSelector

export type RootState = ReturnType<typeof store.getState>