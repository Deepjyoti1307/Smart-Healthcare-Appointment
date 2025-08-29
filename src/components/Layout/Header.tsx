'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { useRouter, usePathname } from 'next/navigation'
import { useAuth } from '@/context/AuthContext'
import { useTheme } from '@/context/ThemeContext'
import { useLanguage } from '@/context/LanguageContext'
import {
    Heart,
    Moon,
    Sun,
    UserCircle,
    Menu,
    X,
    Languages,
    ChevronDown,
    LogOut
} from 'lucide-react'
import { cn } from '@/lib/utils'
import toast from 'react-hot-toast'

const Header: React.FC = () => {
    const { user, logout, isAuthenticated } = useAuth()
    const { isDark, toggleTheme } = useTheme()
    const { t, language, changeLanguage, availableLanguages } = useLanguage()
    const router = useRouter()
    const pathname = usePathname()
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
    const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false)
    const [isLanguageMenuOpen, setIsLanguageMenuOpen] = useState(false)

    const handleLogout = () => {
        logout()
        toast.success('Logged out successfully')
        router.push('/')
        setIsProfileMenuOpen(false)
    }

    const navItems = [
        { name: t('home'), path: '/' },
        { name: t('about'), path: '/about' },
        { name: t('doctors'), path: '/doctors' },
        { name: t('contact'), path: '/contact' }
    ]

    const isActive = (path: string) => pathname === path

    return (
        <header className="fixed top-0 w-full bg-background/80 backdrop-blur-md border-b border-border z-50">
            <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    {/* Logo */}
                    <div className="flex items-center">
                        <Link href="/" className="flex items-center space-x-2">
                            <Heart className="h-8 w-8 text-primary" />
                            <span className="text-xl font-bold text-foreground">
                                Smart Health
                            </span>
                        </Link>
                    </div>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center space-x-8">
                        {navItems.map((item) => (
                            <Link
                                key={item.name}
                                href={item.path}
                                className={cn(
                                    'px-3 py-2 text-sm font-medium transition-colors',
                                    isActive(item.path)
                                        ? 'text-primary border-b-2 border-primary'
                                        : 'text-muted-foreground hover:text-foreground'
                                )}
                            >
                                {item.name}
                            </Link>
                        ))}
                    </div>

                    {/* Right side controls */}
                    <div className="flex items-center space-x-4">
                        {/* Language Selector */}
                        <div className="relative">
                            <button
                                onClick={() => setIsLanguageMenuOpen(!isLanguageMenuOpen)}
                                className="flex items-center space-x-1 text-muted-foreground hover:text-foreground"
                            >
                                <Languages className="h-5 w-5" />
                                <span className="text-sm">
                                    {availableLanguages.find(lang => lang.code === language)?.flag}
                                </span>
                                <ChevronDown className="h-4 w-4" />
                            </button>

                            {isLanguageMenuOpen && (
                                <div className="absolute right-0 mt-2 w-48 bg-popover rounded-md shadow-lg py-1 z-50 border">
                                    {availableLanguages.map((lang) => (
                                        <button
                                            key={lang.code}
                                            onClick={() => {
                                                changeLanguage(lang.code)
                                                setIsLanguageMenuOpen(false)
                                            }}
                                            className={cn(
                                                'w-full text-left px-4 py-2 text-sm hover:bg-accent',
                                                language === lang.code
                                                    ? 'bg-accent text-accent-foreground'
                                                    : 'text-popover-foreground'
                                            )}
                                        >
                                            <span className="mr-2">{lang.flag}</span>
                                            {lang.name}
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Theme Toggle */}
                        <button
                            onClick={toggleTheme}
                            className="p-2 text-muted-foreground hover:text-foreground"
                        >
                            {isDark ? (
                                <Sun className="h-5 w-5" />
                            ) : (
                                <Moon className="h-5 w-5" />
                            )}
                        </button>

                        {/* User Menu */}
                        {isAuthenticated ? (
                            <div className="relative">
                                <button
                                    onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
                                    className="flex items-center space-x-2 text-muted-foreground hover:text-foreground"
                                >
                                    <UserCircle className="h-6 w-6" />
                                    <span className="text-sm font-medium">{user?.name}</span>
                                    <ChevronDown className="h-4 w-4" />
                                </button>

                                {isProfileMenuOpen && (
                                    <div className="absolute right-0 mt-2 w-48 bg-popover rounded-md shadow-lg py-1 z-50 border">
                                        <Link
                                            href={user?.userType === 'doctor' ? '/doctor-dashboard' : '/patient-dashboard'}
                                            className="block px-4 py-2 text-sm text-popover-foreground hover:bg-accent"
                                            onClick={() => setIsProfileMenuOpen(false)}
                                        >
                                            {t('dashboard')}
                                        </Link>
                                        <Link
                                            href="/health-records"
                                            className="block px-4 py-2 text-sm text-popover-foreground hover:bg-accent"
                                            onClick={() => setIsProfileMenuOpen(false)}
                                        >
                                            {t('healthRecords')}
                                        </Link>
                                        <Link
                                            href="/profile"
                                            className="block px-4 py-2 text-sm text-popover-foreground hover:bg-accent"
                                            onClick={() => setIsProfileMenuOpen(false)}
                                        >
                                            {t('profile')}
                                        </Link>
                                        <hr className="my-1" />
                                        <button
                                            onClick={handleLogout}
                                            className="flex items-center w-full text-left px-4 py-2 text-sm text-destructive hover:bg-accent"
                                        >
                                            <LogOut className="h-4 w-4 mr-2" />
                                            Logout
                                        </button>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <div className="flex items-center space-x-2">
                                <Link
                                    href="/login"
                                    className="text-sm font-medium text-muted-foreground hover:text-foreground"
                                >
                                    {t('login')}
                                </Link>
                                <Link
                                    href="/register"
                                    className="btn-primary text-sm"
                                >
                                    {t('register')}
                                </Link>
                            </div>
                        )}

                        {/* Mobile menu button */}
                        <div className="md:hidden">
                            <button
                                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                                className="text-muted-foreground hover:text-foreground"
                            >
                                {isMobileMenuOpen ? (
                                    <X className="h-6 w-6" />
                                ) : (
                                    <Menu className="h-6 w-6" />
                                )}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Mobile Navigation */}
                {isMobileMenuOpen && (
                    <div className="md:hidden">
                        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-background border-t">
                            {navItems.map((item) => (
                                <Link
                                    key={item.name}
                                    href={item.path}
                                    className={cn(
                                        'block px-3 py-2 text-base font-medium',
                                        isActive(item.path)
                                            ? 'text-primary bg-accent'
                                            : 'text-muted-foreground hover:text-foreground hover:bg-accent'
                                    )}
                                    onClick={() => setIsMobileMenuOpen(false)}
                                >
                                    {item.name}
                                </Link>
                            ))}
                        </div>
                    </div>
                )}
            </nav>
        </header>
    )
}

export default Header
