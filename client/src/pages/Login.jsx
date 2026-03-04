import { useState, useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { login, error, token } = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (token) {
            navigate('/');
        }
    }, [token, navigate])

    const handleSubmit = async (e) => {
        e.preventDefault();
        await login( email, password );
    }

    return (
        <div>
            <h1>Login</h1>
            {error && <p>{error}</p>}
            <form onSubmit={handleSubmit}>
                <input
                type="email"
                placeholder="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required>
                </input>
                <input
                type="password"
                placeholder="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required>
                </input>
                <button type="submit">Submit</button>
            </form>
        </div>
    )
}

export default Login;