import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { useAdmin } from '@/hooks/useAdmin';
import GameServerListItem from '@/components/admin/games/GameServerListItem';
import Modal from '@/components/shared/Modal';
import type { GameService } from '@/types';

export default function GamesPage() {
  const { servers, serversLoading, deleteServer } = useAdmin();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedServer, setSelectedServer] = useState<GameService | null>(null);

  const gameServers = servers?.filter(server => server.type === 'pterodactyl') || [];

  if (serversLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div className="flex justify-between mb-6">
        <h2 className="text-2xl font-bold">Game Server Management</h2>
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700"
        >
          <Plus className="w-5 h-5 mr-2" />
          Add Game Server
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
                Details
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
            {gameServers.map((server) => (
              <GameServerListItem
                key={server.id}
                server={server}
                onEdit={(server) => {
                  setSelectedServer(server);
                  setIsModalOpen(true);
                }}
                onDelete={(id) => {
                  if (confirm('Are you sure you want to delete this game server?')) {
                    deleteServer.mutate(id);
                  }
                }}
                onControl={(id, action) => {
                  // Handle server control actions
                }}
                onOpenPanel={(id) => {
                  // Handle opening game panel
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
          setSelectedServer(null);
        }}
        title={selectedServer ? 'Edit Game Server' : 'Add Game Server'}
      >
        {/* Game server form will go here */}
      </Modal>
    </div>
  );
}