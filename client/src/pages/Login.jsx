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

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { login, error, token, clearError } = useContext(AuthContext);
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

    useEffect(() => {
        if (!error) return;

        const timer = setTimeout(() => {
            clearError()
        }, 3000);

        return () => clearTimeout(timer);
    }, [error, clearError])

    return (
        <div className="flex flex-col bg-slate-950 h-screen justify-center items-center">
            <Card className="bg-gray-900 border-gray-600">
                <CardHeader>
                    <CardTitle className="text-2xl">Login</CardTitle>
                    <CardDescription>
                    Enter your email below to login to your account
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit}>
                    <div className="flex flex-col gap-6">
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
                        <div>
                            <p className={(`${error ? 'mb-2 mt-0' : 'mb-0 mt-0'} text-red-400`)}>{error}</p>
                            <Button type="submit" className="w-full">
                            Login
                            </Button>
                        </div>
                        
                        {/* <Button variant="outline" className="w-full">
                        Login with Google
                        </Button> */}
                    </div>
                    <div className="mt-4 text-center text-sm">
                        Don&apos;t have an account?{" "}
                        <Link to="/register" className="underline underline-offset-4">
                        Sign up
                        </Link>
                    </div>
                    </form>
                </CardContent>
            </Card>
            {/* <div className="flex flex-col bg-white">
                <h1>Login</h1>
                {error && <p>{error}</p>}
                <form className="flex flex-col "onSubmit={handleSubmit}>
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

export default Login;