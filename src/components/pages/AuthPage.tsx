'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { AuroraBackground } from '@/components/animation/AuroraBackground'
import { useAuth } from '@/context/AuthContext'
import { useRouter } from 'next/navigation'
import { Heart, Shield, Clock, Users } from 'lucide-react'

const AuthPage: React.FC = () => {
    const [loading, setLoading] = useState(false)
    const { loginWithGoogle } = useAuth()
    const router = useRouter()

    const handleGoogleLogin = async () => {
        setLoading(true)
        try {
            await loginWithGoogle()
            // Router push will be handled by auth state change
        } catch (error) {
            console.error('Google login error:', error)
            alert('Google login failed. Please try again.')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="min-h-screen bg-black">
            <div className="min-h-screen flex">
                {/* Left Side - Healthcare Illustration */}
                <div className="hidden lg:flex lg:w-1/2 flex-col justify-center items-center p-12 text-white">
                    <div className="max-w-md text-center">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            className="mb-8"
                        >
                            <div className="grid grid-cols-2 gap-6 mb-8">
                                <div className="bg-emerald-500/20 p-6 rounded-lg backdrop-blur-sm">
                                    <Heart className="w-12 h-12 text-emerald-400 mb-4" />
                                    <h3 className="text-lg font-semibold">Heart Care</h3>
                                </div>
                                <div className="bg-emerald-500/20 p-6 rounded-lg backdrop-blur-sm">
                                    <Shield className="w-12 h-12 text-emerald-400 mb-4" />
                                    <h3 className="text-lg font-semibold">Secure</h3>
                                </div>
                                <div className="bg-emerald-500/20 p-6 rounded-lg backdrop-blur-sm">
                                    <Clock className="w-12 h-12 text-emerald-400 mb-4" />
                                    <h3 className="text-lg font-semibold">24/7 Care</h3>
                                </div>
                                <div className="bg-emerald-500/20 p-6 rounded-lg backdrop-blur-sm">
                                    <Users className="w-12 h-12 text-emerald-400 mb-4" />
                                    <h3 className="text-lg font-semibold">Expert Doctors</h3>
                                </div>
                            </div>
                        </motion.div>
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="text-4xl font-bold mb-4 text-emerald-400"
                        >
                            Welcome to Smart Healthcare
                        </motion.h1>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.4 }}
                            className="text-gray-300 text-lg"
                        >
                            Your AI-powered healthcare assistant for symptom checking, doctor consultations, and appointment booking.
                        </motion.p>
                    </div>
                </div>

                {/* Right Side - Google Sign In Only */}
                <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
                    <div className="w-full max-w-md">
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6 }}
                            className="bg-black/40 backdrop-blur-md rounded-2xl p-8 shadow-2xl border border-emerald-500/30"
                        >
                            <div className="text-center mb-8">
                                <h2 className="text-3xl font-bold text-white mb-2">Get Started</h2>
                                <p className="text-gray-300">Sign in to access your healthcare dashboard</p>
                            </div>

                            {/* Google Sign In Button */}
                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={handleGoogleLogin}
                                disabled={loading}
                                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-4 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center gap-3 shadow-lg disabled:opacity-50"
                            >
                                <svg className="w-6 h-6" viewBox="0 0 24 24">
                                    <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                                    <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                                    <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                                    <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                                </svg>
                                {loading ? 'Signing in...' : 'Continue with Google'}
                            </motion.button>

                            <div className="mt-6 text-center">
                                <p className="text-gray-400 text-sm">
                                    By continuing, you agree to our Terms of Service and Privacy Policy
                                </p>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AuthPage
