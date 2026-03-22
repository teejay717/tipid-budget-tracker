import React, { createContext, useReducer, useState } from "react";
import AppReducer from './AppReducer'
import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const initialState = {
    transactions: [],
    categories: [],
    error: null,
    loading: true
}

export const GlobalContext = createContext(initialState)

export const GlobalProvider = ({children}) => {
    const [isLoading, setIsLoading] = useState(false);
    const [isLoadingCategories, setIsLoadingCategories] = useState(false);
    const [state, dispatch] = useReducer(AppReducer, initialState)

    const getConfig = () => ({
        headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${localStorage.getItem('token')}` // this is to set the header like the old config AND have authorization field filled with the JWT token the user has. If this doesnt exist then auth.js will return not authorized and will not let you enter the path you requested.
        }
    })

    // Functions

    async function getTransactions (period = 'all') {
        try {
            setIsLoading(true);
            const res = await axios.get(`${API_URL}/api/transactions?period=${period}`, getConfig())
            
            dispatch({ 
                type: 'GET_TRANSACTIONS', 
                payload: res.data.data});

            
        } catch (err) {
            dispatch({
                type: 'TRANSACTION_ERROR',
                payload: err.response.data.error
            })
        } finally {
            setIsLoading(false);
        }
    }

    async function deleteTransaction(id) {
        try {
            const res = await axios.delete(`${API_URL}/api/transactions/${id}`, getConfig())

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
        try {
            const res = await axios.post(`${API_URL}/api/transactions`, transaction, getConfig())

            dispatch({
                type: 'ADD_TRANSACTION',
                payload: res.data.data
            })
        } catch (err) {
            dispatch({
                type: 'TRANSACTION_ERROR',
                payload: err.response.data.error
            })
            console.error({message: err.message})
        }
    }
    async function updateTransaction(id, transaction) {

        try {
            const res = await axios.put(`${API_URL}/api/transactions/${id}`, transaction, getConfig())

            dispatch({
                type: 'UPDATE_TRANSACTION',
                payload: res.data.data
            })
        } catch (err) {
            dispatch({
                type: 'TRANSACTION_ERROR',
                payload: err.response.data.error
            })
            console.error({message: err.message})
        }
    }

    async function clearTransactions() {
        try {
            const res = await axios.delete(`${API_URL}/api/transactions`, getConfig())

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

    async function getCategories() {
        try {
            setIsLoadingCategories(true);
            const res = await axios.get(`${API_URL}/api/categories`, getConfig())

            dispatch({
                type: 'GET_CATEGORIES',
                payload: res.data.data
            })
        } catch (err) {
            dispatch({
                type: 'TRANSACTION_ERROR',
                payload: err.response.data.error
            })
        } finally {
            setIsLoadingCategories(false)
        }
    }

    async function addCategory(category) {

        try {
            const res = await axios.post(`${API_URL}/api/categories`, category, getConfig())

            dispatch({
                type: 'ADD_CATEGORY',
                payload: res.data.data
            })
        } catch (error) {
            
        }
    }
    
    async function deleteCategory(id) {
        try {
            const res = await axios.delete(`${API_URL}/api/categories/${id}`, getConfig())

            dispatch({
                type: 'DELETE_CATEGORY',
                payload: id
            })
        } catch (err) {
            dispatch({
                type: 'TRANSACTION_ERROR',
                payload: err.response.data.error
            })
        }
    }

    async function editCategory(id, category) {


        try {
            const res = await axios.put(`${API_URL}/api/categories/${id}`, category, getConfig())

        dispatch({
                type: 'EDIT_CATEGORY',
                payload: res.data.data
            })
        } catch (err) {
            dispatch({
                type: 'TRANSACTION_ERROR',
                payload: err.response.data.error
            })
            console.error({message: err.message})
        }
    }
    return (
        <GlobalContext.Provider value={{
            transactions: state.transactions,
            categories: state.categories,
            error: state.error,
            loading: state.loading,
            getTransactions,
            deleteTransaction,
            addTransaction,
            updateTransaction,
            clearTransactions,
            getCategories,
            addCategory,
            deleteCategory,
            editCategory,
            isLoading,
            isLoadingCategories
        }}>
            {children}
        </GlobalContext.Provider>
    )
}