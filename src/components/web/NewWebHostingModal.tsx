import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import Modal from '@/components/shared/Modal';
import FormInput from '@/components/forms/FormInput';
import FormSelect from '@/components/forms/FormSelect';
import { useWebHosting } from '@/hooks/useWebHosting';

const schema = z.object({
  type: z.enum(['cpanel', 'plesk']),
  domain: z.string().min(1, 'Domain is required'),
});

type FormData = z.infer<typeof schema>;

interface NewWebHostingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CONTROL_PANEL_OPTIONS = [
  { value: 'cpanel', label: 'cPanel' },
  { value: 'plesk', label: 'Plesk' },
];

export default function NewWebHostingModal({ isOpen, onClose }: NewWebHostingModalProps) {
  const { create } = useWebHosting();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = (data: FormData) => {
    create.mutate(data, {
      onSuccess: onClose,
    });
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Create New Website">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <FormSelect
          label="Control Panel"
          name="type"
          options={CONTROL_PANEL_OPTIONS}
          register={register}
          error={errors.type?.message}
        />

        <FormInput
          label="Domain Name"
          name="domain"
          placeholder="example.com"
          register={register}
          error={errors.domain?.message}
        />

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
            Create Website
          </button>
        </div>
      </form>
    </Modal>
  );
}