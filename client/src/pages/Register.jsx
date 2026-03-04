import { useState, useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";


const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { register, error, token } = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (token) {
            navigate('/');
        }
    }, [token, navigate])

    const handleSubmit = async (e) => {
        e.preventDefault();
        await register( name, email, password );
    }

    return (
        <div className="flex flex-col bg-slate-950 h-screen justify-center items-center">
            <div className="flex flex-col bg-white">
                <h1>Register</h1>
                {error && <p>{error}</p>}
                <form className="flex flex-col "onSubmit={handleSubmit}>
                    <input
                    type="name"
                    placeholder="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required>
                    </input>
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
        </div>
    )
}

export default Register;