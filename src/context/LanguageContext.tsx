'use client'

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { Language } from '@/types'

interface Translations {
    [key: string]: {
        [key: string]: string
    }
}

const translations: Translations = {
    en: {
        // Navigation
        home: 'Home',
        about: 'About',
        doctors: 'Doctors',
        login: 'Login',
        register: 'Register',
        contact: 'Contact',

        // Hero Section
        heroTitle: 'Your AI Healthcare Assistant',
        heroSubtitle: 'Check symptoms, find doctors, book appointments instantly.',
        startSymptomCheck: 'Start Symptom Check',
        bookAppointment: 'Book Appointment',

        // Features
        aiSymptomChecker: 'AI Symptom Checker',
        smartDoctorMatching: 'Smart Doctor Matching',
        appointmentScheduler: 'Appointment Scheduler',
        secureHealthRecords: 'Secure Health Records',

        // Common
        loading: 'Loading...',
        submit: 'Submit',
        cancel: 'Cancel',
        save: 'Save',
        edit: 'Edit',
        delete: 'Delete',
        search: 'Search',
        filter: 'Filter',

        // Dashboard
        dashboard: 'Dashboard',
        appointments: 'Appointments',
        healthRecords: 'Health Records',
        profile: 'Profile',

        // Symptom Checker
        symptomChecker: 'Symptom Checker',
        describeSymptoms: 'Describe your symptoms',
        startChat: 'Start Chat',

        // Appointments
        upcomingAppointments: 'Upcoming Appointments',
        pastAppointments: 'Past Appointments',
        scheduleAppointment: 'Schedule Appointment',

        // Doctor
        findDoctor: 'Find Doctor',
        viewProfile: 'View Profile',
        specialty: 'Specialty',
        experience: 'Experience',
        ratings: 'Ratings',
        fee: 'Fee',

        // Health Records
        uploadReport: 'Upload Report',
        medicalHistory: 'Medical History',
        prescriptions: 'Prescriptions',
        reports: 'Reports'
    },
    es: {
        // Navigation
        home: 'Inicio',
        about: 'Acerca de',
        doctors: 'Doctores',
        login: 'Iniciar Sesión',
        register: 'Registrarse',
        contact: 'Contacto',

        // Hero Section
        heroTitle: 'Tu Asistente de Salud IA',
        heroSubtitle: 'Verificar síntomas, encontrar doctores, reservar citas al instante.',
        startSymptomCheck: 'Verificar Síntomas',
        bookAppointment: 'Reservar Cita',

        // Features
        aiSymptomChecker: 'Verificador de Síntomas IA',
        smartDoctorMatching: 'Búsqueda Inteligente de Doctores',
        appointmentScheduler: 'Programador de Citas',
        secureHealthRecords: 'Registros de Salud Seguros',

        // Common
        loading: 'Cargando...',
        submit: 'Enviar',
        cancel: 'Cancelar',
        save: 'Guardar',
        edit: 'Editar',
        delete: 'Eliminar',
        search: 'Buscar',
        filter: 'Filtrar',

        // Dashboard
        dashboard: 'Panel',
        appointments: 'Citas',
        healthRecords: 'Registros de Salud',
        profile: 'Perfil',

        // Symptom Checker
        symptomChecker: 'Verificador de Síntomas',
        describeSymptoms: 'Describe tus síntomas',
        startChat: 'Iniciar Chat',

        // Appointments
        upcomingAppointments: 'Próximas Citas',
        pastAppointments: 'Citas Pasadas',
        scheduleAppointment: 'Programar Cita',

        // Doctor
        findDoctor: 'Encontrar Doctor',
        viewProfile: 'Ver Perfil',
        specialty: 'Especialidad',
        experience: 'Experiencia',
        ratings: 'Calificaciones',
        fee: 'Tarifa',

        // Health Records
        uploadReport: 'Subir Reporte',
        medicalHistory: 'Historia Médica',
        prescriptions: 'Prescripciones',
        reports: 'Reportes'
    },
    hi: {
        // Navigation
        home: 'होम',
        about: 'के बारे में',
        doctors: 'डॉक्टर',
        login: 'लॉगिन',
        register: 'रजिस्टर',
        contact: 'संपर्क',

        // Hero Section
        heroTitle: 'आपका एआई स्वास्थ्य सहायक',
        heroSubtitle: 'लक्षण जांचें, डॉक्टर खोजें, तुरंत अपॉइंटमेंट बुक करें।',
        startSymptomCheck: 'लक्षण जांच शुरू करें',
        bookAppointment: 'अपॉइंटमेंट बुक करें',

        // Features
        aiSymptomChecker: 'एआई लक्षण जांचकर्ता',
        smartDoctorMatching: 'स्मार्ट डॉक्टर मैचिंग',
        appointmentScheduler: 'अपॉइंटमेंट शेड्यूलर',
        secureHealthRecords: 'सुरक्षित स्वास्थ्य रिकॉर्ड',

        // Common
        loading: 'लोड हो रहा है...',
        submit: 'जमा करें',
        cancel: 'रद्द करें',
        save: 'सहेजें',
        edit: 'संपादित करें',
        delete: 'हटाएं',
        search: 'खोजें',
        filter: 'फिल्टर',

        // Dashboard
        dashboard: 'डैशबोर्ड',
        appointments: 'अपॉइंटमेंट',
        healthRecords: 'स्वास्थ्य रिकॉर्ड',
        profile: 'प्रोफाइल',

        // Symptom Checker
        symptomChecker: 'लक्षण जांचकर्ता',
        describeSymptoms: 'अपने लक्षणों का वर्णन करें',
        startChat: 'चैट शुरू करें',

        // Appointments
        upcomingAppointments: 'आगामी अपॉइंटमेंट',
        pastAppointments: 'पिछले अपॉइंटमेंट',
        scheduleAppointment: 'अपॉइंटमेंट शेड्यूल करें',

        // Doctor
        findDoctor: 'डॉक्टर खोजें',
        viewProfile: 'प्रोफाइल देखें',
        specialty: 'विशेषता',
        experience: 'अनुभव',
        ratings: 'रेटिंग',
        fee: 'फीस',

        // Health Records
        uploadReport: 'रिपोर्ट अपलोड करें',
        medicalHistory: 'मेडिकल हिस्ट्री',
        prescriptions: 'प्रेस्क्रिप्शन',
        reports: 'रिपोर्ट'
    }
}

interface LanguageContextType {
    language: string
    changeLanguage: (_lang: string) => void
    t: (_key: string) => string
    availableLanguages: Language[]
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export const useLanguage = () => {
    const context = useContext(LanguageContext)
    if (!context) {
        throw new Error('useLanguage must be used within a LanguageProvider')
    }
    return context
}

interface LanguageProviderProps {
    children: ReactNode
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
    const [language, setLanguage] = useState('en')

    useEffect(() => {
        const savedLanguage = localStorage.getItem('language') || 'en'
        setLanguage(savedLanguage)
    }, [])

    const changeLanguage = (lang: string) => {
        setLanguage(lang)
        localStorage.setItem('language', lang)
    }

    const t = (key: string): string => {
        return translations[language]?.[key] || translations.en[key] || key
    }

    const availableLanguages: Language[] = [
        { code: 'en', name: 'English', flag: '🇺🇸' },
        { code: 'es', name: 'Español', flag: '🇪🇸' },
        { code: 'hi', name: 'हिंदी', flag: '🇮🇳' }
    ]

    const value: LanguageContextType = {
        language,
        changeLanguage,
        t,
        availableLanguages
    }

    return (
        <LanguageContext.Provider value={value}>
            {children}
        </LanguageContext.Provider>
    )
}
