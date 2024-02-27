import React, { useEffect } from 'react';
import { useAppSelector } from '../store/store';

const LogsList: React.FC = () => {
  const logs = useAppSelector((state) => state.logs.logs);


  return (
    <div className="container mx-auto px-4 py-8 pt-10">
    <h1 className="text-2xl font-bold mb-4">Maintainance Records</h1>
    <table className="min-w-full divide-y divide-gray-200">
      <thead className="bg-gray-50">
        <tr>
          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Milage</th>
          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Cost</th>
          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Notes</th>
          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Vehicle Reg.</th>
        </tr>
      </thead>
      <tbody className="bg-white divide-y divide-gray-200">
        {logs.map((log) => (
          <tr key={log._id}>
            <td className="px-6 py-4 whitespace-nowrap">{log.date}</td>
            <td className="px-6 py-4 whitespace-nowrap">{log.milage}</td>
            <td className="px-6 py-4 whitespace-nowrap">{log.costs}</td>
            <td className="px-6 py-4 whitespace-nowrap">{log.notes} </td>
            <td className="px-6 py-4 whitespace-nowrap">{log.vehicle}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
  );
};

export default LogsList;