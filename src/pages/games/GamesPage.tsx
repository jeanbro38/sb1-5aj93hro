import React from 'react';
import { Plus } from 'lucide-react';
import GameServerCard from '@/components/games/GameServerCard';
import NewGameServerModal from '@/components/games/NewGameServerModal';
import { useGameServers } from '@/hooks/useGameServers';
import { useModal } from '@/hooks/useModal';

export default function GamesPage() {
  const { isOpen, open, close } = useModal();
  const { gameServers, isLoading, control, getPanel } = useGameServers();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div className="flex justify-between mb-6">
        <h2 className="text-2xl font-bold">Game Servers</h2>
        <button
          onClick={open}
          className="flex items-center px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700"
        >
          <Plus className="w-5 h-5 mr-2" />
          New Game Server
        </button>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {gameServers?.map((server) => (
          <GameServerCard
            key={server.id}
            server={server}
            onControl={(action) => control.mutate({ id: server.id, action })}
            onOpenPanel={() => getPanel.mutate(server.id)}
          />
        ))}
      </div>

      <NewGameServerModal isOpen={isOpen} onClose={close} />
    </div>
  );
}