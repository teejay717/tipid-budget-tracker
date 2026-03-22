const LoadingModal = ({
    open = false,
    title = 'Please wait',
    message = 'Processing your request...',
}) => {
    if (!open) return null;

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
            role="dialog"
            aria-modal="true"
            aria-live="polite"
            aria-label="Loading"
        >
            <div className="w-full max-w-sm rounded-xl border border-gray-700 bg-gray-900 p-6 shadow-2xl">
                <div className="flex items-center gap-4">
                    <div
                        className="h-9 w-9 animate-spin rounded-full border-2 border-gray-600 border-t-white"
                        aria-hidden="true"
                    />
                    <div className="min-w-0">
                        <h2 className="text-base font-semibold text-white">{title}</h2>
                        <p className="text-sm text-gray-400">{message}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoadingModal;
