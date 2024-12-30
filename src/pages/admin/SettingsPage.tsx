import React from 'react';
import { Save } from 'lucide-react';
import SettingsSection from '@/components/admin/settings/SettingsSection';
import SettingsField from '@/components/admin/settings/SettingsField';
import { useForm } from 'react-hook-form';

interface SettingsFormData {
  siteName: string;
  supportEmail: string;
  maintenanceMode: boolean;
  registrationEnabled: boolean;
  defaultDiskQuota: number;
  defaultBandwidthQuota: number;
  maxVPSPerUser: number;
  maxGameServersPerUser: number;
  maxWebsitesPerUser: number;
}

export default function SettingsPage() {
  const { register, handleSubmit } = useForm<SettingsFormData>({
    defaultValues: {
      siteName: 'EagleManager',
      supportEmail: 'support@eaglemanager.com',
      maintenanceMode: false,
      registrationEnabled: true,
      defaultDiskQuota: 10,
      defaultBandwidthQuota: 1000,
      maxVPSPerUser: 3,
      maxGameServersPerUser: 5,
      maxWebsitesPerUser: 5,
    }
  });

  const onSubmit = (data: SettingsFormData) => {
    console.log('Saving settings:', data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">System Settings</h2>
        <button
          type="submit"
          className="flex items-center px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700"
        >
          <Save className="w-5 h-5 mr-2" />
          Save Changes
        </button>
      </div>

      <SettingsSection
        title="General Settings"
        description="Basic system configuration settings"
      >
        <SettingsField label="Site Name">
          <input
            type="text"
            {...register('siteName')}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </SettingsField>

        <SettingsField label="Support Email">
          <input
            type="email"
            {...register('supportEmail')}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </SettingsField>

        <SettingsField label="System Status">
          <div className="flex items-center space-x-4">
            <label className="flex items-center">
              <input
                type="checkbox"
                {...register('maintenanceMode')}
                className="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
              <span className="ml-2 text-sm text-gray-600">Maintenance Mode</span>
            </label>
            <label className="flex items-center">
              <input
                type="checkbox"
                {...register('registrationEnabled')}
                className="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
              <span className="ml-2 text-sm text-gray-600">Enable Registration</span>
            </label>
          </div>
        </SettingsField>
      </SettingsSection>

      <SettingsSection
        title="Resource Limits"
        description="Default resource quotas and limits for new users"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <SettingsField 
            label="Default Disk Quota (GB)"
            description="Storage space allocated to new users"
          >
            <input
              type="number"
              {...register('defaultDiskQuota')}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </SettingsField>

          <SettingsField 
            label="Default Bandwidth (GB)"
            description="Monthly bandwidth limit for new users"
          >
            <input
              type="number"
              {...register('defaultBandwidthQuota')}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </SettingsField>
        </div>
      </SettingsSection>

      <SettingsSection
        title="Service Limits"
        description="Maximum number of services allowed per user"
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <SettingsField label="Max VPS Servers">
            <input
              type="number"
              {...register('maxVPSPerUser')}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </SettingsField>

          <SettingsField label="Max Game Servers">
            <input
              type="number"
              {...register('maxGameServersPerUser')}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </SettingsField>

          <SettingsField label="Max Websites">
            <input
              type="number"
              {...register('maxWebsitesPerUser')}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </SettingsField>
        </div>
      </SettingsSection>
    </form>
  );
}