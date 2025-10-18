import React, { ReactNode } from 'react';
import ReactDOM from 'react-dom';
import { useTranslation } from 'react-i18next';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
}

const XIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>;


export const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children }) => {
  const { t } = useTranslation();

  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div 
      className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center z-50 p-4"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div 
        className="bg-brand-surface rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] flex flex-col"
        onClick={e => e.stopPropagation()} // Prevent closing when clicking inside the modal
      >
        <div className="flex justify-between items-center p-4 border-b border-slate-700">
          <h2 id="modal-title" className="text-xl font-bold">{title}</h2>
          <button 
            onClick={onClose} 
            className="text-brand-text-dim hover:text-brand-text transition-colors focus:outline-none focus:ring-2 focus:ring-brand-primary rounded-full p-1"
            aria-label={t('close')}
          >
            <XIcon />
          </button>
        </div>
        <div className="p-6 overflow-y-auto">
          {children}
        </div>
      </div>
    </div>,
    document.body
  );
};
