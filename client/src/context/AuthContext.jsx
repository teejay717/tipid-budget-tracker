import React, {createContext, useState} from "react";
import axios from "axios";

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
    const [token, setToken] = useState(localStorage.getItem('token'));
    const [user, setUser] = useState(null);
    const [error, setError] = useState(null);

    async function register(name, email, password) {
        try {
            const res = await axios.post('http://localhost:5000/api/auth/register', { email, name, password })
            
            const token = res.data.token;
            setToken(token);
            localStorage.setItem("token", token)
        } catch (error) {
            setError(error.response.data.error);
        }
        
    }

    async function login (email, password) {
        try {
            const res = await axios.post('http://localhost:5000/api/auth/login', { email, password })

            const token = res.data.token;
            setToken(token);
            localStorage.setItem("token", token)
        } catch (error) {
            setError(error.response.data.error);
        }
    }

    function logout () {
        try {
            setToken(null);
            setUser(null);
            localStorage.removeItem("token");
        } catch (error) {
            setError(error.response.data.error);
        }
    }
    return (
        <AuthContext.Provider value={{
            token,
            user,
            error,
            register,
            login,
            logout
        }}>
            {children}
        </AuthContext.Provider>
    )
}