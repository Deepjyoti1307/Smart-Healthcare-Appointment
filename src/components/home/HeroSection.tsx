'use client'

import React from 'react'
import Link from 'next/link'
import { useLanguage } from '@/context/LanguageContext'
import { useAuth } from '@/context/AuthContext'
import { motion } from 'framer-motion'
import { ArrowRight, Stethoscope, Bot } from 'lucide-react'

const HeroSection: React.FC = () => {
    const { t } = useLanguage()
    const { isAuthenticated } = useAuth()

    return (
        <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/5 via-background to-health-50/20 overflow-hidden">
            {/* Background Animation */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse-slow"></div>
                <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-health-400/10 rounded-full blur-3xl animate-pulse-slow animation-delay-1000"></div>
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    {/* Left Content */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        className="text-center lg:text-left"
                    >
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6"
                        >
                            {t('heroTitle')}
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.4 }}
                            className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl"
                        >
                            {t('heroSubtitle')}
                        </motion.p>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.6 }}
                            className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
                        >
                            <Link
                                href={isAuthenticated ? "/symptom-checker" : "/register"}
                                className="btn-primary text-lg px-8 py-4 group"
                            >
                                <Bot className="w-5 h-5 mr-2" />
                                {t('startSymptomCheck')}
                                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                            </Link>

                            <Link
                                href="/doctors"
                                className="btn-secondary text-lg px-8 py-4 group"
                            >
                                <Stethoscope className="w-5 h-5 mr-2" />
                                {t('bookAppointment')}
                                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                            </Link>
                        </motion.div>

                        {/* Stats */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.8 }}
                            className="mt-12 grid grid-cols-3 gap-8 text-center lg:text-left"
                        >
                            <div>
                                <div className="text-2xl md:text-3xl font-bold text-primary">50K+</div>
                                <div className="text-sm text-muted-foreground">Happy Patients</div>
                            </div>
                            <div>
                                <div className="text-2xl md:text-3xl font-bold text-primary">500+</div>
                                <div className="text-sm text-muted-foreground">Expert Doctors</div>
                            </div>
                            <div>
                                <div className="text-2xl md:text-3xl font-bold text-primary">24/7</div>
                                <div className="text-sm text-muted-foreground">AI Support</div>
                            </div>
                        </motion.div>
                    </motion.div>

                    {/* Right Illustration */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="relative"
                    >
                        <div className="relative w-full max-w-lg mx-auto">
                            {/* Main illustration placeholder */}
                            <div className="relative bg-gradient-to-br from-primary/20 to-health-400/20 rounded-3xl p-8 backdrop-blur-sm border border-primary/20">
                                {/* Doctor + AI Visual */}
                                <div className="space-y-6">
                                    {/* Doctor Icon */}
                                    <div className="flex justify-center">
                                        <div className="w-32 h-32 bg-primary/10 rounded-full flex items-center justify-center">
                                            <Stethoscope className="w-16 h-16 text-primary" />
                                        </div>
                                    </div>

                                    {/* AI Chatbot Visual */}
                                    <div className="relative">
                                        <div className="absolute -right-4 -top-4 w-16 h-16 bg-health-400/20 rounded-full flex items-center justify-center">
                                            <Bot className="w-8 h-8 text-health-600" />
                                        </div>

                                        {/* Chat Bubbles */}
                                        <div className="space-y-3">
                                            <div className="bg-background/80 backdrop-blur-sm rounded-2xl p-4 shadow-sm border">
                                                <div className="text-sm text-muted-foreground">&ldquo;How can I help you today?&rdquo;</div>
                                            </div>
                                            <div className="bg-primary/10 rounded-2xl p-4 ml-8">
                                                <div className="text-sm">&ldquo;I have a headache...&rdquo;</div>
                                            </div>
                                            <div className="bg-background/80 backdrop-blur-sm rounded-2xl p-4 shadow-sm border">
                                                <div className="text-sm text-muted-foreground">&ldquo;Let me find the right doctor for you.&rdquo;</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Floating Elements */}
                                <div className="absolute -top-4 -left-4 w-8 h-8 bg-health-400 rounded-full animate-bounce"></div>
                                <div className="absolute -bottom-2 -right-2 w-6 h-6 bg-primary rounded-full animate-bounce animation-delay-500"></div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    )
}

export default HeroSection
