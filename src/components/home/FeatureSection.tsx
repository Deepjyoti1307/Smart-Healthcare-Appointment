'use client'

import React from 'react'
import Link from 'next/link'
import { useLanguage } from '@/context/LanguageContext'
import { motion } from 'framer-motion'
import {
    Bot,
    Users,
    Calendar,
    Shield,
    ArrowRight,
    Check,
    Sparkles
} from 'lucide-react'

const FeatureSection: React.FC = () => {
    const { t } = useLanguage()

    const features = [
        {
            icon: Bot,
            title: t('aiSymptomChecker'),
            description: 'Advanced AI analyzes your symptoms and provides personalized health insights with high accuracy.',
            highlights: ['24/7 Availability', 'Multi-language Support', 'Privacy Protected'],
            color: 'from-primary/10 to-primary/5',
            iconColor: 'text-primary',
            link: '/symptom-checker'
        },
        {
            icon: Users,
            title: t('smartDoctorMatching'),
            description: 'Find the perfect doctor based on your symptoms, location, and preferences using smart algorithms.',
            highlights: ['500+ Expert Doctors', 'Specialty Matching', 'Real-time Availability'],
            color: 'from-health-400/10 to-health-400/5',
            iconColor: 'text-health-600',
            link: '/doctors'
        },
        {
            icon: Calendar,
            title: t('appointmentScheduler'),
            description: 'Book appointments instantly with real-time availability and automated reminders.',
            highlights: ['Instant Booking', 'Smart Reminders', 'Easy Rescheduling'],
            color: 'from-blue-400/10 to-blue-400/5',
            iconColor: 'text-blue-600',
            link: '/doctors'
        },
        {
            icon: Shield,
            title: t('secureHealthRecords'),
            description: 'Securely store and manage your health records with end-to-end encryption.',
            highlights: ['Bank-level Security', 'Easy Sharing', 'Cloud Backup'],
            color: 'from-purple-400/10 to-purple-400/5',
            iconColor: 'text-purple-600',
            link: '/health-records'
        }
    ]

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2
            }
        }
    }

    const itemVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.6 }
        }
    }

    return (
        <section className="py-20 bg-background">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <div className="inline-flex items-center px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
                        <Sparkles className="w-4 h-4 mr-2" />
                        Powered by AI
                    </div>
                    <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                        Everything You Need for Better Health
                    </h2>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                        Our comprehensive healthcare platform combines AI technology with human expertise
                        to provide you with the best possible care experience.
                    </p>
                </motion.div>

                {/* Features Grid */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="grid grid-cols-1 md:grid-cols-2 gap-8"
                >
                    {features.map((feature, index) => (
                        <motion.div
                            key={feature.title}
                            variants={itemVariants}
                            className="group"
                        >
                            <div className={`card p-8 h-full bg-gradient-to-br ${feature.color} border-2 border-transparent hover:border-primary/20 transition-all duration-300 hover:shadow-lg`}>
                                {/* Icon */}
                                <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br ${feature.color} border ${feature.iconColor} mb-6`}>
                                    <feature.icon className="w-8 h-8" />
                                </div>

                                {/* Content */}
                                <div className="space-y-4">
                                    <h3 className="text-xl font-semibold text-foreground">
                                        {feature.title}
                                    </h3>

                                    <p className="text-muted-foreground">
                                        {feature.description}
                                    </p>

                                    {/* Highlights */}
                                    <ul className="space-y-2">
                                        {feature.highlights.map((highlight, idx) => (
                                            <li key={idx} className="flex items-center text-sm text-muted-foreground">
                                                <Check className="w-4 h-4 text-health-600 mr-2 flex-shrink-0" />
                                                {highlight}
                                            </li>
                                        ))}
                                    </ul>

                                    {/* CTA */}
                                    <Link
                                        href={feature.link}
                                        className="inline-flex items-center text-primary hover:text-primary/80 font-medium text-sm group-hover:translate-x-1 transition-all duration-300"
                                    >
                                        Learn More
                                        <ArrowRight className="w-4 h-4 ml-1" />
                                    </Link>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>

                {/* Bottom CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    className="mt-16 text-center"
                >
                    <div className="bg-gradient-to-r from-primary/5 via-primary/10 to-primary/5 rounded-2xl p-8 border border-primary/20">
                        <h3 className="text-2xl font-bold text-foreground mb-4">
                            Ready to Start Your Health Journey?
                        </h3>
                        <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                            Join thousands of users who trust Smart Health for their healthcare needs.
                            Get started today and experience the future of healthcare.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link
                                href="/register"
                                className="btn-primary text-lg px-8 py-3 group"
                            >
                                Get Started Free
                                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                            </Link>
                            <Link
                                href="/doctors"
                                className="btn-secondary text-lg px-8 py-3"
                            >
                                Browse Doctors
                            </Link>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    )
}

export default FeatureSection
