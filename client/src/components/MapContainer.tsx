import React, { useEffect, useState } from "react";
import { GoogleMap, Polyline, Marker } from "@react-google-maps/api";
import { useAppSelector } from "../store/store";

interface LatLng {
  lat: number;
  lng: number;
  bearing: number;
}

interface MapContainerProps {
  path: LatLng[];
  reduxMarkerPosition:LatLng
}

const MapContainer: React.FC<MapContainerProps> = ({ path, reduxMarkerPosition }) => {
  const [mapLoaded, setMapLoaded] = useState(false);
  const center = path.length > 0 ? path[10] : { lat: 0, lng: 0 };
  const [icon1, setIcon1] = useState<any>(null); // State for the marker icon
  const [markerPosition, setMarkerPosition] = useState(path[0]); // State for the marker position
  const [polylinePath, setPolylinePath] = useState<LatLng[]>([]); // State for the polyline path
  
  useEffect(() => {
    if (!window.google || !window.google.maps) {
      const script = document.createElement("script");
      script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyBgFRUldkVXqqIkelgOASG-97UnsAnJKmg`;
      script.async = true;
      script.onload = () => {
        setMapLoaded(true);
        // Create the icon after the Google Maps API is loaded
        const icon = {
          url: "https://images.vexels.com/media/users/3/154573/isolated/preview/bd08e000a449288c914d851cb9dae110-hatchback-car-top-view-silhouette-by-vexels.png",
          scaledSize: new window.google.maps.Size(40, 40),
          anchor: new window.google.maps.Point(20, 20),
          scale: 0.7,
        };
        setIcon1(icon);
      }
      document.body.appendChild(script);
      return () => {
        document.body.removeChild(script);
      };
    } else {
      setMapLoaded(true);
    }
  }, []);
  useEffect(() => {
      // Update marker position when Redux state changes
      if (reduxMarkerPosition) {
        console.log(reduxMarkerPosition)
        setMarkerPosition(reduxMarkerPosition);
      }
    }, [reduxMarkerPosition]);

    useEffect(() => {
      // Update polyline path when component path prop changes
      setPolylinePath(path);
      console.log(reduxMarkerPosition)
  }, [path]);

  if (!mapLoaded) {
    return <div>Loading map...</div>;
  }

  return (
    <div style={{ height: "700px", width: "100%" }}>
      {mapLoaded ? (
        <GoogleMap
          mapContainerStyle={{ height: "100%", width: "100%" }}
          zoom={17}
          center={center}
        >
          <Polyline path={polylinePath} options={{ strokeColor: "#FF0000" }} />
          {markerPosition && <Marker position={markerPosition} icon={icon1} />}
         
        </GoogleMap>
      ) : (
        <div>Loading map...</div>
      )}
    </div>
  );
};

export default MapContainer;
