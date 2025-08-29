'use client'

import React from 'react'
import Threads from '@/components/animation/Threads'

const HomePage: React.FC = () => {
    return (
        <div className="min-h-screen bg-black">
            {/* Simple Header */}
            <header className="bg-black border-b border-gray-800 text-white p-4">
                <div className="max-w-7xl mx-auto flex justify-between items-center">
                    <h1 className="text-2xl font-bold">Smart Healthcare</h1>
                    <nav className="hidden md:flex space-x-6">
                        <a href="#" className="hover:text-green-400">Home</a>
                        <a href="#" className="hover:text-green-400">Symptoms</a>
                        <a href="#" className="hover:text-green-400">Doctors</a>
                        <a href="#" className="hover:text-green-400">Login</a>
                    </nav>
                </div>
            </header>

            {/* Hero Section */}
            <section className="py-20 bg-black relative overflow-hidden min-h-screen flex items-center">
                {/* Green Threads Animation Background */}
                <div className="absolute inset-0 opacity-60">
                    <Threads
                        color={[0, 1, 0]}
                        amplitude={0.8}
                        distance={0.3}
                        enableMouseInteraction={true}
                    />
                </div>

                <div className="max-w-7xl mx-auto px-4 text-center relative z-10">
                    <h1 className="text-5xl font-bold text-white mb-6">
                        Your AI Healthcare Assistant
                    </h1>
                    <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
                        Get instant symptom analysis, find the right doctor, and book appointments with ease.
                    </p>
                    <div className="space-x-4">
                        <button className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors">
                            Start Symptom Check
                        </button>
                        <button className="bg-transparent hover:bg-green-600/20 text-green-400 border-2 border-green-400 px-8 py-3 rounded-lg font-semibold transition-colors">
                            Book Appointment
                        </button>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-16 bg-gray-900">
                <div className="max-w-7xl mx-auto px-4">
                    <h2 className="text-3xl font-bold text-center text-white mb-12">
                        Healthcare Made Simple
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="bg-gray-800 p-6 rounded-lg shadow-sm text-center border border-gray-700">
                            <div className="w-16 h-16 bg-green-900/50 rounded-full flex items-center justify-center mx-auto mb-4">
                                <span className="text-2xl">🏥</span>
                            </div>
                            <h3 className="text-xl font-semibold mb-2 text-white">AI Symptom Checker</h3>
                            <p className="text-gray-300">Get instant insights about your symptoms with advanced AI analysis.</p>
                        </div>
                        <div className="bg-gray-800 p-6 rounded-lg shadow-sm text-center border border-gray-700">
                            <div className="w-16 h-16 bg-green-900/50 rounded-full flex items-center justify-center mx-auto mb-4">
                                <span className="text-2xl">👨‍⚕️</span>
                            </div>
                            <h3 className="text-xl font-semibold mb-2 text-white">Find Doctors</h3>
                            <p className="text-gray-300">Connect with qualified healthcare providers in your area.</p>
                        </div>
                        <div className="bg-gray-800 p-6 rounded-lg shadow-sm text-center border border-gray-700">
                            <div className="w-16 h-16 bg-green-900/50 rounded-full flex items-center justify-center mx-auto mb-4">
                                <span className="text-2xl">📅</span>
                            </div>
                            <h3 className="text-xl font-semibold mb-2 text-white">Easy Booking</h3>
                            <p className="text-gray-300">Schedule appointments instantly with real-time availability.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-16 bg-green-600 text-white relative overflow-hidden">
                {/* Subtle Green Threads Animation */}
                <div className="absolute inset-0 opacity-20">
                    <Threads
                        color={[0, 1, 0]}
                        amplitude={0.4}
                        distance={0.1}
                        enableMouseInteraction={false}
                    />
                </div>

                <div className="max-w-7xl mx-auto px-4 text-center relative z-10">
                    <h2 className="text-3xl font-bold mb-4">
                        Ready to Get Started?
                    </h2>
                    <p className="text-xl mb-8 opacity-90">
                        Join thousands who trust our healthcare platform.
                    </p>
                    <button className="bg-black text-green-400 px-8 py-3 rounded-lg font-semibold hover:bg-gray-900 transition-colors border border-green-400">
                        Get Started Today
                    </button>
                </div>
            </section>

            {/* Simple Footer */}
            <footer className="bg-black text-white py-8 border-t border-gray-800">
                <div className="max-w-7xl mx-auto px-4 text-center">
                    <p>&copy; 2025 Smart Healthcare. All rights reserved.</p>
                </div>
            </footer>
        </div>
    )
}

export default HomePage
