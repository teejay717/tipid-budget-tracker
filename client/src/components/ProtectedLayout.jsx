import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Footer from './Footer';

const ProtectedLayout = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

    return (
        <div className="flex h-dvh overflow-hidden bg-gray-950 md:h-auto md:min-h-screen">
            <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
            <main className="min-h-0 flex-1 overflow-y-auto p-3 pb-24 sm:p-4 sm:pb-24 md:p-6 md:pb-6 lg:p-8">
                <Outlet />
                <Footer isSidebarOpen={isSidebarOpen} />
            </main>
        </div>
    );
};

export default ProtectedLayout;
