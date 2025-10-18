import React, { useState, useEffect } from 'react';
import { useChannels } from '../../hooks/useChannels';
import { Channel } from '../../types';
import { useTranslation } from 'react-i18next';

interface ChannelFormProps {
  existingChannel: Channel | null;
  onFormSubmit: (channelData: Omit<Channel, 'id' | 'currentProgram' | 'nextProgram'>) => void;
  onCancel: () => void;
}

type FormData = Omit<Channel, 'id' | 'currentProgram' | 'nextProgram'>;

const initialState: FormData = {
  name: '',
  description: '',
  logo: '',
  isLive: false,
  streamUrl: '',
  categoryIds: [],
};

export const ChannelForm: React.FC<ChannelFormProps> = ({ existingChannel, onFormSubmit, onCancel }) => {
  const [formData, setFormData] = useState<FormData>(initialState);
  const { categories } = useChannels();
  const { t } = useTranslation();

  useEffect(() => {
    if (existingChannel) {
      setFormData({
          name: existingChannel.name,
          description: existingChannel.description || '',
          logo: existingChannel.logo,
          isLive: existingChannel.isLive,
          streamUrl: existingChannel.streamUrl,
          categoryIds: existingChannel.categoryIds,
      });
    } else {
      setFormData(initialState);
    }
  }, [existingChannel]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.currentTarget;
    const isCheckbox = type === 'checkbox';
    const checked = (e.currentTarget as HTMLInputElement).checked;
    setFormData(prev => ({
      ...prev,
      [name]: isCheckbox ? checked : value,
    }));
  };

  const handleCategoryChange = (categoryId: string) => {
    setFormData(prev => {
        const newCategoryIds = prev.categoryIds.includes(categoryId)
            ? prev.categoryIds.filter(id => id !== categoryId)
            : [...prev.categoryIds, categoryId];
        return { ...prev, categoryIds: newCategoryIds };
    });
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onFormSubmit(formData);
  };
  
  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-brand-text-dim mb-1">{t('name')}</label>
        <input type="text" name="name" id="name" value={formData.name} onChange={handleChange} required className="w-full bg-slate-800 border border-slate-600 rounded-md p-2 focus:ring-brand-primary focus:border-brand-primary"/>
      </div>
      <div>
        <label htmlFor="description" className="block text-sm font-medium text-brand-text-dim mb-1">{t('description')}</label>
        <textarea name="description" id="description" value={formData.description} onChange={handleChange} rows={3} className="w-full bg-slate-800 border border-slate-600 rounded-md p-2 focus:ring-brand-primary focus:border-brand-primary"></textarea>
      </div>
      <div>
        <label htmlFor="logo" className="block text-sm font-medium text-brand-text-dim mb-1">{t('logoUrl')}</label>
        <input type="url" name="logo" id="logo" value={formData.logo} onChange={handleChange} required placeholder="https://placehold.co/400x225" className="w-full bg-slate-800 border border-slate-600 rounded-md p-2 focus:ring-brand-primary focus:border-brand-primary"/>
      </div>
      <div>
        <label htmlFor="streamUrl" className="block text-sm font-medium text-brand-text-dim mb-1">{t('streamUrl')}</label>
        <input type="url" name="streamUrl" id="streamUrl" value={formData.streamUrl} onChange={handleChange} required placeholder="https://test-streams.mux.dev/x36xhzz.m3u8" className="w-full bg-slate-800 border border-slate-600 rounded-md p-2 focus:ring-brand-primary focus:border-brand-primary"/>
      </div>
      <div>
        <label className="block text-sm font-medium text-brand-text-dim mb-2">{t('categories')}</label>
        <div className="flex flex-wrap gap-4">
            {categories.map(category => (
                <label key={category.id} className="flex items-center space-x-2 cursor-pointer">
                    <input type="checkbox" checked={formData.categoryIds.includes(category.id)} onChange={() => handleCategoryChange(category.id)} className="h-5 w-5 rounded bg-slate-700 border-slate-600 text-brand-primary focus:ring-brand-primary"/>
                    <span>{category.name}</span>
                </label>
            ))}
        </div>
      </div>
      <div className="flex items-center">
          <input type="checkbox" name="isLive" id="isLive" checked={formData.isLive} onChange={handleChange} className="h-5 w-5 rounded bg-slate-700 border-slate-600 text-brand-primary focus:ring-brand-primary"/>
          <label htmlFor="isLive" className="ml-2 block text-sm font-medium text-brand-text-dim">{t('isLiveChannel')}</label>
      </div>
      <div className="flex justify-end gap-4 pt-4">
          <button type="button" onClick={onCancel} className="px-4 py-2 rounded-lg bg-slate-600 hover:bg-slate-500">{t('cancel')}</button>
          <button type="submit" className="bg-brand-primary text-white font-bold py-2 px-6 rounded-lg hover:bg-sky-400 transition-colors">
            {existingChannel ? t('saveChanges') : t('createChannel')}
          </button>
      </div>
    </form>
  );
};
