import { useState, useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
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
import LoadingModal from "@/components/LoadingModal";
import { MdOutlineCheckCircle } from 'react-icons/md';
import Tilt from 'react-parallax-tilt';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { login, error, token, clearError, isAuthLoading } = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (token) {
            navigate('/');
        }
    }, [token, navigate])

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (isAuthLoading) return; 
        
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
        <div className="relative min-h-screen overflow-hidden bg-slate-950 text-slate-100">
            <div className="pointer-events-none absolute inset-0">
                <div className="absolute -left-20 top-12 h-72 w-72 rounded-full bg-cyan-500/15 blur-3xl" />
                <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-emerald-500/10 blur-3xl" />
            </div>

            <div className="relative mx-auto flex min-h-screen w-full max-w-6xl items-center px-6 py-10 lg:py-16">
                <div className="grid w-full gap-8 lg:grid-cols-2 lg:gap-12">
                    <Tilt
                        className="w-full"
                        tiltMaxAngleX={8}
                        tiltMaxAngleY={8}
                        perspective={1200}
                        scale={1.01}
                        transitionSpeed={1200}
                        gyroscope={true}
                        glareEnable={true}
                        glareMaxOpacity={0.12}
                        glareColor="#ffffff"
                        glarePosition="all"
                    >
                        <section className="rounded-2xl border border-slate-700/70 bg-slate-900/50 p-8 shadow-2xl backdrop-blur-sm">
                            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.16em] text-slate-300">
                                Tipid by teejay.dev
                            </p>
                            <p className="mb-3 inline-block rounded-full border border-cyan-400/30 bg-cyan-400/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-cyan-200">
                                Tipid Budget Tracker
                            </p>
                            <h1 className="text-3xl font-bold leading-tight text-white lg:text-4xl">
                                Take control of your allowance, one expense at a time.
                            </h1>
                            <p className="mt-4 max-w-lg text-sm text-slate-300 lg:text-base">
                                Tipid helps students and young professionals log daily spending, understand money patterns, and build better financial habits with less effort.
                            </p>

                            <ul className="mt-8 space-y-4">
                                <li className="flex items-start gap-3 text-sm text-slate-200">
                                    <MdOutlineCheckCircle className="mt-0.5 shrink-0 text-xl text-emerald-300" />
                                    <span>Track income and expenses in seconds with a clean dashboard.</span>
                                </li>
                                <li className="flex items-start gap-3 text-sm text-slate-200">
                                    <MdOutlineCheckCircle className="mt-0.5 shrink-0 text-xl text-emerald-300" />
                                    <span>Organize spending by category to spot where your money goes.</span>
                                </li>
                                <li className="flex items-start gap-3 text-sm text-slate-200">
                                    <MdOutlineCheckCircle className="mt-0.5 shrink-0 text-xl text-emerald-300" />
                                    <span>Review weekly and monthly trends so you can improve consistently.</span>
                                </li>
                            </ul>
                        </section>
                    </Tilt>

                    <section className="flex items-center">
                        <Card className="w-full border-slate-700 bg-slate-900/90 shadow-2xl">
                            <CardHeader>
                                <CardTitle className="text-2xl text-white">Welcome back</CardTitle>
                                <CardDescription className="text-slate-300">
                                    Sign in to continue managing your budget with Tipid.
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
                                                disabled={isAuthLoading}
                                                onChange={(e) => {
                                                    setEmail(e.target.value);
                                                    clearError();
                                                }}
                                            />
                                        </div>
                                        <div className="grid gap-2">
                                            <div className="flex items-center">
                                                <Label htmlFor="password">Password</Label>
                                            </div>
                                            <Input
                                                id="password"
                                                type="password"
                                                required
                                                value={password}
                                                disabled={isAuthLoading}
                                                onChange={(e) => {
                                                    setPassword(e.target.value);
                                                    clearError();
                                                }}
                                            />
                                        </div>
                                        <div>
                                            <p className={`${error ? 'mb-2 mt-0' : 'mb-0 mt-0'} text-red-400`}>{error}</p>
                                            <Button type="submit" className="w-full" disabled={isAuthLoading}>
                                                {isAuthLoading ? "Logging in" : "Login"}
                                            </Button>
                                        </div>
                                    </div>
                                    <div className="mt-4 text-center text-sm text-slate-300">
                                        Don&apos;t have an account?{" "}
                                        <Link to="/register" className="underline underline-offset-4 hover:text-white">
                                            Sign up
                                        </Link>
                                    </div>
                                </form>
                            </CardContent>
                        </Card>
                    </section>
                </div>
            </div>

            <LoadingModal
                open = {isAuthLoading}
                title = 'Signing you in'
                message = 'Please wait while we verify your account...'/>
        </div>
        
    )
}

export default Login;