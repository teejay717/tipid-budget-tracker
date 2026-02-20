import { GlobalContext } from "@/context/GlobalState";
import { useContext, useEffect } from "react";
import { MdCallMade, MdCallReceived, MdDeleteOutline, MdEdit } from 'react-icons/md';

const Categories = () => {
    const { categories, getCategories } = useContext(GlobalContext)

    

    console.log(categories)

    useEffect(()=> {
        getCategories();
    }, [])
    return (
        <div className="max-w-4xl">
            <h1 className="text-2xl font-bold text-white mb-6">Categories</h1>
            <ul className='flex flex-col gap-2'>
                                        {categories.map(category => {
                                            return (
                                                <li key={category._id} className="bg-gray-900 p-3 rounded-lg flex items-center gap-3 group hover:bg-gray-800/80 transition duration-200 relative overflow-hidden">
                        
                                                    {/* Text & details */}
                                                    <div className='flex flex-col flex-1 min-w-0'>
                                                        <span className="font-bold text-white">{category.text}</span>
                                                    </div>
                        
                                                    {/* Delete button — slides in from the right */}
                                                    <button
                                                        onClick={() => deleteTransaction(category._id)}
                                                        className=" text-white w-8 flex items-center justify-center duration-200 cursor-pointer p-1 rounded-lg transition-all hover:bg-gray-700"
                                                    >
                                                        <MdDeleteOutline className="text-lg text-gray-600 hover:text-red-500" />
                                                    </button>
                                                </li>
                                            )
                                        })}
                                    </ul>
        </div>
    );
};

export default Categories;
