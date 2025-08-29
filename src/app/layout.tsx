import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from '@/context/ThemeContext'
import { AuthProvider } from '@/context/AuthContext'
import { LanguageProvider } from '@/context/LanguageContext'
import { Toaster } from 'react-hot-toast'
import FloatingChatbot from '@/components/chatbot/FloatingChatbot'

const inter = Inter({
    subsets: ['latin'],
    variable: '--font-inter',
})

export const metadata: Metadata = {
    title: 'Smart Healthcare | AI Assistant',
    description: 'Smart Healthcare Appointment & Symptom Checker - Your AI Healthcare Assistant for checking symptoms, finding doctors, and booking appointments instantly.',
    keywords: 'healthcare, AI, symptom checker, doctor appointment, telemedicine, health records',
    authors: [{ name: 'Smart Healthcare Team' }],
    openGraph: {
        title: 'Smart Healthcare | AI Assistant',
        description: 'Your AI Healthcare Assistant for symptom checking and appointment booking',
        type: 'website',
        locale: 'en_US',
    },
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body className={`${inter.variable} font-sans antialiased`}>
                <ThemeProvider>
                    <LanguageProvider>
                        <AuthProvider>
                            <div className="relative min-h-screen bg-background">
                                {children}
                                <FloatingChatbot />
                                <Toaster
                                    position="top-right"
                                    toastOptions={{
                                        duration: 4000,
                                        style: {
                                            background: 'hsl(var(--card))',
                                            color: 'hsl(var(--card-foreground))',
                                            border: '1px solid hsl(var(--border))',
                                        },
                                    }}
                                />
                            </div>
                        </AuthProvider>
                    </LanguageProvider>
                </ThemeProvider>
            </body>
        </html>
    )
}
