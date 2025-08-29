'use client'

import React, { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'

export default function AuthCallback() {
    const router = useRouter()

    useEffect(() => {
        const handleAuthCallback = async () => {
            try {
                if (supabase) {
                    const { data, error } = await supabase.auth.getSession()
                    if (data.session) {
                        // Successful authentication, redirect to dashboard
                        router.push('/dashboard')
                    } else {
                        // No session, redirect to auth
                        router.push('/auth')
                    }
                } else {
                    // Mock success for development
                    localStorage.setItem('user', JSON.stringify({
                        id: '1',
                        name: 'Test User',
                        email: 'test@example.com',
                        userType: 'patient',
                        phone: '',
                        dateOfBirth: '',
                        location: ''
                    }))
                    router.push('/dashboard')
                }
            } catch (error) {
                console.error('Auth callback error:', error)
                router.push('/auth')
            }
        }

        handleAuthCallback()
    }, [router])

    return (
        <div className="min-h-screen bg-black flex items-center justify-center">
            <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-500 mx-auto mb-4"></div>
                <p className="text-white">Signing you in...</p>
            </div>
        </div>
    )
}
