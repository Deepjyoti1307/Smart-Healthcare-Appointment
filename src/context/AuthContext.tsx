'use client'

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { User, Patient, Doctor } from '@/types'

interface AuthContextType {
    user: User | null
    login: (email: string, password: string, userType?: 'patient' | 'doctor') => Promise<User>
    register: (userData: Partial<User>) => Promise<User>
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
        // Check for stored user data
        const storedUser = localStorage.getItem('user')
        if (storedUser) {
            try {
                setUser(JSON.parse(storedUser))
            } catch (error) {
                console.error('Error parsing stored user data:', error)
                localStorage.removeItem('user')
            }
        }
        setLoading(false)
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

    const logout = () => {
        setUser(null)
        localStorage.removeItem('user')
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
