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


const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { register, error, token, clearError, isAuthLoading } = useContext(AuthContext);
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

        if (isAuthLoading) return;
        
        await register( name, email, password );
    }

    return (
        <>
        <div className="relative min-h-screen overflow-hidden bg-slate-950 text-slate-100">
            <div className="pointer-events-none absolute inset-0">
                <div className="absolute -right-20 top-12 h-72 w-72 rounded-full bg-emerald-500/15 blur-3xl" />
                <div className="absolute bottom-0 left-0 h-96 w-96 rounded-full bg-cyan-500/10 blur-3xl" />
            </div>

            <div className="relative mx-auto flex min-h-screen w-full max-w-6xl box-border items-center px-6 py-10 lg:py-16">
                <div className="grid w-full items-start gap-8 lg:grid-cols-2 lg:gap-12">
                    <Tilt
                        className="group w-full overflow-hidden rounded-2xl"
                        tiltMaxAngleX={8}
                        tiltMaxAngleY={8}
                        tiltAngleXInitial={0}
                        tiltAngleYInitial={0}
                        perspective={1800}
                        scale={1.005}
                        transitionSpeed={1200}
                        gyroscope={true}
                        glareEnable={true}
                        glareMaxOpacity={0.04}
                        glareColor="#ffffff"
                        glarePosition="all"
                    >
                        <section
                            className="rounded-2xl border border-slate-700/70 bg-slate-900/50 p-8 shadow-2xl backdrop-blur-sm"
                            style={{ transformStyle: 'preserve-3d' }}
                        >
                            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.16em] text-slate-300" style={{ transform: 'translateZ(40px)' }}>
                                Tipid by teejay.dev
                            </p>
                            <p className="auth-accent-pill auth-accent-pill-emerald mb-3 inline-block rounded-full border border-emerald-400/30 bg-emerald-400/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-emerald-200" style={{ transform: 'translateZ(54px)' }}>
                                Start Your Money Journey
                            </p>
                            <h1 className="text-3xl font-bold leading-tight text-white lg:text-4xl" style={{ transform: 'translateZ(78px)' }}>
                                Build smarter spending habits with Tipid.
                            </h1>
                            <p className="mt-4 max-w-lg text-sm text-slate-300 lg:text-base" style={{ transform: 'translateZ(56px)' }}>
                                Create your account to get a clear view of your allowance, spending categories, and progress over time. One simple system, better daily decisions.
                            </p>

                            <ul className="mt-8 space-y-4" style={{ transform: 'translateZ(42px)' }}>
                                <li className="flex items-start gap-3 text-sm text-slate-200">
                                    <MdOutlineCheckCircle className="auth-check-icon mt-0.5 shrink-0 text-xl text-emerald-300" />
                                    <span>See your balance update instantly as you add transactions.</span>
                                </li>
                                <li className="flex items-start gap-3 text-sm text-slate-200">
                                    <MdOutlineCheckCircle className="auth-check-icon mt-0.5 shrink-0 text-xl text-emerald-300" />
                                    <span>Customize categories to match your real spending behavior.</span>
                                </li>
                                <li className="flex items-start gap-3 text-sm text-slate-200">
                                    <MdOutlineCheckCircle className="auth-check-icon mt-0.5 shrink-0 text-xl text-emerald-300" />
                                    <span>Use trend charts to catch overspending before it becomes a habit.</span>
                                </li>
                            </ul>
                        </section>
                    </Tilt>

                    <section className="flex items-center">
                        <Card className="w-full border-slate-700 bg-slate-900/90 shadow-2xl">
                            <CardHeader>
                                <CardTitle className="text-2xl text-white">Create your account</CardTitle>
                                <CardDescription className="text-slate-300">
                                    Get started in under a minute and begin tracking with clarity.
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <form onSubmit={handleSubmit}>
                                    <div className="flex flex-col gap-6">
                                        <div className="grid gap-2">
                                            <Label htmlFor="name">Name</Label>
                                            <Input
                                                id="name"
                                                type="text"
                                                value={name}
                                                placeholder="Juan Dela Cruz"
                                                required
                                                disabled={isAuthLoading}
                                                onChange={(e) => {
                                                    setName(e.target.value);
                                                    clearError();
                                                }}
                                            />
                                        </div>
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
                                            <p className="text-xs text-slate-400">Use at least 8 characters for a stronger account.</p>
                                        </div>
                                        <div className="mt-2">
                                            <p className={`${error ? 'mb-2 mt-0' : 'mb-0'} text-red-400`}>{error}</p>
                                            <Button type="submit" className="w-full" disabled={isAuthLoading}>
                                                {isAuthLoading ? "Registering" : "Register"}
                                            </Button>
                                        </div>
                                    </div>
                                    <div className="mt-4 text-center text-sm text-slate-300">
                                        Already have an account?{" "}
                                        <Link to="/login" className="underline underline-offset-4 hover:text-white">
                                            Login
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
                title = 'Registering...'
                message = 'Please wait while we register your account...'/>
        </div>
        <footer
            className={`fixed bottom-0 right-0 z-20 border-t border-gray-800 bg-gray-950/95 backdrop-blur-sm transition-all duration-300 ease-in-out left-0`}
        >
            <div className="px-6 py-3 text-center text-xs text-gray-400">
                <span className="font-medium text-gray-300">Developed by teejay.dev</span>
                <span className="mx-2 text-gray-600">|</span>
                <span>Tipid v0.1.0-beta</span>
            </div>
        </footer>
        </>
    )
}

export default Register;