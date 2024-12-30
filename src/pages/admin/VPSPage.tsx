import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { useAdmin } from '@/hooks/useAdmin';
import VPSListItem from '@/components/admin/vps/VPSListItem';
import Modal from '@/components/shared/Modal';
import type { VPSService } from '@/types';

export default function VPSPage() {
  const { servers, serversLoading, deleteServer } = useAdmin();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedVPS, setSelectedVPS] = useState<VPSService | null>(null);

  const vpsServers = servers?.filter(server => server.type === 'proxmox') || [];

  if (serversLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div className="flex justify-between mb-6">
        <h2 className="text-2xl font-bold">VPS Management</h2>
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700"
        >
          <Plus className="w-5 h-5 mr-2" />
          Add VPS Server
        </button>
      </div>

      <div className="bg-white shadow rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Server Info
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Specifications
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {vpsServers.map((vps) => (
              <VPSListItem
                key={vps.id}
                vps={vps}
                onEdit={(vps) => {
                  setSelectedVPS(vps);
                  setIsModalOpen(true);
                }}
                onDelete={(id) => {
                  if (confirm('Are you sure you want to delete this VPS?')) {
                    deleteServer.mutate(id);
                  }
                }}
                onControl={(id, action) => {
                  // Handle VPS control actions
                }}
              />
            ))}
          </tbody>
        </table>
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedVPS(null);
        }}
        title={selectedVPS ? 'Edit VPS Server' : 'Add VPS Server'}
      >
        {/* VPS form will go here */}
      </Modal>
    </div>
  );
}