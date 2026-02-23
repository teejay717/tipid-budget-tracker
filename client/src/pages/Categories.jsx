import { GlobalContext } from "@/context/GlobalState";
import { useContext, useEffect, useState } from "react";
import { MdCallMade, MdCallReceived, MdDeleteOutline, MdEdit } from 'react-icons/md';
import CategoryModal from "@/components/CategoryModal";

const Categories = () => {
    const [modalOpen, setModalOpen] = useState(false);
    const { transactions, categories, getCategories, deleteCategory } = useContext(GlobalContext)
    const [editingCategory, setEditingCategory] = useState(null);

    console.log(categories)

    const handleEditClick = (category) => {
        setEditingCategory(category);
        setModalOpen(true)
    }

    useEffect(()=> {
        getCategories();
    }, [])

    
    return (
        <div className="max-w-4xl">
            <div className="flex flex-row justify-between items-center mb-4">
                <h1 className="text-2xl font-bold text-white">Categories</h1>
                <button className="px-3 py-2 rounded-lg font-semibold text-green-400 hover:text-white bg-green-900/30 border border-green-800 
                hover:bg-green-900/50 transition-colors cursor-pointer" onClick={() => {
                    setModalOpen(true)
                }}>+ Add</button>
            </div>
            <ul className='flex flex-col gap-2'>
                                        {categories.map(category => {
                                            return (
                                                <li key={category._id} className="bg-gray-900 p-3 rounded-lg flex items-center gap-3 group hover:bg-gray-800/80 transition duration-200 relative overflow-hidden">
                        
                                                    {/* Text & details */}
                                                    <div className='flex flex-row flex-1 min-w-0 text-md gap-2'>
                                                        <div style={{ backgroundColor: category?.color}}
                                                        className='p-0.5 rounded-full'></div>
                                                        <span className="font-bold text-white">{category.text}</span>
                                                    </div>
                        
                                                    {/* Delete button — slides in from the right */}
                                                    <button
                                                        onClick={() => deleteCategory(category._id)}
                                                        className=" text-white w-8 flex items-center justify-center duration-200 cursor-pointer p-1 rounded-lg transition-all hover:bg-gray-700"
                                                    >
                                                        <MdDeleteOutline className="text-lg text-gray-600 hover:text-red-500" />
                                                    </button>
                                                    <button
                                                        onClick={() => handleEditClick(category)}
                                                        className=" text-white w-8 flex items-center justify-center duration-200 cursor-pointer p-1 rounded-lg transition-all hover:bg-gray-700"
                                                    >
                                                        <MdEdit className="text-lg text-gray-600 hover:text-red-500" />
                                                    </button>
                                                </li>
                                            )
                                        })}
                                    </ul>
            <CategoryModal 
            isOpen={modalOpen} 
            onClose={() => 
                {setModalOpen(false)
                setEditingCategory(null)}}
            existingCategory={editingCategory}
            />
        </div>
    );
};

export default Categories;
