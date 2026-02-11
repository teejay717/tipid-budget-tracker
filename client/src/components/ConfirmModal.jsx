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


                {/* Message */}


                {/* Action Buttons (Cancel and Confirm) */}

            </div>
        </div>
    );
};

export default ConfirmModal;