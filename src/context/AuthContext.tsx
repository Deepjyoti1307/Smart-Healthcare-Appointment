'use client'

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { User, Patient, Doctor } from '@/types'
import { supabase, signInWithGoogle, signOut as supabaseSignOut } from '@/lib/supabase'

interface AuthContextType {
    user: User | null
    login: (email: string, password: string, userType?: 'patient' | 'doctor') => Promise<User>
    register: (userData: Partial<User>) => Promise<User>
    loginWithGoogle: () => Promise<void>
    logout: () => void
    updateProfile: (updates: Partial<User>) => void
    loading: boolean
    isAuthenticated: boolean
    isPatient: boolean
    isDoctor: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const useAuth = () => {
    const context = useContext(AuthContext)
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider')
    }
    return context
}

interface AuthProviderProps {
    children: ReactNode
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const initAuth = async () => {
            try {
                if (supabase) {
                    // Get initial session
                    const { data: { session } } = await supabase.auth.getSession()

                    if (session?.user) {
                        // Convert Supabase user to our User type
                        const appUser: User = {
                            id: session.user.id,
                            name: session.user.user_metadata?.name || session.user.email?.split('@')[0] || 'User',
                            email: session.user.email || '',
                            userType: 'patient', // Default to patient
                            phone: session.user.user_metadata?.phone || '',
                            dateOfBirth: session.user.user_metadata?.dateOfBirth || '',
                            location: session.user.user_metadata?.location || ''
                        }
                        setUser(appUser)
                        localStorage.setItem('user', JSON.stringify(appUser))
                    }

                    // Listen for auth changes
                    const { data: { subscription } } = supabase.auth.onAuthStateChange(
                        async (event, session) => {
                            if (session?.user) {
                                const appUser: User = {
                                    id: session.user.id,
                                    name: session.user.user_metadata?.name || session.user.email?.split('@')[0] || 'User',
                                    email: session.user.email || '',
                                    userType: 'patient',
                                    phone: session.user.user_metadata?.phone || '',
                                    dateOfBirth: session.user.user_metadata?.dateOfBirth || '',
                                    location: session.user.user_metadata?.location || ''
                                }
                                setUser(appUser)
                                localStorage.setItem('user', JSON.stringify(appUser))
                            } else {
                                setUser(null)
                                localStorage.removeItem('user')
                            }
                            setLoading(false)
                        }
                    )

                    setLoading(false)
                    return () => subscription.unsubscribe()
                } else {
                    // Mock authentication for development
                    const mockUser = localStorage.getItem('user')
                    if (mockUser) {
                        setUser(JSON.parse(mockUser))
                    }
                    setLoading(false)
                }
            } catch (error) {
                console.error('Auth initialization error:', error)
                setLoading(false)
            }
        }

        initAuth()
    }, [])

    const login = async (email: string, password: string, userType: 'patient' | 'doctor' = 'patient'): Promise<User> => {
        // Simulate API call
        const mockUser: User = {
            id: Date.now().toString(),
            name: userType === 'doctor' ? 'Dr. John Smith' : 'John Doe',
            email: email,
            userType: userType,
            phone: '+1234567890',
            dateOfBirth: '1990-01-01',
            location: 'New York, NY',
            ...(userType === 'doctor' && {
                specialty: 'Cardiology',
                experience: 10,
                rating: 4.8,
                fee: 150,
                qualifications: ['MD', 'FACC'],
                languages: ['English', 'Spanish']
            })
        }

        setUser(mockUser)
        localStorage.setItem('user', JSON.stringify(mockUser))
        return mockUser
    }

    const register = async (userData: Partial<User>): Promise<User> => {
        // Simulate API call
        const newUser: User = {
            id: Date.now().toString(),
            userType: 'patient',
            ...userData
        } as User

        setUser(newUser)
        localStorage.setItem('user', JSON.stringify(newUser))
        return newUser
    }

    const loginWithGoogle = async () => {
        setLoading(true)
        try {
            const { data, error } = await signInWithGoogle()
            if (error) throw error
            // The auth state change listener will handle setting the user
        } catch (error) {
            console.error('Google login error:', error)
            throw error
        } finally {
            setLoading(false)
        }
    }

    const logout = async () => {
        setLoading(true)
        try {
            if (supabase) {
                await supabaseSignOut()
            } else {
                // Mock logout
                setUser(null)
                localStorage.removeItem('user')
            }
        } catch (error) {
            console.error('Logout error:', error)
        } finally {
            setLoading(false)
        }
    }

    const updateProfile = (updates: Partial<User>) => {
        if (!user) return
        const updatedUser = { ...user, ...updates }
        setUser(updatedUser)
        localStorage.setItem('user', JSON.stringify(updatedUser))
    }

    const value: AuthContextType = {
        user,
        login,
        register,
        loginWithGoogle,
        logout,
        updateProfile,
        loading,
        isAuthenticated: !!user,
        isPatient: user?.userType === 'patient',
        isDoctor: user?.userType === 'doctor'
    }

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    )
}
