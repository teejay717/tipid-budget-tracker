import React, { createContext, useReducer } from "react";
import AppReducer from './AppReducer'
import axios from 'axios'

const initialState = {
    transactions: [],
    error: null,
    loading: true
}

export const GlobalContext = createContext(initialState)

export const GlobalProvider = ({children}) => {
    const [state, dispatch] = useReducer(AppReducer, initialState)

    // Functions

    async function getTransactions () {
        try {
            const res = await axios.get('http://localhost:5000/api/transactions')
            
            dispatch({ 
                type: 'GET_TRANSACTIONS', 
                payload: res.data.data});
            
        } catch (err) {
            dispatch({
                type: 'TRANSACTION_ERROR',
                payload: err.response.data.error
            })
        }
    }

    async function deleteTransaction(id) {
        try {
            const res = await axios.delete(`http://localhost:5000/api/transactions/${id}`)

            dispatch({
                type: 'DELETE_TRANSACTION',
                payload: id
            })
        } catch (err) {
            dispatch({
                type: 'TRANSACTION_ERROR',
                payload: err.response.data.error
            })
        }
    }

    async function addTransaction(transaction) {
        const config = {
            headers: {
            "Content-Type": "application/json"
            }
        }
        try {
            const res = await axios.post('http://localhost:5000/api/transactions', transaction, config)

            dispatch({
                type: 'ADD_TRANSACTION',
                payload: res.data.data
            })
        } catch (err) {
            dispatch({
                type: 'TRANSACTION_ERROR',
                payload: err.res.data.error
            })
            console.error({message: err.message})
        }
    }
    async function updateTransaction(id, transaction) {
        const config = {
            headers: {
            "Content-Type": "application/json"
            }
        }

        try {
            const res = await axios.put(`http://localhost:5000/api/transactions/${id}`, transaction, config)

            dispatch({
                type: 'UPDATE_TRANSACTION',
                payload: res.data.data
            })
        } catch (error) {
            dispatch({
                type: 'TRANSACTION_ERROR',
                payload: err.response.data.error
            })
            console.error({message: err.message})
        }
    }

    async function clearTransactions() {
        try {
            const res = await axios.delete('http://localhost:5000/api/transactions')

            dispatch({
                type: 'CLEAR_TRANSACTIONS',
            })
        } catch (err) {
            dispatch({
                type: 'TRANSACTION_ERROR',
                payload: err.response.data.error
            })
        }
    }

    return (
        <GlobalContext.Provider value={{
            transactions: state.transactions,
            error: state.error,
            loading: state.loading,
            getTransactions,
            deleteTransaction,
            addTransaction,
            updateTransaction,
            clearTransactions
        }}>
            {children}
        </GlobalContext.Provider>
    )
}