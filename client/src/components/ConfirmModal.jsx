import React from 'react';
import { MdClose } from 'react-icons/md';

const ConfirmModal = ({ isOpen, onClose, onConfirm, title, message }) => {

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50" onClick={onClose}>
            <div
                className="bg-gray-900 border border-gray-700 rounded-xl p-6 w-full max-w-md mx-4 shadow-2xl"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header with title and close button */}
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-bold text-white">
                        {title}
                    </h2>
                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-white transition-colors cursor-pointer"
                    >
                        <MdClose className="text-2xl" />
                    </button>
                </div>

                {/* Message */}
                <p className="text-gray-300 mb-6">
                    {message}
                </p>

                {/* Action Buttons (Cancel and Confirm) */}
                <div className="flex gap-3 justify-end">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 bg-gray-800 hover:bg-gray-700 text-white rounded-lg transition-colors cursor-pointer"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={() => {
                            onConfirm();
                            onClose();
                        }}
                        className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors cursor-pointer"
                    >
                        Clear All
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ConfirmModal;