import React, { useState, useMemo } from 'react';
import { useChannels } from '../../hooks/useChannels';
import { useEpgAdmin } from '../../hooks/useEpgAdmin';
import { EpgProgram } from '../../types';
import { Modal } from '../../components/Modal';
import { ProgramForm } from '../../components/admin/ProgramForm';
import { useTranslation } from 'react-i18next';
import { Edit, Trash2, PlusCircle } from 'lucide-react';

export const ManageSchedulePage: React.FC = () => {
  const { channels, loading: channelsLoading } = useChannels();
  const { getProgramsForChannel, addProgram, updateProgram, deleteProgram } = useEpgAdmin();
  const { t } = useTranslation();

  const [selectedChannelId, setSelectedChannelId] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProgram, setEditingProgram] = useState<EpgProgram | null>(null);
  const [programToDelete, setProgramToDelete] = useState<EpgProgram | null>(null);
  
  const programs = useMemo(() => {
    return selectedChannelId ? getProgramsForChannel(selectedChannelId) : [];
  }, [selectedChannelId, getProgramsForChannel]);

  const handleChannelChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedChannelId(e.target.value || null);
  };
  
  const handleOpenModal = (program: EpgProgram | null = null) => {
    setEditingProgram(program);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingProgram(null);
  };

  const handleFormSubmit = (programData: Omit<EpgProgram, 'id'>) => {
    if (selectedChannelId) {
        if (editingProgram) {
            updateProgram(selectedChannelId, editingProgram.id, programData);
        } else {
            addProgram(selectedChannelId, programData);
        }
    }
    handleCloseModal();
  };
  
  const openDeleteConfirm = (program: EpgProgram) => {
    setProgramToDelete(program);
  };

  const closeDeleteConfirm = () => {
    setProgramToDelete(null);
  };
  
  const handleDelete = () => {
    if (programToDelete && selectedChannelId) {
      deleteProgram(selectedChannelId, programToDelete.id);
      closeDeleteConfirm();
    }
  };

  if (channelsLoading) return <div className="loader"></div>;

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">{t('manageSchedule')}</h1>
        {selectedChannelId && (
            <button
            onClick={() => handleOpenModal()}
            className="flex items-center gap-2 bg-brand-primary text-white font-bold py-2 px-4 rounded-lg hover:bg-sky-400 transition-colors"
            >
                <PlusCircle size={20}/>
                {t('addProgram')}
            </button>
        )}
      </div>
      
      <div className="mb-6">
        <label htmlFor="channel-select" className="block text-sm font-medium text-brand-text-dim mb-1">{t('selectChannel')}</label>
        <select
          id="channel-select"
          value={selectedChannelId || ''}
          onChange={handleChannelChange}
          className="w-full max-w-sm bg-brand-surface border border-slate-600 rounded-md p-2 focus:ring-brand-primary focus:border-brand-primary"
        >
          <option value="">-- {t('selectChannel')} --</option>
          {channels.map(channel => (
            <option key={channel.id} value={channel.id}>{channel.name}</option>
          ))}
        </select>
      </div>

      {selectedChannelId ? (
         <div className="bg-brand-surface rounded-lg shadow-lg overflow-x-auto">
            <table className="w-full text-sm text-left rtl:text-right text-brand-text-dim">
                <thead className="text-xs text-brand-text uppercase bg-slate-700">
                    <tr>
                    <th scope="col" className="px-6 py-3">{t('title')}</th>
                    <th scope="col" className="px-6 py-3">{t('startTime')}</th>
                    <th scope="col" className="px-6 py-3">{t('endTime')}</th>
                    <th scope="col" className="px-6 py-3 text-center">{t('actions')}</th>
                    </tr>
                </thead>
                <tbody>
                    {programs.map(program => (
                    <tr key={program.id} className="border-b border-slate-700 hover:bg-slate-800">
                        <th scope="row" className="px-6 py-4 font-medium text-white whitespace-nowrap">{program.title}</th>
                        <td className="px-6 py-4">{program.startTime}</td>
                        <td className="px-6 py-4">{program.endTime}</td>
                        <td className="px-6 py-4 flex justify-center items-center space-x-2 rtl:space-x-reverse">
                        <button onClick={() => handleOpenModal(program)} className="p-2 hover:bg-slate-700 rounded-full" title={t('edit')}><Edit size={16}/></button>
                        <button onClick={() => openDeleteConfirm(program)} className="p-2 text-red-500 hover:bg-red-500/20 rounded-full" title={t('delete')}><Trash2 size={16}/></button>
                        </td>
                    </tr>
                    ))}
                </tbody>
            </table>
         </div>
      ) : (
        <div className="text-center p-8 bg-brand-surface rounded-lg">
            <p>{t('selectChannelToSeeSchedule')}</p>
        </div>
      )}

      <Modal isOpen={isModalOpen} onClose={handleCloseModal} title={editingProgram ? t('editProgram') : t('addProgram')}>
        <ProgramForm existingProgram={editingProgram} onFormSubmit={handleFormSubmit} onCancel={handleCloseModal} />
      </Modal>

      <Modal isOpen={!!programToDelete} onClose={closeDeleteConfirm} title={t('deleteProgram')}>
        <div>
          <p className="mb-4">{t('areYouSureDelete', { name: programToDelete?.title })}</p>
          <p className="text-sm text-brand-text-dim">{t('confirmDelete')}</p>
          <div className="flex justify-end gap-4 mt-6">
            <button onClick={closeDeleteConfirm} className="px-4 py-2 rounded-lg bg-slate-600 hover:bg-slate-500">{t('cancel')}</button>
            <button onClick={handleDelete} className="px-4 py-2 rounded-lg bg-red-600 hover:bg-red-500 text-white">{t('confirm')}</button>
          </div>
        </div>
      </Modal>

    </div>
  );
};
