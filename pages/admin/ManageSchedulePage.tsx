import React, { useState } from 'react';
import { useChannels } from '../../hooks/useChannels';
import { useEpgAdmin } from '../../hooks/useEpgAdmin';
import { Program } from '../../types';
import { Modal } from '../../components/Modal';
import { ProgramForm } from '../../components/admin/ProgramForm';
import { useTranslation } from 'react-i18next';
import { Edit, Trash2, PlusCircle } from 'lucide-react';

export const ManageSchedulePage: React.FC = () => {
    const { channels } = useChannels();
    const [selectedChannelId, setSelectedChannelId] = useState<string | null>(channels[0]?.id || null);
    const { programs, loading, addProgram, updateProgram, deleteProgram } = useEpgAdmin(selectedChannelId);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingProgram, setEditingProgram] = useState<{ program: Program; index: number } | null>(null);
    const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);
    const [programToDelete, setProgramToDelete] = useState<{ program: Program; index: number } | null>(null);
    const { t } = useTranslation();

    const handleOpenModal = (program: Program | null = null, index: number = -1) => {
        setEditingProgram(program ? { program, index } : null);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setEditingProgram(null);
    };

    const handleFormSubmit = (programData: Program) => {
        if (editingProgram) {
            updateProgram(editingProgram.index, programData);
        } else {
            addProgram(programData);
        }
        handleCloseModal();
    };

    const openDeleteConfirm = (program: Program, index: number) => {
        setProgramToDelete({ program, index });
        setIsDeleteConfirmOpen(true);
    };
    
    const closeDeleteConfirm = () => {
        setProgramToDelete(null);
        setIsDeleteConfirmOpen(false);
    };

    const handleDelete = () => {
        if (programToDelete) {
            deleteProgram(programToDelete.index);
            closeDeleteConfirm();
        }
    };

    const formatDisplayTime = (timeStr: string) => {
        if (!timeStr || !timeStr.includes(':')) return '';
        const [hours, minutes] = timeStr.split(':').map(Number);
        const date = new Date();
        date.setHours(hours, minutes, 0, 0);
        return date.toLocaleTimeString(navigator.language, { hour: 'numeric', minute: '2-digit' });
    };

    return (
        <div>
            <h1 className="text-3xl font-bold mb-6">{t('manageSchedule')}</h1>
            
            <div className="mb-6">
                <label htmlFor="channel-select" className="block text-sm font-medium text-brand-text-dim mb-1">{t('selectChannel')}</label>
                <select 
                    id="channel-select"
                    value={selectedChannelId || ''}
                    onChange={(e) => setSelectedChannelId(e.target.value)}
                    className="w-full max-w-sm bg-slate-800 border border-slate-600 rounded-md p-2 focus:ring-brand-primary focus:border-brand-primary"
                >
                    {channels.map(channel => (
                        <option key={channel.id} value={channel.id}>{channel.name}</option>
                    ))}
                </select>
            </div>

            <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-semibold">{t('scheduleFor')} {channels.find(c => c.id === selectedChannelId)?.name}</h2>
                <button
                    onClick={() => handleOpenModal()}
                    disabled={!selectedChannelId}
                    className="flex items-center gap-2 bg-brand-primary text-white font-bold py-2 px-4 rounded-lg hover:bg-sky-400 transition-colors disabled:bg-slate-500 disabled:cursor-not-allowed"
                >
                    <PlusCircle size={20}/>
                    {t('addProgram')}
                </button>
            </div>
            
            {loading && <div className="loader"></div>}

            {!loading && selectedChannelId && (
                <div className="bg-brand-surface rounded-lg shadow-lg overflow-hidden">
                    <div className="space-y-2 p-4 max-h-[60vh] overflow-y-auto">
                        {programs.length > 0 ? programs.map((program, index) => (
                             <div key={`${program.title}-${index}`} className="flex justify-between items-center p-3 rounded-md bg-slate-800 hover:bg-slate-700">
                                <div>
                                    <p className="font-semibold">{program.title}</p>
                                    <p className="text-sm text-brand-text-dim">{formatDisplayTime(program.startTime)} - {formatDisplayTime(program.endTime)}</p>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <button onClick={() => handleOpenModal(program, index)} className="p-2 hover:bg-slate-600 rounded-full" title={t('edit')}><Edit size={16}/></button>
                                    <button onClick={() => openDeleteConfirm(program, index)} className="p-2 text-red-500 hover:bg-red-500/20 rounded-full" title={t('delete')}><Trash2 size={16}/></button>
                                </div>
                            </div>
                        )) : (
                            <p className="text-center text-brand-text-dim py-8">{t('noProgramsForChannel')}</p>
                        )}
                    </div>
                </div>
            )}

            <Modal isOpen={isModalOpen} onClose={handleCloseModal} title={editingProgram ? t('editProgram') : t('addProgram')}>
                <ProgramForm existingProgram={editingProgram?.program || null} onFormSubmit={handleFormSubmit} onCancel={handleCloseModal} />
            </Modal>
            
            <Modal isOpen={isDeleteConfirmOpen} onClose={closeDeleteConfirm} title={t('deleteProgram')}>
                <div>
                  <p className="mb-4">{t('areYouSureDelete', { name: programToDelete?.program.title })}</p>
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
