import React, { createContext, useReducer } from 'react';
import AppReducer from './AppReducer';
import axios from 'axios';

// before we fetch data we have nothing initially
const initialState = {
    transactions: [],
    error: null,
    loading: true
}

// creates context this is where the components connect to
export const GlobalContext = createContext(initialState);

export const GlobalProvider = ({ children }) => {
    const [state, dispatch] = useReducer(AppReducer, initialState);

    async function getTransactions() {
    try {
        const res = await axios.get('http://localhost:5000/api/transactions');

        dispatch({
            type: 'GET_TRANSACTIONS',
            payload: res.data.data
        });
        } catch (err) {
        dispatch({
            type: 'TRANSACTION_ERROR',
            payload: err.response.data.error
        });
        }
    }

    // The buttons that get pressed:
    // delete transaction
    async function deleteTransaction (id) {
        try {
            await axios.delete(`http://localhost:5000/api/transactions/${id}`)

            // tells the app to delete transaction with the specific id payload
            dispatch({
                type: 'DELETE_TRANSACTION',
                payload: id
            })
        } catch (error) {
            dispatch({
                type: 'TRANSACTION_ERROR',
                payload: err.response.data.error
            });
        }
    }

    // add transaction

    async function addTransaction (transaction) {
        const config = {
        headers: {
            'Content-Type': 'application/json'
        }
        }

        try {
        const res = await axios.post('http://localhost:5000/api/transactions', transaction, config);

        // tells the app to add transaction with the payload
        dispatch({
            type: 'ADD_TRANSACTION',
            payload: res.data.data
        });
        } catch (err) {
        dispatch({
            type: 'TRANSACTION_ERROR',
            payload: err.response.data.error
        });
    }
    }

    // DELETE ALL transactions
    async function clearTransactions() {
        try {
        await axios.delete('http://localhost:5000/api/transactions');

        // Tell App to clear the list
        dispatch({
            type: 'CLEAR_TRANSACTIONS'
        });
        } catch (err) {
        dispatch({
            type: 'TRANSACTION_ERROR',
            payload: err.response.data.error
        });
        }
    }


return (<GlobalContext.Provider value={{
    transactions: state.transactions,
    error: state.error,
    loading: state.loading,
    getTransactions,
    deleteTransaction,
    addTransaction,
    clearTransactions
    }}>
        {children}
    </GlobalContext.Provider>);
}