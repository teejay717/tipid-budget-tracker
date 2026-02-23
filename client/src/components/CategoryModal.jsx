import React, { useState, useContext } from 'react';
import { GlobalContext } from '../context/GlobalState';
import { MdClose, MdDeleteOutline } from 'react-icons/md';

const CategoryModal = ({ modalOpen, isOpen, onClose, existingCategory }) => {
    const [text, setText] = useState('');
    const [color, setColor] = useState('#3b82f6');

    const { addCategory, deleteCategory, editCategory } = useContext(GlobalContext);

    const colors = [
        "#ef4444", // Red
        "#f97316", // Orange
        "#eab308", // Yellow
        "#22c55e", // Green
        "#06b6d4", // Cyan/Teal
        "#3b82f6", // Blue
        "#6366f1", // Indigo
        "#a855f7", // Purple
        "#ec4899", // Pink
        "#64748b"  // Slate/Gray
    ];

    React.useEffect(() => {
        if (existingCategory) {
            setText(existingCategory.text);
            setColor(existingCategory.color);
        } else {
            if (isOpen) {
                setText('');
                setColor('#3b82f6');
            }
        }
    }, [existingCategory, isOpen]);

    if (!isOpen) return null;

    const handleSubmit = (e) => {
        e.preventDefault();

        const categoryData = {
            text,
            color
        }

        if (existingCategory) {
            editCategory(existingCategory._id, categoryData)
        } else {
            addCategory({ text, color });
        }
        
        setText('');
        setColor('#3b82f6');
        onClose();
    };

    const handleDelete = () => {
        if (window.confirm('Are you sure you want to delete this category?')) {
            deleteCategory(existingCategory._id);
            onClose();
        }
    };

    return (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50" onClick={onClose}>
            <div
                className="bg-gray-900 border border-gray-700 rounded-xl p-6 w-full max-w-md mx-4 shadow-2xl"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-bold text-white">
                        {existingCategory ? 'Edit Category' : 'Add Category'}
                    </h2>
                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-white transition-colors cursor-pointer"
                    >
                        <MdClose className="text-2xl" />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    {/* Name */}
                    <div>
                        <label className="block text-gray-400 text-sm font-medium mb-1">Name</label>
                        <input
                            type="text"
                            value={text}
                            onChange={(e) => setText(e.target.value)}
                            placeholder="e.g. Food, Transport"
                            required
                            className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
                        />
                    </div>

                    {/* Color */}
                    <div>
                        <label className="block text-gray-400 text-sm font-medium mb-1">Color</label>
                        {colors.map((hex) => (
                            <button key={hex}
                            type="button"
                            onClick={() => setColor(hex)} 
                            style={{ backgroundColor : hex }}
                            className={`w-8 h-8 rounded-full border-2 hover:cursor-pointer mr-1 ${color === hex ? "border-white" : "border-transparent"}`}></button>
                        ))}
                    </div>

                    {/* Submit */}
                    <div className="flex flex-row gap-2 mt-4">
                        <button
                            type="submit"
                            className="flex-1 py-3 rounded-lg font-bold text-white cursor-pointer transition-colors bg-indigo-600 hover:bg-indigo-700"
                        >
                            {existingCategory ? 'Save Changes' : 'Add Category'}
                        </button>
                        {existingCategory && (
                            <button
                                type="button"
                                onClick={handleDelete}
                                className="bg-gray-800 border-gray-700 border hover:bg-red-700 text-white p-4 rounded-lg transition-colors flex items-center justify-center cursor-pointer"
                                title="Delete Category"
                            >
                                <MdDeleteOutline className="text-xl" />
                            </button>
                        )}
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CategoryModal;