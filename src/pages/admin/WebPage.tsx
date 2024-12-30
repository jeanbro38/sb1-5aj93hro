import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { useAdmin } from '@/hooks/useAdmin';
import WebListItem from '@/components/admin/web/WebListItem';
import Modal from '@/components/shared/Modal';
import type { WebService } from '@/types';

export default function WebPage() {
  const { servers, serversLoading, deleteServer } = useAdmin();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedWebsite, setSelectedWebsite] = useState<WebService | null>(null);

  const webServers = servers?.filter(server => 
    server.type === 'plesk' || server.type === 'cpanel'
  ) || [];

  if (serversLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div className="flex justify-between mb-6">
        <h2 className="text-2xl font-bold">Web Hosting Management</h2>
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700"
        >
          <Plus className="w-5 h-5 mr-2" />
          Add Website
        </button>
      </div>

      <div className="bg-white shadow rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Website Info
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Resource Usage
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Type
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {webServers.map((website) => (
              <WebListItem
                key={website.id}
                website={website}
                onEdit={(website) => {
                  setSelectedWebsite(website);
                  setIsModalOpen(true);
                }}
                onDelete={(id) => {
                  if (confirm('Are you sure you want to delete this website?')) {
                    deleteServer.mutate(id);
                  }
                }}
                onOpenPanel={(id) => {
                  // Handle opening control panel
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
          setSelectedWebsite(null);
        }}
        title={selectedWebsite ? 'Edit Website' : 'Add Website'}
      >
        {/* Website form will go here */}
      </Modal>
    </div>
  );
}