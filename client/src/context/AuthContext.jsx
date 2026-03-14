import React, {createContext, useState} from "react";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
    const [token, setToken] = useState(localStorage.getItem('token'));
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')));
    const [error, setError] = useState(null);

    function clearError() {
        setError(null);
    }

    async function register(name, email, password) {
        try {
            const res = await axios.post(`${API_URL}/api/auth/register`, { email, name, password }) // these parameters (req.body) are what we are sending to mongodb to add as a User.
            
            const token = res.data.token;
            setToken(token);
            setUser(res.data.user);
            localStorage.setItem("token", token)
            localStorage.setItem("user", JSON.stringify(res.data.user));
            console.log(token)
        } catch (error) {
            setError(error.response.data.error);
        }
        
    }

    async function login (email, password) {
        try {
            const res = await axios.post(`${API_URL}/api/auth/login`, { email, password }) // this posts to mongodb and this login path checks for a match in the db. if there is a match it is given a token and is able to proceed to the dashboard ('/');

            const token = res.data.token;
            setToken(token);
            setUser(res.data.user);
            localStorage.setItem("token", token);
            localStorage.setItem("user", JSON.stringify(res.data.user));
        } catch (error) {
            setError(error.response.data.error);
        }
    }

    function logout () {
        try {
            setToken(null);
            setUser(null);
            localStorage.removeItem("token");
            localStorage.removeItem("user");
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
            logout,
            clearError
        }}>
            {children}
        </AuthContext.Provider>
    )
}