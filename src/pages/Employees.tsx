import React, { useState } from 'react';
import { Search, Plus, Phone, Mail } from 'lucide-react';

export function Employees() {
  const [searchTerm, setSearchTerm] = useState('');

  // Sample data - replace with real data from Supabase
  const employees = [
    { id: 1, name: 'John Doe', role: 'Manager', branch: 'Main Branch', contact: '+1234567890', email: 'john@example.com' },
    { id: 2, name: 'Jane Smith', role: 'Cashier', branch: 'North Branch', contact: '+1234567891', email: 'jane@example.com' },
    { id: 3, name: 'Mike Johnson', role: 'Stock Clerk', branch: 'South Branch', contact: '+1234567892', email: 'mike@example.com' },
    { id: 4, name: 'Sarah Wilson', role: 'Manager', branch: 'East Branch', contact: '+1234567893', email: 'sarah@example.com' },
    { id: 5, name: 'Tom Brown', role: 'Cashier', branch: 'West Branch', contact: '+1234567894', email: 'tom@example.com' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Employees</h1>
        <button className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gray-900 hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500">
          <Plus className="h-4 w-4 mr-2" />
          Add Employee
        </button>
      </div>

      <div className="bg-white shadow-sm border border-gray-200 rounded-lg">
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center">
            <div className="relative flex-grow">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-gray-900 focus:border-gray-900 sm:text-sm"
                placeholder="Search employees..."
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
          {employees.map((employee) => (
            <div
              key={employee.id}
              className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-lg font-medium text-gray-900">
                    {employee.name}
                  </h3>
                  <p className="text-sm text-gray-500">{employee.role}</p>
                  <p className="text-sm text-gray-500 mt-1">{employee.branch}</p>
                </div>
              </div>
              <div className="mt-4 space-y-2">
                <div className="flex items-center text-sm text-gray-500">
                  <Phone className="h-4 w-4 mr-2" />
                  {employee.contact}
                </div>
                <div className="flex items-center text-sm text-gray-500">
                  <Mail className="h-4 w-4 mr-2" />
                  {employee.email}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}