import React, { useEffect} from "react";
import { useAppDispatch } from "../store/store";

import VehicleMaintenanceForm from "./CreateLogs";
import LogsList from "./LogsList";
import { getLogs } from "../store/features/logsSlice";
import { getAllVehicles } from "../store/features/vehicleSlice";

const Logs: React.FC  = () => {

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getLogs());
    dispatch(getAllVehicles())
  }, [dispatch]);

  return (
    <div className="flex justify-center">
      <div className="w-1/3 mx-4">
        {/* Register Vehicle Form */}
        <div className="bg-white p-4 rounded-lg shadow-md">
          
          <VehicleMaintenanceForm/>
        </div>
      </div>
      <div className="w-2/3 mx-4">
        {/* Vehicle List */}
        <div className="bg-white p-4 rounded-lg shadow-md">
          <LogsList/>
        </div>
      </div>
    </div>
  );
};

export default Logs;