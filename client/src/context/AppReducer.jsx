export default (state, action) => {
    switch (action.type) {
        case 'GET_TRANSACTIONS':
            return {
                ...state,
                loading: false,
                transactions: action.payload
            }
        case 'DELETE_TRANSACTION':
            return {
                ...state,
                transactions: state.transactions.filter(transaction => transaction._id != action.payload)
            }
        case 'ADD_TRANSACTION':
            return {
                ...state,
                transactions: [...state.transactions, action.payload]
            }
        case 'CLEAR_TRANSACTIONS':
            return {
                ...state,
                transactions: []
            }
        case 'UPDATE_TRANSACTION':
            return {
                ...state,
                transactions: state.transactions.map(transaction => 
                    transaction._id === action.payload._id ? action.payload : transaction)
            }
        case 'TRANSACTION_ERROR':
            return {
                ...state,
                error: action.payload
            }
        case 'GET_CATEGORIES':
            return {
                ...state,
                loading: false,
                categories: action.payload
            }
        case 'ADD_CATEGORY':
            return {
                ...state,
                categories: [...state.categories, action.payload]
            }
        case 'DELETE_CATEGORY':
            return {
                ...state,
                categories: state.categories.filter(category => category._id != action.payload)
            }
        case 'EDIT_CATEGORY':
        return {
            ...state,
            categories: state.categories.map(category => category._id === action.payload._id ? action.payload : category)
        }
        default:
            return state
    }
}