import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export function SalesAnalytics() {
  // Sample data - replace with real data from Supabase
  const salesData = [
    { date: '2024-01', sales: 4000, profit: 2400 },
    { date: '2024-02', sales: 3000, profit: 1398 },
    { date: '2024-03', sales: 2000, profit: 9800 },
    { date: '2024-04', sales: 2780, profit: 3908 },
    { date: '2024-05', sales: 1890, profit: 4800 },
    { date: '2024-06', sales: 2390, profit: 3800 },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Sales Analytics</h1>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">
          Sales Trends
        </h2>
        <div className="h-96">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={salesData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="sales" stroke="#111827" strokeWidth={2} />
              <Line type="monotone" dataKey="profit" stroke="#4B5563" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Top Selling Products
          </h2>
          <div className="space-y-4">
            {/* Replace with real data */}
            {[1, 2, 3, 4, 5].map((i) => (
              <div
                key={i}
                className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0"
              >
                <div>
                  <p className="font-medium text-gray-900">Product {i}</p>
                  <p className="text-sm text-gray-500">Category</p>
                </div>
                <div className="text-right">
                  <p className="font-medium text-gray-900">${(1000 / i).toFixed(2)}</p>
                  <p className="text-sm text-gray-500">{100 - i * 10} units</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Sales by Branch
          </h2>
          <div className="space-y-4">
            {/* Replace with real data */}
            {[1, 2, 3, 4, 5].map((i) => (
              <div
                key={i}
                className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0"
              >
                <div>
                  <p className="font-medium text-gray-900">Branch {i}</p>
                  <p className="text-sm text-gray-500">Location {i}</p>
                </div>
                <div className="text-right">
                  <p className="font-medium text-gray-900">${(2000 / i).toFixed(2)}</p>
                  <p className="text-sm text-gray-500">+{20 - i}% growth</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}