'use client'

import React, { useState } from 'react'
import { MessageCircle, X, Send, Loader2 } from 'lucide-react'
import { useLanguage } from '@/context/LanguageContext'

const FloatingChatbot: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false)
    const [message, setMessage] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [messages, setMessages] = useState<Array<{ text: string; sender: 'user' | 'bot'; timestamp: string }>>([
        {
            text: '👋 Hi! I\'m your AI Health Assistant powered by Gemini AI. I can help you with:\n\n• Symptom analysis\n• Health questions\n• Medical guidance\n• Wellness tips\n• When to seek medical care\n\nWhat health concern can I help you with today?',
            sender: 'bot',
            timestamp: new Date().toISOString()
        }
    ])
    const { t } = useLanguage()

    const handleSendMessage = async () => {
        if (!message.trim() || isLoading) return

        const userMessage = message.trim()
        const newMessage = {
            text: userMessage,
            sender: 'user' as const,
            timestamp: new Date().toISOString()
        }

        setMessages(prev => [...prev, newMessage])
        setMessage('')
        setIsLoading(true)

        try {
            // Generate AI response using API endpoint
            console.log('Sending request to /api/chat with message:', userMessage)

            const response = await fetch('/api/chat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ message: userMessage }),
            })

            console.log('Response status:', response.status)
            console.log('Response ok:', response.ok)

            if (!response.ok) {
                const errorText = await response.text()
                console.error('API response error:', errorText)
                throw new Error(`Failed to get AI response: ${response.status}`)
            }

            const data = await response.json()
            console.log('API response data:', data)

            const aiResponseMessage = {
                text: data.response,
                sender: 'bot' as const,
                timestamp: new Date().toISOString()
            }

            setMessages(prev => [...prev, aiResponseMessage])
        } catch (error) {
            console.error('Error getting AI response:', error)

            // Create a more intelligent fallback response based on keywords
            let fallbackResponse = "I'm having trouble connecting to my AI system right now. Here's some general health guidance:\n\n";

            const userLower = userMessage.toLowerCase()

            if (userLower.includes('headache') || userLower.includes('head pain')) {
                fallbackResponse += "🔹 For headaches: Stay hydrated, rest in a dark room, and consider over-the-counter pain relief.\n🔹 If severe or persistent, consult a healthcare provider.\n🔹 Emergency: Sudden severe headache requires immediate medical attention."
            } else if (userLower.includes('fever') || userLower.includes('temperature')) {
                fallbackResponse += "🔹 For fever: Stay hydrated, rest, and monitor temperature.\n🔹 Seek medical care if fever exceeds 103°F (39.4°C) or persists.\n🔹 Emergency: High fever with difficulty breathing needs immediate care."
            } else if (userLower.includes('chest pain') || userLower.includes('chest')) {
                fallbackResponse += "🔹 Chest pain can be serious - don't ignore it.\n🔹 If experiencing chest pain with shortness of breath, nausea, or sweating, call emergency services immediately.\n🔹 Even mild chest pain should be evaluated by a healthcare provider."
            } else if (userLower.includes('emergency') || userLower.includes('urgent')) {
                fallbackResponse += "🔹 For medical emergencies: Call 911 (US) or your local emergency number immediately.\n🔹 Don't wait if you're experiencing severe symptoms.\n🔹 Emergency rooms are available 24/7 for urgent care."
            } else {
                fallbackResponse += "🔹 For any health concerns, it's best to consult with a healthcare provider.\n🔹 If symptoms are severe or worsening, seek medical attention promptly.\n🔹 For emergencies, call 911 or your local emergency services."
            }

            fallbackResponse += "\n\n⚠️ This is general guidance only. Always consult healthcare professionals for proper medical advice."

            const errorResponse = {
                text: fallbackResponse,
                sender: 'bot' as const,
                timestamp: new Date().toISOString()
            }

            setMessages(prev => [...prev, errorResponse])
        } finally {
            setIsLoading(false)
        }
    }

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault()
            handleSendMessage()
        }
    }

    return (
        <div className="fixed bottom-4 right-4 z-50">
            {!isOpen ? (
                <button
                    onClick={() => setIsOpen(true)}
                    className="bg-primary hover:bg-primary/90 text-primary-foreground p-4 rounded-full shadow-lg transition-all duration-300 hover:scale-110"
                >
                    <MessageCircle className="h-6 w-6" />
                </button>
            ) : (
                <div className="bg-card border rounded-lg shadow-xl w-80 h-96 flex flex-col">
                    {/* Header */}
                    <div className="flex items-center justify-between p-4 border-b">
                        <div className="flex items-center space-x-2">
                            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                            <span className="font-medium text-sm">AI Health Assistant</span>
                            <span className="text-xs text-muted-foreground">• Powered by Gemini</span>
                        </div>
                        <button
                            onClick={() => setIsOpen(false)}
                            className="text-muted-foreground hover:text-foreground transition-colors"
                        >
                            <X className="h-4 w-4" />
                        </button>
                    </div>

                    {/* Messages */}
                    <div className="flex-1 p-4 space-y-3 overflow-y-auto">
                        {messages.map((msg, index) => (
                            <div
                                key={index}
                                className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                            >
                                <div
                                    className={`max-w-[70%] p-2 rounded-lg text-sm ${msg.sender === 'user'
                                        ? 'bg-primary text-primary-foreground'
                                        : 'bg-muted text-muted-foreground'
                                        }`}
                                >
                                    {msg.text}
                                </div>
                            </div>
                        ))}

                        {/* Loading indicator */}
                        {isLoading && (
                            <div className="flex justify-start">
                                <div className="bg-muted text-muted-foreground p-2 rounded-lg flex items-center space-x-2">
                                    <Loader2 className="h-4 w-4 animate-spin" />
                                    <span className="text-sm">AI is thinking...</span>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Input */}
                    <div className="p-4 border-t">
                        <div className="flex space-x-2">
                            <input
                                type="text"
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                onKeyPress={handleKeyPress}
                                disabled={isLoading}
                                placeholder="Type your health question..."
                                className="flex-1 px-3 py-2 border border-input rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed"
                            />
                            <button
                                onClick={handleSendMessage}
                                disabled={isLoading}
                                className="bg-primary hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed text-primary-foreground p-2 rounded-lg"
                            >
                                {isLoading ? (
                                    <Loader2 className="h-4 w-4 animate-spin" />
                                ) : (
                                    <Send className="h-4 w-4" />
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default FloatingChatbot
