
import React, { useState } from 'react';
import { useChannels } from '../../hooks/useChannels';
import { Channel } from '../../types';
import { Modal } from '../../components/Modal';
import { ChannelForm } from '../../components/admin/ChannelForm';
import { useTranslation } from 'react-i18next';
import { Edit, Trash2, PlusCircle } from 'lucide-react';

export const ManageChannelsPage: React.FC = () => {
  // FIX: Destructure addChannel and updateChannel to handle form submissions.
  const { channels, loading, addChannel, updateChannel, deleteChannel } = useChannels();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingChannel, setEditingChannel] = useState<Channel | null>(null);
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);
  const [channelToDelete, setChannelToDelete] = useState<Channel | null>(null);
  const { t } = useTranslation();
  
  const handleOpenModal = (channel: Channel | null = null) => {
    setEditingChannel(channel);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingChannel(null);
  };
  
  const handleFormSubmit = (channelData: Omit<Channel, 'id'>) => {
    if (editingChannel) {
      updateChannel(editingChannel.id, channelData);
    } else {
      addChannel(channelData);
    }
    handleCloseModal();
  };

  const openDeleteConfirm = (channel: Channel) => {
    setChannelToDelete(channel);
    setIsDeleteConfirmOpen(true);
  };

  const closeDeleteConfirm = () => {
    setChannelToDelete(null);
    setIsDeleteConfirmOpen(false);
  };
  
  const handleDelete = () => {
    if (channelToDelete) {
      deleteChannel(channelToDelete.id);
      closeDeleteConfirm();
    }
  };

  if (loading) return <div className="loader"></div>;

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">{t('manageChannels')}</h1>
        <button
          onClick={() => handleOpenModal()}
          className="flex items-center gap-2 bg-brand-primary text-white font-bold py-2 px-4 rounded-lg hover:bg-sky-400 transition-colors"
        >
            <PlusCircle size={20}/>
            {t('addChannel')}
        </button>
      </div>

      <div className="bg-brand-surface rounded-lg shadow-lg overflow-x-auto">
        <table className="w-full text-sm text-left rtl:text-right text-brand-text-dim">
          <thead className="text-xs text-brand-text uppercase bg-slate-700">
            <tr>
              <th scope="col" className="px-6 py-3">{t('name')}</th>
              <th scope="col" className="px-6 py-3">{t('logoUrl')}</th>
              <th scope="col" className="px-6 py-3">{t('live')}</th>
              <th scope="col" className="px-6 py-3 text-center">{t('actions')}</th>
            </tr>
          </thead>
          <tbody>
            {channels.map(channel => (
              <tr key={channel.id} className="border-b border-slate-700 hover:bg-slate-800">
                <th scope="row" className="px-6 py-4 font-medium text-white whitespace-nowrap">{channel.name}</th>
                <td className="px-6 py-4 truncate max-w-xs">{channel.logo}</td>
                <td className="px-6 py-4">{channel.isLive ? 'Yes' : 'No'}</td>
                <td className="px-6 py-4 flex justify-center items-center space-x-2 rtl:space-x-reverse">
                  <button onClick={() => handleOpenModal(channel)} className="p-2 hover:bg-slate-700 rounded-full" title={t('edit')}><Edit size={16}/></button>
                  <button onClick={() => openDeleteConfirm(channel)} className="p-2 text-red-500 hover:bg-red-500/20 rounded-full" title={t('delete')}><Trash2 size={16}/></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* FIX: Pass handleFormSubmit and handleCloseModal to ChannelForm to handle creation/editing. */}
      <Modal isOpen={isModalOpen} onClose={handleCloseModal} title={editingChannel ? t('edit') : t('addChannel')}>
        <ChannelForm existingChannel={editingChannel} onFormSubmit={handleFormSubmit} onCancel={handleCloseModal} />
      </Modal>

      <Modal isOpen={isDeleteConfirmOpen} onClose={closeDeleteConfirm} title={t('delete')}>
        <div>
          <p className="mb-4">{t('areYouSureDelete', { name: channelToDelete?.name })}</p>
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
