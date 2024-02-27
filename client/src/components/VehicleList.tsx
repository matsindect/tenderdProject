import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../store/store';
import { getAllVehicles } from '../store/features/vehicleSlice';

const getStatusColor = (status: string): string => {
  switch (status.toLowerCase()) {
    case 'active':
      return 'bg-green-500';
    case 'maintenance':
      return 'bg-yellow-500';
    case 'inactive':
      return 'bg-red-500';
    default:
      return 'bg-gray-500';
  }
};
const VehicleList: React.FC = () => {
  const dispatch = useAppDispatch();
  const vehicles = useAppSelector((state) => state.vehicle.vehicles);

  useEffect(() => {
    dispatch(getAllVehicles());
  }, [dispatch]);

  return (
    <div className="container mx-auto px-4 py-8 pt-10">
    <h1 className="text-2xl font-bold mb-4">Vehicle List</h1>
    <table className="min-w-full divide-y divide-gray-200">
      <thead className="bg-gray-50">
        <tr>
          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Registration Number</th>
          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Model</th>
          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">IoT Device</th>
        </tr>
      </thead>
      <tbody className="bg-white divide-y divide-gray-200">
        {vehicles.map((vehicle) => (
          <tr key={vehicle.regNumber}>
            <td className="px-6 py-4 whitespace-nowrap">{vehicle.regNumber}</td>
            <td className="px-6 py-4 whitespace-nowrap">{vehicle.vehicleModel}</td>
            <td className="px-6 py-4 whitespace-nowrap">{vehicle.type}</td>
            <td className="px-6 py-4 whitespace-nowrap">
                <span className={`inline-block h-4 w-4 rounded-full ${getStatusColor(vehicle.status)} mr-2`}></span>
                {vehicle.status}
              </td>
            <td className="px-6 py-4 whitespace-nowrap">{vehicle.iotDevice}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
  );
};

export default VehicleList;