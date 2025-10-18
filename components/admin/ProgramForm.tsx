import React, { useState, useEffect } from 'react';
import { EpgProgram } from '../../types';
import { useTranslation } from 'react-i18next';

interface ProgramFormProps {
  existingProgram: Omit<EpgProgram, 'id'> | EpgProgram | null;
  onFormSubmit: (programData: Omit<EpgProgram, 'id'>) => void;
  onCancel: () => void;
}

const initialState: Omit<EpgProgram, 'id'> = {
  title: '',
  startTime: '',
  endTime: '',
  description: '',
};

export const ProgramForm: React.FC<ProgramFormProps> = ({ existingProgram, onFormSubmit, onCancel }) => {
  const [formData, setFormData] = useState(initialState);
  const { t } = useTranslation();

  useEffect(() => {
    if (existingProgram) {
      setFormData(existingProgram);
    } else {
      setFormData(initialState);
    }
  }, [existingProgram]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.currentTarget;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onFormSubmit(formData);
  };
  
  const renderTextField = (name: keyof typeof initialState, label: string) => (
    <div>
        <label htmlFor={name} className="block text-sm font-medium text-brand-text-dim mb-1">{label}</label>
        <input type="text" name={name} id={name} value={formData[name] || ''} onChange={handleChange} className="w-full bg-slate-800 border border-slate-600 rounded-md p-2 focus:ring-brand-primary focus:border-brand-primary"/>
    </div>
  );

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
        {renderTextField('title', t('title'))}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {renderTextField('startTime', t('startTime'))}
            {renderTextField('endTime', t('endTime'))}
        </div>
        <div>
            <label htmlFor="description" className="block text-sm font-medium text-brand-text-dim mb-1">{t('programDescription')}</label>
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
