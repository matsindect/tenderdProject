import React, { useState } from 'react';
import { IVehicleMaintenanceRecord, createLogs } from '../store/features/logsSlice';
import { useAppDispatch, useAppSelector } from '../store/store';

const VehicleMaintenanceForm: React.FC = () => {
  const [formData, setFormData] = useState<IVehicleMaintenanceRecord>({
    milage: 0,
    reportOfWorkPerformed: '',
    costs: 0,
    notes: '',
    vehicle: '',
    _id:'',
    date:''
  });
  const [errorMessage, setErrorMessage] = useState<string>('');
  const vehicles = useAppSelector(state=> state.vehicle.vehicles)
  const dispatch = useAppDispatch();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      dispatch(createLogs(formData))
      // Reset form after successful submission
      setFormData({
        milage: 0,
        reportOfWorkPerformed: '',
        costs: 0,
        notes: '',
        vehicle: '',
        _id:'',
        date:''
      });
      setErrorMessage('');
    } catch (error) {
      // Handle error
      setErrorMessage('Failed to submit the form. Please try again later.');
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white rounded-md p-6 pt-10">
      <h2 className="text-xl font-semibold mb-4">Vehicle Maintenance Record</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="mb-4">
          <label htmlFor="milage" className="block mb-1">Milage</label>
          <input
            id="milage"
            name="milage"
            type="text"
            onChange={handleChange}
            value={formData.milage}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="reportOfWorkPerformed" className="block mb-1">Report of Work Performed</label>
          <textarea
            id="reportOfWorkPerformed"
            name="reportOfWorkPerformed"
            onChange={handleChange}
            value={formData.reportOfWorkPerformed}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="costs" className="block mb-1">Costs</label>
          <input
            id="costs"
            name="costs"
            type="text"
            onChange={handleChange}
            value={formData.costs}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="notes" className="block mb-1">Notes</label>
          <textarea
            id="notes"
            name="notes"
            onChange={handleChange}
            value={formData.notes}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="vehicle" className="block mb-1">Vehicle</label>
          <select id="vehicle" name="vehicle" value={formData.vehicle} onChange={handleChange} className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500">
            <option value="">Select a vehicle</option>
            {vehicles.map((model, index) => (
              <option key={index} value={model._id}>{model.regNumber}</option>
            ))}
          </select>
        </div>
        <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300">Submit</button>
      </form>
      {errorMessage && <p className="text-red-500 mt-4">{errorMessage}</p>}
    </div>
  );
};

export default VehicleMaintenanceForm;