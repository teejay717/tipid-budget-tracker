import { useContext } from 'react';
import { createPortal } from 'react-dom';
import { NavLink } from 'react-router-dom';
import { MdDashboard, MdHistory, MdCategory, MdMenu, MdChevronLeft, MdLogout } from 'react-icons/md';
import { GiTakeMyMoney } from "react-icons/gi";
import { AuthContext } from '@/context/AuthContext';
import { VscAccount } from "react-icons/vsc";


const navItems = [
    { to: '/', label: 'Dashboard', icon: MdDashboard },
    { to: '/history', label: 'History', icon: MdHistory },
    { to: '/categories', label: 'Categories', icon: MdCategory },
];

const Sidebar = ({ isOpen, setIsOpen }) => {

    const { logout, user } = useContext(AuthContext);
    const mobileNav = (
        <nav className="fixed inset-x-0 bottom-0 z-[60] flex min-h-16 items-center gap-2 border-t border-gray-800 bg-gray-900/95 px-2 py-1 pb-[env(safe-area-inset-bottom)] text-gray-300 backdrop-blur-sm md:hidden">
            {navItems.map(({ to, label, icon: Icon }) => (
                <NavLink
                    key={to}
                    to={to}
                    end={to === '/'}
                    className={({ isActive }) =>
                        `flex flex-1 items-center justify-center gap-1 rounded-lg px-2 py-2 text-[11px] font-medium transition-colors ${
                            isActive
                                ? 'bg-indigo-600/20 text-indigo-400'
                                : 'text-gray-400 hover:bg-gray-800 hover:text-gray-200'
                        }`
                    }
                >
                    <Icon className="text-xl shrink-0" />
                    <span className="whitespace-nowrap leading-none">{label}</span>
                </NavLink>
            ))}

            <button
                onClick={logout}
                className="flex flex-1 items-center justify-center gap-1 rounded-lg px-2 py-2 text-[11px] font-medium text-red-400 transition-colors hover:bg-red-500/10 hover:text-red-300"
            >
                <MdLogout className="text-xl shrink-0" />
                <span className="whitespace-nowrap leading-none">Logout</span>
            </button>
        </nav>
    );

    return (
        <>
            {/* Mobile bottom nav */}
            {typeof document !== 'undefined' ? createPortal(mobileNav, document.body) : null}

            {/* Desktop sidebar */}
            <aside
                className={`
                hidden h-screen md:fixed md:inset-y-0 md:left-0 md:z-40 md:flex md:flex-col bg-gray-900 text-gray-300
                border-r border-gray-800
                transition-all duration-300 ease-in-out
                ${isOpen ? 'w-56' : 'w-16'}
                `}
            >
                {/* Toggle button */}
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="flex items-center justify-center h-20 hover:bg-gray-800 transition-colors cursor-pointer"
                    aria-label={isOpen ? 'Collapse sidebar' : 'Expand sidebar'}
                >
                    {isOpen ? (
                        <div className='flex flex-row items-center w-full justify-between px-2'>
                            <div className='flex flex-row items-center gap-2 ml-2'>
                                <GiTakeMyMoney className="text-3xl font-extralight"/>
                                <p className='text-2xl font-bold'>Tipid</p>
                            </div>
                            <MdChevronLeft className="text-4xl text-gray-400 mr-2" />
                        </div>
                    ) : (
                        <MdMenu className="text-2xl text-gray-400" />
                    )}
                </button>

                <div className="border-b border-gray-800" />

                <nav className="flex-1 flex flex-col gap-1 p-2 mt-2">
                    {navItems.map(({ to, label, icon: Icon }) => (
                        <NavLink
                            key={to}
                            to={to}
                            end={to === '/'}
                            className={({ isActive }) =>
                                `flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors
                    ${isActive
                                    ? 'bg-indigo-600/20 text-indigo-400'
                                    : 'text-gray-400 hover:bg-gray-800 hover:text-gray-200'
                                }
                    ${!isOpen ? 'justify-center' : ''}
                    `
                            }
                        >
                            <Icon className="text-xl shrink-0" />
                            {isOpen && <span className="whitespace-nowrap">{label}</span>}
                        </NavLink>
                    ))}
                </nav>

                <div className="border-t border-gray-800 p-2 mt-auto">
                    <div className={`flex items-center gap-3 px-3 py-2.5 mb-1 rounded-lg bg-gray-800/50 ${!isOpen ? 'justify-center' : ''}`}>
                        <VscAccount className="text-xl shrink-0 text-gray-400" />
                        {isOpen && (
                            <div className="flex flex-col min-w-0">
                                <span className="text-sm font-medium text-gray-200 truncate">{user?.name}</span>
                                <span className="text-xs text-gray-500 truncate">{user?.email}</span>
                            </div>
                        )}
                    </div>

                    <button
                        onClick={logout}
                        className={`
                            w-full flex items-center gap-3 rounded-lg px-3 py-2.5
                            text-sm font-medium transition-colors
                            text-red-400 hover:bg-red-500/10 hover:text-red-300
                            ${!isOpen ? 'justify-center' : ''}
                        `}
                    >
                        <MdLogout className="text-xl shrink-0" />
                        {isOpen && <span className="whitespace-nowrap">Logout</span>}
                    </button>
                </div>
            </aside>
        </>
    );
};

export default Sidebar;
