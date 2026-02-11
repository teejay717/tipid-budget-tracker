import AddTransaction from "../components/AddTransaction";
import Balance from "../components/Balance";
import TransactionModal from "../components/TransactionModal";
import TransactionList from "../components/TransactionList";
import { useState } from "react";

const Dashboard = () => {
    const [modalOpen, setModalOpen] = useState(false);
    const [modalType, setModalType] = useState('income');

    return (
        <div className="max-w-4xl">
            <h1 className="text-2xl font-bold text-white mb-6">Allowance Tracker</h1>
            <Balance />
            <div className="flex gap-4 mb-6">
                <button
                    onClick={() => { setModalType('income'); setModalOpen(true); }}
                    className="flex-1 py-3 rounded-lg font-semibold text-green-400 bg-green-900/30 border border-green-800 hover:bg-green-900/50 transition-colors cursor-pointer"
                >
                    + Income
                </button>
                <button
                    onClick={() => { setModalType('expense'); setModalOpen(true); }}
                    className="flex-1 py-3 rounded-lg font-semibold text-red-400 bg-red-900/30 border border-red-800 hover:bg-red-900/50 transition-colors cursor-pointer"
                >
                    – Expense
                </button>
            </div>
            <TransactionModal isOpen={modalOpen} onClose={() => setModalOpen(false)} type={modalType} />
            <TransactionList />
        </div>
    );
};

export default Dashboard;
