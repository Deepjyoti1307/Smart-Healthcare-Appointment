'use client'

import React, { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/context/AuthContext'

interface PublicRouteProps {
    children: React.ReactNode
    redirectTo?: string
}

export const PublicRoute: React.FC<PublicRouteProps> = ({
    children,
    redirectTo = '/dashboard'
}) => {
    const { user, loading } = useAuth()
    const router = useRouter()

    useEffect(() => {
        if (!loading && user) {
            router.push(redirectTo)
        }
    }, [user, loading, router, redirectTo])

    if (loading) {
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
        return null // Will redirect to dashboard
    }

    return <>{children}</>
}
