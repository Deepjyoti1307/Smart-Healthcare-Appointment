'use client'

import { useEffect } from 'react'
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
                        router.push('/dashboard')
                    } else {
                        router.push('/auth')
                    }
                } else {
                    // Mock success for development
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
        <div className= "min-h-screen bg-black flex items-center justify-center" >
        <div className="text-center" >
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-500 mx-auto mb-4" > </div>
                < p className = "text-white" > Signing you in...</p>
                    </div>
                    </div>
  )
}
