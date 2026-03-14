import { useState, useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Link } from "react-router-dom";


const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { register, error, token, clearError } = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (token) {
            navigate('/');
        }
    }, [token, navigate])

    useEffect(() => {
        if (!error) return;

        const timer = setTimeout(() => {
            clearError()
        }, 3000);

        return () => clearTimeout(timer);
    }, [error, clearError])

    const handleSubmit = async (e) => {
        e.preventDefault();
        await register( name, email, password );
    }

    return (
        <div className="flex flex-col bg-slate-950 h-screen justify-center items-center">
            <Card className="bg-gray-900 border-gray-600">
                <CardHeader>
                    <CardTitle className="text-2xl">Register</CardTitle>
                    <CardDescription>
                    Enter your details below to create a new account
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit}>
                    <div className="flex flex-col gap-6">
                        <div className="grid gap-2">
                        <Label htmlFor="email">Name</Label>
                        <Input 
                            id="name" 
                            type="name" 
                            value={name} 
                            placeholder=""
                            required 
                            onChange={(e) => setName(e.target.value)}/>
                        </div>
                        <div className="grid gap-2">
                        <Label htmlFor="email">Email</Label>
                        <Input 
                            id="email" 
                            type="email" 
                            value={email} 
                            placeholder="m@example.com"
                            required 
                            onChange={(e) => setEmail(e.target.value)}/>
                        </div>
                        <div className="grid gap-2">
                        <div className="flex items-center">
                            <Label htmlFor="password">Password</Label>
                            {/* <a
                            href="#"
                            className="ml-auto inline-block text-sm underline-offset-4 hover:underline">
                            Forgot your password?
                            </a> */}
                        </div>
                        <Input 
                            id="password" 
                            type="password" 
                            required 
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}/>
                        </div>
                        <div className="mt-2">
                            <p className={(`${error ? 'mb-2 mt-0' : 'mb-0'} text-red-400`)}>{error}</p>
                            <Button type="submit" className="w-full">
                            Register
                            </Button>
                        </div>
                        {/* <Button variant="outline" className="w-full">
                        Login with Google
                        </Button> */}
                    </div>
                    <div className="mt-4 text-center text-sm">
                        Already have an account?{" "}
                        <Link to="/login" className="underline underline-offset-4">
                        Login
                        </Link>
                    </div>
                    </form>
                </CardContent>
            </Card>
            {/* <div className="flex flex-col bg-white">
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
            </div> */}
        </div>
    )
}

export default Register;