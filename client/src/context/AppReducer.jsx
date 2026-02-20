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
                transactions: [...state.transactions, action.payload],
                categories: [...state.categories, action.payload]
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
        default:
            return state
    }
}