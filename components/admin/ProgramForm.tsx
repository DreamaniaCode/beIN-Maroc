// FIX: Implemented the missing `ProgramForm` component.
import React, { useState, useEffect } from 'react';
import { Program } from '../../types';
import { useTranslation } from 'react-i18next';

interface ProgramFormProps {
  existingProgram: Program | null;
  onFormSubmit: (programData: Program) => void;
  onCancel: () => void;
}

const initialState: Program = {
  title: '',
  startTime: '',
  endTime: '',
  description: '',
};

export const ProgramForm: React.FC<ProgramFormProps> = ({ existingProgram, onFormSubmit, onCancel }) => {
  const [formData, setFormData] = useState<Program>(initialState);
  const { t } = useTranslation();

  useEffect(() => {
    if (existingProgram) {
      setFormData(existingProgram);
    } else {
      setFormData(initialState);
    }
  }, [existingProgram]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onFormSubmit(formData);
  };
  
  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="title" className="block text-sm font-medium text-brand-text-dim mb-1">{t('title')}</label>
        <input type="text" name="title" id="title" value={formData.title} onChange={handleChange} required className="w-full bg-slate-800 border border-slate-600 rounded-md p-2 focus:ring-brand-primary focus:border-brand-primary"/>
      </div>
       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
            <label htmlFor="startTime" className="block text-sm font-medium text-brand-text-dim mb-1">{t('startTime')}</label>
            <input type="time" name="startTime" id="startTime" value={formData.startTime} onChange={handleChange} required className="w-full bg-slate-800 border border-slate-600 rounded-md p-2 focus:ring-brand-primary focus:border-brand-primary"/>
        </div>
        <div>
            <label htmlFor="endTime" className="block text-sm font-medium text-brand-text-dim mb-1">{t('endTime')}</label>
            <input type="time" name="endTime" id="endTime" value={formData.endTime} onChange={handleChange} required className="w-full bg-slate-800 border border-slate-600 rounded-md p-2 focus:ring-brand-primary focus:border-brand-primary"/>
        </div>
      </div>
      <div>
        <label htmlFor="description" className="block text-sm font-medium text-brand-text-dim mb-1">{t('description')}</label>
        <textarea name="description" id="description" value={formData.description || ''} onChange={handleChange} rows={3} className="w-full bg-slate-800 border border-slate-600 rounded-md p-2 focus:ring-brand-primary focus:border-brand-primary"></textarea>
      </div>
      <div className="flex justify-end gap-4 pt-4">
          <button type="button" onClick={onCancel} className="px-4 py-2 rounded-lg bg-slate-600 hover:bg-slate-500">{t('cancel')}</button>
          <button type="submit" className="bg-brand-primary text-white font-bold py-2 px-6 rounded-lg hover:bg-sky-400 transition-colors">
            {t('saveChanges')}
          </button>
      </div>
    </form>
  );
};
