import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "../store/store";
import { VehicleStatus, registerVehicle } from "../store/features/vehicleSlice"; // Assuming the action for registering a vehicle is defined here
import { IVehicleData } from "../store/features/vehicleSlice"; // Importing the IVehicleData interface

const RegisterVehicle: React.FC  = () => {
  const vehicleMakes = useAppSelector((state) => state.vihicleMake.vehicles);
  const iotDevices = useAppSelector((state) => state.iotDevices.iotDevices);
  const [vehicleModels, setVehicleModels] = useState<string[]>([]);
  const [formData, setFormData] = useState<IVehicleData>({
    regNumber: "",
    vehicleModel: "",
    type: "",
    status: VehicleStatus.Inactive,
    iotDevice: "",
    _id:""
  });
  const [formErrors, setFormErrors] = useState<Partial<IVehicleData>>({}); // State to store form errors
  const dispatch = useAppDispatch();


   // Function to handle the selection of vehicle make
   const onSelectModel = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
    const makeIndex = vehicleMakes.findIndex((vmake) => vmake.make === e.target.value);
    if (makeIndex !== -1) {
      setVehicleModels(vehicleMakes[makeIndex].models);
      setFormData({ ...formData, [e.target.name]: e.target.value });
    } else {
      setVehicleModels([]); // Reset models if the make is not found
    }
  };

  const statuses:VehicleStatus[] = [VehicleStatus.Active, VehicleStatus.Inactive, VehicleStatus.Maintenance];

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Validate form data
    const errors: Partial<IVehicleData> = {};
    if (!formData.regNumber) errors.regNumber = "Registration number is required";
    if (!formData.vehicleModel) errors.vehicleModel = "Vehicle model is required";
    if (!formData.type) errors.type = "Vehicle type is required";
    if (!formData.iotDevice) errors.iotDevice = "IoT device is required";
    setFormErrors(errors);
    // If there are no errors, dispatch the registerVehicle action
    if (Object.keys(errors).length === 0) {
      dispatch(registerVehicle(formData));
    }
  };

  return (
    <div className="max-w-lg mx-auto bg-white p-8 pt-10 rounded-lg pt-10 ">
      <h2 className="text-2xl font-bold mb-4">Register Vehicle</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="regNumber" className="block text-gray-700 font-bold mb-2">Registration Number</label>
          <input type="text" id="regNumber" name="regNumber" value={formData.regNumber} onChange={handleChange} className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500" />
          {formErrors.regNumber && <span className="text-red-500">{formErrors.regNumber}</span>}
        </div>
        <div className="mb-4">
          <label htmlFor="vehicleMake" className="block text-gray-700 font-bold mb-2">Vehicle Make</label>
          <select id="vehicleMake" name="type" value={formData.type} onChange={ onSelectModel} className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500">
            <option value="">Select a make</option>
            {vehicleMakes.map((make, index) => (
              <option key={index} value={make.make}>{make.make}</option>
            ))}
          </select>
          {formErrors.type && <span className="text-red-500">{formErrors.type}</span>}
        </div>
        <div className="mb-4">
          <label htmlFor="vehicleModel" className="block text-gray-700 font-bold mb-2">Vehicle Model</label>
          <select id="vehicleModel" name="vehicleModel" value={formData.vehicleModel} onChange={handleChange} className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500">
            <option value="">Select a model</option>
            {vehicleModels.map((model, index) => (
              <option key={index} value={model}>{model}</option>
            ))}
          </select>
          {formErrors.vehicleModel && <span className="text-red-500">{formErrors.vehicleModel}</span>}
        </div>
        <div className="mb-4">
          <label htmlFor="status" className="block text-gray-700 font-bold mb-2">Status</label>
          <select id="status" name="status" value={formData.status ? "Active" : "Inactive"} onChange={handleChange} className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500">
            {statuses.map((status, index) => (
              <option key={index} value={status}>{status}</option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label htmlFor="iotDevice" className="block text-gray-700 font-bold mb-2">IoT Device</label>
          <select id="iotDevice" name="iotDevice" value={formData.iotDevice} onChange={handleChange} className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500">
            <option value="">Select an IoT device</option>
            {iotDevices.map((device, index) => (
              <option key={index} value={device._id}>{device.deviceId}</option>
            ))}
          </select>
          {formErrors.iotDevice && <span className="text-red-500">{formErrors.iotDevice}</span>}
        </div>
        <button type="submit" className="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-700" disabled={!formData.regNumber || !formData.vehicleModel || !formData.type || !formData.iotDevice}>Submit</button>
      </form>
    </div>
  );
};

export default RegisterVehicle;