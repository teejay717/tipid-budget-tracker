import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Footer from './Footer';

const ProtectedLayout = () => {
    return (
        <div className="flex min-h-screen bg-gray-950">
            <Sidebar />
            <main className="flex-1 flex flex-col p-8 pb-24">
                <Outlet />
                <Footer />
            </main>
        </div>
    );
};

export default ProtectedLayout;
