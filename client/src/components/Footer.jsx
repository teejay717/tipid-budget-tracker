const Footer = ({ isSidebarOpen }) => {
    return (
        <footer
            className={`fixed bottom-0 right-0 z-20 border-t border-gray-800 bg-gray-950/95 backdrop-blur-sm transition-all duration-300 ease-in-out ${
                isSidebarOpen ? 'left-56' : 'left-16'
            }`}
        >
            <div className="px-6 py-3 text-center text-xs text-gray-400">
                <span className="font-medium text-gray-300">Developed by teejay.dev</span>
                <span className="mx-2 text-gray-600">|</span>
                <span>Tipid v0.1.0-beta</span>
            </div>
        </footer>
    );
};

export default Footer;
