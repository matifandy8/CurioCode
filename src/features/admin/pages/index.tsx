

import React, { useEffect, useState } from 'react';
import { Button } from '@/components/Button';
import type { AdminCuriosity } from '@/shared/types/types';
import { CuriositiesService } from '@/features/curiosities/services/curiosities.services';

const stats = [
  {
    label: 'Total Users',
    value: '1,234',
    icon: (
      <svg width="32" height="32" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="text-cyan-300">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a4 4 0 00-3-3.87M9 20h6M3 20h5v-2a4 4 0 013-3.87M16 7a4 4 0 11-8 0 4 4 0 018 0z" />
      </svg>
    ),
  },
  {
    label: 'Active Users',
    value: '789',
    icon: (
      <svg width="32" height="32" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="text-green-400">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.121 17.804A13.937 13.937 0 0112 15c2.5 0 4.847.655 6.879 1.804M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
  },
];

const AdminPage: React.FC = () => {
  const [curiosities, setCuriosities] = useState<AdminCuriosity[]>([]);

  useEffect(() => {
    const fetchCuriosities = async () => {
      const res = await CuriositiesService.getUserCuriosities();
      console.log(res);
      setCuriosities(res as AdminCuriosity[]);
    };
    fetchCuriosities();
  }, []);

  const toggleApproval = (id: number) => {
    setCuriosities((prev) =>
      prev.map((cur) =>
        cur.id === id
          ? { ...cur, status: cur.status === 'approved' ? 'pending' : 'approved' }
          : cur
      )
    );
  };

  const deleteCuriosity = (id: number) => {
    setCuriosities((prev) => prev.filter((cur) => cur.id !== id));
  };
  return (
    <div className="flex flex-col items-center justify-start min-h-screen p-8 bg-gray-950">
      <h1 className="text-4xl font-bold text-cyan-300 mb-2 font-jetbrains-mono tracking-tight drop-shadow">Admin Dashboard</h1>
      <p className="text-gray-400 text-center mb-8 text-lg">Admin overview and statistics. Only admins can access this page.</p>

      <section className="w-full max-w-2xl mb-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="flex items-center bg-gray-900 rounded-xl shadow-lg p-6 hover:scale-[1.03] hover:shadow-cyan-900 transition-transform duration-200 border border-gray-800"
            >
              <div className="mr-4">{stat.icon}</div>
              <div>
                <h3 className="text-lg font-semibold text-gray-200 mb-1">{stat.label}</h3>
                <p className="text-2xl font-bold text-white">{stat.value}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="w-full max-w-3xl bg-gray-900 rounded-xl shadow-lg p-6 border border-gray-800">
        <div className="flex flex-col md:flex-row items-center justify-between mb-6 gap-2">
          <div>
            <h2 className="text-2xl font-semibold text-cyan-300">Manage Curiosities</h2>
            <p className="text-sm text-gray-400 mt-1">Review, approve or remove submitted curiosities.</p>
          </div>
          <div className="text-sm text-gray-400">Total: {curiosities.length} • Approved: {curiosities.filter((c) => c.status === 'approved').length}</div>
        </div>

        <div className="grid gap-4">
          {curiosities.length === 0 ? (
            <div className="text-center text-gray-500 py-8">No curiosities found.</div>
          ) : (
            curiosities.map((curiosity: AdminCuriosity) => (
              <article key={curiosity.id} className="p-4 rounded-lg border border-gray-800 bg-gray-950 shadow hover:shadow-cyan-900 transition-shadow">
                <div className="flex items-start justify-between">
                  <div className="max-w-[75%]">
                    <h3 className="text-lg font-medium mb-1 text-cyan-200">{curiosity.title}</h3>
                    <p className="text-sm text-gray-300 mb-2">{curiosity.content}</p>
                    <div className="text-xs text-gray-500">Submitted by {curiosity.submittedBy} on {curiosity.submittedAt}</div>
                  </div>

                  <div className="flex flex-col items-end gap-2">
                    <Button
                      variant={curiosity.status === 'approved' ? 'outline' : 'primary'}
                      size="sm"
                      onClick={() => toggleApproval(curiosity.id)}
                    >
                      {curiosity.status === 'approved' ? 'Approved' : 'Approve'}
                    </Button>

                    <Button variant="ghost" size="sm" onClick={() => deleteCuriosity(curiosity.id)}>
                      Delete
                    </Button>
                  </div>
                </div>
              </article>
            ))
          )}
        </div>
      </section>
    </div>
  );
};

export default AdminPage;
