'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Calendar, User, FileText, MessageSquare, Heart, Clock, LogOut } from 'lucide-react'
import { useAuth } from '@/context/AuthContext'
import Link from 'next/link'

const DashboardPage: React.FC = () => {
    const { user, logout } = useAuth()

    const handleLogout = async () => {
        try {
            await logout()
            // Redirect will be handled by the auth context
        } catch (error) {
            console.error('Logout error:', error)
        }
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-emerald-900">
            <div className="p-8">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="flex justify-between items-center mb-8"
                >
                    <div>
                        <h1 className="text-4xl font-bold text-white mb-2">Welcome back, {user?.name}!</h1>
                        <p className="text-gray-300">Your health dashboard</p>
                    </div>
                    <div className="flex items-center space-x-4">
                        <div className="bg-emerald-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2">
                            <User className="w-5 h-5" />
                            <span>{user?.email}</span>
                        </div>
                        <button
                            onClick={handleLogout}
                            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
                        >
                            <LogOut className="w-5 h-5" />
                            <span>Logout</span>
                        </button>
                    </div>
                </motion.div>

                {/* Quick Actions */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
                >
                    <div className="bg-white/10 backdrop-blur-md p-6 rounded-xl border border-white/20 hover:bg-white/15 transition-all cursor-pointer">
                        <Calendar className="w-8 h-8 text-emerald-400 mb-4" />
                        <h3 className="text-white font-semibold mb-2">Book Appointment</h3>
                        <p className="text-gray-300 text-sm">Schedule with doctors</p>
                    </div>
                    <Link href="/symptom-checker">
                        <div className="bg-white/10 backdrop-blur-md p-6 rounded-xl border border-white/20 hover:bg-white/15 transition-all cursor-pointer">
                            <MessageSquare className="w-8 h-8 text-emerald-400 mb-4" />
                            <h3 className="text-white font-semibold mb-2">AI Symptom Check</h3>
                            <p className="text-gray-300 text-sm">Check your symptoms</p>
                        </div>
                    </Link>
                    <div className="bg-white/10 backdrop-blur-md p-6 rounded-xl border border-white/20 hover:bg-white/15 transition-all cursor-pointer">
                        <FileText className="w-8 h-8 text-emerald-400 mb-4" />
                        <h3 className="text-white font-semibold mb-2">Health Records</h3>
                        <p className="text-gray-300 text-sm">View your records</p>
                    </div>
                    <div className="bg-white/10 backdrop-blur-md p-6 rounded-xl border border-white/20 hover:bg-white/15 transition-all cursor-pointer">
                        <Heart className="w-8 h-8 text-emerald-400 mb-4" />
                        <h3 className="text-white font-semibold mb-2">Health Insights</h3>
                        <p className="text-gray-300 text-sm">Track your health</p>
                    </div>
                </motion.div>

                {/* Recent Activity */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    className="grid grid-cols-1 lg:grid-cols-2 gap-8"
                >
                    {/* Upcoming Appointments */}
                    <div className="bg-white/10 backdrop-blur-md p-6 rounded-xl border border-white/20">
                        <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
                            <Clock className="w-5 h-5 text-emerald-400" />
                            Upcoming Appointments
                        </h3>
                        <div className="space-y-3">
                            <div className="bg-gray-800/50 p-4 rounded-lg">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <h4 className="text-white font-medium">Dr. Sarah Johnson</h4>
                                        <p className="text-gray-400 text-sm">Cardiology</p>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-emerald-400 font-medium">Today 2:30 PM</p>
                                        <p className="text-gray-400 text-sm">Video Call</p>
                                    </div>
                                </div>
                            </div>
                            <div className="bg-gray-800/50 p-4 rounded-lg">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <h4 className="text-white font-medium">Dr. Michael Chen</h4>
                                        <p className="text-gray-400 text-sm">General Medicine</p>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-emerald-400 font-medium">Tomorrow 10:00 AM</p>
                                        <p className="text-gray-400 text-sm">In-person</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Health Summary */}
                    <div className="bg-white/10 backdrop-blur-md p-6 rounded-xl border border-white/20">
                        <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
                            <Heart className="w-5 h-5 text-emerald-400" />
                            Health Summary
                        </h3>
                        <div className="space-y-4">
                            <div className="flex justify-between items-center">
                                <span className="text-gray-300">Last Check-up</span>
                                <span className="text-white">2 weeks ago</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-gray-300">Blood Pressure</span>
                                <span className="text-emerald-400">120/80 mmHg</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-gray-300">Heart Rate</span>
                                <span className="text-emerald-400">72 bpm</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-gray-300">Overall Health</span>
                                <span className="text-emerald-400">Excellent</span>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    )
}

export default DashboardPage
