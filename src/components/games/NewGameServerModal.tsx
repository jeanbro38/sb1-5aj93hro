import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import Modal from '@/components/shared/Modal';
import { useGameServers } from '@/hooks/useGameServers';

const schema = z.object({
  game: z.string().min(1, 'Please select a game'),
  slots: z.number().min(1).max(100),
});

type FormData = z.infer<typeof schema>;

interface NewGameServerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AVAILABLE_GAMES = [
  'minecraft',
  'valheim',
  'terraria',
  'rust',
  'ark',
  'csgo',
];

export default function NewGameServerModal({ isOpen, onClose }: NewGameServerModalProps) {
  const { create } = useGameServers();
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = (data: FormData) => {
    create.mutate(data, {
      onSuccess: onClose,
    });
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Create New Game Server">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Game</label>
          <select
            {...register('game')}
            className="w-full px-3 py-2 mt-1 border rounded-md"
          >
            <option value="">Select a game...</option>
            {AVAILABLE_GAMES.map(game => (
              <option key={game} value={game}>
                {game.charAt(0).toUpperCase() + game.slice(1)}
              </option>
            ))}
          </select>
          {errors.game && (
            <p className="mt-1 text-sm text-red-600">{errors.game.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Player Slots</label>
          <input
            type="number"
            {...register('slots', { valueAsNumber: true })}
            className="w-full px-3 py-2 mt-1 border rounded-md"
          />
          {errors.slots && (
            <p className="mt-1 text-sm text-red-600">{errors.slots.message}</p>
          )}
        </div>

        <div className="flex justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-sm text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 text-sm text-white bg-blue-600 rounded-md hover:bg-blue-700"
          >
            Create Server
          </button>
        </div>
      </form>
    </Modal>
  );
}