import React, { useEffect} from "react";
import { useAppDispatch, useAppSelector } from "../store/store";
import MapContainer from "./MapContainer";
import { getCordinates } from "../store/features/vehicleMakesSlice";
import socket from "../Socket.io";
interface LatLng {
  lat: number;
  lng: number;
  bearing: number;
}
const Dashboard: React.FC  = () => {
  const path = useAppSelector((state) => state.vihicleMake.coordinates);
  const reduxMarkerPosition = useAppSelector(state => state.paths.path); // Marker position from Redux state

  const dispatch = useAppDispatch();

  useEffect(() => {
    socket.emit("Hello", "Am connected")
    console.log("reduxMarkerPosition", reduxMarkerPosition)
    dispatch(getCordinates())
  }, [dispatch]);

  return (
    <div className="flex justify-center">
  <div className="w-full mx-4"> {/* Changed w-1/2 to w-full */}
    {/* Register Vehicle Form */}
    <div className="bg-white p-4 rounded-lg shadow-md">
    <MapContainer path={path} reduxMarkerPosition={reduxMarkerPosition}/>
    </div>
  </div>
</div>
  );
};

export default Dashboard;