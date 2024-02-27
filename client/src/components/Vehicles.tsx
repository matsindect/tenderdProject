import React, { useEffect} from "react";
import { useAppDispatch } from "../store/store";
import { getModelsAndMake } from "../store/features/vehicleMakesSlice";
import { getIoTDevices } from "../store/features/iotDevicesSlice";
import { getAllVehicles } from "../store/features/vehicleSlice";
import RegisterVehicle from "./RegisterVehicle";
import VehicleList from "./VehicleList";

const Vehicles: React.FC  = () => {

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getModelsAndMake());
    dispatch(getIoTDevices());
    dispatch(getAllVehicles());
  }, [dispatch]);

  return (
    <div className="flex justify-center">
      <div className="w-1/3 mx-4">
        {/* Register Vehicle Form */}
        <div className="bg-white p-4 rounded-lg shadow-md">
          
          <RegisterVehicle/>
        </div>
      </div>
      <div className="w-2/3 mx-4">
        {/* Vehicle List */}
        <div className="bg-white p-4 rounded-lg shadow-md">
          <VehicleList/>
        </div>
      </div>
    </div>
  );
};

export default Vehicles;