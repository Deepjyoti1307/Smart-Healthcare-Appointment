'use client'

import React from 'react'
import Link from 'next/link'
import { useLanguage } from '@/context/LanguageContext'
import { Heart, Facebook, Twitter, Linkedin } from 'lucide-react'

const Footer: React.FC = () => {
    const { t } = useLanguage()

    const quickLinks = [
        { name: t('home'), path: '/' },
        { name: t('about'), path: '/about' },
        { name: t('doctors'), path: '/doctors' },
        { name: t('contact'), path: '/contact' }
    ]

    const services = [
        { name: t('aiSymptomChecker'), path: '/symptom-checker' },
        { name: t('bookAppointment'), path: '/doctors' },
        { name: t('healthRecords'), path: '/health-records' }
    ]

    return (
        <footer className="bg-muted/50 border-t">
            <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {/* Logo and Description */}
                    <div className="col-span-1 md:col-span-2">
                        <div className="flex items-center space-x-2 mb-4">
                            <Heart className="h-8 w-8 text-primary" />
                            <span className="text-xl font-bold">Smart Health</span>
                        </div>
                        <p className="text-muted-foreground mb-4 max-w-md">
                            Your trusted AI healthcare assistant providing symptom checking,
                            doctor matching, and appointment scheduling services.
                        </p>
                        <div className="flex space-x-4">
                            <a
                                href="#"
                                className="text-muted-foreground hover:text-primary transition-colors"
                                aria-label="Facebook"
                            >
                                <Facebook className="w-5 h-5" />
                            </a>
                            <a
                                href="#"
                                className="text-muted-foreground hover:text-primary transition-colors"
                                aria-label="Twitter"
                            >
                                <Twitter className="w-5 h-5" />
                            </a>
                            <a
                                href="#"
                                className="text-muted-foreground hover:text-primary transition-colors"
                                aria-label="LinkedIn"
                            >
                                <Linkedin className="w-5 h-5" />
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-sm font-semibold text-foreground tracking-wider uppercase mb-4">
                            Quick Links
                        </h3>
                        <ul className="space-y-2">
                            {quickLinks.map((link) => (
                                <li key={link.name}>
                                    <Link
                                        href={link.path}
                                        className="text-muted-foreground hover:text-primary transition-colors"
                                    >
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Services */}
                    <div>
                        <h3 className="text-sm font-semibold text-foreground tracking-wider uppercase mb-4">
                            Services
                        </h3>
                        <ul className="space-y-2">
                            {services.map((service) => (
                                <li key={service.name}>
                                    <Link
                                        href={service.path}
                                        className="text-muted-foreground hover:text-primary transition-colors"
                                    >
                                        {service.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Bottom section */}
                <div className="mt-8 pt-8 border-t border-border">
                    <div className="flex flex-col md:flex-row justify-between items-center">
                        <p className="text-muted-foreground text-sm">
                            © 2025 Smart Health. All rights reserved.
                        </p>
                        <div className="flex space-x-6 mt-4 md:mt-0">
                            <Link
                                href="/privacy"
                                className="text-muted-foreground hover:text-primary text-sm transition-colors"
                            >
                                Privacy Policy
                            </Link>
                            <Link
                                href="/terms"
                                className="text-muted-foreground hover:text-primary text-sm transition-colors"
                            >
                                Terms of Service
                            </Link>
                            <Link
                                href="/accessibility"
                                className="text-muted-foreground hover:text-primary text-sm transition-colors"
                            >
                                Accessibility
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer
