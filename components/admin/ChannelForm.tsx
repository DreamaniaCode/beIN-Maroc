// Fix: Provide full content for ChannelForm.tsx to resolve module errors.
import React, { useState } from 'react';
import { Channel } from '../../types';

interface ChannelFormProps {
    channel?: Channel | null;
    onSubmit: (channelData: Partial<Channel>) => void;
    onCancel: () => void;
}

export const ChannelForm: React.FC<ChannelFormProps> = ({ channel, onSubmit, onCancel }) => {
    const [name, setName] = useState(channel?.name || '');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit({ ...channel, name });
    };

    return (
        <form onSubmit={handleSubmit} className="bg-slate-800 p-6 rounded-lg">
            <h3 className="text-lg font-bold mb-4 text-white">{channel ? 'Edit Channel' : 'Add Channel'}</h3>
            <div className="mb-4">
                <label className="block text-brand-text-dim text-sm font-bold mb-2" htmlFor="channel-name">
                    Channel Name
                </label>
                <input
                    id="channel-name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="shadow appearance-none border border-slate-600 rounded w-full py-2 px-3 bg-slate-700 text-brand-text leading-tight focus:outline-none focus:ring-2 focus:ring-brand-primary"
                />
            </div>
            {/* Additional form fields would go here */}
            <div className="flex justify-end gap-2 mt-6">
                <button type="button" onClick={onCancel} className="bg-slate-600 hover:bg-slate-500 text-white font-bold px-4 py-2 rounded transition-colors">Cancel</button>
                <button type="submit" className="bg-brand-primary hover:bg-sky-400 text-brand-bg font-bold px-4 py-2 rounded transition-colors">Save</button>
            </div>
        </form>
    );
};
