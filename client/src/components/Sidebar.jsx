import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { MdDashboard, MdHistory, MdCategory, MdMenu, MdChevronLeft } from 'react-icons/md';

const navItems = [
    { to: '/', label: 'Dashboard', icon: MdDashboard },
    { to: '/history', label: 'History', icon: MdHistory },
    { to: '/categories', label: 'Categories', icon: MdCategory },
];

const Sidebar = () => {
    const [isOpen, setIsOpen] = useState(true);

    return (
        <aside
            className={`
        h-screen sticky top-0 flex flex-col
        bg-gray-900 text-gray-300
        border-r border-gray-800
        transition-all duration-300 ease-in-out
        ${isOpen ? 'w-56' : 'w-16'}
        `}
        >
            {/* Toggle button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center justify-center h-14 hover:bg-gray-800 transition-colors cursor-pointer"
                aria-label={isOpen ? 'Collapse sidebar' : 'Expand sidebar'}
            >
                {isOpen ? (
                    <MdChevronLeft className="text-2xl text-gray-400" />
                ) : (
                    <MdMenu className="text-2xl text-gray-400" />
                )}
            </button>

            {/* Divider */}
            <div className="border-b border-gray-800" />

            {/* Navigation */}
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
        </aside>
    );
};

export default Sidebar;
