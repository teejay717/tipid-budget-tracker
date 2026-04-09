import AddTransaction from "../components/AddTransaction";
import Balance from "../components/Balance";
import TransactionModal from "../components/TransactionModal";
import TransactionList from "../components/TransactionList";
import ExpenseChart from "../components/ExpenseChart";
import IncomeExpenseBarChart from "../components/BarChart";
import { useContext, useState } from "react";
import LoadingModal from "@/components/LoadingModal";
import { AuthContext } from "@/context/AuthContext";

const Dashboard = () => {
    const [modalOpen, setModalOpen] = useState(false);
    const [modalType, setModalType] = useState('income');
    const { user } = useContext(AuthContext);

    return (
        <div className="w-full max-w-8xl px-0 sm:px-2">
            <h1 className="text-3xl font-extrabold text-white mb-6">Welcome back, {user.name.trim().split(" ")[0]}!</h1>
            <Balance />
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-6

">
                <button
                    onClick={() => { setModalType('income'); setModalOpen(true); }}
                    className="quick-income-btn flex-1 py-3 rounded-lg font-semibold text-green-400 
                    border border-green-900/50 
                    bg-green-900/30  hover:bg-green-900/50 transition-colors cursor-pointer"
                >
                    + Income
                </button>
                <button
                    onClick={() => { setModalType('expense'); setModalOpen(true); }}
                    className="quick-expense-btn flex-1 py-3 rounded-lg font-semibold text-red-400 bg-red-900/30 hover:bg-red-900/50 transition-colors cursor-pointer
                    border border-red-900/50"
                >
                    – Expense
                </button>
            </div>
            <div className="flex flex-col xl:flex-row gap-4 w-full mb-6">
                <div className="flex-1 min-w-0 h-full">
                    <IncomeExpenseBarChart />
                </div>
                <div className="w-full xl:w-80 min-w-0 shrink-0 h-full">
                    <ExpenseChart />
                </div>
            </div>
            <TransactionModal isOpen={modalOpen} onClose={() => setModalOpen(false)} type={modalType} />
            <div className="flex gap-6 items-start">
                <div className="flex-1">
                    <TransactionList />
                </div>
                
                
            </div>
        </div>
    );
};

export default Dashboard;
