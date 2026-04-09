import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Footer from './Footer';

const ProtectedLayout = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

    return (
        <div className="flex min-h-dvh bg-gray-950 md:h-screen md:overflow-hidden">
            <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
            <main
                className={`min-h-dvh flex-1 p-3 pb-24 sm:p-4 sm:pb-24 md:h-screen md:min-h-0 md:overflow-y-auto md:p-6 md:pb-6 lg:p-8 transition-[margin] duration-300 ease-in-out ${
                    isSidebarOpen ? 'md:ml-56' : 'md:ml-16'
                }`}
            >
                <Outlet />
                <Footer isSidebarOpen={isSidebarOpen} />
            </main>
        </div>
    );
};

export default ProtectedLayout;
