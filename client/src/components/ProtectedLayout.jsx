import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Footer from './Footer';

const ProtectedLayout = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

    return (
        <div className="flex min-h-screen bg-gray-950">
            <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
            <main className="flex-1 flex flex-col p-8">
                <Outlet />
                <Footer isSidebarOpen={isSidebarOpen} />
            </main>
        </div>
    );
};

export default ProtectedLayout;
