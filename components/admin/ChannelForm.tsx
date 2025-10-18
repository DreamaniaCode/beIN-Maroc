import React, { useState, useEffect } from 'react';
import { useChannels } from '../../hooks/useChannels';
import { Channel, Program } from '../../types';
import { useTranslation } from 'react-i18next';

interface ChannelFormProps {
  existingChannel: Channel | null;
  onFormSubmit: () => void;
}

const initialProgramState: Program = { title: '', startTime: '', endTime: '' };

const initialState: Omit<Channel, 'id'> = {
  name: '',
  description: '',
  logo: '',
  isLive: false,
  streamUrl: '',
  categoryIds: [],
  currentProgram: { ...initialProgramState },
  nextProgram: { ...initialProgramState },
};

export const ChannelForm: React.FC<ChannelFormProps> = ({ existingChannel, onFormSubmit }) => {
  const [formData, setFormData] = useState(initialState);
  const { addChannel, updateChannel, categories } = useChannels();
  const { t } = useTranslation();

  useEffect(() => {
    if (existingChannel) {
      setFormData(existingChannel);
    } else {
      setFormData(initialState);
    }
  }, [existingChannel]);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.currentTarget;
    
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      if (parent === 'currentProgram' || parent === 'nextProgram') {
        setFormData(prev => ({
          ...prev,
          [parent]: {
            ...prev[parent],
            [child]: value,
          }
        }));
      }
    } else {
      // Fix: Use a type guard to safely access the 'checked' property for checkboxes.
      // The event target can be either an HTMLInputElement or an HTMLTextAreaElement.
      // The 'checked' property only exists on an HTMLInputElement when its type is 'checkbox',
      // so we must check for that to resolve the TypeScript error.
      if (e.currentTarget instanceof HTMLInputElement && e.currentTarget.type === 'checkbox') {
        setFormData(prev => ({
          ...prev,
          [name]: e.currentTarget.checked
        }));
      } else {
        setFormData(prev => ({
          ...prev,
          [name]: value
        }));
      }
    }
  };
  
  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedOptions = Array.from(e.currentTarget.selectedOptions, (option: HTMLOptionElement) => option.value);
    setFormData(prev => ({ ...prev, categoryIds: selectedOptions }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (existingChannel) {
      updateChannel(existingChannel.id, formData);
    } else {
      addChannel(formData);
    }
    onFormSubmit();
  };

  const renderTextField = (name: keyof Omit<Channel, 'id' | 'isLive' | 'categoryIds' | 'currentProgram' | 'nextProgram'>, label: string) => (
    <div>
        <label htmlFor={name} className="block text-sm font-medium text-brand-text-dim mb-1">{label}</label>
        <input type="text" name={name} id={name} value={formData[name] || ''} onChange={handleChange} className="w-full bg-slate-800 border border-slate-600 rounded-md p-2 focus:ring-brand-primary focus:border-brand-primary"/>
    </div>
  );

  const renderProgramFields = (programKey: 'currentProgram' | 'nextProgram', title: string) => (
    <div className="bg-slate-800 p-4 rounded-lg">
        <h4 className="font-semibold mb-2">{title}</h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
                <label className="block text-sm font-medium mb-1">{t('title')}</label>
                <input type="text" name={`${programKey}.title`} value={formData[programKey].title} onChange={handleChange} className="w-full bg-slate-900 border border-slate-600 rounded-md p-2"/>
            </div>
            <div>
                <label className="block text-sm font-medium mb-1">{t('startTime')}</label>
                <input type="text" name={`${programKey}.startTime`} value={formData[programKey].startTime} onChange={handleChange} className="w-full bg-slate-900 border border-slate-600 rounded-md p-2"/>
            </div>
            <div>
                <label className="block text-sm font-medium mb-1">{t('endTime')}</label>
                <input type="text" name={`${programKey}.endTime`} value={formData[programKey].endTime} onChange={handleChange} className="w-full bg-slate-900 border border-slate-600 rounded-md p-2"/>
            </div>
        </div>
    </div>
  );

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {renderTextField('name', t('channelName'))}
        {renderTextField('logo', t('logoUrl'))}
      </div>
      <div>
        <label htmlFor="description" className="block text-sm font-medium text-brand-text-dim mb-1">{t('channelDescription')}</label>
        <textarea name="description" id="description" value={formData.description || ''} onChange={handleChange} rows={3} className="w-full bg-slate-800 border border-slate-600 rounded-md p-2 focus:ring-brand-primary focus:border-brand-primary"></textarea>
      </div>
      
      {/* FIX: Added the missing Stream URL field */}
      {renderTextField('streamUrl', t('streamUrl'))}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
            <label htmlFor="categoryIds" className="block text-sm font-medium text-brand-text-dim mb-1">{t('categories')}</label>
            <select
                id="categoryIds"
                name="categoryIds"
                multiple
                value={formData.categoryIds}
                onChange={handleCategoryChange}
                className="w-full h-32 bg-slate-800 border border-slate-600 rounded-md p-2 focus:ring-brand-primary focus:border-brand-primary"
            >
                {categories.map(cat => <option key={cat.id} value={cat.id}>{cat.name}</option>)}
            </select>
        </div>
        <div>
            <label htmlFor="status" className="block text-sm font-medium text-brand-text-dim mb-1">{t('status')}</label>
            <div className="flex items-center space-x-2 p-2 bg-slate-800 border border-slate-600 rounded-md">
                <input type="checkbox" id="isLive" name="isLive" checked={formData.isLive} onChange={handleChange} className="h-4 w-4 rounded border-gray-300 text-brand-primary focus:ring-brand-primary"/>
                <label htmlFor="isLive" className="font-medium">{t('live')}</label>
            </div>
        </div>
      </div>

      <div className="space-y-4">
        {renderProgramFields('currentProgram', t('currentProgram'))}
        {renderProgramFields('nextProgram', t('nextProgram'))}
      </div>

      <div className="flex justify-end pt-4">
        <button type="submit" className="bg-brand-primary text-white font-bold py-2 px-6 rounded-lg hover:bg-sky-400 transition-colors">
          {t('saveChanges')}
        </button>
      </div>
    </form>
  );
};
