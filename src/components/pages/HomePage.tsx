'use client'

import React, { useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { AuroraBackground } from '@/components/animation/AuroraBackground'
import { HeroHighlight, Highlight } from '@/components/ui/HeroHighlight'
import { useAuth } from '@/context/AuthContext'

const HomePage: React.FC = () => {
    const { user, loading } = useAuth()
    const router = useRouter()

    // Debug logging
    console.log('HomePage - user:', user, 'loading:', loading)

    useEffect(() => {
        // If user is authenticated, redirect to dashboard
        if (!loading && user) {
            console.log('Redirecting authenticated user to dashboard')
            router.push('/dashboard')
        }
    }, [user, loading, router])

    if (loading) {
        console.log('HomePage - showing loading screen')
        return (
            <div className="min-h-screen bg-black flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-500 mx-auto mb-4"></div>
                    <p className="text-white">Loading...</p>
                </div>
            </div>
        )
    }

    if (user) {
        console.log('HomePage - user authenticated, returning null for redirect')
        return null // Will redirect to dashboard
    }

    console.log('HomePage - showing landing page for unauthenticated user')

    return (
        <div className="min-h-screen bg-black">
            <HeroHighlight containerClassName="min-h-screen">
                <div className="text-center max-w-6xl mx-auto px-4">
                    <h1 className="text-5xl lg:text-6xl xl:text-7xl font-black mb-8 leading-none">
                        <Highlight className="text-black dark:text-white">
                            Smart Healthcare
                        </Highlight>
                    </h1>
                    <p className="text-xl lg:text-2xl font-bold text-gray-300 mb-12 leading-relaxed">
                        Your AI Healthcare Assistant
                    </p>
                    <Link href="/auth">
                        <button className="bg-emerald-600 hover:bg-emerald-700 text-white px-12 py-6 rounded-xl font-bold text-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                            Get Started
                        </button>
                    </Link>
                </div>
            </HeroHighlight>
        </div>
    )
}

export default HomePage
